import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import DetailPage from "@/pages/detail"
import Analysis from "@/pages/detail/analysis"
import Count from "@/pages/detail/count"
import Forecast from "@/pages/detail/forecast"
import Publish from "@/pages/detail/publish"
import OrderList from "@/pages/orderList"




Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: IndexPage
      },
      {
        path: '/orderList',
        component: OrderList
      },
      {
        path: '/detail',
        component: DetailPage,
        redirect: '/detail/count',
        children: [
          {
            path: 'count',
            component: Count
          },
          {
            path: 'analysis',
            component: Analysis
          },
          {
            path: 'forecast',
            component: Forecast
          },
          {
            path: 'publish',
            component: Publish
          }
        ]
      }
    ]
})
