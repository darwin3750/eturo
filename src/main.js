// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import { auth } from '../firebase'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css';
import './assets/styles/styles.css';
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

/* eslint-disable no-new */
auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('toggleCurrentUser')
  }
  new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
  })
})
