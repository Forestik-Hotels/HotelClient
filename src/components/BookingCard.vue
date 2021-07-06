<template>
  <div class="card notSelected" @dblclick="singleBooking(booking.id)">
    <span class="head">{{ booking.room.hotel.name }} {{ booking.room.type }} </span>
    <table>
      <tr v-if="booking.fa-calendar!==null && booking.dateFrom!==''">
        <td><i class="fa fa-calendar"></i></td>
        <td class="info">{{ moment(booking.dateFrom).format('DD/MM/YYYY HH:MM') }}</td>
        <td class="imgTd" rowspan="4">
          <!--          <img src="../../../public/hotel.png" style="width: 100px; height: 100px">-->
        </td>
      </tr>
      <tr v-if="booking.dateTo!==null && booking.dateTo!==''">
        <td><i class="fa fa-calendar"></i></td>
        <td class="info">{{ moment(booking.dateTo).format('DD/MM/YYYY HH:MM') }}</td>
      </tr>
      <tr v-if="booking.confirmed===false">
        <td><i class="fa fa-user-times"></i></td>
        <td class="info">Waiting</td>
      </tr>
      <tr v-if="booking.confirmed===true">
        <td><i class="fa fa-arrows-alt"></i></td>
        <td class="info">Confirmed</td>
      </tr>
      <tr v-if="booking.confirmed===false && booking.room.roomStatus==='FREE'">
        <td><i class="fa fa-arrows-alt"></i></td>
        <td class="info">Rejected</td>
      </tr>

      <tr v-if="booking.admin!==null && booking.admin!==''">
        <td><i class="fa fa-envelope"></i></td>
        <td class="info"> {{ booking.admin.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "BookingCard",
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: false
    }
  },
  methods: {
    moment,
    singleBooking: function (bookingId) {
      window.scrollTo(0, 0);
      this.$router.push('/roombooking/' + bookingId + "/?roomId= " + this.booking.room.id);
    },
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/HotelCard";

.imgTd {
  width: 100px;
  text-align: left;
}
</style>