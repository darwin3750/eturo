<template>
  <div>
    <div class="container p-0 mt-sm-3" v-if="this.post">
      <div class="card shadow m-sm-1 p-4">
        <b-icon v-if="owner" class="mb-2 edit-button position-absolute" icon="pencil-square" variant="" @click="toggleEdit"></b-icon>
        <div v-if="!editing" >
          <!-- display title -->
          <h2 class="mb-0"> {{ title }} </h2>
          <!-- HR -->
          <hr class="hr-eturo p-1"/>
          <section class="d-flex justify-content-between">
            <!-- post details -->
            <div>
            <h5 class="text-muted"> {{ post.createdAt }} | Posted by {{ displayName }} </h5>
            </div>
            <!-- apples -->
            <div>
              apple goes here
            </div>
          </section>
          <!-- display main body -->
          <p class="post-body p-4 mt-4"> {{ body }} </p>
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
        <h3>Comments</h3>

        <hr>
        <!-- Display random image every refresh -->
        <img v-if="randomPic==0" src="../assets/undraw_content.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3">
        <img v-else-if="randomPic==1" src="../assets/undraw_share_opinion.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
        <img v-else-if="randomPic==2" src="../assets/undraw_online_test.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
        <img v-else-if="randomPic==3" src="../assets/undraw_online_discussion.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
        <img v-else-if="randomPic==4" src="../assets/undraw_video_call.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
        <img v-else-if="randomPic==5" src="../assets/undraw_night_calls.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3 mb-3">
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
import { userConverter } from "../models/user";
import { topicConverter } from '../models/topic';
import { postConverter } from '../models/post';
import NewPost from '../components/Post/Form'

import Error from "../components/404";
import Loading from "../components/Loading";

export default {
  beforeMount() {
    const { post_uid, topic_uid } = this.$route.params;
    this.topic = topic_uid;
    
    topicCollection.doc(this.topic).collection('posts')
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
    });
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
      topic: ""
    }
  },
  created(){
    this.randomPic = Math.floor(Math.random() * 5)
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
  .hr-eturo{
    background: linear-gradient(15deg, var(--eturo-main), var(--eturo-accent1));
  }
  .post-body{
    border-radius: 1.25rem !important;
    border: 1px dotted var(--eturo-main-pos1);
    font-size: 1.1rem;
  }.edit-button{
    right: 14px;
    top: 14px;
  }
</style>