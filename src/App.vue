<template>
  <div id="app" class="theme2">
    <Navbar />
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>

<style>

</style>
