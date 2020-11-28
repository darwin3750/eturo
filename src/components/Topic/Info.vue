<template>
  <div class="card shadow p-3 vp-transition" v-in-viewport>
    <b-icon v-if="mod" class="mb-2 edit-buttton position-absolute" icon="pencil-square" variant="" @click="toggleEdit"></b-icon>
    <!-- Display random image every refresh -->
    <img v-if="randomPic==0" src="../../assets/undraw_content.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3">
    <img v-else-if="randomPic==1" src="../../assets/undraw_share_opinion.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
    <img v-else-if="randomPic==2" src="../../assets/undraw_online_test.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
    <img v-else-if="randomPic==3" src="../../assets/undraw_online_discussion.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
    <img v-else-if="randomPic==4" src="../../assets/undraw_video_call.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
    <img v-else-if="randomPic==5" src="../../assets/undraw_night_calls.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
    <!-- display title -->
    <h2>t/{{ topic.title }} </h2>
    <!-- display desc -->
    <div v-if="!editing">
      <p class="p-2"> {{ topic.description }} </p>
    </div>
    <!-- edit desc -->
    <div v-else-if="mod && editing" class="form-group">
      <textarea class="form-control" v-model="topic.description"></textarea>
      <input type="submit" value="update" class="mt-2 btn btn-sm btn-primary" />
    </div>
    <hr class="hr-eturo p-1"/>
    <small class="text-right"> Founded: {{ topic.createdAt }} </small>
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
  created(){
    this.randomPic = Math.floor(Math.random() * 5)
  },
}
</script>

<style scoped>
  .hr-eturo{
    background: linear-gradient(15deg, var(--eturo-main), var(--eturo-accent1));
  }
</style>