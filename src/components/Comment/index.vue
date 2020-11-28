<template>
  <div>
    <h4> {{ displayName }} </h4>
    <span class="text-muted"> {{ comment.createdAt }} </span>
    <p> {{ comment.body }} </p>
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
        const { displayName } = snapshot.data()
        console.log('snapshot:', snapshot.data())
        this.displayName = displayName
      })
  },
  data() {
    return {
      displayName: "",
    }
  },
}
</script>

<style>

</style>