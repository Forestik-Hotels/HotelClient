<template>
  <div class="card notSelected" @click="singleHotel(hotel.id)">
    <span class="head">{{hotel.name}}</span>
    <table>
      <tr class="email" v-if="hotel.email!==null && hotel.email!==''">
        <td><i class="fa fa-envelope"></i></td>
        <td>{{hotel.email}}</td>
      </tr>
      <tr v-if="hotel.address!==null && hotel.address!==''">
        <td><i class="fa fa-map-marker"></i></td>
        <td class="info">{{hotel.address}}</td>
      </tr>
      <tr v-if="hotel.phone!==null && hotel.phone!==''">
        <td><i class="fa fa-phone"></i></td>
        <td class="info">{{hotel.phone}}</td>
      </tr>
      <tr v-if="hotel.count!==null && hotel.count!==''">
        <td><i class="fa fa-hotel"></i></td>
        <td class="info"> {{hotel.count}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "HotelCard",
    props: {
      hotel: {
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
      singleHotel: function (id) {
        window.scrollTo(0,0);
        this.$router.push({name: 'wikiStegerById', params:{"id": id.toString()}});
      },
    }
  }
</script>

<style scoped lang="scss">
  //@import "../../../public/styles/HotelCard";
</style>