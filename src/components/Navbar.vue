<template>
  <b-navbar toggleable="lg" sticky class="navbar shadow">
    <!-- The eTuro banner -->
    <b-navbar-brand class="navbar-brand" to="/"> 
      <img src="../assets/eTuro_banner.png" height="60px" width="auto"> 
    </b-navbar-brand>
    <!-- collapse button -->
    <b-navbar-toggle target="nav-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up" class="text-contrast border-contrast"></b-icon>
        <b-icon v-else icon="chevron-bar-down" class="text-contrast border-contrast"></b-icon>
      </template>
    </b-navbar-toggle>
    <!-- collapsible content -->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <!-- The search bar -->
        <div class="navbar-form">
          <b-input-group class="w-100">
            <b-form-input placeholder="Search from dozens of lessons, topics, and tutorials" 
                type="text" class="form-control navbar-search"></b-form-input>
            <b-input-group-append>
              <button class="btn text-contrast border border-contrast">
                <b-icon icon="search"/>
              </button>
            </b-input-group-append>
          </b-input-group>
        </div>

        <!-- sign in button -->
        <b-nav-item class="nav-link p-0" v-if="!loggedIn" to="/login">
          <div class="text-left btn btn-lg text-contrast">
            <b-icon icon="box-arrow-in-right"></b-icon>
            Sign In
          </div>
        </b-nav-item>
        <!-- Profile -->
        <b-nav-item class="nav-link p-0" v-else v-click-outside="closeProfile" @click="viewProfileMenu = true">
          <!-- Profile button in navbar -->
          <button class="text-left btn btn-lg text-contrast">
            <b-icon icon="person-circle"></b-icon>
            Profile
          </button>
          <!-- Profile menu itself -->
          <transition name="fade">
            <div v-if="viewProfileMenu" class="shadow card p-3 position-absolute" id="">
              <a class="d-block w-100 p-2" href="#" >Light</a>
              <a class="d-block w-100 p-2" href="#" >Dark</a>
            </div>
          </transition>
        </b-nav-item>
        <!-- create acc button -->
        <b-nav-item class="nav-link p-0" v-if="!loggedIn" to="/signup">
          <button class="text-left btn btn-lg text-contrast">
            <b-icon icon="person-plus"></b-icon>
            Create an Account
          </button>
        </b-nav-item>
        <!-- Notifications -->
        <b-nav-item class="nav-link p-0" v-else v-click-outside="closeNotifications" @click="viewNotificationsMenu = true">
          <!-- Notifications button in navbar -->
          <button class="text-left btn btn-lg text-contrast">
            <b-icon icon="bell-fill"></b-icon>
            Notifications
          </button>
          <!-- Notifications menu itself -->
          <transition name="fade">
            <div v-if="viewNotificationsMenu" class="shadow card p-3 position-absolute" id="">
              <a class="d-block w-100 p-2" href="#" >Light</a>
              <a class="d-block w-100 p-2" href="#" >Dark</a>
            </div>
          </transition>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <!-- <b-nav-item class="nav-link" v-else to="/login">Sign Out</b-nav-item> -->
  </b-navbar>
</template>

<script>
import { auth } from '../../firebase'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'loggedIn'
    ])
  },
  data() {
    return {
      viewProfileMenu: false,
      viewNotificationsMenu: false,
    }
  },
  methods: {
    logout() {
      auth.signOut()
        .then(() => {
          this.$store.commit('toggleCurrentUser')
          this.$router.push({ path: "/login" })
        })
        .catch(() => {
          alert("Failed to logout! Must be your internet connection...")
        })
    },
    closeNotifications(){
      this.viewNotificationsMenu = false;
    },
    closeProfile(){
      this.viewProfileMenu = false;
    }
  }, // methods
}
</script>

<style scoped>
  .navbar{
    background-color: var(--eturo-main);
  }
  .navbar-form{
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    position: relative;
    -webkit-box-orient: horizontal;
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    max-width: 1000px;
  }
  .nav-link{
    white-space: nowrap !important;
  }
  .navbar-search{
    min-width: 400px;
  }
  .eturo-btn-transparent{
    color: var(--gang-gang-contrast) !important;
    border-color: var(--gang-gang-contrast) !important;
    background: rgba(0,0,0,0) !important;
  }
</style>