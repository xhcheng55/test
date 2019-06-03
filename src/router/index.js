import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '../components/Index.vue'
import SinglePage from '../components/SinglePage.vue'
import Article from '../components/Article.vue'
import TopHeader from '../components/TopHeader.vue'
import Person from '../components/Person.vue'
import Register from '../components/Register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexLink',
      // 在开发singlePage时先用single，开发好了就换回来index
      component: Index
    },
    {
      path: '/singlePage',
      name: 'singlePageLink',
      component: SinglePage
    },
    {
      path: '/article',
      name: 'articleLink',
      component: Article
    },
    {
      path: '/person',
      name: 'personLink',
      component: Person,
    },
    {
      path: '/register',
      name: 'registerLink',
      component: Register,
    },
    {
      path: '*',
      component: Index
    }

  ],
  mode: 'history'
})
