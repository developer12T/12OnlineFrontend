export default {
    path: '/onlineManage',
    component: () => import('../views/zort/layout.vue'),
    redirect: '/onlineManage/dashboard',
    children: [
        { path: '/onlineManage/dashboard', component: () => import('../views/zort/dashboard.vue') },
        { path: '/onlineManage/order/all', component: () => import('../views/zort/orderZortAll.vue') },
        { path: '/onlineManage/order/inv', component: () => import('../views/zort/orderZort.vue') },
        { path: '/onlineManage/order/reciept', component: () => import('../views/zort/orderZort.vue') },
        { path: '/onlineManage/order/history', component: () => import('../views/zort/orderZortHistory.vue') },
        { path: '/onlineManage/order/reprint', component: () => import('../views/zort/orderZortReprint.vue') },
        { path: '/onlineManage/order/erp', component: () => import('../views/zort/orderZortErp.vue') },
        { path: '/onlineManage/stock/zort', component: () => import('../views/zort/stockZort.vue') },
        { path: '/onlineManage/stock/erp', component: () => import('../views/zort/stockERP.vue') },
        { path: '/onlineManage/order/summary', component: () => import('../views/zort/orderSummaryAll.vue')}
    ]
};