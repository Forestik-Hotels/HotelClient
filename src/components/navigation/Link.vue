<script>
import {environment} from "../../../environment/environment";

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
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('userName');
      if(window.localStorage.getItem('googleAuth')==='true'){
        window.gapi.auth2.getAuthInstance().signOut();
        window.localStorage.removeItem('googleAuth');
      }
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
      return environment.backendLink;
    },

    getAuthGoogleUrl(id) {
      return this.getUrl() + "/googleSecurity/" + id;
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

    getHotelById(id) {
      return this.getUrl() + "/hotel/" + id;
    },

    getHotelUpdate() {
      return this.getUrl() + "/hotel";
    },

    getRoomUpdate(id) {
      return this.getUrl() + "/room/" + id;
    },

    getHotelsCreateUrl() {
      return this.getUrl() + "/hotel";
    },

    getRoomCreateUrl() {
      return this.getUrl() + "/room";
    },

    getHotelDeleteUrl(id) {
      return this.getUrl() + "/hotel" + id;
    },

    getRoomDeleteUrl(id) {
      return this.getUrl() + "/room" + id;
    },

    getRoomsByHotel(id) {
      return this.getUrl() + "/room/hotel/" + id;
    },

    getRoomsById(id) {
      return this.getUrl() + "/room/" + id;
    },

    getBookingById(id) {
      return this.getUrl() + "/booking/" + id;
    },

    getConfirmById(id) {
      return this.getUrl() + "/booking/confirm/" + id;
    },

    getRejectById(id) {
      return this.getUrl() + "/booking/reject/" + id;
    },

    getCancelById(id) {
      return this.getUrl() + "/booking/cancel/" + id;
    },

    getBookingUrl() {
      return this.getUrl() + "/booking";
    },

    getBookingUrlAll() {
      return this.getUrl() + "/booking/all";
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