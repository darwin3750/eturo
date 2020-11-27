<template>
  <div class="col-md-6 m-auto">
    <h1> Create a new topic! </h1>
    <form @submit.prevent @submit="addTopic" >
      <div class="form-group">
        <div class="float-left">
          <label> Title </label>
          <small class="text-muted"> the slug that will appear in the browser (e.g t/upgrading-ram) </small>
        </div>
        <input class="form-control" type="text" placeholder="upgrading-ram" />
        <label class="float-left mt-4"> Short description </label>
        <textarea class="form-control" placeholder="This is a place for talking about upgrading ram."/>
        <input class="float-right mt-2" type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    addTopic() {
      console.log('add a new topic')
    }
  }
}
</script>

<style>

</style>