<template>
  <div class="box">
    <div id="manufacturerCard">
      <div class="title">
        <div class="">
          <div id="back" class="fa fa-angle-left" @click="backToHotel"></div>
          <span class="name">{{ room.name }}</span>
        </div>
        <div class="hotel-tools">
          <div class="fa fa-trash-o" @click="deleteRoom">
            <span class="deletehint">Delete</span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="name" type="text" class="changeable" disabled v-model="room.name">
              <label for="name" class="active">Name</label>
            </div>
            <div class="input-field col">
              <input id="pricePerDay" type="text" class="changeable" disabled v-model="room.pricePerDay">
              <label for="pricePerDay" class="active">Price per day</label>
            </div>
            <div v-if="isRoleAdmin()">
              <button @click="editArticleFields()" class="btn waves-effect waves-light" type="button" id="edit">
                Edit
                <em class="fa fa-pencil right"></em>
              </button>
              <button @click="editRequest()" class="btn light" type="button" id="submit-edit">Submit
                <em class="fa fa-check right"></em>
              </button>
            </div>
          </form>
        </div>
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="roomStatus" type="text" class="changeable" disabled v-model="room.roomStatus">
              <label for="roomStatus" class="active">Room status</label>
            </div>
            <div class="input-field col">
              <input id="type" type="text" class="changeable" disabled v-model="room.type">
              <label for="type" class="active">Type</label>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Booking/>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";
import Link from "../navigation/Link";
import Booking from "../booking/Booking";
export default {
  name: "Room",
  components: {Booking},
  data() {
    return {
      room: {
            type: Object,
            required: true
      },
    };
  },
  beforeMount() {
    this.getRoomsById();
  },
  methods: {
    getRoomsById() {
      const headers = Link.methods.getHeaders();
      axios.get(Link.methods.getRoomsById(this.$route.params.id), {headers})
          .then(res => {
            this.room = res.data;
          });
    },
    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },
    backToHotel(){
      return this.$router.push("/hotel/" + this.$route.query.id);
    },
    deleteRoom(){
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
                this.backToHotel();
              }
            }
          }
      )
    },
    sendArticleEditRequest() {
      const headers = Link.methods.getHeaders();
      console.log(this.room);
      return axios.put(Link.methods.getRoomUpdate(this.room.id), this.room, {headers});
    },
    editArticleFields() {
      $('#upload-img').css('display', 'block');
      $('.changeable').prop('disabled', false);
      $('#edit').css('display', 'none');
      $('#submit-edit').css('display', 'block');
    },
    editRequest() {
      this.sendArticleEditRequest(this.id).then(() => {
        this.createToast(this.room.name + " Edited");
        this.getRoomsById();
      });
      $('.changeable').prop('disabled', true);
      $('#edit').css('display', 'block');
      $('#submit-edit').css('display', 'none');
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
.box{
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

.fa-clone, .fa-trash-o, .fa-sign-out, .fa-angle-left{
  color: #535353;
  padding: 15px;
}

.exporthint, .clonehint, .tickethint, .deletehint  {
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

#hotelCard {
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

.body-l{
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