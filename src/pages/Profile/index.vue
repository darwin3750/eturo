<template>
  <div class="container" v-if="this.user">
    <section class="row mt-3">
      <!-- User info -->
      <section class="col-lg-4">
        <UserInfo v-bind:user="this.user" />
      </section>
      <!-- User posts -->
      <section class="col-lg-8">
        <div class="card shadow p-3">
          <b-nav tabs justified>
            <b-nav-item active>Posts</b-nav-item>
            <b-nav-item>Comments</b-nav-item>
            <b-nav-item>Likes </b-nav-item>
            <b-nav-item>Something else</b-nav-item>
          </b-nav>
          <p class="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, laudantium at modi rem quod ex provident quaerat incidunt quo ducimus praesentium atque perferendis fugiat veritatis ipsum suscipit quas saepe similique!
          </p>
        </div>
      </section>
    </section>
  </div>
  <div v-else>
    <h1 class="text-center mt-4"> {{ msg }} </h1>
  </div>
</template>

<script>
import { userCollection } from '../../../firebase'
import { userConverter } from '../../models/user'
import UserInfo from '../../components/UserInfo'
export default {
  beforeMount() {
    const userId = this.$route.params.uid
    userCollection.doc(userId).withConverter(userConverter).get().then(snapshot => {
      if(!snapshot.exists) {
        this.msg = "Looks like that user doesn't exist!"
        return
      }
      this.user = snapshot.data()
    })
  },
  data() {
    return {
      user: null,
      msg: "Loading user data..."
    }
  },
  components: {
    UserInfo,
  }
}
</script>

<style>

</style>