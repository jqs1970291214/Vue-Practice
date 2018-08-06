import Vue from 'vue'
import { or } from 'ip';
//状态
const state = {
    orderList: [],
    params: {}
}
//getter
const getter = {
    getOrderList: state => state.orderList
}
//异步操作
const actions = {
    fetchOrderList ({commit, state}) {
        Vue.http.post('/api/getOrderList',state.params)
           .then((res) => {
                //按照规范，将数据提交给同步操作处理
                commit('updateOrderList', res.data.list)
            }, (err) => {

           })
    }
}
//同步操作
const mutations = {
    updateOrderList (state,payload) {
        state.orderList = payload;
    },
    updateParams (state,{key,value}) {
        state.params[key] = value;
    }
}

export default {
    state,
    getter,
    actions,
    mutations
}