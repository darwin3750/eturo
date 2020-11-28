<template>
  <form @submit.prevent @submit="$emit('new-post', { title, body })">
    <div class="form-group">
      <h3> Add a post! </h3>
      <label> Title </label>
      <input v-model="title" type="text" class="form-control"/>
      <label> Body </label>
      <textarea v-model="body" class="form-control"/>
      <input type="submit" value="post" class="btn btn-info float-right mt-2"/>
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
  },
  methods: {
    reset() {
      this.title = ""
      this.body = ""
    }
  }
}
</script>

<style>

</style>