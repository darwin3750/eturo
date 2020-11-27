<template>
  <div>
    <div class="container p-0" v-if="this.user">
      <section class="row mt-md-3">
        <!-- User info -->
        <section class="col-lg-4">
          <UserInfo v-bind:user="this.user" />
        </section>
        <!-- User posts/comments/etc -->
        <section class="col-lg-8 mt-lg-0 mt-3">
          <div class="card shadow p-3">
            <b-nav tabs justified>
              <b-nav-item active>Posts</b-nav-item>
              <b-nav-item>Comments</b-nav-item>
              <b-nav-item>Likes </b-nav-item>
            </b-nav>
            <p class="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, laudantium at modi rem quod ex provident quaerat
              incidunt quo ducimus praesentium atque perferendis fugiat
              veritatis ipsum suscipit quas saepe similique!
            </p>
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
import { userCollection } from "../../../firebase";
import { userConverter } from "../../models/user";
import UserInfo from "../../components/UserInfo";
import Error from "../../components/404";
import Loading from "../../components/Loading";

export default {
  beforeMount() {
    const userId = this.$route.params.uid;
    userCollection
      .doc(userId)
      .withConverter(userConverter)
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          this.failedLoad = true;
          return;
        }
        this.user = snapshot.data();
      });
  },
  data() {
    return {
      user: null,
      failedLoad: false,
    };
  },
  components: {
    UserInfo,
    Error,
    Loading,
  },
};
</script>

<style>
</style>