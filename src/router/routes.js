import DetailProductPage from 'pages/DetailProduct';
import ListCustomerPage from 'pages/ResellerArea/ListCustomer';
import ShippingPage from 'pages/Shipping';
import OrderSummaryPage from 'pages/OrderSummary';
import CartPage from 'pages/Cart';


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
    component: CartPage,
  },
  {
    path: '/shipping',
    component: ShippingPage,
  },
  {
    path: '/orderSummary',
    component: OrderSummaryPage,
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
  },
  {
    path: '/listCustomer',
    component: ListCustomerPage,
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
