<template>
  <table>
    <thead id="theadItem" style="text-alighn: center" >
      <th v-if="isRoleAdmin()" class="checkbox"><input type="checkbox" id="titleCheckbox" @change="checkAll" style="text-alighn: center" ></th>
      <th v-if="isRoleAdmin()" class="id" @click="sortByField('id')" style="text-alighn: center" >
        <div class="parent">
          <div class="left">
            Id
          </div>
          <div class="right">
          </div>
        </div>
      </th>
      <th class="Name" @click="sortByField('name')" style="text-alighn: center" >
        <div class="parent">
          <div class="left">
            Name
          </div>
        </div>
      </th>
      <th class="pricePerDay" style="text-alighn: center" >
        <div class="parent">
          <div class="left">
             Price per day
          </div>
        </div>
      </th>
      <th class="roomStatus" style="text-alighn: center" >
        <div class="parent">
          <div class="left">
            Room status
          </div>
        </div>
      </th>
      <th class="type" style="text-alighn: center" >
        <div class="parent">
          <div class="left">
            Type
          </div>
        </div>
      </th>
      <th class="data" @click="sortByField('updated')" style="text-alighn: center" >
        <div class="parent">
          <div class="left">
            Update
          </div>
        </div>
      </th>
      <th v-if="!isRoleAdmin()" class="data" @click="sortByField('updated')" style="text-alighn: center" >
          <div class="left">
            Booking
          </div>
      </th>
      <th v-else class="data" @click="sortByField('updated')" style="text-alighn: center" >
        <div class="left">
          Delete
        </div>
      </th>
      <th class="data" @click="sortByField('updated')" style="text-alighn: center" >
        <div class="left">
          More info
        </div>
      </th>
    </thead>
    <tbody id="tbody">
    <SoloItem ref="itemList"
              @addRaw="changeDiv"
              v-for="item of items" :key="item.id"
              v-bind:item="item"
    />
    </tbody>
  </table>
</template>
<script>
import SoloItem from "../components/SoloItem";
import App from "../App";
import $ from "jquery";
import SideBarMenu from "../components/SideBarMenu";
import Link from "./Link";

export default {
  props: {
    items: {
      type: Array
    },
  },
  components: {
    SoloItem: SoloItem
  },
  mounted(){
    let field = window.localStorage.getItem(this.$route.path + " field");
    let order = window.localStorage.getItem(this.$route.path + " orderBy")==='true';
    if(field!==null && order!==null) {
      this.field = field
      this.orderBy = order;
    }
  },
  data() {
    return {
      orderBy: false,
      field: '',
      clicked: false,
      checkedItemsList: []
    }
  },
  created: function () {
    this.$parent.$on('removeCheckboxes', this.removeCheckboxes);
  },

  methods: {
    sortByField(field) {
      if (Object.is(this.field, field)) {
        this.orderBy = !this.orderBy;
      } else {
        this.orderBy = true;
      }

      this.field = field;

      window.localStorage.setItem(this.$route.path + " orderBy", this.orderBy)
      window.localStorage.setItem(this.$route.path + " field", this.field)

      switch (field) {
        case 'id':
          return this.items.sort(App.methods.comparator(a => a.id, this.orderBy));
        case 'system':
          return this.items.sort(App.methods.comparator(a => a.system, this.orderBy));
        case 'name':
          return this.items.sort(App.methods.comparator(a => a.name, this.orderBy));
        case 'pricePerDay':
          return this.items.sort(App.methods.comparator(a => a.pricePerDay, this.orderBy));
        case 'updated':
          return this.items.sort(App.methods.comparator(a => a.updated, this.orderBy));
      }
    },

    isClicked(field) {
      return this.field === field;
    },

    sortAndOrder() {
      return this.orderBy;
    },

    equalsFields(field){
      return this.field === field;
    },

    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },

    displayStatus() {
      if(!SideBarMenu.methods.isRoleAdmin()){
        $('#important').css('width', '20%');
        $('#id').css('width', '7%')
        $('#status').css('width', '0%');
        return false;
      }
      return true;
    },

    changeDiv() {
      var itemList = this.$refs.itemList;
      this.checkedItemsList = [];
      itemList.forEach(element => {
        if (element.$refs.checkbox.checked) {
          this.checkedItemsList.push(element.item.id);
        }
      });
      if (this.checkedItemsList.length > 0) {
        if(this.checkedItemsList.length === this.items.length){
          $("#titleCheckbox").prop('checked', true);
        }
        else  $("#titleCheckbox").prop('checked', false);
        this.$emit('setPanelVisible', this.checkedItemsList)
      } else {
        this.$emit('setHeaderVisible')
      }
    },
    checkAll() {
      var itemList = this.$refs.itemList;
      this.checkedItemsList = [];
      if ($("#titleCheckbox").prop('checked')) {
        itemList.forEach(element => {
          if(element.item.status!=="DELETED") {
            element.$refs.checkbox.checked = true;
            this.checkedItemsList.push(element.item.id);
          }
        });
        this.$emit('setPanelVisible', this.checkedItemsList)
      } else {
        itemList.forEach(element => {
          element.$refs.checkbox.checked = false;
        });
        this.$emit('setHeaderVisible')
      }
    },
    removeCheckboxes() {
      var itemList = this.$refs.itemList;
      itemList.forEach(element => {
        element.$refs.checkbox.checked = false;
      });
      this.$emit('setHeaderVisible')
    }
  },
}
</script>

<style scoped lang="scss">
@import "../assets/scss/tables.scss";
</style>