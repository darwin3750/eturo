<template>
  <div>
    <form
      class="form col-md-4 m-auto p-3 shadow rounded"
      @submit.prevent
      @submit="authenticate"
    >

      <div class="form-group">
        <label> Display Name: </label>
        <input class="form-control" type="text" v-model="displayName" autocomplete="username" required/>
      </div>

      <div class="form-group">
        <label> Email: </label>
        <input class="form-control" type="email" v-model="email" autocomplete="email" />
      </div>

      <div class="form-group">
        <label> Password:</label>
        <input class="form-control" type="password" v-model="password" autocomplete="new-password" />
      </div>

      <div class="form-group">
        <label> Password confirmation:</label>
        <input class="form-control" type="password" v-model="passwordConfirmation" autocomplete="new-password"/> 
      </div>

      <div class="form-group mb-1">
        <input class="float btn btn-primary" type="submit" value="Login" />
      </div>

      <li
        v-for="error,index in errors"
        :key="index"
      >
        {{ error }}
      </li>

    </form>
  </div> 
</template>

<script>
import { auth, userCollection } from '../../firebase'
import { userConverter } from '../models/user'

export default {
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    }
  },
  methods: {
    authenticate() {
      if (this.password === this.passwordConfirmation) {
        auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // update profile of successfully created user (displayname)
            auth.currentUser.updateProfile({
              displayName: this.displayName,
            })
          })
          .then(() => {
            // add the authenticated user to the users collection
            userCollection.doc(auth.currentUser.uid).set(
              userConverter.toFirestore({
                displayName: this.displayName,
                email: this.email,
              })
            )
          })
          .then(() => {
            // toggle state and navigate
            this.$store.commit('toggleCurrentUser')
            this.$router.push({ path: "/" })
          })
          .catch((error) => {
            if(!this.errors.includes(error.message)) this.errors.push(error.message)
          })
      } else {
        const msg = "Passwords do not match!"
        if(!this.errors.includes(msg)) this.errors.push(msg)
      }
    },
  }
}
</script>

<style>

</style>