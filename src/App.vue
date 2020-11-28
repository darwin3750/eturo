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
  data() {
    return {
      reusedRoutes: ['Profile', 'Topic'],
    }
  },
  computed: {
    key() {
      if (this.reusedRoutes.includes(this.$route.name)) {
        return this.$route.fullPath
      } else {
        return this.$route.name
      }
    }
  }
}
</script>

<style>
  #app{
    
  }
</style>
