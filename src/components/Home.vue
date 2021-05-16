<template>
  <div>
    <nav class="navbar  rounded justify-content-between flex-nowrap flex-row fixed-top" style="left: 75%">
      <div v-if="isLogin()" class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <a type="button" class="font2 navbar-brand float-left"  id="back-button" @click="goToAuthorization">
            <label id="back" for="back-button">Sign In</label>
          </a>
          <a type="button" class="position font2 navbar-brand float-left" id="sign-up" @click="goToRegistration">
            <label id="signUp" for="sign-up">Sign Up</label>
          </a>
        </ul>
      </div>
<!--      <div v-else class="container">-->
<!--        <ul class="nav navbar-nav flex-row float-right">-->
<!--          <button type="button" class="position btn bg-white btn-lg" id="log-out" @click="logout">-->
<!--            <label id="logout" for="log-out">Logout</label>-->
<!--          </button>-->
<!--        </ul>-->
<!--      </div>-->
    </nav>
  </div>
</template>


<script>
import Link from "./Link";
export default {
  name: "Home",
  methods: {
    goToAuthorization() {
      this.$router.push('/authorization')
    },
    goToRegistration() {
      this.$router.push('/registration')
    },
    isLogin(){
      return !Link.methods.checkTokenExp();
    },
    logout() {
      Link.methods.logout();
    },
  }
}
</script>

<style scoped>

</style>