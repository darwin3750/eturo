<template>
  <div>
    <form @submit.prevent @submit="$emit('new-comment', { body })">
      <div class="form-group">
        <label> Comment </label>
        <textarea
          placeholder="Write your reply..."
          v-model="body"
          class="form-control"
        />
        <div class="d-flex justify-content-end">
          <input type="submit" value="Post" class="btn btn-eturo btn-lg mt-2"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      body: "",
    }
  },
  methods: {
    reset() {
      this.body = ""
    }
  }
}
</script>

<style>

</style>