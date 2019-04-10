import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';
import {Picker} from 'mint-ui';
Vue.component(Picker.name, Picker);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
