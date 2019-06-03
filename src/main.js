// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Navigator from './components/Navigator.vue'
import HelloWorld from './components/HelloWorld.vue'
import Search from './components/Search.vue'
import Index from './components/Index.vue'
import SinglePage from './components/SinglePage.vue'
import axios from 'axios'
import Es6Promise from 'es6-promise'

Es6Promise.polyfill();
Vue.config.productionTip = false
Vue.prototype.$ajax=axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
