<template>
  <div class="card shadow p-3">
    <h1> {{ this.user.displayName }} </h1>
    <h3> Joined {{ this.user.createdAt }} </h3>
    <div v-if="owner && !editing || !owner">
      <b-icon icon="pencil-square" variant="" @click="editing = true"></b-icon>
      <p> {{ this.bio }} </p>
    </div>
    <div v-else-if="owner && editing" class="form-group">
      <textarea class="form-control" v-model="bio">
      </textarea>
      <input type="submit" value="update bio" class="mt-2 btn btn-sm btn-primary" @click="updateBio"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['user'],
  beforeMount() {
    this.owner = this.$store.getters.currentUser.uid === this.$route.params.uid
  },
  data() {
    return {
      owner: false,
      editing: false,
      bio: "this is the bio",
    }
  },
  methods: {
    updateBio() {
      this.editing = false
    },
  }, // methods
}
</script>

<style scoped>

</style>