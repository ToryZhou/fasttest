import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Fast from '@/components/Fast'
import Movie from '@/components/Movie'
import Novel from '@/components/Novel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/fast',
      name: 'Fast',
      component: Fast
    }, {
      path: '/movie',
      name: 'Movie',
      component: Movie
    }, {
      path: '/novel',
      name: 'Novel',
      component: Novel
    }

  ]
})
