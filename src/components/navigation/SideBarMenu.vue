<template>
  <div id="menuBar">
    <sidebar-menu class="menu"
        :menu="menu"
        :collapsed=false
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick">
      <template v-slot:header>
      </template>
    </sidebar-menu>
  </div>
</template>

<script>
import {SidebarMenu} from 'vue-sidebar-menu'
import Link from "./Link";
import $ from 'jquery'

export default {
  components: {
    SidebarMenu
  },
  mounted() {
    this.setMenu();
  },
  methods: {
    onToggleCollapse() {
      $(window).scrollTop($(window).scrollTop()+1);
      let component = document.getElementById("components");
      let header = document.getElementById("pageHeader");
      if (component.classList.contains("collapsed-components")) {
        header.classList.remove("collapsed-components");
        component.classList.remove("collapsed-components");
        $('.vsm--toggle-btn').css('transform', 'rotate(360deg)');
      } else {
        header.classList.add("collapsed-components");
        component.classList.add("collapsed-components");
        $('.vsm--toggle-btn').css('transform', 'rotate(180deg)');
      }
      this.collapsed = !this.collapsed;
    },
    onItemClick(event, item) {
      if (item.title === "logout") {
        Link.methods.logout();
        this.$emit("logout");
      }
    },
    isRoleAdmin() {
      return Link.methods.parseJwt(Link.methods.getToken()).authorities[0] === 'ROLE_ADMIN';
    },
    setMenu() {
      let menu = [
        {
          header: true,
        },
        {
          href: '/hotelsBoard',
          title: "Hotels",
          icon: 'fa fa-hotel'
        },
        {
          href: '/bookingList',
          title: "Booking",
          icon: 'fa fa-ticket'
        },
        {
          href: '/wikiStegers',
          title: "Order",
          icon: 'fa fa-briefcase'
        },
        {
          href: '/payment',
          title: "Payment",
          icon: 'fa fa-qrcode'
        },
        {
          href: '/profile',
          title: "Profile",
          icon: 'fa fa-vcard'
        },
        {
          href: '/logout',
          title: 'logout',
          icon: 'fa fa-sign-out'
        },
      ];
      if (this.isRoleAdmin()) {
        menu.splice(1, 0, {
          href: '/dashboard',
          title: 'AdminPage',
          icon: 'fa fa-th'
        });
        menu.splice(6, 0, {
          title: "Settings",
          icon: 'fa fa-cog',
          child: [
            {
              href: '/users',
              title: "Users",
            },
            {
              href: '/historyLogs',
              title: "navBar.historyLogs",
            },
          ]
        });
      }
      return menu;
    }
  },
  data() {
    return {
      menu: this.setMenu(),
      themes: [
        {
          name: 'Default theme',
          input: ''
        },
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      isOnMobile: false,
      collapsed: false
    };
  }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
@import "../../../node_modules/vue-sidebar-menu/src/scss/vue-sidebar-menu";
@import "../../../public/styles/vars";


#components.collapsed-components {
  padding-left: 64px;
}

#pageHeader.collapsed-components {
  padding-left: 57px;
}

.logo {
  margin-top: 16px;
  margin-left: 10px;
  width: 85%;
  height: 34px;
}

.littleLogo {
  margin-top: 16px;
  margin-left: 11px;
  width: 34px;
  height: 34px;
}

.v-sidebar-menu .vsm--toggle-btn:after {
  content: '\f053';
  font-family: 'FontAwesome';
}

.v-sidebar-menu .vsm--arrow:after {
  content: '\f105';
  font-family: 'FontAwesome';
}

.v-sidebar-menu {
  background: $main-color;
  font-family: BlogerSans
}

.v-sidebar-menu.vsm_expanded {
  width: 224px;
}

.v-sidebar-menu.vsm_collapsed {
  max-width: 64px !important;
}

.v-sidebar-menu.vsm_collapsed .vsm--list {
  width: 64px;
}

.v-sidebar-menu .vsm--link_level-1.vsm--link_active {
  box-shadow: 3px 0px 0px 0px $main-color inset;
}

.v-sidebar-menu .vsm--mobile-item {
  width: 244px !important;
}

.v-sidebar-menu .vsm--mobile-bg {
  background-color: $main-color;
}

.v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link_hover .vsm--icon, .v-sidebar-menu.vsm_collapsed .vsm--link_level-1:hover .vsm--icon {
  background-color: $main-color;
  color: $second-color;
}

.v-sidebar-menu .vsm--link_hover, .v-sidebar-menu .vsm--link:hover {
  background-color: $main-color;
}

.v-sidebar-menu .vsm--link, .v-sidebar-menu .vsm--link_level-2 {
  color: $second-color;
}

.v-sidebar-menu .vsm--dropdown .vsm--list {
  background-color: $main-color;
  width: 194px;
}

.v-sidebar-menu .vsm--dropdown::-webkit-scrollbar {
  display: none;
}

.v-sidebar-menu.vsm_expanded .vsm--item_open .vsm--link_level-1 {
  background-color: $main-color;
  color: $second-color;
}

.v-sidebar-menu .vsm--link_level-1 .vsm--icon, .v-sidebar-menu.vsm_expanded .vsm--item_open .vsm--link_level-1 .vsm--icon {
  background-color: $main-color;
}

.v-sidebar-menu .vsm--dropdown {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.v-sidebar-menu .vsm--link.vsm--link_exact-active {
  color: $third-color;
}

.v-sidebar-menu .vsm--icon {
  background: $main-color;
}

#menuBar {
  height: 100%;
}

.v-sidebar-menu .vsm--toggle-btn {
  padding-top: 0;
  background-color: $main-color;
  color: $second-color
}

.v-sidebar-menu .vsm--toggle-btn:focus {
  outline: none;
}

.v-sidebar-menu .vsm--scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.v-sidebar-menu .vsm--scroll-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

button {
  background: linear-gradient(180deg, #1b63e0 23.44%, #6c7897 100%);
  border-radius: 4px;
  box-shadow: 0px 0px 2px rgb(27, 99, 224);
  box-sizing: revert;
}

.menu {
  top: 80px;
}
</style>