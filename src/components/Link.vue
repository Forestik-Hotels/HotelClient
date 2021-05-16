<script>
export default {
  methods: {
    checkTokenExp() {
      if (!this.getToken()) {
        return false;
      } else if (Math.trunc(Date.now() / 1000) > this.parseJwt(this.getToken()).exp) {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('id');
        this.checkAuthorized()
        this.createToast("Your token is invalid", "error")
        return false;
      } else {
        return true;
      }
    },

    logout() {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('id');
    },
    parseJwt(token) {
      var base64 = token.split('.')[1];
      return this.createJson(base64);
    },
    createJson(base64Url) {
      return JSON.parse(atob(base64Url));
    },

    getToken() {
      return window.localStorage.getItem('accessToken');
    },

    getUrl() {
      return "http://localhost:8070";
    },

    getAuthenticationUrl() {
      return this.getUrl() + "/ownSecurity/signIn";
    },

    getVerificationUrl() {
      return this.getUrl() + "/ownSecurity/verifyEmail";
    },

    getUsersCreateUrl() {
      return this.getUrl() + "/ownSecurity/signUp";
    },

    getHotelsUrl() {
      return this.getUrl() + "/hotel";
    },

    getHeaders() {
      return {'Authorization': this.getToken()}
    }

  }
}
</script>