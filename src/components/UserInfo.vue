<template>
  <div class="card shadow p-3">
    <b-icon v-if="owner" class="mb-2" icon="pencil-square" variant="" @click="toggleEdit"></b-icon>
    <h1 v-if="!editing"> {{ this.displayName }} </h1>
    <input v-else type="text" v-model="displayName" />
    <h3> Joined {{ this.user.createdAt }} </h3>
    <div v-if="!editing">
      <p> {{ this.bio }} </p>
    </div>
    <div v-else-if="owner && editing" class="form-group">
      <textarea class="form-control" v-model="bio">
      </textarea>
      <input type="submit" value="update info" class="mt-2 btn btn-sm btn-primary" @click="updateInfo"/>
    </div>
  </div>
</template>

<script>
import { auth, userCollection } from '../../firebase'
import { mapGetters } from 'vuex'

export default {
  props: ['user'],
  beforeMount() {
    this.owner = this.currentUser.uid === this.$route.params.uid
    const { displayName, bio } = this.user
    this.displayName = displayName || ""
    this.bio = bio || ""
  },
  computed: {
    ...mapGetters(['currentUserReference', 'currentUser']),
  },
  data() {
    return {
      displayName: "",
      owner: false,
      editing: false,
      bio: "",
    }
  },
  methods: {
    updateInfo() {
      userCollection.doc(this.currentUser.uid).update({
        displayName: this.displayName,
        bio: this.bio,
      }).then(() => {
        auth.currentUser.updateProfile({
          displayName: this.displayName,
        })
      }).then(() => {
        this.editing = false
      }).catch((error) => {
        alert("Failed to update the your info! Must be your internet connection...")
      })
    },
    toggleEdit() {
      this.editing = !this.editing
    }
  }, // methods
}
</script>

<style scoped>

</style>