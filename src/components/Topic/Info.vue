<template>
  <div class="card shadow p-3">
    <b-icon v-if="mod" class="mb-2 edit-buttton position-absolute" icon="pencil-square" variant="" @click="toggleEdit"></b-icon>
    <h1> {{ topic.title }} </h1>
    <span class="font-weight-bolder"> Founded {{ topic.createdAt }} </span>
    <div v-if="!editing">
      <p> {{ topic.description }} </p>
    </div>
    <div v-else-if="mod && editing" class="form-group">
      <textarea class="form-control" v-model="topic.description"></textarea>
      <input type="submit" value="update" class="mt-2 btn btn-sm btn-primary" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['topic', 'mod'],
  data() {
    return {
      editing: false,
    }
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing
    }
  },
}
</script>

<style>

</style>