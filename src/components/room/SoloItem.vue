<template>
  <tr>
    <td style="text-alighn: center" v-if="isRoleAdmin()" class="checkboxTd">
      <input id="checkbox" class="checkbox" type="checkbox" @change="countEvent()" ref="checkbox"
             :disabled="item.status === 'DELETED'">
    </td>
    <td style="text-alighn: center" v-if="isRoleAdmin()" class="idTd" @click="goToSingleArticle(item.id)">{{ item.id }}</td>
    <td style="text-alighn: center" class="name" @click="goToSingleArticle(item.id)">{{ item.name }}</td>
    <td style="text-alighn: center" class="pricePerDay" @click="goToSingleArticle(item.id)" colspan="">{{ item.pricePerDay }}</td>
    <td style="text-alighn: center" class="roomStatus" @click="goToSingleArticle(item.id)" colspan="">{{ item.roomStatus }}</td>
    <td style="text-alighn: center" class="type" @click="goToSingleArticle(item.id)" colspan="">{{ item.type }}</td>

    <td style="text-alighn: center" class="dataTd" @dblclick="goToSingleArticle(item.id)">{{ moment(item.updated).format('MM/DD/YYYY hh:mm') }}</td>
    <td style="text-alighn: center" v-if="isRoleAdmin()" class="type">
      <button @click="goToBooking(item.id)" class="btn waves-effect waves-light" type="button" id="delete">
        Delete
        <em class="fa fa-bookmark right"></em>
      </button>
    </td>
    <td style="text-alighn: center" v-if="!isRoleAdmin()" class="type">
      <button @click="goToBooking(item.id)" class="btn waves-effect waves-light" type="button" id="booking">
        Booking
        <em class="fa fa-bookmark right"></em>
      </button>
    </td>
    <td style="text-alighn: center" class="type">
      <button @click="goToRoom(item.id)" class="btn light" type="button" id="room">
        Room
        <em class="fa fa-hotel right"></em>
      </button>
    </td>
  </tr>
</template>

<script>

import moment from 'moment';
import SideBarMenu from "../navigation/SideBarMenu";
import Link from "../navigation/Link";
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
  },

  computed: {
    calculate (){
      return this.getCoordinates;
    }
  },

  data() {
    return {
      hover: false,
      left : 0,
      top : 0
    };
  },
  methods: {
    getCoordinates() {
      this.hover = true;
      this.left = this.$refs.onHover.getBoundingClientRect().left + 35 + 'px';
      this.top = this.$refs.onHover.getBoundingClientRect().top + 'px';
      let style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      document.head.appendChild(style);
      let sheet = style.sheet;
      sheet.insertRule(
          '@keyframes scale{ ' +
          'from {' +
          'top: ' + this.top + ';' +
          'left: ' + this.left + ';' +
          'transform: scale(1.0);' +
          '}' +
          'to { ' +
          'top: 50%;' +
          'left:' + this.left + ';' +
          'transform:scale(6.0);' +
          '}' +
          '}'
      );
    },
    displayStatus() {
      return SideBarMenu.methods.isRoleAdmin();
    },
    goToSingleArticle(id) {
      if(this.item.status !== 'DELETED')
        this.$router.push({name: 'articleById', params: { "id": id.toString()} });
    },
    moment,

    ifBooking() {
      !this.isRoleAdmin()
      return (this.item.roomStatus!=='BOOKING' && this.item.roomStatus!=='RESERVED' && this.item.roomStatus!=='INHABITED') || this.isRoleAdmin()
    },

    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },

    countEvent() {
      this.$emit('addRaw')
    },

    goToBooking: function (id) {
      window.scrollTo(0,0);
      this.$router.push('/booking/' + id);
    },

    goToRoom: function (id) {
      console.log(id);
      window.scrollTo(0,0);
      this.$router.push('/room/' + id + "?id=" + this.$route.params.id);
    }
  }
}

</script>

<style scoped lang="scss">
@import "../../assets/scss/tables";

.imageThTd:hover {
  background: radial-gradient(rgba(0, 0, 0, 0.1), transparent);
  .backgroundDiv{
    display: block;
  }
  .imageDiv {
    pointer-events: none;
    animation: scale 250ms ease-in-out forwards;
    display: block;
    position: fixed;
    background: whitesmoke;

    border-radius: 2px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.8);
  }
}

#booking, #room, #delete {
  width: 100%;
  box-sizing: revert;
  height: 43px;
  align-items: center;
  border: 1px;

  background: linear-gradient(180deg, #1b63e0 23.44%, #405880 100%);
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgb(27, 99, 224);
}

</style>