<template>
  <router-link :to="{ name: 'Post', params: { post_uid: post.id, topic_uid: topic } }" class="post-slug card shadow m-1 p-2">
    <div >
      <h1 class="mb-0"> {{ title }} </h1>
      <small class="text-muted"> {{ displayName }} </small>
      <small class="text-muted"> {{ post.createdAt }} </small>
      <p class="text-truncate"> {{ body }} </p>
    </div>
  </router-link>
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
      const { displayName } = snapshot.data()
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

<style scoped>
  .post-slug{
    max-height: 10rem !important;
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
</style>