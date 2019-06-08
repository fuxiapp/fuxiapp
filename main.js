import Vue from 'vue'
import App from './App'
import api from './api';

Vue.config.productionTip = false;
Vue.prototype.$API = api;
Vue.prototype.$URL = 'http://';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
