<template>
  <table>
    <thead id="theadItem" style="text-align: center" >
    <th id="checkbox" v-if="isRoleAdmin()" class="checkbox"><input type="checkbox" id="titleCheckbox" @change="checkAll" style="text-align: center" ></th>
    <th id="id" v-if="isRoleAdmin()" class="id" @click="sortByField('id')" style="text-align: center" >
      <div class="parent">
        <div class="left">
          Id
        </div>
        <div class="right">
        </div>
      </div>
    </th>
    <th id="firstName" class="firstName" @click="sortByField('name')" style="text-align: center" >
      <div class="parent">
        <div class="left">
          First Name
        </div>
      </div>
    </th>
    <th id="lastName" class="lastName" style="text-align: center" >
      <div class="parent">
        <div class="left">
          Last Name
        </div>
      </div>
    </th>
    <th id="email" class="email" style="text-align: center" >
      <div class="parent">
        <div class="left">
          Email
        </div>
      </div>
    </th>
    <th id="phoneNumber" class="phoneNumber" style="text-align: center" >
      <div class="parent">
        <div class="left">
          Phone
        </div>
      </div>
    </th>
    <th id="role" class="role" @click="sortByField('updated')" style="text-align: center" >
      <div class="parent">
        <div class="left">
          Role
        </div>
      </div>
    </th>
    <th id="dateOfRegistration" class="dateOfRegistration" @click="sortByField('updated')" style="text-align: center" >
      <div class="left">
        Date Of Registration
      </div>
    </th>
    <th id="button1" class="button" @click="sortByField('updated')" style="text-align: center" >
      <div class="left">
        Deactivate
      </div>
    </th>
    <th id="button2" class="button" @click="sortByField('updated')" style="text-align: center" >
      <div class="left">
        Letter
      </div>
    </th>
    </thead>
    <tbody id="tbody">
    <SoloUser ref="userList"
              @addRaw="changeDiv"
              v-for="user of users" :key="user.id"
              v-bind:user="user"
    />
    </tbody>
  </table>
</template>

<script>
import SoloUser from "./SoloUser";
import App from "../../App";
import Link from "../navigation/Link";
import SideBarMenu from "../navigation/SideBarMenu";
import $ from "jquery";
export default {
  name: "UserList",
  props: {
    users: {
      type: Array
    },
  },
  components: {
    SoloUser: SoloUser
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
      var userList = this.$refs.userList;
      this.checkedItemsList = [];
      userList.forEach(element => {
        if (element.$refs.checkbox.checked) {
          this.checkedItemsList.push(element.user.id);
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
      var userList = this.$refs.userList;
      this.checkedItemsList = [];
      if ($("#titleCheckbox").prop('checked')) {
        userList.forEach(element => {
          if(element.user.status!=="DELETED") {
            element.$refs.checkbox.checked = true;
            this.checkedItemsList.push(element.user.id);
          }
        });
        this.$emit('setPanelVisible', this.checkedItemsList)
      } else {
        userList.forEach(element => {
          element.$refs.checkbox.checked = false;
        });
        this.$emit('setHeaderVisible')
      }
    },
    removeCheckboxes() {
      var userList = this.$refs.userList;
      userList.forEach(element => {
        element.$refs.checkbox.checked = false;
      });
      this.$emit('setHeaderVisible')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/tables";
</style>