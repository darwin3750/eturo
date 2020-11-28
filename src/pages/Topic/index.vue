<template>
  <div class="container">
    <section class="row mt-3">
      <!-- Topic info -->
      <section class="col-lg-4">
        <Info v-bind:topic="currentTopic" v-bind:mod="isModerator"/>
      </section>
      <!-- Topic posts -->
      <section class="col-lg-8">
        <div class="card shadow p-3">
          <NewPost @submit-post="addPost" ref="newPostForm"/>
          <div v-for="post in posts" :key="post.id">
            <Post :post="post" :topic="currentTopic.id" @destroy-post="destroyPost" />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { topicCollection } from '../../../firebase'
import { topicConverter } from '../../models/topic'

import Info from '../../components/Topic/Info'
import Post from '../../components/Post/'
import NewPost from '../../components/Post/Form'
import { PostModel } from '../../models/post'

export default {
  components: {
    Info, Post, NewPost,
  },
  computed: {
    ...mapGetters(['currentUserReference'])
  },
  data() {
    return {
      currentTopic: {},
      isModerator: false,
      posts: [],
    }
  },
  beforeMount() {
    const topicSlug = this.$route.params.slug.toString()
    topicCollection.doc(topicSlug).withConverter(topicConverter).get()
      .then((topic) => {
        if (!topic.exists) {
          // redirect to a 404 page w/ a copy
          alert("Topic does not exist")
        } else {
          this.currentTopic = topic.data()

          // is the user a moderator
          this.currentTopic.isModerator(this.currentUserReference).then(bool => {
            this.isModerator = bool
          })
          // get all posts and set
          this.currentTopic.allPosts().then(posts => {
            this.posts = posts
          })
        }
      })
  }, // beforeMount
  methods: {
    async addPost(post) {
      post.createdBy = this.currentUserReference
      const res = await this.currentTopic.addPost(post)
      // only errors has a message property
      if(!res.message) {
        this.posts.unshift(res)
        this.$refs.newPostForm.reset()
      }
    },
    async destroyPost(postId) {
      const res = await this.currentTopic.destroyPost(postId)
      this.posts = this.posts.filter(post => post.id != postId)
    }
  }
}
</script>

<style>

</style>