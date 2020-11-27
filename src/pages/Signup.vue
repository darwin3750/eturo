<template>
  <div>
    <form
      class="form col-md-4 m-auto p-3 shadow rounded"
      @submit.prevent
      @submit="authenticate"
    >

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
import { auth } from '../../firebase'

export default {
  data() {
    return {
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