<template>
  <div>
    <div>
      <Header @search="search"
              v-bind:table="table"
              v-bind:hidePanel="hidePanel"/>
    </div>
    <div class="board">
      <hotelCard
          v-for="hotel of changedHotel" :key="hotel.id"
          v-bind:hotel="hotel"
      />
    </div>
  </div>
</template>

<script>
  import hotelCard from "./HotelCard";
  import Link from "../navigation/Link";
  import Header from "./Header";
  import axios from "axios";

  export default {
    name: "HotelsBoard",
    components: {
      hotelCard,
      Header
    },
    computed: {
      changedHotel: function () {
        return this.data.hotel.filter(x => this.lastQuery(x, this.isInclude))
      }
    },
    mounted() {
      this.$emit("changeComponent", "Hotel");
    },
    data() {
      let data = {
        hotel: []
      }
      this.getHotel().then(d => {
        data.hotel = d
      })
      return {
        data,
        table: "Hotel",
        array: [],
        hidePanel: true,
        lastQuery: (x) => x
      };
    },
    methods: {
      getHotel() {
        const headers = Link.methods.getHeaders();
        return axios.get(Link.methods.getHotelsUrl(), {headers})
            .then(res => {
              return res.data;
            });
      },
      search(qsearch) {
        this.lastQuery = qsearch;
      },
      isInclude(hotel, query) {
        if (this.fieldContain(query, hotel.name))
          return true;
        else if (this.fieldContain(query, hotel.email))
          return true;
        else if (this.fieldContain(query, hotel.address))
          return true;
        else if (this.fieldContain(query, hotel.phone))
          return true;
        else return this.fieldContain(query, hotel.count);
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