import Vue from 'vue'
import Router from 'vue-router'
import ProjectList  from './page/projectList'
import ProOne from './page/proDetailOne'
import ProTwo from './page/proDetailTwo'
Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/projectList',
    },
    {
      path:'/projectList',
      name:'projectList',
      component: ProjectList,
    },
    {
      path: '/proOne',
      name: 'proOne',
      component: ProOne
    },
    {
      path: '/proTwo',
      name: 'proTwo',
      component: ProTwo
    }
  ]
})