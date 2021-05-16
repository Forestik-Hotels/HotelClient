<template>
  <div class="form-container" @keyup.enter="sendCreateRequest">
    <form autocomplete="off">
      <div class="input-field col">
        <i class="fa fa-user-o prefix"></i>
        <input id="first-name" class="form-control form-control-lg" type="text" v-model="request.firstName">
        <label for="first-name" class="active">First name</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-user-o prefix"></i>
        <input id="last-name" class="form-control form-control-lg" type="text" v-model="request.lastName">
        <label for="last-name" class="active">Last name</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-envelope prefix"></i>
        <input id="email" class="form-control form-control-lg" type="text" v-model="request.email">
        <label for="email" class="active">Email</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-lock prefix"></i>
        <input id="password" class="form-control form-control-lg" type="password" v-model="request.password">
        <label for="password" class="active">Password <i class="fa fa-eye right" @click="showPassword"></i></label>
      </div>
      <div class="controllers">
        <button type="button" class="btn btn-primary btn-lg" id="back-button" @click="goToAuthorization">
<!--          <i class="fa fa-check right"></i>-->
          <label id="back" for="back">Sing In</label>
        </button>
        <button type="button" class="btn position btn-primary btn-lg" id="sign-up-register" @click="sendCreateRequest">
<!--          <i class="fa fa-pencil right"></i>-->
          <label id="signUp" for="sign-up-register">Sign Up</label>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css';
import Link from "./Link";

export default {
  name: "registration",
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
    sendCreateRequest() {
      const headers = Link.methods.getHeaders();
      axios.post(Link.methods.getUsersCreateUrl(), this.request, {headers}).then(() => {
        this.createToast("User created", "success")
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

<!--<style scoped lang="scss">-->
<!--@import '../../public/materialize-src/sass/materialize.scss';-->
<!--@import '../../public/styles/authorization_register.scss';-->
<!--</style>-->