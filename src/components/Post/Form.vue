<template>
  <form @submit.prevent @submit="$emit('submit-post', { title, body })">
    <div class="form-group">
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
  props: ['post'],
  beforeMount() {
    if (this.post) {
      const { title, body } = this.post
      this.title = title
      this.body = body
    }
  },
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