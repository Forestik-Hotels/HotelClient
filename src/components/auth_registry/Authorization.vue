<template>
  <div class="vue-tempalte center">
    <div class="content">
      <form autocomplete="off" @keyup.enter="sendTokenRequest">
        <h3>Sign In</h3>
        <div class="form-group">
          <em class="fa fa-user-circle-o prefix"></em>
          <input id="email" class="form-control form-control-lg" type="text" v-model="request.email">
          <label for="email" class="active">Email</label>
        </div>
        <div class="form-group" onfocus="">
          <em class="fa fa-lock prefix"></em>
          <input id="password" class="form-control form-control-lg" type="password" v-model="request.password">
          <label for="password" class="active">Password
            <em class="fa fa-eye right" @click=showPassword></em>
          </label>
        </div>
        <div class="controllers">
          <button type="button" class="btn btn-primary btn-lg " id="sign-in" @click="sendTokenRequest">
            <label id="signIn" for="sign-in">Sign In</label>
          </button>
          <router-link to="/registration">
            <button type="button" class="position btn btn-primary btn-lg" id="sign-up">
              <label id="signUp" for="sign-up">Sign Up</label>
            </button>
          </router-link>
          <GoogleLogin style=" position: relative; top: 20px"
                       :params="params"
                       :renderParams="renderParams"
                       :onSuccess="onSuccess"
                       :onFailure="onFailure">
          </GoogleLogin>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css';
import Link from "../navigation/Link";
import 'bootstrap/dist/css/bootstrap.min.css'
import GoogleLogin from 'vue-google-login';
import {environment} from "../../environment/environment";

export default {
  name: "Authorization",
  components: {
    GoogleLogin
  },
  data() {
    return {
      params: {
        client_id: environment.googleClientId
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      request: {}
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    onSuccess(googleUser) {
      const token = googleUser.getAuthResponse().id_token;
      axios.get(Link.methods.getAuthGoogleUrl(token)).then((response) => {
        window.localStorage.setItem('accessToken', `Bearer ` + response.data.accessToken);
        window.localStorage.setItem('refreshToken', response.data.refreshToken);
        window.localStorage.setItem('userId', response.data.userId);
        window.localStorage.setItem('userName', response.data.firstName);
        if (Link.methods.checkTokenExp()) {
          this.$router.push('/hotelsBoard')
        }
      })
    },

    onFailure (error) {
      console.log(error)
      this.createToast(error, "error");
    },

    showPassword() {
      let raw = document.getElementById("password");
      if (raw.type === "password") {
        raw.type = "text";
      } else {
        raw.type = "password";
      }
    },
    sendTokenRequest() {
      axios.post(Link.methods.getAuthenticationUrl(), this.request).then((res) => {
        window.localStorage.setItem('accessToken', `Bearer ` + res.data.accessToken);
        window.localStorage.setItem('refreshToken', res.data.refreshToken);
        window.localStorage.setItem('userId', res.data.userId);
        window.localStorage.setItem('userName', res.data.firstName);
        if (Link.methods.checkTokenExp()) {
          this.$router.push('/hotelsBoard')
        }
      }).catch(() => {
        this.createToast("Fields are filled incorrectly", "error");
      });
    },
    createToast(msg, type) {
      Vue.use(VueToast);
      Vue.$toast.open({
        type: type,
        message: msg,
        position: "bottom-right",
        duration: 5000
      });
    },
  },
}
</script>
<style>
#sign-in, #sign-up {
  box-sizing: revert;
  align-items: center;
  border: 1px;

  width: 120px;
  height: 43px;

  background: linear-gradient(180deg, #1b63e0 23.44%, #405880 100%);
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgb(27, 99, 224);
}
</style>
