<template>
  <tr>
    <td style="text-align: center" class="checkboxTd">
      <input id="checkbox" class="checkbox" type="checkbox" @change="countEvent()" ref="checkbox"
             :disabled="user.status === 'DELETED'">
    </td>
    <td style="text-align: center" class="idTd" @click="goToSingleArticle(user.id)">{{ user.id }}</td>
    <td style="text-align: center" class="firstName" @click="goToSingleArticle(user.id)">{{ user.firstName }}</td>
    <td style="text-align: center" class="lastName" @click="goToSingleArticle(user.id)" colspan="">{{
        user.lastName
      }}</td>
    <td style="text-align: center" class="email" @click="goToSingleArticle(user.id)" colspan="">{{
        user.email
      }}</td>
    <td style="text-align: center" class="phoneNumber"  @click="goToSingleArticle(user.id)">{{ user.phoneNumber }}</td>
    <td style="text-align: center" class="role" @click="goToSingleArticle(user.id)" colspan="">{{ user.role }}</td>
    <td style="text-align: center" class="dateOfRegistration" @click="goToSingleArticle(user.id)" colspan="">{{ moment(user.dateOfRegistration).format('MM/DD/YYYY hh:mm')}}</td>
    <td style="text-align: center" class="type">
      <button @click="deactivate(user.id)" class="btn light" type="button" id="deactivate">
        Deactivate
        <em class="fas fa-user-slash"></em>
      </button>
    </td>
    <td style="text-align: center" class="type">
      <button @click="goToUser(user.id)" class="btn light" type="button" id="user">
        Write
        <em class="fa fa-file-text"></em>
      </button>
    </td>
  </tr>
</template>

<script>

import moment from 'moment';
import SideBarMenu from "../navigation/SideBarMenu";
import Link from "../navigation/Link";
import axios from "axios";
export default {
  props: {
    user: {
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
      if(this.user.status !== 'DELETED')
        this.$router.push({name: 'articleById', params: { "id": id.toString()} });
    },
    moment,

    deactivate: function(id){
      const headers = Link.methods.getHeaders();
      axios.post(Link.methods.getDeactivateUser(id), null, {headers})
          .then(() => {
          });
    },

    countEvent() {
      this.$emit('addRaw')
    },

    goToUser: function (id) {
      console.log(id);
      window.scrollTo(0,0);
      this.$router.push('/user/' + id);
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

#user, #deactivate {
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