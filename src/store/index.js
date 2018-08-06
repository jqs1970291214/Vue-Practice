import Vuex from 'vuex'
import Vue from 'vue'
import orderList from './modules/orderList'

Vue.user(Vuex)

export default new Vuex.Store({
    modules: {
        orderList
    }
})