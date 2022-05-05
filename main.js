import App from './App'
// main.js
import uView from "uview-ui";
import store from './store'
import lotai from './untils/common.js'
Vue.use(uView);
Vue.use(lotai);

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif