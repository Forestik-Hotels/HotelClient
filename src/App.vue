<template>
  <div id="app" class="location">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <div v-if="isLogin()">
      <SideBarMenu @logout="logout()"/>
    </div>
    <router-link to="/hotelsBoard"></router-link>
    <nav class="navbar shadow bg-blue rounded justify-content-between flex-nowrap flex-row fixed-top header" style="height: 80px">
      <div class="container">
        <router-link to="/">
          <a class="font navbar-brand float-left">
            Hotel Management System
          </a>
        </router-link>
      </div>
      <div v-if="isLogin()" class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <a type="button" class="font2 navbar-brand float-left" style="position: relative; left: 300%;" id="log-out" @click="logout">
            <label id="logout" for="log-out">Logout</label>
          </a>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import $ from "jquery"
import SideBarMenu from "./components/navigation/SideBarMenu";
import Link from "./components/navigation/Link";
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App',
  components: {
    SideBarMenu
  },
  data() {
    return {
      items: [],
      text: "",
      authorized: Link.methods.checkTokenExp(),
      auth: true
    };
  },
  mounted() {
    this.resizing();
  },
  created() {
    window.addEventListener("resize", this.resizing);
  },
  methods: {
    isLogin(){
      return Link.methods.checkTokenExp();
    },
    logout() {
      Link.methods.logout();
      this.$router.push('/');
    },
    checkAuthorized() {
      this.authorized = Link.methods.checkTokenExp()
    },
    changeAuthorizationRegistrationPage() {
      this.auth = !this.auth;
    },
    compare: function (a, b, order) {
      let sign = order ? 1 : -1;

      if (a == null && b == null) {
        return -1 * sign;
      }
      if (a == null) {
        return 1 * sign;
      }
      if (b == null) {
        return -1 * sign;
      }

      if (isNaN(a) && isNaN(b)) {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1 * sign;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1 * sign;
        }
      } else {
        if (a < b) {
          return -1 * sign;
        }
        if (a > b) {
          return 1 * sign;
        }
      }
      return 0;
    },
    comparator: function (getter, order) {
      return (a, b) => this.compare(getter(a), getter(b), order);
    },
    changeComponent(text) {
      this.text = text;
    },
    resizing() {
      if (this.authorized) {
        var sideBar = $('#menuBar').find(".v-sidebar-menu")[0];
        var btn = $('.v-sidebar-menu').find(".vsm--toggle-btn")[0];
        if (window.innerWidth <= 960 && sideBar.classList.contains("vsm_expanded")) {
          btn.click();
          btn.style.display = "none";
        } else if (window.innerWidth <= 960 && sideBar.classList.contains("vsm_collapsed")) {
          btn.style.display = "none";
        } else if (window.innerWidth >= 960 && sideBar.classList.contains("vsm_collapsed")) {
          btn.style.display = "block";
        }
      }
    },
    goToAuthorization() {
      this.$router.push('/authorization')
    },
    goToRegistration() {
      this.$router.push('/registration')
    },
  }
}

</script>

<style>
@import './assets/css/main.css';

.header {
  background: linear-gradient(180deg, #1b63e0 23.44%, #405880 100%);
  font-family: BlogerSans
}
</style>