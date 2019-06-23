import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(iView)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
