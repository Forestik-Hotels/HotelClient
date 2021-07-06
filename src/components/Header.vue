<template>
  <div id="header">
    <div id="searchPanel" v-show="hidePanel">
    <div class="inline" style="position: relative; top: 30px">
      <input id="search" type="text" placeholder="l" v-model="query" @input="sendQuery">
    </div>
    <div class="space inline" ></div>

    <div class="inline addDiv" v-if="isRoleAdmin()">
      <button class="filter" v-show="table === 'mainItem.table'" v-if="showButton()" type="button" @click="showAll()">
        <label id="showLabel" >{{this.buttonFilterTitle}}</label>
      </button>
      <button class="newButton" id="create" type="button" @click="createSthNew()" style="position: relative; right: 400px; top: 30px">
        <i class="fa fa-plus "></i>
        <label class="addLabel" >  new {{this.table}}</label>
      </button>
    </div>
    <div v-show="table=== 'mainTicket.table'" class="inline addDiv">
      <button class="filter" type="button" @click="changeDisplayed()">
        <label class="addLabel">{{ this.ticketFilterTitle }}</label>
      </button>
    </div>
    </div>
    <div id="controlPanel" v-show="!hidePanel">
      <div class="inlinePanel">
        <label class="numOfSelected"></label>
        <div v-show="table==='Items'" class="fa fa-clone" @click="cloneSelected">
          <span class="clonehint">{{"controlPanel.cloneHint"}}</span>
        </div>
        <div v-show="table!=='Users'" class="fa fa-sign-out">
          <span class="exporthint">{{"controlPanel.exportHint"}}</span>
        </div>
        <div class="fa fa-trash-o" @click="deleteAll">
          <span class="deletehint">{{"controlPanel.deleteHint"}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import SideBarMenu from "./SideBarMenu";
import $ from "jquery"
import Link from "./Link";

export default {
  components: {},
  props: {
    table: {
      type: String
    },
    hidePanel: {
      type: Boolean
    }
  },
  data() {
    return {
      query: "",
      filter: true,
      buttonFilterTitle: "header.buttonFilterTitleOn",
      ticketFilter: true,
      ticketFilterTitle: "header.ticketFilterTitleOn",
    }
  },
  mounted() {
    $("#search").attr('placeholder', "Search")
  },
  created() {
    switch (this.$route.path) {
      case '/hotel': {
        this.query = window.localStorage.getItem("itemFilter");
        if (this.query != null)
          this.sendQuery();
        break;
      }
      case '/users': {
        this.query = window.localStorage.getItem("userFilter");
        if (this.query != null)
          this.sendQuery();
        break;
      }
      case '/tickets': {
        this.query = window.localStorage.getItem("ticketFilter");
        if (this.query != null)
          this.sendQuery();
        break;
      }
      case '/ticketRules': {
        this.query = window.localStorage.getItem("ticketRulesFilter",);
        if (this.query != null)
          this.sendQuery();
        break;
      }
      case '/wikiStegers': {
        this.query = window.localStorage.getItem("wikiStegers",);
        if (this.query != null)
          this.sendQuery();
        break;
      }
      case '/wikiStegers/' + this.$route.params.id : {
        this.query = window.localStorage.getItem(this.$route.path);
        if (this.query != null)
          this.sendQuery();
        break;
      }
      case '/historyLogs': {
        this.query = window.localStorage.getItem('historyLogs');
        if (this.query != null)
          this.sendQuery();
        break;
      }
    }
    window.addEventListener("scroll", this.scrolling);
  },
  methods: {
    createSthNew() {
      let filePath = this.$route.fullPath;
      switch (filePath) {
        case ("/hotelsBoard"):
          return this.$router.push("/addHotel");
        case ("/wikiStegers"):
          return this.$router.push({name: 'newWikiStegers'});
        case("/tickets"):
          return this.$router.push({name: 'addTicket'})
        case ("/users"):
          return this.$router.push('/user/' + 'new');
        case("/wikiStegers/" + this.$route.params.id):
          return this.$router.push('/addItem/' + this.$route.params.id);
        case("/ticketRules"):
          return this.$router.push({name: 'addTicketRule'});
      }
    },
    showAll() {
      this.filter = !this.filter;

      this.filter ? this.buttonFilterTitle = "header.buttonFilterTitleOn" : this.buttonFilterTitle = "header.buttonFilterTitleOff";

      this.$emit("showAllItems");
    },
    showButton() {
      return SideBarMenu.methods.isRoleAdmin();
    },
    sendQuery() {
      let q = this.query;
      switch (this.$route.path) {
        case '/items': {
          window.localStorage.setItem("itemFilter", this.query);
          break;
        }
        case '/users': {
          window.localStorage.setItem("userFilter", this.query);
          break;
        }
        case '/tickets': {
          window.localStorage.setItem("ticketFilter", this.query);
          break;
        }
        case '/ticketRules': {
          window.localStorage.setItem("ticketRulesFilter", this.query);
          break;
        }
        case '/wikiStegers': {
          window.localStorage.setItem("wikiStegers", this.query);
          break;
        }
        case '/wikiStegers/' + this.$route.params.id: {
          window.localStorage.setItem(this.$route.path, this.query);
          break;
        }
        case '/historyLogs': {
          window.localStorage.setItem('historyLogs', this.query);
          break;
        }
      }
      this.$emit("search",
          this.query.isEmpty ? (x) => x : (x, f) => f(x, q.toLowerCase())
      );
    },
    changeDisplayed() {
      this.ticketFilter = !this.ticketFilter;
      this.ticketFilter ? this.ticketFilterTitle = "header.ticketFilterTitleOn" : this.ticketFilterTitle = "header.ticketFilterTitleOff";
      this.$emit("changeDisplayed");
    },
    deleteAll() {
      this.$emit('deleteAll')
    },
    cloneSelected() {
      this.$emit('cloneSelected')
    },
    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },
  }

}
</script>

<style scoped lang="scss">
@import "../../src/assets/scss/header.scss";
//@import "../../public/styles/controlPanel.scss";
//@import "../../public/styles/hints.scss";
.sticky {
  position: fixed;
  top: 0;
  right: 0;
  left: 64px;
}

#create {
  width: 100%;
  box-sizing: revert;
  height: 40px;
  align-items: center;
  border: 1px;

  background: linear-gradient(180deg, #1b63e0 23.44%, #405880 100%);
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgb(27, 99, 224);
}
</style>