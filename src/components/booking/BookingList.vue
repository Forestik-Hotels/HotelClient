<template>
  <div>
    <div>
      <Header @search="search"
              v-bind:table="table"
              v-bind:hidePanel="hidePanel"/>
    </div>
    <div class="board">
      <BookingCard
          v-for="booking of changedBooking" :key="booking.id"
          v-bind:booking="booking"
      />
    </div>
  </div>
</template>

<script>
import BookingCard from "./BookingCard";
import Link from "../navigation/Link";
import Header from "../hotel/Header";
import axios from "axios";
export default {
  name: "BookingList",
  components: {BookingCard},
  comments: {
    BookingCard,
    Header
  },
  computed: {
    changedBooking: function () {
      return this.data.booking.filter(x => this.lastQuery(x, this.isInclude))
    }
  },
  mounted() {
    this.$emit("changeComponent", "Booking");
  },
  data() {
    let data = {
      booking: []
    }
    this.getBooking().then(d => {
      data.booking = d
    })
    return {
      data,
      table: "Booking",
      array: [],
      hidePanel: true,
      lastQuery: (x) => x
    };
  },
  methods: {
    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },
    getBooking() {
      if(this.isRoleAdmin()){
        const headers = Link.methods.getHeaders();
        return axios.get(Link.methods.getBookingUrlAll(), {headers})
            .then(res => {
              return res.data;
            });
      }
      else {
        const headers = Link.methods.getHeaders();
        return axios.get(Link.methods.getBookingUrl(), {headers})
            .then(res => {
              return res.data;
            });
      }
    },
    search(qsearch) {
      this.lastQuery = qsearch;
    },
    isInclude(booking, query) {
      if (this.fieldContain(query, booking.dateFrom))
        return true;
      else if (this.fieldContain(query, booking.dateTo))
        return true;
      else if (this.fieldContain(query, booking.confirmed))
        return true;
    },
    fieldContain(query, field) {
      if (field === null)
        return false;
      return field.toLowerCase().indexOf(query) !== -1;
    },
  }
}
</script>

<style scoped lang="scss">
.board {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 80vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.board::-webkit-scrollbar{
  display: none;
}
#board {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>