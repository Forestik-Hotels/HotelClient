<template>
  <div id="TableContainer">
<!--    <div>-->
<!--      <Header @search="search"-->
<!--              v-bind:table="table"-->
<!--              v-bind:hidePanel="hidePanel"-->
<!--              @deleteAll="deleteRooms"-->
<!--              ref="counter" />-->
<!--    </div>-->
    <vue-confirm-dialog></vue-confirm-dialog>
    <div id="table">
      <ItemList
              v-bind:items="this.items"
              @setHeaderVisible="setHeaderVisible"
              @setPanelVisible="setPanelVisible"
      />
    </div>
  </div>
</template>
<script>

import axios from "axios";
import ItemList from "../components/ItemList";
// import Header from "../components/Header";
import Link from "../components/Link";
import VueConfirmDialog from "vue-confirm-dialog";
import Vue from "vue";

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
// import App from "../App";
import $ from "jquery";
import SideBarMenu from "../components/SideBarMenu";

let counter = 0;
let sbCounter = 0;
let tableHeaderPosition;

export default {
  components: {
    ItemList: ItemList,
    // Header: Header,
  },

  data() {
    return {
      items: [],
      table: "articleByManufacturerId.table",
      hidePanel: true,
      array: [],
      lastQuery: (x) => x
    };
  },
  // computed: {
  //   changedItems: function () {
  //     let field = window.localStorage.getItem(this.$route.path + " field");
  //     let orderBy = window.localStorage.getItem(this.$route.path + " orderBy")==='true';
  //     if(field==='manufacturer.name')
  //       return this.items.filter(x=> this.filterByStatus(x)).filter(x => this.lastQuery(x, this.isInclude)).sort(App.methods.comparator(a => a.manufacturer.name, orderBy));
  //     else return this.items.filter(x=> this.filterByStatus(x)).filter(x => this.lastQuery(x, this.isInclude)).sort(App.methods.comparator(a => a[field], orderBy));
  //   }
  // },
  created() {
    window.addEventListener("scroll", this.scrolling);
    window.addEventListener('resize', this.windowResize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrolling);
    window.addEventListener('resize', this.windowResize);
  },

  beforeMount() {
    this.getRoomsByHotelId();
  },
  methods: {
    getRoomsByHotelId() {
      const headers = Link.methods.getHeaders();
      axios.get(Link.methods.getRoomsByHotel(this.$route.params.id), {headers})
          .then(res => {
            this.items = res.data;
          });
    },
    search(qsearch) {
      this.lastQuery = qsearch;
    },
    convertAndConcatStrings(s1, s2) {
      s1 = s1.toString().concat("x");
      return s1.concat(s2.toString());
    },
    isInclude(item, query) {
      if (this.fieldContain(query, item.system))
        return true;
      else if (this.fieldContain(query, item.manufacturer.name))
        return true;
      else if (this.dimensionContain(query, item.width, item.depth, item.thickness))
        return true;
      else if (this.dimensionContain(query, item.horizontalStep, item.verticalStep))
        return true;
      else return (this.fieldContain(query, item.userName));
    },
    fieldContain(query, field) {
      if(field === null)
        return false;
      return field.toLowerCase().indexOf(query) !== -1;
    },
    dimensionContain(query, ...dim) {
      var dimensions = dim[0].toString();
      if (dim.length > 1) {
        for (let i = 0; i < dim.length - 1; i++) {
          dimensions = this.convertAndConcatStrings(dimensions, dim[i + 1]);
        }
      }
      return dimensions.indexOf(query) !== -1;
    },
    setPanelVisible(array) {
      this.array = array;
      this.$refs.counter.changeLabel(array.length, "item");
      this.hidePanel = false;
    },
    setHeaderVisible() {
      this.hidePanel = true;
    },
    deleteRooms() {
      this.$confirm(
          {
            message: "articleByManufacturerId.confirmMessage",
            button: {
              no: "articleByManufacturerId.confirmNo",
              yes: "articleByManufacturerId.confirmYes",
            },
            callback: confirm => {
              if (confirm) {
                let headers = Link.methods.getHeaders();
                const promises = [];
                for (let i = 0; i < this.array.length; i++) {
                  promises.push(axios.delete(Link.methods.getArticleDeleteUrl() + this.array[i], {headers}));
                }
                Promise.all(promises).then(() => {
                  this.getRoomsByHotelId();
                  this.array = [];
                  this.setHeaderVisible();
                })
              }
            }
          }
      )
    },
    filterByStatus(item){
      if(!this.show){
        return item.status !== "DELETED"
      }
      return true;
    },
    windowResize(){
        alignColumns();
    },
    scrolling(){
      let sideBar = $('#menuBar').find(".v-sidebar-menu")[0];
      if (sideBar.classList.contains("vsm_collapsed") && sbCounter < 2) {
        alignColumns();
        sbCounter = sideBar + 1;
      }

      let theadArtByManuf = document.getElementById("theadItem");

      let header = $('#theadItem');
      let components = $('#components');
      let stickyCl = $('thead.stickyItem');
      let table = $('#table');
      let manufacturerCard;
      if(document.getElementById('manufacturerCard') !== null)
        manufacturerCard = document.getElementById('manufacturerCard').offsetHeight;
      let pageHeader = document.getElementById('pageHeader').offsetHeight;

      let sticky = 0;

      if(theadArtByManuf !== null)
        sticky = theadArtByManuf.offsetHeight + manufacturerCard - 25 + pageHeader;
      let padding = parseInt(components.css('padding-left')) + 14 + "px";

      if(theadArtByManuf !== null && !theadArtByManuf.classList.contains("stickyItem")){
        tableHeaderPosition = sticky;
      }

      if (window.pageYOffset > sticky) {
        if(counter < 1) {
            alignColumns();
        }
        header.addClass("stickyItem");
        table.css('padding-top', '60px');
        table.addClass();
        stickyCl.css('left', padding);
        counter = counter + 1;
      }
      if(window.pageYOffset < tableHeaderPosition) {
        header.removeClass("stickyItem");
        table.css('padding-top', '0px');
      }
    },
  }
}

function alignColumns() {
  let style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  document.head.appendChild(style);
  let sheet = style.sheet;
  let checkbox = document.querySelector('.checkboxTd').offsetWidth + 'px';
  let id = document.querySelector('.idTd').offsetWidth + 'px';
  let system = document.querySelector('.systemTd').offsetWidth + 'px';
  let wikiSteger = document.querySelector('.wikiStegerTd').offsetWidth + 'px';
  let wxdxt = document.querySelector('.wxdxtTd').offsetWidth + 'px';
  let l1xl2 = document.querySelector('.l1xl2Td').offsetWidth + 'px';
  let image = document.querySelector('.imageCol').offsetWidth + 'px';
  let date = document.querySelector('.dataTd').offsetWidth + 'px';
  let status = 0;

  if(SideBarMenu.methods.isRoleAdmin())
    status = document.querySelector('.statusTd').offsetWidth + 'px';

  sheet.insertRule('th.checkbox, td.checkboxTd { width: ' + checkbox + ';}', 0);
  sheet.insertRule('th.id, td.idTd { width: ' + id + ';}', 0);
  sheet.insertRule('th.system, td.systemTd {width: ' + system + '; }', 0);
  sheet.insertRule('th.wikiSteger, td.wikiStegerTd {width: ' + wikiSteger + ';}', 0);
  sheet.insertRule('th.wxdxt, td.wxdxtTd { width: ' + wxdxt + ';}', 0);
  sheet.insertRule('th.l1xl2, td.l1xl2Td { width: ' + l1xl2 + ';}', 0);
  sheet.insertRule('th.imageCol, td.imageThTd { width: ' + image + ';}', 0);
  sheet.insertRule('th.data, td.dataTd { width: ' + date + ';}', 0);
  sheet.insertRule('th.status, td.statusTd { width: ' + status + ';}', 0);
}
</script>
<style scoped lang="scss">
  //@import "../../../public/styles/tables.scss";
  ItemList.tbody{
    overflow: visible;
  }
</style>