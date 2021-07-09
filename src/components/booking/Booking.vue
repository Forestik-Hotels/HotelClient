<template>
  <div class="container">
    <form autocomplete="off">
      <h3>Booking</h3>
      <div class="input-field col">
        <i class="fa fa-calendar prefix"></i>
        <input type="date" id="start" name="trip-start"
               value="2021-01-01"
               min="2021-01-01" max="2050-12-31" v-model="booking.dateFrom">
        <label for="start" class="active">Date from</label>
      </div>
      <div class="input-field col">
        <i class="fa fa-calendar prefix"></i>
        <input type="date" id="end" name="trip-start"
               value="2021-01-01"
               min="2021-01-01" max="2050-12-31" v-model="booking.dateTo">
        <label for="end" class="active">Date to</label>
      </div>
      <div id="controller">
        <button v-on:click="bookRoom()" type="button" id="create" class="btn btn-primary btn-lg">
          Booking<i class="fa fa-pencil right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import Link from "../navigation/Link";
export default {
  name: "Booking",
  data() {
    return {
      booking: {
        type: Object,
        required: true
      },
      request: {}
    }
  },
  methods: {
    bookRoom(){
      const headers = Link.methods.getHeaders();
      this.booking.roomId=this.$route.params.id
      new Promise((resolve) => {
        axios.post(Link.methods.getBookingUrl(), this.booking, {headers}).then(() => {
          this.createToast( "Room was booked")
          resolve();
        });
      }).then(() => {
        return this.$router.push("/bookingList");
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

<style>

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