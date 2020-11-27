<template>
  <div id="app" class="theme2">
    <Navbar />
    <router-view :key="key"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    key() {
      if (this.$route.name === "Profile") {
        return this.$route.fullPath
      } else {
        return this.$route.name
      }
    }
  }
}
</script>

<style>

</style>
