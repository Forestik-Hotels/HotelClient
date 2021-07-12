<template>
  <div class="form-container center" @keyup.enter="sendCreateRequest">
    <form autocomplete="off">
      <div class="input-field col">
        <em class="fa fa-user-o prefix"></em>
        <input id="first-name" class="form-control form-control-lg" type="text" v-model="request.firstName">
        <label for="first-name" class="active">First name</label>
      </div>
      <div class="input-field col">
        <em class="fa fa-user-o prefix"></em>
        <input id="last-name" class="form-control form-control-lg" type="text" v-model="request.lastName">
        <label for="last-name" class="active">Last name</label>
      </div>
      <div class="input-field col">
        <em class="fa fa-envelope prefix"></em>
        <input id="email" class="form-control form-control-lg" type="text" v-model="request.email">
        <label for="email" class="active">Email</label>
      </div>
      <div class="input-field col">
        <em class="fa fa-lock prefix"></em>
        <input id="password" class="form-control form-control-lg" type="password" v-model="request.password">
        <label for="password" class="active">Password <em class="fa fa-eye right" @click="showPassword"></em></label>
      </div>
      <div class="controllers">
        <button type="button"  class="btn btn-primary btn-lg" id="back-btn" @click="goToAuthorization">
          <label id="back" for="back-btn">Sing In</label>
        </button>
        <button type="button" class="btn position btn-primary btn-lg" id="sign-up-register" @click="sendCreateRequest">
          <label id="signUp" for="sign-up-register">Sign Up</label>
        </button>
        <GoogleLogin style=" position: relative; top: 20px"
                     :params="params"
                     :renderParams="renderParams"
                     :onSuccess="onSuccess"
                     :onFailure="onFailure">
        </GoogleLogin>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css';
import Link from "../navigation/Link";
import GoogleLogin from 'vue-google-login';
import {environment} from "../../../environment/environment";

export default {
  name: "registration",
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
  mounted(){
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
      // `error` contains any error occurred.
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
    sendCreateRequest() {
      const headers = Link.methods.getHeaders();
      axios.post(Link.methods.getUsersCreateUrl(), this.request, {headers}).then(() => {
        this.createToast("User created. Please check your email address to verify your identity", "success")
        this.goToAuthorization();
      }).catch(() => {
        this.createToast("Fields are filled incorrectly", "error");
      });
    },
    goToAuthorization() {
      this.$router.push('/authorization')
    },
    createToast(msg, type) {
      Vue.use(VueToast);
      Vue.$toast.open({
        type: type,
        message: msg,
        position: "bottom-right",
        duration: 5000
      });
    }
  }
}
</script>

<style>

#back-btn, #sign-up-register {
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