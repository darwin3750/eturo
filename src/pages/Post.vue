<template>
  <div>
    <div class="container p-0" v-if="this.post">
      <div class="card shadow m-1 p-2">
        <b-icon v-if="owner" class="mb-2 edit-buttton position-absolute" icon="pencil-square" variant="" @click="toggleEdit"></b-icon>
        <div v-if="!editing" >
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
          <button @click="destroyPost" class="btn btn-sm btn-danger"> delete </button>
          <hr />
        </div>
      </div>
    </div>
    <div v-else>
      <Error v-if="failedLoad" />
      <Loading v-else />
    </div>
  </div>
</template>

<script>
import { userCollection, topicCollection } from "../../firebase";
import { mapGetters } from 'vuex'
import { topicConverter } from '../models/topic';
import { postConverter } from '../models/post';
import NewPost from '../components/Post/Form'

import Error from "../components/404";
import Loading from "../components/Loading";

export default {
  beforeMount() {
    const { post_uid, topic_uid } = this.$route.params;
    this.topicId = topic_uid;

    Promise.all([
      topicCollection.doc(this.topicId).withConverter(topicConverter).get().then(snapshot => {
        this.topic = snapshot.data()
      }), // load topic
      topicCollection.doc(this.topicId).collection('posts')
      .doc(post_uid).withConverter(postConverter).get().then((snapshot) => {
        if (!snapshot.exists) {
          this.failedLoad = true;
          return;
        }
        this.post = snapshot.data();

        this.title = this.post.title
        this.body = this.post.body
        userCollection.doc(this.post.createdBy.id).get().then(snapshot => {
          const { displayName } = snapshot.data()
          this.owner = this.currentUser.uid === snapshot.id
          this.displayName = displayName
        })
      }), // load actual post
    ])
    
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  data() {
    return {
      owner: false,
      editing: false,
      displayName: "",
      title: "",
      body: "",
      post: null,
      failedLoad: false,
      topic: "",
    }
  },
  components: {
    Error,
    Loading,
    NewPost
  },
  methods: {
    toggleEdit() {
      if (this.owner) this.editing = !this.editing
    },
    updatePost(postData) {
      const { title, body } = postData
      this.title = title
      this.body = body
      topicCollection.doc(this.topicId).collection('posts').doc(this.post.id).update({
        title, body
      }).then(() => {
        this.toggleEdit()
      }).catch(() => {
        alert("Failed to update your post! Must be your internet connection...")
      })
    },
    async destroyPost() {
      const res = await this.topic.destroyPost(this.post.id)
      this.$router.push({ name: "Topic", params: { slug: this.topic.id } })
    },
  },
}
</script>

<style>

</style>