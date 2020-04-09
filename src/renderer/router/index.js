import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// function loadComponent (component) {
//   return () => import(/* webpackChunkName: "component-[request]" */ `@/components/${component}.vue`)
// }
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      name: 'index',
      // component: loadComponent('Index'),
      component: require('@/components/Index').default,
      children: [
        { path: 'list/:id', name: 'list', component: require('@/components/List').default },
        { path: 'details/:id', name: 'details', component: require('@/components/Details').default },
        { path: 'profile/:id', name: 'profile', component: require('@/components/Profile').default }
      ]
    }, {
      path: '/book',
      name: 'book',
      component: require('@/components/Book').default
      // component: require('@/components/Book').default
    }, {
      path: '/about',
      name: 'about',
      component: require('@/components/About').default
      // component: require('@/components/About').default
    },
    { path: '/', redirect: '/index' },
    { path: '*', redirect: '/index' }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('全局前置钩子：')
  // console.log(to)
  // console.log(from)
  next()
})

export default router
