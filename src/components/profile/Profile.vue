<template>
  <div class="center">
    <div class="content">
      <div class="body">
        <form>
          <div class="imageDiv">
            <img :src="user.profilePicturePath" class="imgTd" alt="Profile picture">
          </div>
          <div class="input-field col-3">
            <input id="count" type="text" class="box" disabled v-model="user.firstName">
            <label for="count" class="active box"> First Name</label>
          </div>
          <div class="input-field col-3">
            <input id="phone" type="text" class="box" disabled v-model="user.lastName">
            <label for="phone" class="active box"> Last Name</label>
          </div>
          <div class="input-field col-3">
            <input id="email" type="text" class="box" disabled v-model="user.email">
            <label for="email" class="active box"> Email</label>
          </div>
          <div class="input-field col-3">
            <input id="phoneNumber" type="text" class="box" v-model="user.phoneNumber">
            <label for="phoneNumber" class="active box"> Phone</label>
          </div>
          <div class="input-field col-3">
            <input id="role" type="text" class="box" disabled v-model="user.role">
            <label for="role" class="active"> Role</label>
          </div>
          <div class="input-field col-3">
            <input id="dateOfRegistration" type="text" class="box" disabled v-model="user.dateOfRegistration">
            <label for="dateOfRegistration" class="active box"> Date Of Registration</label>
          </div>
          <div>
            <button type="button" class="btn btn-primary btn-lg" @click="saveUserInfo">
              <label>Save</label>
            </button>
            <button type="button" class="btn btn-primary btn-lg" style=" position: relative; left: 20px"
                    @click="goToBooking">
              <label>Booking</label>
            </button>
            <button type="button" class="btn btn-primary btn-lg" style=" position: relative; left: 40px"
                    @click="goToPayment">
              <label>Payment</label>
            </button>
          </div>
          <div>
          </div>
          <div>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Link from "../navigation/Link";
import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";

export default {
  name: "Profile",

  data() {
    let data = {
      user: {}
    };
    this.getProfilePicture(this.id).then(d => {
      data.user = d.data
    });

    return data;
  },

  created() {
    window.addEventListener("scroll", this.scrolling);
    window.addEventListener('resize', this.windowResize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrolling);
    window.addEventListener('resize', this.windowResize);
  },

  methods: {
    getProfilePicture() {
      const headers = Link.methods.getHeaders();
      const id = window.localStorage.getItem('userId');
      return axios.get(Link.methods.getUserData(id), {headers}).then((res) => {
        this.user = res.data;
        return res;
      });
    },

    saveUserInfo() {
      const headers = Link.methods.getHeaders();
      return axios.patch(Link.methods.getUserDataUpdate(), this.user, {headers}).then(() => {
        this.createToast("User.vue data changed")
      });
    },

    goToBooking() {
      this.$router.push('/bookingList')
    },

    goToPayment() {
      this.$router.push('/payment')
    },

    createToast(msg) {
      Vue.use(VueToast);
      Vue.$toast.open({
        type: "success",
        message: msg,
        position: "bottom-right",
        duration: 5000
      });
    }
  }
}
</script>

<style scoped lang="scss">
div.input-field {
  padding: 5px;
}

input.box {
  height: 35px;
  width: 270px;
}

label.box {
  height: 5px;
  width: 270px;
}

.body {
  display: flex;
  position: relative;
  top: 30px;
  //display: inline-block;
  border-radius: 15px;
  background-color: rgba(77, 77, 77, 0.03);
  padding: 5px;
  min-height: 590px;
  max-height: 1800px;
  min-width: 350px;
  max-width: 1870px;
}


.imgTd {
  text-align: left;
  width: 50%;
  height: 50%;
}


.center {
  margin: auto;
  width: 30%;
}

</style>