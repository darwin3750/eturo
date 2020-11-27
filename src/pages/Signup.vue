<template>
  <div class="container p-0">
    <div class="card shadow rounded-lg m-lg-5 p-lg-5 p-3">
      <div class="row">
        <section class="col-lg-6">
          <div class="d-flex flex-column align-items-center">
            <img
              src="../assets/eTuro_banner.png"
              height="auto"
              width="200px"
            />
            <br />
            <img
              src="../assets/undraw_login.svg"
              height="auto"
              width="300px"
            />
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia possimus asperiores harum voluptatibus ad ipsum commodi itaque, quo, omnis eligendi, consequatur corrupti doloribus voluptas error laborum cum iure? Aspernatur, porro?
            </p>
          </div>
        </section>
        <section class="col-lg-6">
          <form class="form" @submit.prevent @submit="authenticate">
            <h3>Join eTuro!</h3>
            <hr class="hr-eturo p-1" />

            <div class="form-group">
              <label> Display Name: </label>
              <input
                class="form-control"
                type="text"
                v-model="displayName"
                autocomplete="username"
                required
                placeholder="brutefours_88"
              />
            </div>

            <div class="form-group">
              <label> Email: </label>
              <input
                class="form-control"
                type="email"
                v-model="email"
                autocomplete="email"
                placeholder="brute_fours@hackfest.com"
              />
            </div>

            <div class="form-group">
              <label> Password:</label>
              <input
                class="form-control"
                type="password"
                v-model="password"
                autocomplete="new-password"
                placeholder="**********"
              />
            </div>

            <div class="form-group">
              <label> Password confirmation:</label>
              <input
                class="form-control"
                type="password"
                v-model="passwordConfirmation"
                autocomplete="new-password"
                placeholder="**********"
              />
            </div>

            <div class="form-group mb-1 d-flex justify-content-center">
              <input
                class="float btn btn-lg btn-eturo w-50"
                type="submit"
                value="Create Account"
              />
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
import { auth, userCollection } from "../../firebase";
import { userConverter } from "../models/user";

export default {
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    authenticate() {
      if (this.password === this.passwordConfirmation) {
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // update profile of successfully created user (displayname)
            auth.currentUser.updateProfile({
              displayName: this.displayName,
            });
          })
          .then(() => {
            // add the authenticated user to the users collection
            userCollection.doc(auth.currentUser.uid).set(
              userConverter.toFirestore({
                displayName: this.displayName,
                email: this.email,
              })
            );
          })
          .then(() => {
            // toggle state and navigate
            this.$store.commit("toggleCurrentUser");
            this.$router.push({ path: "/" });
          })
          .catch((error) => {
            if (!this.errors.includes(error.message))
              this.errors.push(error.message);
          });
      } else {
        const msg = "Passwords do not match!";
        if (!this.errors.includes(msg)) this.errors.push(msg);
      }
    },
  },
};
</script>

<style>
h3 {
  font-family: InterBold;
  text-align: center;
}
label {
  font-size: 1.2rem;
}
.hr-eturo {
  background: linear-gradient(15deg, var(--eturo-main), var(--eturo-accent1));
}
</style>