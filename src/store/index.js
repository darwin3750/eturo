import Vue from 'vue'
import Vuex from 'vuex'

import { auth, userCollection } from '../../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: auth.currentUser,
    currentUserReference: null,
  },
  mutations: {
    toggleCurrentUser(state) {
      state.currentUser = auth.currentUser
      state.currentUserReference = auth.currentUser ? userCollection.doc(auth.currentUser.id) : ""
    }
  },
  getters: {
    currentUser: (state) => state.currentUser,
    currentUserReference: (state) => state.currentUserReference,

    // boolean conversion
    loggedIn: (state) => !!state.currentUser,
  },
})

export default store