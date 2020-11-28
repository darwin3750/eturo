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
          <hr />
          <Comment v-for="comment in comments" :key="comment.id" :comment="comment" @destroy-comment="destroyComment" />
          <hr />
          <NewComment @new-comment="addComment" ref="newCommentForm"/>
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
    }
  },
  components: {
    Error,
    Loading,
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
  },
}
</script>

<style>

</style>