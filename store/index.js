import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		sales: {},
	},
	mutations: {
		changeSales(state, data) {
			state.sales = data;
		}
			
	}
});
export default store
