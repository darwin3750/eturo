<template>
  <div>
    <div class="container p-0" v-if="this.user">
      <section class="row mt-md-3">
        <!-- User info -->
        <section class="col-lg-4">
          <UserInfo v-bind:user="this.user" />
        </section>
        <!-- User posts/comments/etc -->
        <section class="col-lg-8 mt-lg-0 mt-3 pb-3 pl-3 pr-3">
          <div class="shadow">
            <b-nav tabs justified>
              <b-nav-item link-classes="user-nav-active" @click="switchTo">Posts</b-nav-item>
              <b-nav-item link-classes="user-nav" @click="switchTo">Comments</b-nav-item>
              <b-nav-item link-classes="user-nav" @click="switchTo">Likes </b-nav-item>
            </b-nav>
            <div class="card p-3 maincard">
              <transition name="fade">
                <div v-if="currentTab === 'Posts'">
                  <Post v-for="post in posts" :key="post.id" :post="post" />
                </div>
              </transition>
            </div>
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
import { mapGetters } from 'vuex'
import { userCollection, topicCollection } from "../../firebase"
import { userConverter } from "../models/user"
import { postConverter } from "../models/post"

import UserInfo from "../components/UserInfo"
import Error from "../components/404"
import Loading from "../components/Loading"
import Post from '../components/Post/index'

export default {
  computed: {
    ...mapGetters(['currentUser']),
  },
  data() {
    return {
      user: null,
      failedLoad: false,
      currentTab: "Posts",
      posts: [],
    };
  },
  components: {
    UserInfo,
    Error,
    Loading,
    Post,
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
          return
        }
        this.user = snapshot.data()
        this.getAllPosts()
      });
  },
  watch: {
    currentTab: function(newTab, oldTab) {
      console.log('switched tabs, need to fetch for', newTab, 'now')
    }
  },
  methods: {
    switchTo(e) {
      document.querySelector(".user-nav-active").classList.replace("user-nav-active", "user-nav");
      e.target.classList.replace("user-nav", "user-nav-active");
      this.currentTab = e.target.textContent;
    },
    // get all posts of the user from all topics
    getAllPosts() {
      topicCollection.get().then(allTopics => {
        allTopics.forEach(topic => {
          topicCollection.doc(topic.id).collection('posts').withConverter(postConverter)
            .where('createdBy', "==", userCollection.doc(this.$route.params.uid)).get()
            .then(allPosts => {
              allPosts.forEach(snapshot => {
                const post = snapshot.data()
                post.setTopic(topic.id)
                this.posts.push(post)
              })
            })
        })
      })
    },
  },
};
</script>

<style scoped>
  .user-nav{
    color: var(--eturo-main-pos2);
    background: var(--eturo-main-neg6);
    border-color: var(--eturo-main-neg2);
    margin-left: 1px;
    margin-right: 1px;
  }
  .user-nav:hover{
    color: var(--eturo-main-pos6);
    background: var(--eturo-main-neg4);
    border-color: var(--eturo-main-neg2);
    border: 1px solid var(--eturo-main-pos1);
  }
  .user-nav-active{
    color: var(--eturo-contrast);
    background: var(--eturo-main);
    border-color: var(--eturo-base);
  }
  .user-nav-active:hover{
    border: 1px solid var(--eturo-main-pos1);
  }
  .maincard{
    border-radius: 0 0 0.35rem 0.35rem;
    border: 1px solid var(--eturo-main-pos1);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>