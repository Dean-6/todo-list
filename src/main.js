import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import dictionary from './model/dictionary.js';

Vue.config.productionTip = false
// Vue.prototype.$dictionary = dictionary;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
