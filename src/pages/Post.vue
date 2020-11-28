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
          <button @click="$emit('destroy-post', post.id)" class="btn btn-sm btn-danger"> delete </button>
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
import { userConverter } from "../models/user";
import { topicConverter } from '../models/topic';
import { postConverter } from '../models/post';

import Error from "../components/404";
import Loading from "../components/Loading";

export default {
  beforeMount() {
    const postId = this.$route.params.post_uid;
    const topicId = this.$route.params.topic_uid;

    topicCollection.doc(topicId).collection('posts')
    .doc(postId).withConverter(postConverter).get().then((snapshot) => {
      if (!snapshot.exists) {
        this.failedLoad = true;
        return;
      }
      this.post = snapshot.data();

      this.title = this.post.title
      this.body = this.post.body
      userCollection.doc(this.post.createdBy.id).get().then(snapshot => {
        const { displayName} = snapshot.data()
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
    }
  },
  components: {
    Error,
    Loading,
  },
}
</script>

<style>

</style>