<template>
  <div>
    <section class="card shadow p-3 vp-transition" v-in-viewport>
      <b-icon v-if="owner" class="mb-2 edit-buttton position-absolute" icon="pencil-square" variant="" @click="toggleEdit"></b-icon>
      <!-- Username -->
      <label data-toggle="tooltip" data-placement="right" class="underline-dotted"
          title="This is how other users of eTuro see you.">Username:</label>
      <h2 v-if="!editing"> {{ this.displayName }} </h2>
      <input class="h2" v-else type="text" v-model="displayName" />
      <!-- Bio -->
      <label data-toggle="tooltip" data-placement="right" class="underline-dotted"
          title="A brief description of you.">Bio:</label>
      <div v-if="!editing">
        <p> {{ this.bio }} </p>
      </div>
      <div v-else-if="owner && editing" class="form-group">
        <textarea class="form-control" v-model="bio">
        </textarea>
        <input type="submit" value="confirm changes" class="mt-2 btn btn-block btn-eturo" @click="updateInfo"/>
      </div>
      <!-- Badges -->
      <label data-toggle="tooltip" data-placement="right" class="underline-dotted"
          title="Your earned badges. Click for more information.">Badges: 
          <router-link class="cursor-pointer" to="/badgesinfo">
            <b-icon icon="question-circle"></b-icon>
          </router-link>
          </label>
      <!-- HR -->
      <hr class="hr-eturo p-1"/>
      <small class="text-right"> Joined {{ this.user.createdAt }} </small>
      <!-- SVG -->
      <img src="../assets/undraw_profile.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3"><br/>
    </section>
    <!-- Posts, Comments, and Likes count -->
    <section class="card shadow d-flex flex-row mt-3 rounded-lg vp-transition" v-in-viewport>
      <div class="flex-fill p-3">
        <h5 class="text-center">Posts</h5>
        <p class="text-center"> {{ stats.posts }} </p>
      </div>
      <div class="flex-fill p-3">
        <h5 class="text-center">Comments</h5>
        <p class="text-center"> {{ stats.comments }} </p>
      </div>
      <div class="flex-fill p-3">
        <h5 class="text-center">Apples Given</h5>
        <p class="text-center">{{ stats.apples }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import { auth, userCollection } from '../../firebase'
import { mapGetters } from 'vuex'

export default {
  props: ['user', 'stats'],
  beforeMount() {
    this.owner = this.currentUser.uid === this.$route.params.uid
    const { displayName, bio } = this.user
    this.displayName = displayName || ""
    this.bio = bio || ""
  },
  computed: {
    ...mapGetters(['currentUserReference', 'currentUser']),
  },
  data() {
    return {
      displayName: "",
      owner: false,
      editing: false,
      bio: "",
    }
  },
  methods: {
    updateInfo() {
      userCollection.doc(this.currentUser.uid).update({
        displayName: this.displayName,
        bio: this.bio,
      }).then(() => {
        auth.currentUser.updateProfile({
          displayName: this.displayName,
        })
      }).then(() => {
        this.editing = false
      }).catch((error) => {
        alert("Failed to update the your info! Must be your internet connection...")
      })
    },
    toggleEdit() {
      this.editing = !this.editing
    }
  }, // methods
}
</script>

<style scoped>
  .edit-buttton{
    top: 0; 
    right: 0;
    padding: 0.75rem 1.55rem;
  }
  .underline-dotted{
    text-decoration: underline dotted;
  }
  .hr-eturo{
    background: linear-gradient(15deg, var(--eturo-main), var(--eturo-accent1));
  }
  .flex-fill:hover{
    background: rgb(223, 223, 223);
    transition: 0.4s;
  }
</style>