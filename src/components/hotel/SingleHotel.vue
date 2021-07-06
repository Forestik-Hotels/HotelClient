<template>
  <div class="box">
    <div id="manufacturerCard">
        <div class="title">
          <div class="manufacturer-name">
            <div id="back" class="fa fa-angle-left" @click="backToHotelsList"></div>
            <span class="name">{{ hotel.name }}</span>
          </div>
          <div class="hotel-tools">
            <div v-if="isRoleAdmin()" class="fa fa-trash-o" @click="deleteHotel">
              <span class="deletehint">Delete</span>
            </div>
          </div>
        </div>
      <div class="container">
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="name" type="text" class="changeable" disabled v-model="hotel.name">
              <label for="name" class="active">Name</label>
            </div>
            <div class="input-field col">
              <input id="address" type="text" class="changeable" disabled v-model="hotel.address">
              <label for="address" class="active">Address</label>
            </div>
            <div v-if="isRoleAdmin()">
              <button @click="editArticleFields()" class="btn waves-effect waves-light" type="button" id="edit">
                Edit
                <i class="fa fa-pencil right"></i>
              </button>
              <button @click="editRequest()" class="btn light" type="button" id="submit-edit">Submit
                <i class="fa fa-check right"></i>
              </button>
              <button @click="createRoom()" class="btn light" type="button" id="new-room">
                new Room
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="count" type="text" class="changeable" disabled v-model="hotel.count">
              <label for="count" class="active">Rooms</label>
            </div>
            <div class="input-field col">
              <input id="phone" type="text" class="changeable" disabled v-model="hotel.phone">
              <label for="phone" class="active">Phone</label>
            </div>
            <div class="input-field col">
              <input id="email" type="text" class="changeable" disabled v-model="hotel.email">
              <label for="email" class="active">Email</label>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ArticleByHotelId/>
  </div>
</template>

<script>
  import $ from 'jquery'
  import axios from "axios";
  import moment from 'moment';
  import Vue from "vue";
  import VueToast from "vue-toast-notification";
  import 'vue-toast-notification/dist/theme-default.css';
  import Link from "../Link";
  import ArticleByHotelId from "../ArticleByHotelId";
  import VueConfirmDialog from "vue-confirm-dialog";

  Vue.use(VueConfirmDialog)
  Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

  export default {
    props: {
      id: {
        type: String,
        default: null,
      },
    },
    components: {
      ArticleByHotelId: ArticleByHotelId
    },
    data() {
      let data = {
        hotel: {}
      };
      this.getSingleHotel(this.id).then(d => {
        data.hotel = d.data
      });

      return data;
    },

    methods: {

      moment,

      getSingleHotel(id) {
        const headers = Link.methods.getHeaders();
        return axios.get(Link.methods.getHotelById(id), {headers}).then((res) => {
          this.hotel = res.data;
          return res;
        });
      },

      sendArticleEditRequest() {
        const headers = Link.methods.getHeaders();
        return axios.put(Link.methods.getHotelUpdate(), this.hotel, {headers});
      },

      createRoom() {
        return this.$router.push("/addRoom?hotelName=" + this.hotel.name + "&id=" + this.hotel.id);
      },

      editArticleFields() {
        $('#upload-img').css('display', 'block');
        $('.changeable').prop('disabled', false);
        $('#edit').css('display', 'none');
        $('#submit-edit').css('display', 'block');
      },
      editRequest() {
        this.sendArticleEditRequest(this.id).then(() => {
          this.createToast(this.hotel.name + " Edited");
          this.getSingleHotel(this.id);
        });
        $('.changeable').prop('disabled', true);
        $('#edit').css('display', 'block');
        $('#submit-edit').css('display', 'none');
      },

      backToHotelsList(){
        return this.$router.push("/hotelsBoard");
      },

      deleteHotel(){
        this.$confirm(
            {
              message: "Do you want to delete a hotel " + this.hotel.name + "?",
              button: {
                no: 'No',
                yes: 'Yes'
              },
              callback: confirm => {
                if (confirm) {
                  let headers = Link.methods.getHeaders();
                  axios.delete(Link.methods.getHotelDeleteUrl(this.id), {headers});
                  this.backToHotelsList();
                }
              }
            }
        )
      },
      isRoleAdmin() {
        return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
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
    },
  }

</script>


<style scoped lang="scss">
  //@import '../../../public/materialize-src/sass/materialize.scss';
  //@import "../../../public/styles/hints";

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

  label.active{
    margin-left: 10px;
  }

  .hotel-tools {
    text-align-last: right;
    float: right;
    margin-right: 36px;
    font-size: 18px;
    grid-area: ac;
  }

  div.input-field {
    padding: 5px;
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

  .body-r{
     height: 280px;
   }

  #edit {
    width: 100%;
  }

  #submit-edit {
    width: 100%;
    display: none;
  }

  #new-room {
    width: 100%;
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