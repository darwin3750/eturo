<template>
  <div>
    <h1> All things {{ $route.params.slug }} </h1>
  </div>
</template>

<script>
import { topicCollection } from '../../../firebase'
import { topicConverter } from '../../models/topic'

export default {
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
          this.isModerator = this.currentTopic.isModerator(this.$store.getters.currentUser.uid)
        }
      })
  }, // beforeMount
}
</script>

<style>

</style>