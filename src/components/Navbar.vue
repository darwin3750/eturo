<template>
  <nav>
    <router-link to="/"> Home </router-link>
    <router-link v-if="!loggedIn" to="/signup" > Sign up</router-link>
    <a href="#" v-if="loggedIn" @click.prevent @click="logout"> Logout </a>
    <router-link v-else to="/login" > Login </router-link>
  </nav>
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
    }
  }, // methods
}
</script>

<style>

</style>