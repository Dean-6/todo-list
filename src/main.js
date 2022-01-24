import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);
// import dictionary from './model/dictionary.js';

Vue.config.productionTip = false
// Vue.prototype.$dictionary = dictionary;

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
  // itender: h => h(App)
}).$mount('#app')
