<template>
  <router-link :to="{ name: 'Post', params: { post_uid: post.id, topic_uid: topicId } }" class="post-slug card shadow m-1 p-2">
    <div >
      <h1 class="mb-0"> {{ title }} </h1>
      <span class="text-muted"> Created by {{ displayName }} | {{ post.createdAt }} </span>
      <p class="text-truncate"> {{ body }} </p>
    </div>
  </router-link>
</template>

<script>
import { userCollection, db } from '../../../firebase'
import { userConverter } from '../../models/user'
import { mapGetters } from 'vuex'
import NewPost from '../../components/Post/Form'

export default {
  props: ['post'],
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
      this.topicId = this.post.topic.id
    })
  },
  data() {
    return {
      owner: false,
      editing: false,
      displayName: "",
      title: "",
      body: "",
      topicId: "",
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
      db.doc(this.post.topic).collection('posts').doc(this.post.id).update({
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
    color: var(--eturo-main-pos2) !important;
    transition: 0.5s;
    border: 1px solid var(--eturo-main-neg4);
  }.post-slug:hover{
    text-decoration: none !important;
    color: var(--eturo-main-pos2) !important;
    border: 2px solid var(--eturo-main-pos1);
  }
</style>