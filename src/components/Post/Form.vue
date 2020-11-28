<template>
  <form @submit.prevent @submit="$emit('submit-post', { title, body })">
    <div class="form-group">
      <label> Title </label>
      <input v-model="title" type="text" class="form-control"/>
      <label> Body </label>
      <textarea v-model="body" class="form-control"/>
      <div class="d-flex justify-content-end">
        <input type="submit" value="Done" class="btn btn-eturo btn-lg mt-2"/>
      </div>
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

<style scoped>
  label{
    font-size: 1.2rem;
  }.form-control{
    border: 1x solid var(--eturo-main-neg2);
  }
</style>