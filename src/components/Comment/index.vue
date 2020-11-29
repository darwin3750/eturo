<template>
  <div class="comment-slug card shadow m-1 p-3">
    <div class="d-flex justify-content-between">
      <h4>
        <router-link :to="{ name: 'Profile', params:{ uid: uid } }"> {{ displayName }} </router-link>
      </h4>
      <a class="a"
      @click="$emit('destroy-comment', comment.id)"
      v-if="owner"
      > delete
      </a>
    </div>
    <span class="text-muted"> {{ comment.createdAt }} </span>
    <p class="text-truncate pl-4 pr-4"> {{ comment.body }} </p>
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

<style scoped>
  .comment-slug{
    
  }
  .a {
    color: var(--eturo-main) !important;
    text-decoration: none !important;
    background-color: transparent !important;
    cursor: pointer;
  }

  .a:hover {
    color: var(--eturo-main) !important;
    text-decoration: underline !important;
  }

  .a:not([href]):not([class]) {
    color: inherit !important;
    text-decoration: none !important;
  }

  .a:not([href]):not([class]):hover {
    color: inherit !important;
    text-decoration: none !important;
  }
</style>