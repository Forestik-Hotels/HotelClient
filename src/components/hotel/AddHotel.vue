<template>
  <div class="container">
    <form autocomplete="off">
      <h3>{{$t("addManufacturer.newWikiSteger")}}</h3>
      <div class="input-field col">
        <i class="fa fa-suitcase prefix"></i>
        <input id="name" type="text" v-model="manufacturer.name">
        <label for="name" class="active">{{$t("addManufacturer.wikiSteger")}}</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-building prefix"></i>
        <input id="firmName" type="text" v-model="manufacturer.firmName">
        <label for="firmName" class="active">{{$t("addManufacturer.firmName")}}</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-map-marker prefix"></i>
        <input id="address" type="text" v-model="manufacturer.address">
        <label for="address" class="active">{{$t("addManufacturer.address")}}</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-phone prefix"></i>
        <input id="phone" type="text" v-model="manufacturer.phone">
        <label for="phone" class="active">{{$t("addManufacturer.phone")}}</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-envelope prefix"></i>
        <input id="email" type="text" v-model="manufacturer.email">
        <label for="email" class="active">{{$t("addManufacturer.email")}}</label>
      </div>
      <p></p>
      <div id="controller">
        <button v-on:click="createManufacture" type="button" id="create" class="btn waves-effect waves-light">
          {{$t("addManufacturer.create")}}<i class="fa fa-pencil right"></i></button>
      </div>
    </form>
  </div>
</template>

<script>

import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css';
import Link from "../utills/Link";

export default {

  data() {
    let data = {
      manufacturer: {}
    };

    return data;
  },

  methods: {
    createManufacture() {
      const headers = Link.methods.getHeaders();

      new Promise((resolve) => {
        axios.post(Link.methods.getManufacturesCreateUrl(), this.manufacturer, {headers}).then(() => {
          this.createToast(this.manufacturer.name + this.$t("addManufacturer.createToast"))
          resolve();
        });
      }).then(() => {
        if(!window.localStorage.getItem("savedItem"))
          return this.$router.push({name: 'wikiStegers'});
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
@import '../../../public/materialize-src/sass/materialize.scss';
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
  height: 40px;
  align-items: center;
  border: 1px;

  background: $second-color;
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
}

.container {
  width: 300px;
}
</style>