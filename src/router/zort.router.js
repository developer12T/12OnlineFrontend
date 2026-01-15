export default {
  path: '/onlineManage',
  component: () => import('../views/zort/layout.vue'),
  redirect: '/onlineManage/dashboard',
  children: [
    {
      path: 'dashboard',
      component: () => import('../views/zort/dashboard.vue')
    },
    {
      path: 'order/all',
      component: () => import('../views/zort/orderZortAll.vue')
    },
    {
      path: 'order/inv',
      component: () => import('../views/zort/orderZort.vue')
    },
    {
      path: 'order/reciept',
      component: () => import('../views/zort/orderZort.vue')
    },
    {
      path: 'order/history',
      component: () => import('../views/zort/orderZortHistory.vue')
    },
    {
      path: 'order/reprint',
      component: () => import('../views/zort/orderZortReprint.vue')
    },
    {
      path: 'order/erp',
      component: () => import('../views/zort/orderZortErp.vue')
    },
    {
      path: 'stock/zort',
      component: () => import('../views/zort/stockZort.vue')
    },
    {
      path: 'stock/erp',
      component: () => import('../views/zort/stockERP.vue')
    },
    {
      path: 'order/summary',
      component: () => import('../views/zort/orderSummaryAll.vue')
    }
  ]
}
