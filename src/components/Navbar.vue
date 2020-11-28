<template>
  <b-navbar toggleable="lg" sticky class="navbar shadow">
    <!-- The eTuro banner -->
      <b-navbar-brand class="svg-container" to="/">
        <svg class="svg-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 593.9 191.15"><g data-name="Layer 2"><g data-name="Layer 1"><path class="svg-path" d="M344.87 179.54a9.59 9.59 0 11-19.18 0v-14.13c-8.83 14.13-22.2 25.49-44.67 25.49-31.54 0-50-21.2-50-52.24V66.23a9.48 9.48 0 019.59-9.84 9.85 9.85 0 019.84 9.84v67.63c0 24.23 13.12 39.37 36.09 39.37 22.21 0 39.11-16.4 39.11-40.88V66.23a9.49 9.49 0 019.59-9.84 9.64 9.64 0 019.59 9.84zM369.61 66.23a9.8 9.8 0 019.59-9.84 9.7 9.7 0 019.8 9.84v24.48c9.63-21.71 28.56-34.83 45-34.83 5.8 0 9.59 4.29 9.59 9.85a9.64 9.64 0 01-8.59 9.84c-25.24 3-45.93 22-45.93 59.56v44.41a9.72 9.72 0 11-19.43 0zM65.11 191.15C29.27 191.15 0 163.64 0 123.27v-.51c0-37.6 26.5-67.89 62.59-67.89 38.61 0 60.56 31.55 60.56 66.12a9 9 0 01-9.08 9.09H19.68c2.78 28.26 22.72 44.16 45.93 44.16 16.16 0 28-6.31 37.61-15.14a8.39 8.39 0 0114.13 6.06 8.38 8.38 0 01-3 6.31c-12.35 11.86-27.03 19.68-49.24 19.68zm38.61-75.46C101.7 92 88.08 71.28 62.08 71.28c-22.71 0-39.87 18.93-42.4 44.41zM163.28 29.89h-51.23a9.27 9.27 0 01-9.34-9.08 9.48 9.48 0 019.34-9.34H234.7a9.48 9.48 0 019.3 9.34 9.27 9.27 0 01-9.34 9.08h-51.19v149.4a10.1 10.1 0 11-20.19 0zM500.47 117a5.54 5.54 0 005.26-2.13 17.61 17.61 0 002.67-5.32c5.87-15.59 17.39-41.08 33.69-47.73 8.95-3.65 18.64-4.83 27.2-9.58 15.92-8.86 26.08-30.56 24.44-52.24-9.83 3.16-19.73 8-30.12 7.17s-21.75 1.09-31.09 6.26c-12.79 7.08-19.6 20.22-24.11 33.47-.56 1.67-1.11 3.33-1.64 5h-1.37c-39.37 0-68.14 31.3-68.14 68.14v.51c0 36.84 28.52 67.63 67.64 67.63A67.74 67.74 0 00573.29 120v-.5a67.67 67.67 0 00-20.75-49.07 120.35 120.35 0 00-12 4 36.57 36.57 0 00-7.12 4.11c12.22 9.27 20 24.41 20 41.41v.51c0 27.51-19.68 50.22-48 50.22-27.51 0-48.2-22.71-48.2-50.73v-.5c0-26.6 18.17-48.94 44.92-50.4q-2.1 9.18-3.45 18.49c-.75 5.16-6.09 27.57 1.78 29.46z"/></g></g></svg>
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
      <hr class="p-1 d-lg-none d-block">
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
          <button class="text-left btn btn-lg text-contrast">
            <b-icon icon="box-arrow-in-right"></b-icon>
            Sign In
          </button>
        </b-nav-item>
        <!-- User--lg screen -->
        <b-nav-item class="nav-link p-0 d-lg-block d-none" v-if="loggedIn" v-click-outside="closeProfile" @click="viewProfileMenu = true">
          <!-- User button in navbar -->
          <button class="text-left btn btn-lg text-contrast">
            <b-icon icon="person-circle"></b-icon>
            {{ this.currentUser.displayName }}
          </button>
          <!-- User menu itself -->
          <transition name="fade">
            <div v-if="viewProfileMenu" class="shadow card p-3 position-absolute eturo-dropdown-menu" id="">
              <router-link class="nav-link" :to="{ name: 'Profile', params: { uid: this.currentUser.uid } }">
                Profile
              </router-link>
              <a class="nav-link" @click.prevent @click="logout">Sign Out</a>
            </div>
          </transition>
        </b-nav-item>
        <!-- User--sm screen -->
        <b-nav-text class="nav-link p-0 d-lg-none d-block" v-if="loggedIn">
          <div class="text-left text-contrast label-lg">
            <b-icon icon="person-circle"></b-icon> User<hr>
            <router-link class="nav-link text-contrast" 
                :to="{ name: 'Profile', params: { uid: this.currentUser.uid } }">Profile
            </router-link>
            <a class="nav-link text-contrast" @click.prevent @click="logout">Sign Out</a>
          </div>
        </b-nav-text>
        <!-- create acc button -->
        <b-nav-item class="nav-link p-0" v-if="!loggedIn" to="/signup">
          <button class="text-left btn btn-lg text-contrast">
            <b-icon icon="person-plus"></b-icon>
            Create an Account
          </button>
        </b-nav-item>
        <!-- Notifications--lg screen -->
        <b-nav-item class="nav-link p-0 d-lg-block d-none" v-if="loggedIn" v-click-outside="closeNotifications" @click="viewNotificationsMenu = true">
          <!-- Notifications button in navbar -->
          <button class="text-left btn btn-lg text-contrast">
            <b-icon icon="bell-fill"></b-icon>
            Notifications
          </button>
          <!-- Notifications menu itself -->
          <transition name="fade">
            <div v-if="viewNotificationsMenu" class="shadow card p-3 position-absolute eturo-dropdown-menu" id="">
                                                <!-- <Notification /> -->
            </div>
          </transition>
        </b-nav-item>
        <!-- Notification--sm screen -->
        <b-nav-item class="nav-link p-0 d-lg-none d-block" v-if="loggedIn">
          <div class="text-left text-contrast label-lg">
            <b-icon icon="bell-fill"></b-icon> Notifications<hr>
                                                <!-- <Notification /> -->
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { auth } from '../../firebase'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'loggedIn',
      'currentUser',
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
  @media (min-width: 992px) {
    .navbar-search{
      min-width: 400px !important;
    }
  }
  .eturo-dropdown-menu{
    background-color: var(--eturo-contrast);
    color: var(--eturo-base)
  }
  .label-lg{
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  }
  .svg-content { 
    display: inline-block;
    top: 0;
    left: 0;
  }
  .svg-container { 
    display: inline-block;
    position: relative;
    width: 160px;
  }
  .svg-path{
    fill:var(--eturo-contrast);
  }
</style>