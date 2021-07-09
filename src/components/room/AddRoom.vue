<template>
  <div class="container">
    <form autocomplete="off">
      <h3>Add new room</h3>
      <div class="input-field col">
        <em class="fa fa-suitcase prefix"></em>
        <input id="name" class="form-control form-control-lg" type="text" v-model="room.name" >
        <label for="name" class="active">Name</label>
      </div>
      <div class="input-field col">
        <em class="fa fa-map-marker prefix"></em>
        <input id="address" class="form-control form-control-lg" type="text" v-model="room.pricePerDay">
        <label for="address" class="active">Price per day
        </label>
      </div>
      <div class="input-field col">
        <em class="fa fa-phone prefix"></em>
        <select id="phone" class="form-control form-control-lg" type="checkbox" v-model="room.roomStatus">
          <option disabled value="">Room status</option>
          <option>FREE</option>
          <option>RESERVED</option>
          <option>INHABITED</option>
          <option>BOOKING</option>
        </select>
      </div>
      <div class="input-field col">
        <em class="fa fa-envelope prefix"></em>
        <select id="email" class="form-control form-control-lg" type="text" v-model="room.type">
          <option disabled value="">Room type</option>
          <option>LUX</option>
          <option>STANDARD</option>
          <option>ECONOM</option>
        <label for="email" class="active">Type</label>
        </select>
      </div>
      <p></p>
      <div id="controller">
        <button v-on:click="createRoom()" type="button" id="create" class="btn btn-primary btn-lg">
          Create<i class="fa fa-pencil right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css';
import axios from "axios";
import Link from "../navigation/Link";

export default {
  name: "AddRoom",
  props: {
    hotel: {}
  },
  data() {
    return {
      room: {},
    };
  },
  methods: {

    createRoom() {
      const headers = Link.methods.getHeaders();

      switch (this.room.type) {
        case ("LUX"):
          this.room.type=0;
          break;
        case ("STANDARD"):
          this.room.type=1;
          break;
        case("ECONOM"):
          this.room.type=2;
      }
      switch (this.room.roomStatus) {
        case ("FREE"):
          this.room.roomStatus=0;
          break
        case ("RESERVED"):
          this.room.roomStatus=1;
          break
        case("INHABITED"):
          this.room.roomStatus=2;
          break
        case("BOOKING"):
          this.room.roomStatus=3;
      }
      this.room.hotelName=this.$route.query.hotelName;
      new Promise((resolve) => {
        axios.post(Link.methods.getRoomCreateUrl(), this.room, {headers}).then(() => {
          this.createToast(this.room.name + " create")
          resolve();
        });
      }).then(() => {
        if(!window.localStorage.getItem("savedItem"))
          return this.$router.push("/hotel/"+ this.$route.query.id);
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

<style  scoped lang="scss">
@import "../../../public/styles/vars";

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