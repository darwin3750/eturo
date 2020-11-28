<template>
  <div class="container">
    <section class="row mt-3">
      <!-- User info -->
      <section class="col-lg-4">
        <Info v-bind:topic="currentTopic" v-bind:mod="isModerator"/>
      </section>
      <!-- User posts -->
      <section class="col-lg-8">
        <div class="card shadow p-3">
          <NewPost />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { topicCollection } from '../../../firebase'
import { topicConverter } from '../../models/topic'

import Info from '../../components/Topic/Info'
import Post from '../../components/Post/'
import NewPost from '../../components/Post/New'

export default {
  components: {
    Info, Post, NewPost,
  },
  data() {
    return {
      currentTopic: {},
      isModerator: false,
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
          this.isModerator = this.currentTopic.isModerator(this.$store.getters.currentUserReference)
        }
      })
  }, // beforeMount
}
</script>

<style>

</style>