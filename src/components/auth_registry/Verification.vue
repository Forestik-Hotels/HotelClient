<template>
  <div class="form-container">
    <form>
      <div class="controllers">
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


export default {
  name: "Verification",
  data() {
    this.getVerify();
  },
  mounted(){
    window.scrollTo(0, 0)
  },
  methods: {
    getVerify() {
      const token = this.$route.query.token;
      const userId = this.$route.query.user_id;
      axios.get(Link.methods.getVerificationUrl()+`?token=${token}&user_id=${userId}`, this.request).then((res) => {
        if(res.data===true){
          this.createToast("User verified", "success")
        }
        else
          this.createToast("Token expired", "error")
        this.goToAuthorization();
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
    },
  },
}
</script>

<!--<style scoped lang="scss">-->
<!--@import '../../public/materialize-src/sass/materialize.scss';-->
<!--@import '../../public/styles/authorization_register.scss';-->
<!--</style>-->