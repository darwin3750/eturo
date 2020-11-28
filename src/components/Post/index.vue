<template>
  <div>
    <b-icon v-if="owner" class="mb-2 edit-buttton position-absolute" icon="pencil-square" variant="" @click="toggleEdit"></b-icon>
    <div v-if="!editing">
      <h1 class="mb-0"> {{ title }} </h1>
      <small class="text-muted"> {{ displayName }} </small>
      <small class="text-muted"> {{ post.createdAt }} </small>
      <p> {{ body }} </p>
    </div>
    <div v-if="owner && editing" >
      <NewPost
        v-bind:post="{ title, body }"
        ref="editPostForm"
        @submit-post="updatePost"
      />
      <button @click="$emit('destroy-post', post.id)" class="btn btn-sm btn-danger"> delete </button>
      <hr />
    </div>
  </div>
</template>

<script>
import { userCollection, topicCollection } from '../../../firebase'
import { userConverter } from '../../models/user'
import { mapGetters } from 'vuex'
import NewPost from '../../components/Post/Form'

export default {
  props: ['post', 'topic'],
  components: {
    NewPost,
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  beforeMount() {
    this.title = this.post.title
    this.body = this.post.body

    userCollection.doc(this.post.createdBy.id).get().then(snapshot => {
      const { displayName} = snapshot.data()
      this.owner = this.currentUser.uid === snapshot.id
      this.displayName = displayName
    })
  },
  data() {
    return {
      owner: false,
      editing: false,
      displayName: "",
      title: "",
      body: "",
    }
  },
  methods: {
    toggleEdit() {
      if (this.owner) this.editing = !this.editing
    },
    updatePost(postData) {
      const { title, body } = postData
      this.title = title
      this.body = body
      topicCollection.doc(this.topic).collection('posts').doc(this.post.id).update({
        title, body
      }).then(() => {
        this.toggleEdit()
      }).catch(() => {
        alert("Failed to update your post! Must be your internet connection...")
      })
    },
  },
}
</script>

<style>

</style>