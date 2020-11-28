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
              <span> {{ appledUsers.length }} </span>
              <a v-if="!appled" @click="addApple" class="btn p-0"> 
                <img src="../assets/apple.svg" height="auto" width="25px">
              </a>
              <img v-else src="../assets/apple.svg" height="auto" width="25px">
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
          <button @click="destroyPost" class="btn btn-sm btn-danger"> delete </button>
          <hr />
        </div>
        <h3>Comments</h3>
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment" @destroy-comment="destroyComment" />
          <hr />
        <NewComment @new-comment="addComment" ref="newCommentForm"/>
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
import { topicConverter } from '../models/topic';
import { postConverter } from '../models/post';

import Post from '../components/Post/'
import NewPost from '../components/Post/Form'
import Comment from '../components/Comment/'
import NewComment from '../components/Comment/Form'

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

        // load post and comments
        this.post = snapshot.data();
        // actually get comments
        this.post.getAllComments().then(comments => this.comments = comments)
        // load all post apples
        this.post.getAllApples().then(apples => {
          this.appledUsers = apples
          this.appled = !!this.appledUsers.find(apple => this.currentUser.uid === apple.createdBy.id)
        })

        this.title = this.post.title
        this.body = this.post.body

        // get the owner's display name
        userCollection.doc(this.post.createdBy.id).get().then(snapshot => {
          const { displayName } = snapshot.data()
          this.owner = this.currentUser.uid === snapshot.id
          this.displayName = displayName
        })
      }), // second promise
    ])
    
  },
  computed: {
    ...mapGetters(['currentUser', 'currentUserReference'])
  },
  data() {
    return {
      failedLoad: false,
      post: null,
      comments: [],
      owner: false,
      displayName: "",
      editing: false,
      title: "",
      body: "",
      topic: "",
      appledUsers: [],
      appled: true,
    }
  },
  created(){
    this.randomPic = Math.floor(Math.random() * 5)
  },
  components: {
    Error,
    Loading,
    Post,
    NewPost,
    Comment,
    NewComment,
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
    async addComment(comment) {
      comment.createdBy = this.currentUserReference
      const newComment = await this.post.addComment(comment)
      if(!newComment.message) {
        this.comments.push(newComment)
        this.$refs.newCommentForm.reset()
      }
    },
    async destroyComment(commentId) {
      const res = await this.post.destroyComment(commentId)
      if(res) {
        this.comments = this.comments.filter(comment => comment.id != commentId)
      } else {
        alert("Failed to delete the comment! Must be your internet connection...")
      }
    },
    async addApple() {
      const newApple = await this.post.addApple({ createdBy: this.currentUserReference })
      if (!newApple.message) {
        this.appled = true
        this.appledUsers.push(newApple)
      } else {
        alert("Had trouble giving an apple! Must be your internet connection...")
      }
    }
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