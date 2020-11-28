<template>
  <div>
    <div class="container p-0" v-if="this.user">
      <section class="row mt-md-3">
        <!-- User info -->
        <section class="col-lg-4">
          <UserInfo :user="this.user" :stats="{ posts: posts.length, comments: comments.length, apples: applesGiven}" />
        </section>
        <!-- User posts/comments/etc -->
        <section class="col-lg-8 mt-lg-0 mt-3 pb-3 pl-3 pr-3">
          <div class="shadow vp-transition" v-in-viewport>
            <b-nav tabs justified>
              <b-nav-item link-classes="user-nav-active" @click="switchTo">Posts</b-nav-item>
              <b-nav-item link-classes="user-nav" @click="switchTo">Comments</b-nav-item>
              <b-nav-item link-classes="user-nav" @click="switchTo">Apples</b-nav-item>
            </b-nav>
            <div class="card p-3 maincard">
              <transition name="fade">
                <div v-if="currentTab === 'Posts'">
                  <Post v-for="post in posts" :key="post.id" :post="post" />
                </div>
                <div v-if="currentTab ==='Comments'">
                  <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
                </div>
                <div v-if="currentTab ==='Apples'">
                  <h1 class="text-center mt-2"> Received over {{ applesReceived }} apples </h1>
                </div>
              </transition>
              <img src="../assets/undraw_done.svg" height="auto" width="200px" class="ml-auto mr-auto mt-3">
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
import { userCollection, topicCollection, firebase } from "../../firebase"
import { userConverter } from "../models/user"
import { postConverter } from "../models/post"
import { commentConverter } from '../models/comment'

import UserInfo from "../components/UserInfo"
import Error from "../components/404"
import Loading from "../components/Loading"

import Post from '../components/Post/index'
import Comment from '../components/Comment/index'

export default {
  computed: {
    ...mapGetters(['currentUser', 'currentUserReference']),
  },
  data() {
    return {
      user: null,
      failedLoad: false,
      currentTab: "Posts",
      posts: [],
      comments: [],
      applesGiven: 0,
      applesReceived: 0,
    };
  },
  components: {
    UserInfo,
    Error,
    Loading,
    Post,
    Comment,
  },
  beforeMount() {
    const userId = this.$route.params.uid;
    userCollection.doc(userId).withConverter(userConverter).get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          this.failedLoad = true;
          return
        }
        this.user = snapshot.data()
        // all comments in existence
        firebase.firestore().collectionGroup('comments')
          .where('createdBy', '==', userCollection.doc(userId)).withConverter(commentConverter).get()
          .then(querySnapshot => {
            this.comments = querySnapshot.docs.map(snapshot => snapshot.data())
          })
        // all posts in existence
        firebase.firestore().collectionGroup('posts')
          .where('createdBy', '==', userCollection.doc(userId)).withConverter(postConverter).get()
          .then(querySnapshot => {
            this.posts = querySnapshot.docs.map(snapshot => {
              // just get the apples in between, yeah?
              const post = snapshot.data()
              post.getAllApples().then(x => this.applesReceived += x.length)
              return post
            })
          })
        // all the apples the user gave
        firebase.firestore().collectionGroup('apples')
          .where('createdBy', '==', userCollection.doc(userId)).withConverter(postConverter).get()
          .then(querySnapshot => {
            this.applesGiven = querySnapshot.docs.length
          })
        });
        // yes, the indent is like this
  },
  methods: {
    switchTo(e) {
      document.querySelector(".user-nav-active").classList.replace("user-nav-active", "user-nav");
      e.target.classList.replace("user-nav", "user-nav-active");
      this.currentTab = e.target.textContent;
    },
  },
};
</script>

<style scoped>
  .user-nav{
    color: var(--eturo-main-pos2);
    background: var(--eturo-main-neg6);
    border: 2px solid var(--eturo-main-neg2);
    margin-left: 1px;
    margin-right: 1px;
  }
  .user-nav:hover{
    color: var(--eturo-main-pos6);
    background: var(--eturo-main-neg4);
    border-color: var(--eturo-main-neg2);
    border: 2px solid var(--eturo-main-pos1);
  }
  .user-nav-active{
    color: var(--eturo-contrast);
    background: var(--eturo-main);
    border: 2px solid var(--eturo-base);
  }
  .user-nav-active:hover{
    border: 2px solid var(--eturo-base);
  }
  .maincard{
    border-radius: 0 0 0.35rem 0.35rem;
    border: 1px solid var(--eturo-main-pos1);
    
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
