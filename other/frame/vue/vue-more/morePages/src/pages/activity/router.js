import Vue from 'vue'
import Router from 'vue-router'
import ActivityList  from './page/activityList'
import ActivityDetail  from './page/actDetail'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/activityList',
    },
    {
      path:'/activityList',
      name:'activityList',
      component: ActivityList
    },
    {
      path: '/activityDetail',
      name: 'activityDetail',
      component: ActivityDetail
    }
  ]
})