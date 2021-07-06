<template>
  <div class="container">
    <form autocomplete="off">
      <h3>Add new hotel</h3>
      <div class="input-field col">
        <i class="fa fa-suitcase prefix"></i>
        <input id="name" class="form-control form-control-lg" type="text" v-model="hotel.name" >
        <label for="name" class="active">Name</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-map-marker prefix"></i>
        <input id="address" class="form-control form-control-lg" type="text" v-model="hotel.address">
        <label for="address" class="active">Address</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-phone prefix"></i>
        <input id="phone" class="form-control form-control-lg" type="text" v-model="hotel.phone">
        <label for="phone" class="active">Phone</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-envelope prefix"></i>
        <input id="email" class="form-control form-control-lg" type="text" v-model="hotel.email">
        <label for="email" class="active">Email</label>
      </div>
      <p></p>
      <div id="controller">
        <button v-on:click="createHotel" type="button" id="create" class="btn btn-primary btn-lg">
          Create<i class="fa fa-pencil right"></i>
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
import Link from "../Link";

export default {

  data() {
    let data = {
      hotel: {}
    };

    return data;
  },

  methods: {
    createHotel() {
      const headers = Link.methods.getHeaders();

      new Promise((resolve) => {
        axios.post(Link.methods.getHotelsCreateUrl(), this.hotel, {headers}).then(() => {
          this.createToast(this.hotel.name + " create")
          resolve();
        });
      }).then(() => {
        if(!window.localStorage.getItem("savedItem"))
          return this.$router.push("/hotelsBoard");
        else return this.$router.push({name: 'addArticle'});
      })
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
//@import '../../../public/materialize-src/sass/materialize.scss';
@import "public/styles/vars.scss";

div {
}

input {

}

#controller {
  text-align-last: center;
}

#create {
  width: 100%;
  box-sizing: revert;
  height: 43px;
  align-items: center;
  border: 1px;

  background: linear-gradient(180deg, #1b63e0 23.44%, #405880 100%);
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgb(27, 99, 224);
}

.container {
  width: 400px;
}
</style>