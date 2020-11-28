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
              <b-nav-item link-classes="user-nav-active" @click="switchTo">Posts</b-nav-item>
              <b-nav-item link-classes="user-nav" @click="switchTo">Comments</b-nav-item>
              <b-nav-item link-classes="user-nav" @click="switchTo">Likes </b-nav-item>
            </b-nav>
            <!-- 
            <Posts v-if="currentTab = Posts" />
            <Comments v-else-if="currentTab = Comments" />
            <Likes v-else-if="currentTab = Likes" /> 
            -->
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
  data() {
    return {
      currentTab: "Posts",
    }
  },
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
  methods: {
    switchTo(e) {
      document.querySelector(".user-nav-active").classList.replace("user-nav-active", "user-nav");
      e.target.classList.replace("user-nav", "user-nav-active");
      this.currentTab = e.target.textContent;
    }
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

<style scoped>
  .user-nav{
    color: var(--eturo-main-pos2);
    background: var(--eturo-main-neg6);
    border-color: var(--eturo-main-neg2);
  }
  .user-nav:hover{
    color: var(--eturo-base);
    background: var(--eturo-main-neg4);
    border-color: var(--eturo-main-neg2);
  }
  .user-nav-active{
    color: var(--eturo-contrast);
    background: var(--eturo-main);
    border-color: var(--eturo-base);
  }
</style>