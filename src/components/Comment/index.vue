<template>
  <div>
    <h4>
      <router-link :to="{ name: 'Profile', params:{ uid: uid } }"> {{ displayName }} </router-link>
    </h4>
    <span class="text-muted"> {{ comment.createdAt }} </span>
    <p> {{ comment.body }} </p>
    <button
      @click="$emit('destroy-comment', comment.id)"
      v-if="owner"
      class="btn btn-sm btn-danger"
    > delete
    </button>
  </div>
</template>

<script>
import { userConverter } from '../../models/user'
import { userCollection } from '../../../firebase'

export default {
  props: ['comment'],
  beforeMount() {
    userCollection.doc(this.comment.createdBy.id).withConverter(userConverter).get()
      .then(snapshot => {
        const { id, displayName } = snapshot.data()
        this.displayName = displayName
        this.owner = this.$store.getters.currentUser.uid === id
        this.uid = id
      })
  },
  data() {
    return {
      owner: false,
      displayName: "",
      uid: "placeholder",
    }
  },
}
</script>

<style>

</style>