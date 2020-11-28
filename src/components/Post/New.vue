<template>
  <form @submit.prevent>
    <div class="form-group">
      <h3> Add a post! </h3>
      <label> Title </label>
      <input v-model="title" type="text" class="form-control"/>
      <label> Body </label>
      <textarea v-model="body" class="form-control"/>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      body: "",
    }
  }
}
</script>

<style>

</style>