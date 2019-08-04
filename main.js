import Vue from 'vue'
import App from './App'
import api from './api';

Vue.config.productionTip = false;
import store from './store'
Vue.prototype.$API = api;
Vue.prototype.$store = store
Vue.prototype.$URL = 'http://116.55.248.84:8090/images/';
Vue.prototype.$SHARE = 'https://weixin.fxsoft88.com';
// Vue.prototype.$IMG = 'http://116.55.248.84:8090/images/';

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
