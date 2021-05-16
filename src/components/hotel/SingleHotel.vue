<template>
  <div class="box">
    <div id="manufacturerCard">
        <div class="title">
          <div class="manufacturer-name">
            <div id="back" class="fa fa-angle-left" @click="backToHotelsList"></div>
            <span class="name">{{ hotel.name }}</span>
          </div>
          <div class="hotel-tools">
            <div class="fa fa-sign-out">
              <span class="exporthint">{{"singleHotel.exportHint"}}</span>
            </div>
            <div class="fa fa-clone" @click="cloneHotel">
              <span class="clonehint">{{"singleHotel.cloneHint"}}</span>
            </div>
            <div class="fa fa-trash-o" @click="deleteHotel">
              <span class="deletehint">{{"singleHotel.deleteHint"}}</span>
            </div>
            <span class="line">|</span>
            <span id="lable" class="data">{{"singleHotel.lastUpdate"}}: </span>
            <span id="format" class="data">{{ moment(this.hotel.updated).format('MM.DD.YYYY') }}</span>
          </div>
        </div>
      <div class="container">
        <div class="body-l">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="name" type="text" class="changeable" disabled v-model="hotel.name">
              <label for="name" class="active">{{"singleHotel.name"}}</label>
            </div>
            <div class="input-field col">
              <input id="createTime" type="text" disabled v-model="hotel.created">
              <label for="createTime" class="active">{{"singleHotel.created"}}</label>
            </div>
            <div class="input-field col">
              <input id="updateTime" type="text" disabled v-model="hotel.updated">
              <label for="updateTime" class="active">{{"singleHotel.updated"}}</label>
            </div>
          </form>
        </div>
        <div class="body-r">
          <form autocomplete="off">
            <div class="input-field col">
              <input id="firmName" type="text" class="changeable" disabled v-model="hotel.firmName">
              <label for="firmName" class="active">{{"singleHotel.firmName"}}</label>
            </div>
            <div class="input-field col">
              <input id="address" type="text" class="changeable" disabled v-model="hotel.address">
              <label for="address" class="active">{{"singleHotel.address"}}</label>
            </div>
            <div class="input-field col">
              <input id="phone" type="text" class="changeable" disabled v-model="hotel.phone">
              <label for="phone" class="active">{{"singleHotel.phone"}}</label>
            </div>
            <div class="input-field col">
              <input id="email" type="text" class="changeable" disabled v-model="hotel.email">
              <label for="email" class="active">{{"singleHotel.email"}}</label>
            </div>
            <button @click="editArticleFields()" class="btn waves-effect waves-light" type="button" id="edit">
              {{"singleHotel.edit"}}
              <i class="fa fa-pencil right"></i>
            </button>
            <button @click="editRequest()" class="btn waves-effect waves-light" type="button" id="submit-edit">{{"singleHotel.submit"}}
              <i class="fa fa-check right"></i>
            </button>
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
  import Link from "../utills/Link";
  import ArticleByHotelId from "../item/ArticleByHotelId";
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
          res.data.created = moment(res.data.created).format('MM.DD.YYYY');
          res.data.updated = moment(res.data.updated).format('MM.DD.YYYY');
          this.hotel = res.data;
          return res;
        });
      },

      sendArticleEditRequest() {
        const headers = Link.methods.getHeaders();
        this.hotel.created = "";
        this.hotel.updated = "";
        return axios.put(Link.methods.getHotelUpdate(), this.hotel, {headers});
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
        return this.$router.push({name: 'wikiStegers'});
      },

      cloneHotel(){
        let headers = Link.methods.getHeaders();
        axios.get(Link.methods.getHotelById(this.id), {headers}).then(res => {
          axios.post(Link.methods.getManufacturesCreateUrl(), res.data, {headers});
        });
        this.createToast(this.hotel.name + "singleHotel.cloneToast")
      },

      deleteHotel(){
        this.$confirm(
            {
              message: "singleHotel.lastUpdate" + this.hotel.name + "?",
              button: {
                no: 'No',
                yes: 'Yes'
              },
              callback: confirm => {
                if (confirm) {
                  let headers = Link.methods.getHeaders();
                  axios.delete(Link.methods.getHotelDeleteUrl() + this.id, {headers});
                  this.backToHotelsList();
                }
              }
            }
        )
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
  @import '../../../public/materialize-src/sass/materialize.scss';
  @import "../../../public/styles/hints";

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

  button {
    background: linear-gradient(180deg, #4D4D4D 23.44%, #717171 100%);
    border-radius: 4px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
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