<template>
  <div class="box">
    <div id="manufacturerCard">
      <div class="title">
        <div class="">
          <div id="back" class="fa fa-angle-left" @click="backToUser"></div>
          <span class="name">Go back</span>
        </div>
      </div>
      <div class="container">
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="firstName" type="text" class="changeable" disabled v-model="user.firstName">
              <label for="firstName" class="active">First Name</label>
            </div>
            <div class="input-field col">
              <input id="lastName" type="text" class="changeable" disabled v-model="user.lastName">
              <label for="lastName" class="active">Last Name</label>
            </div>
            <div class="input-field col">
              <input id="email" type="text" class="changeable" disabled v-model="user.email">
              <label for="email" class="active">Email</label>
            </div>
          </form>
        </div>
        <div class="body-r">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="phoneNumber" type="text" class="changeable" disabled v-model="user.phoneNumber">
              <label for="phoneNumber" class="active">Phone Number</label>
            </div>
            <div class="input-field col">
              <input id="role" type="text" class="changeable" disabled v-model="user.role">
              <label for="role" class="active">Role</label>
            </div>
            <div class="input-field col">
              <input id="dateOfRegistration" type="text" class="changeable" disabled v-model="user.dateOfRegistration" @change="moment(user.dateOfRegistration).format('MM/DD/YYYY hh:mm')">
              <label for="dateOfRegistration" class="active">Date Of Registration</label>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Letter v-bind:user="user"
    />
  </div>
</template>

<script>
import axios from "axios";
import Link from "../navigation/Link";
import moment from "moment";
import Letter from "./Letter";
export default {
  name: "User",
  components: {Letter},
  data() {
    return {
      user: {
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
      axios.get(Link.methods.getUserData(this.$route.params.id), {headers})
          .then(res => {
            this.user = res.data;
          });
    },
    moment,
    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },
    backToUser(){
      return this.$router.push("/userList");
    },
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
  height: 170px;
  width: 45%;
  border-radius: 15px;
  background-color: rgba(77, 77, 77, 0.03);
  padding: 5px;
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