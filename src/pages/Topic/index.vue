<template>
  <div>
    <div class="container p-0" v-if="this.currentTopic">
      <section class="row mt-md-3">
        <!-- Topic info -->
        <section class="col-lg-4">
          <Info v-bind:topic="currentTopic" v-bind:mod="isModerator"/>
        </section>
        <!-- Topic posts -->
        <section class="col-lg-8 mt-lg-0 mt-3 pb-3 pl-3 pr-3 vp-transition" v-in-viewport>
          <button v-b-toggle.collapse-create-post class="btn btn-block btn-lg btn-eturo">Create Post</button>
          <div class="card shadow maincard pb-3">
            <!-- Create new post -->
              <div class="create-post">
                <b-collapse id="collapse-create-post" class="p-3">
                  <NewPost @submit-post="addPost" ref="newPostForm"/>
                </b-collapse>
              </div>
            <div v-for="post in posts" :key="post.id" class="pl-3 pr-3 pt-1 pb-1">
              <Post :post="post" @destroy-post="destroyPost" />
            </div>

            <img src="../../assets/undraw_done.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3">
          </div>
        </section>
      </section>
    </div>
    <div v-else>
      <Error v-if="failedLoad" />
      <Loading v-else />
    </div>
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
      const newPost = await this.currentTopic.addPost(post)
      // only errors has a message property
      if(!newPost.message) {
        newPost.setTopic(this.currentTopic.id)
        this.posts.unshift(newPost)
        this.$refs.newPostForm.reset()
      }
    },
  }
}
</script>

<style scoped>
  .btn-eturo{
    border-radius: 0.25rem 0.25rem 0 0 !important;
  }
  .maincard{
    border-radius: 0 0 0.25rem 0.25rem !important;
  }
  .create-post{
    background-color: #e0f1ef;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(318,768,380)'%3E%3Cstop offset='0' stop-color='%23e0f1ef'/%3E%3Cstop offset='1' stop-color='%2385c7bf'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='555' height='462.5' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.06'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
    border-left: 1px solid var(--eturo-main);
    border-right: 1px solid var(--eturo-main);
  }
</style>