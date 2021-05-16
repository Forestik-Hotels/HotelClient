<template>
  <div class="vue-tempalte">
    <div class="content">
      <form autocomplete="off" @keyup.enter="sendTokenRequest">
        <h3>Sign In</h3>
        <div class="form-group">
          <i class="fa fa-user-circle-o prefix"></i>
          <input id="email" class="form-control form-control-lg" type="text" v-model="request.email">
          <label for="email" class="active">Email</label>
        </div>
        <div class="form-group" onfocus="">
          <i class="fa fa-lock prefix"></i>
          <input id="password" class="form-control form-control-lg" type="password" v-model="request.password">
          <label for="password" class="active">Password
            <i class="fa fa-eye right" @click=showPassword></i>
          </label>
        </div>
        <div class="controllers">
          <button type="button" class="btn btn-primary btn-lg" id="sign-in" @click="sendTokenRequest">
            <label id="signIn" for="sign-in">Sign In</label>
          </button>
          <router-link to="/registration">
          <button type="button" class="position btn btn-primary btn-lg" id="sign-up">
            <label id="signUp" for="sign-up">Sign Up</label>
          </button>
          </router-link >
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
import Link from "./Link";
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: "Authorization",
  data() {
    return {
      request: {}
    }
  },
  mounted(){
    window.scrollTo(0, 0)
  },
  methods: {
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
        console.log(res);
        window.localStorage.setItem('accessToken', `Bearer_` + res.data.accessToken);
        window.localStorage.setItem('refreshToken', res.data.refreshToken);
        window.localStorage.setItem('userId', res.data.userId);
        window.localStorage.setItem('userName', res.data.firstName);
        if(Link.methods.checkTokenExp()){
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
/*@import '../assets/css/main.css';*/
</style>
<!--<style scoped lang="scss">-->
<!--@import '../../public/materialize-src/sass/materialize.scss';-->
<!--@import '../../public/styles/authorization_register.scss';-->
<!--</style>-->