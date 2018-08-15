import Vue from 'vue'
import Router from 'vue-router'
import BiddingList  from './page/biddingList'
import BiddingDetail from './page/biddingDetail'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect:'/biddingList',
    },
    {
      path:'/biddingList',
      name:'biddingList',
      component: BiddingList,
    },
    {
      path: '/biddingDetail',
      name: 'biddingDetail',
      component: BiddingDetail
    }
  ]
})