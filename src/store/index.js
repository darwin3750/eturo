import Vue from 'vue'
import Vuex from 'vuex'

import { auth, userCollection } from '../../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: auth.currentUser,
  },
  mutations: {
    toggleCurrentUser(state) {
      state.currentUser = auth.currentUser
    }
  },
  getters: {
    currentUser: (state) => state.currentUser,

    // boolean conversion
    loggedIn: (state) => !!state.currentUser,
  },
})

export default store