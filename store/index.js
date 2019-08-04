import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		sales: {}, // 销售发货单
	},
	mutations: {
		changeSales(state, data) {
			state.sales = data;
		}
	}
});
export default store
