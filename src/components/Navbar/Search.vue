<template>
  <div class="navbar-form">
    <b-input-group class="w-100" v-click-outside="closeSearch" @click="viewSearch = true">
      <b-form-input placeholder="Search from dozens of lessons, topics, and tutorials" 
          type="text" class="form-control navbar-search"></b-form-input>
      <b-input-group-append>
        <button class="btn text-contrast border border-contrast">
          <b-icon icon="search"/>
        </button>
      </b-input-group-append>
    </b-input-group>
    <!-- DROPDOWN -->
    <transition name="slide">
      <div v-if="viewSearch" class="card shadow w-100 position-absolute dropdown-menu dropdown-content">
        <router-link class="topic p-2" v-for="topic in topics" :key="topic.id" :to="{ name: 'Topic', params: { slug: topic.id } }"> 
          {{ topic.title }}
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
  import { topicCollection } from '../../../firebase'
  import { topicConverter } from '../../models/topic'
  export default {
    data() {
      return {
        viewSearch: false,
        topics: []
      }
    },
    beforeMount() {
      const topicArray=[]
      topicCollection.withConverter(topicConverter).get()
      .then((querySnapshot) => {
        querySnapshot.forEach(topicDoc => {
          const topicSnapshot = topicDoc.data()
          topicArray.push({
            id: topicDoc.id,
            ...topicSnapshot
          })
        })
        this.topics = topicArray
      });
    }, // beforeMount
    methods: {
      closeSearch(){
        this.viewSearch = false;
      }
    }, // methods
  }
</script>
<style scoped>
  @media (min-width: 992px) {
    .navbar-search{
      min-width: 360px !important;
    }
  }
  .dropdown-menu{
    min-width: 300px;
    max-height: 15rem;
    transition: .4s ease-in-out;
    transform-origin: top;
    overflow-y: scroll;
  }
  .dropdown-menu::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }.dropdown-menu::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: var(--eturo-accent2);
  }.dropdown-menu::-webkit-scrollbar-track {
    background: var(--eturo-main-neg6);
  }
  .slide-enter, .slide-leave-to{
    transform: scaleY(0);
  }
  .topic{
    color: var(--eturo-main-pos4);
    transition: 0.4s;
  }
  .topic:hover{
    color: var(--eturo-main-pos4);
    text-decoration: none;
    background: var(--eturo-accent1);
  }
</style>