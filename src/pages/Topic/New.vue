<template>
  <div :class="{ 'border-danger': errors.length }" class="col-md-6 card bg-light mt-4 mr-auto ml-auto p-4">
    <h1> Create a new topic! </h1>
    <p class="text-muted"> Topics shouldn't be taken lightly... we made a whole page just for creating one! </p>
    <form @submit.prevent @submit="addTopic" >
      <div class="form-group">
        <div class="float-left">
          <label> Title </label>
          <small class="text-muted"> the slug that will appear in the browser (e.g t/upgrading-ram) </small>
        </div>
        <input v-model="title" class="form-control" type="text" placeholder="upgrading-ram" />
        <!-- show all topic errors -->
        <div v-for="error, index in errors" key="index">
          <small> <span class="font-weight-bolder text-danger"> {{ error }} </span> </small>
        </div>

        <label class="float-left mt-4"> Short description </label>
        <textarea v-model="description" class="form-control" placeholder="This is a place for talking about upgrading ram."/>
        <input class="float-right mt-2 btn btn-success" type="submit" value="Create" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { topicCollection, userCollection } from '../../../firebase'
import { topicConverter, topicSlugGenerator } from '../../models/topic'
import { moderatorConverter, ROLES } from '../../models/moderator'

export default {
  computed: {
    ...mapGetters(['currentUserReference'])
  },
  methods: {
    async addTopic() {
      const slug = topicSlugGenerator(this.title)
      const queryPrefix = topicCollection.doc(slug).withConverter(topicConverter)
      const available = await queryPrefix.get().then(snapshot => !snapshot.exists)

      if (available) {
        Promise.all([
          // create the topic
          queryPrefix.set(topicConverter.toFirestore({
            title: this.title,
            description: this.description,
            createdBy: this.currentUserReference,
          })),
          // add the user inside the moderators of that topic
          queryPrefix.collection('moderators').add(moderatorConverter.toFirestore({
            user: this.currentUserReference,
            role: ROLES.owner,
          }))
        ]).then(() => {
          this.$router.push({ name: "Topic", params: { slug: slug} })
        }).catch(error => {
          // delete the document (might have already gotten to the second promise)
          queryPrefix.delete()
          alert("Error creating your title! Try refreshing your webpage.")
        })

      } else {
        const copy = `This topic already exists! Contribute to t/${slug} or make a completely different topic.`
        this.errors.push(copy)
      }
    }
  },
  data() {
    return {
      title: "",
      description: "",
      errors: [],
    }
  }
}
</script>

<style>

</style>