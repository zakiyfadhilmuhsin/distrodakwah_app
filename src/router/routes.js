import DetailProductPage from 'pages/DetailProduct';


const routes = [
  {
    path: '/',
    meta: {
      requiresAuth: true,
    },
    component: () => import('layouts/Storefront.vue'),
    children: [
      { path: '', component: () => import('pages/Storefront.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/Login.vue') }
    ]
  },
  {
    path: '/detail/:id',
    component: DetailProductPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/cart',
    component: () => import('layouts/Cart.vue'),
    children: [
      { path: '', component: () => import('pages/Cart.vue') }
    ]
  },
  {
    path: '/shipping',
    component: () => import('layouts/Shipping.vue'),
    children: [
      { path: '', component: () => import('pages/Shipping.vue') }
    ]
  },
  {
    path: '/orderSummary',
    component: () => import('layouts/OrderSummary.vue'),
    children: [
      { path: '', component: () => import('pages/OrderSummary.vue') }
    ]
  },
  {
    path: '/invoice',
    component: () => import('layouts/Invoice.vue'),
    children: [
      { path: '', component: () => import('pages/Invoice.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      { path: '', component: () => import('pages/ResellerArea/Dashboard.vue') }
    ]
  },
  {
    path: '/orderList',
    component: () => import('layouts/OrderList.vue'),
    children: [
      { path: '', component: () => import('pages/ResellerArea/OrderList.vue') }
    ]
  },
  {
    path: '/detailOrder',
    component: () => import('layouts/DetailOrder.vue'),
    children: [
      { path: '', component: () => import('pages/ResellerArea/DetailOrder.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
