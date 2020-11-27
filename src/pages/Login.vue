<template>
  <div class="container p-0">
    <div class="card shadow rounded-lg m-lg-5 p-lg-5 p-3">
      <div class="row">
        <section class="col-lg-6">
          <div class="d-flex flex-column align-items-center">
            <img src="../assets/eTuro_banner.png" height="auto" width="200px">
            <br/>
            <img src="../assets/undraw_education.svg" height="auto" width="300px">
            <br/>
          </div>
          
        </section>
        <section class="col-lg-6">
          <form class="form" @submit.prevent @submit="authenticate">
            <h3>Sign in to eTuro!</h3>
            <hr class="hr-eturo p-1"/>
            <div class="form-group">
              <label>Email: </label>
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="email"
                autocomplete="email"
                placeholder="brute_fours@hackfest.com"
              />
            </div>

            <div class="form-group">
              <label>Password:</label>
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                autocomplete="new-password"
                placeholder="**********"
              />
            </div>

            <div class="form-group mb-1 d-flex justify-content-center">
              <input class="float btn btn-lg btn-eturo w-50" type="submit" value="Login" />
            </div>

            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../../firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    authenticate() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$store.commit("toggleCurrentUser");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          if (!this.errors.includes(error.message))
            this.errors.push(error.message);
        });
    },
  },
};
</script>

<style scoped>
  h3{
    font-family: InterBold;
    text-align: center;
  }
  label{
    font-size: 1.2rem;
  }
  .hr-eturo{
    background: linear-gradient(15deg, var(--eturo-main), var(--eturo-accent1));
  }
</style>