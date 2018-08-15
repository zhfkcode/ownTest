import Vue from 'vue'
import Router from 'vue-router'
import CompanyList  from './page/companyList'
import CompanyDetail from './page/comDetail'

Vue.use(Router)
export default new Router({
  //  mode: 'history',
  routes: [
    {
      path: '/',
      // redirect:'/companyList',
    },
    {
      path:'/companyList',
      name:'companyList',
      component: CompanyList,
    },
    {
      path: '/companyDetail',
      name: 'companyDetail',
      component: CompanyDetail
    }
  ]
})