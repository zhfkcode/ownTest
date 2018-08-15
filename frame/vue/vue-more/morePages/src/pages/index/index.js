// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
import '@/assets/css/base.css'

Vue.config.productionTip = false
Vue.use(router)
Vue.use(VueResource)
Vue.use(iView)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
})
router.afterEach(router=>{
  iView.LoadingBar.finish()
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
