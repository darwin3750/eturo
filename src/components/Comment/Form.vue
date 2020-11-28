<template>
  <div>
    <form @submit.prevent @submit="$emit('new-comment', { body })">
      <div class="form-group">
        <label> Comment </label>
        <textarea
          placeholder="I think this is very interesting..."
          v-model="body"
          class="form-control"
        />
        <input type="submit" value="comment" class="btn btn-info mt-2"/>
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