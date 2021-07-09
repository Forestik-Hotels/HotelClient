<template>
  <div class="box">
    <div id="manufacturerCard">
      <div class="container">
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="name" type="text" class="changeable" disabled v-model="room.name">
              <label for="name" class="active">Name</label>
            </div>
            <div class="input-field col">
              <input id="address" type="text" class="changeable" disabled v-model="room.pricePerDay">
              <label for="address" class="active">Price per day</label>
            </div>
            <div v-if="isRoleAdmin()">
              <button @click="confirm()" class="btn light" type="button" id="confirm">
                Confirm
                <em class="fa fa-check right"></em>
              </button>
            </div>
            <div v-else>
              <button @click="сancel()" class="btn light" type="button" id="сancel">
                Cancel
                <em class="fa fa-check right"></em>
              </button>
            </div>
          </form>
        </div>
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="count" type="text" class="changeable" disabled v-model="room.roomStatus">
              <label for="count" class="active">Room status</label>
            </div>
            <div class="input-field col">
              <input id="phone" type="text" class="changeable" disabled v-model="room.type">
              <label for="phone" class="active">Type</label>
            </div>
            <div v-if="isRoleAdmin()">
              <button @click="reject()" class="btn light" type="button" id="new-room">
                Reject
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <form autocomplete="off">
      <div class="container" style="position: relative; width: 100%; padding: 10px; left: 40px">
      <div class="input-field col">
        <em class="fa fa-calendar prefix"></em>
        <input id="dateFrom" type="text" class="changeable" disabled v-model="booking.dateFrom">
        <label for="count" class="active">Date from</label>
      </div>
      <div class="input-field col">
        <em class="fa fa-calendar prefix"></em>
        <input id="dateTo" type="text" class="changeable" disabled v-model="booking.dateTo">
        <label for="phone" class="active">Date to</label>
      </div>
      <div class="input-field col">
        <input id="boolean" type="text" class="changeable" disabled v-model="booking.confirmed">
        <label  for="phone" class="active">Confirmed</label>
      </div>
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
  name: "RoomBooking",
  data() {
    return {
      room: {
        type: Object,
        required: true
      },
      booking: {
        type: Object,
        required: true
      },
    };
  },
  beforeMount() {
    this.getRoomsById();
    this.getBookingById();
  },
  methods: {
    getRoomsById() {
      const headers = Link.methods.getHeaders();
      axios.get(Link.methods.getRoomsById(this.$route.query.roomId), {headers})
          .then(res => {
            this.room = res.data;
          });
    },
    getBookingById() {
      const headers = Link.methods.getHeaders();
      axios.get(Link.methods.getBookingById(this.$route.params.id), {headers})
          .then(res => {
            this.booking = res.data;
          });
    },
    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },
    backToBookingList() {
      return this.$router.push("/bookingList");
    },
    deleteRoom() {
      this.$confirm(
          {
            message: "Do you want to delete a room " + this.room.name + "?",
            button: {
              no: 'No',
              yes: 'Yes'
            },
            callback: confirm => {
              if (confirm) {
                let headers = Link.methods.getHeaders();
                axios.delete(Link.methods.getRoomDeleteUrl(this.id), {headers});
                this.backToBookingList();
              }
            }
          }
      )
    },
    confirm() {
      const headers = Link.methods.getHeaders();
      new Promise((resolve) => {
        axios.post(Link.methods.getConfirmById(this.$route.params.id), null,{headers})
            .then(res => {
              this.booking.confirmed = res.data;
              this.createToast("Booking was confirmed")
              resolve();
            });
      }).then(() => {
        this.backToBookingList();
      })
    },

    reject() {
      const headers = Link.methods.getHeaders();
      new Promise((resolve) => {
        axios.post(Link.methods.getRejectById(this.$route.params.id), null, {headers})
            .then(res => {
              this.booking.confirmed = res.data;
              this.createToast("Booking was rejected")
              resolve();
            });
      }).then(() => {
        this.backToBookingList();
      })
    },

    сancel() {
      const headers = Link.methods.getHeaders();
      new Promise((resolve) => {
        axios.post(Link.methods.getCancelById(this.$route.params.id), null,{headers})
            .then(res => {
              this.booking.confirmed = res.data;
              this.createToast("Booking was canceled")
              resolve();
            });
      }).then(() => {
        this.backToBookingList();
      })
    },


    createToast(msg, type) {
      Vue.use(VueToast);
      Vue.$toast.open({
        type: type,
        message: msg,
        position: "bottom-right",
        duration: 5000
      });
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

#back {
  color: #3283B0;
}

.title {
  display: flex;
  grid-template-areas:
        "ab ab ac ac"
        "ab ab ac ac";
  margin: auto;
  grid-area: a;
}

.fa-clone, .fa-trash-o, .fa-sign-out, .fa-angle-left {
  color: #535353;
  padding: 15px;
}

.exporthint, .clonehint, .tickethint, .deletehint {
  bottom: 80%;
  left: 10%;
}

.hotel-name, .hotel-tools {
  margin-top: 26px;
  margin-bottom: 20px;
  width: 50%;
}

.hotel-name {
  float: left;
  margin-left: 20px;
  margin-right: 6px;
  font-size: 22px;
  grid-area: ab;
}

.hotel-tools {
  text-align-last: right;
  float: right;
  margin-right: 36px;
  font-size: 18px;
  grid-area: ac;
}

#bookingList {
  margin-bottom: 20px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.body-l, .body-r {
  display: inline-block;
  height: 300px;
  width: 45%;
  border-radius: 15px;
  background-color: rgba(77, 77, 77, 0.03);
  padding: 5px;
}

.body-l {
  height: 170px;
}


#edit {
  width: 100%;
}

#submit-edit {
  width: 100%;
  display: none;
}

button {
  background: linear-gradient(180deg, #1b63e0 23.44%, #6c7897 100%);
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgb(27, 99, 224);
  box-sizing: revert;
}

.prefix.active {
  color: #EB2227 !important;
}

input:not(.browser-default):focus:not([readonly]) {
  border-bottom: 1px solid #EB2227 !important;
  box-shadow: #EB2227 !important;
  -webkit-box-shadow: 0 1px 0 0 #EB2227 !important;
}

input:not(.browser-default):focus:not([readonly]) + label {
  color: #EB2227 !important;
}

</style>