import router from 'src/router/routes'

//export const hostDomain = 'https://api-test.needherbal.web.id'
//export const hostDomain = 'http://apigateway.test'
export const hostDomain = 'https://api.prodakwah.id'

export const apiDomain = hostDomain

export const loginUrl = apiDomain + '/auth/login'
export const createAccountUrl = apiDomain + '/auth/signup'
export const trackingUrl = apiDomain + '/auth/tracking'

export const signGoogleUrl = apiDomain + 'googlesign'
export const signFacebookUrl = apiDomain + 'facebooksign'
export const userUrl = apiDomain + 'api/user'
export const menuUrl = apiDomain + 'v1/menuformat'
export const routerUrl = apiDomain + 'v1/routerformat'
export const forgotPassword = apiDomain + 'api/forgot-password'
export const resetPassword = apiDomain + 'api/reset-password'

// From Catalog Service
export const catalogProductUrl = apiDomain + '/catalog/products'
export const getProductByCategoryUrl = apiDomain + '/catalog/get-products'
export const searchProductUrl = apiDomain + '/catalog/searchProduct'
export const catalogBrandUrl = apiDomain + '/catalog/brands'
export const catalogCategoryUrl = apiDomain + '/catalog/categories'

// From Cart Service
export const getCartUrl = apiDomain + '/cart/get-cart'
export const addToCartUrl = apiDomain + '/cart/add-to-cart'
export const removeProductCartUrl = apiDomain + '/cart/remove-product'
export const addShippingToCart = apiDomain + '/cart/add-shipping-to-cart'
export const destroyCart = apiDomain + '/cart/destroy-cart'
export const totalCartItemUrl = apiDomain + '/cart/cart-items'
export const updateCartQtyUrl = apiDomain + '/cart/update-qty'
export const addVoucherCartUrl = apiDomain + '/cart/add-voucher'
export const removeVoucherCartUrl = apiDomain + '/cart/remove-voucher'

// From Shipping Service
export const getCustomerUrl = apiDomain + '/shipping/get-customer'
export const showCustomerUrl = apiDomain + '/shipping/show-customer'
export const updateCustomerUrl = apiDomain + '/shipping/update-customer'
export const addNewCustomerUrl = apiDomain + '/shipping/add-new-customer'
export const getProvinceUrl = apiDomain + '/shipping/province'
export const getCityUrl = apiDomain + '/shipping/city'
export const getSubdistrictUrl = apiDomain + '/shipping/subdistrict'
export const getCostShippingUrl = apiDomain + '/shipping/cost'

// Shipping Non Auth
export const getProvinceNoAuthUrl = hostDomain + '/for-store/province'
export const getCityNoAuthUrl = hostDomain + '/for-store/city'
export const getSubdistrictNoAuthUrl = hostDomain + '/for-store/subdistrict'
export const getCostShippingNoAuthUrl = hostDomain + '/for-store/cost'

// From Identity Service
export const identityBankUrl = apiDomain + '/identity/banks'
export const identitySliderUrl = apiDomain + '/identity/sliders'
export const identityFeedbackUrl = apiDomain + '/identity/feedback'

// From Order Service
export const postToOrderUrl = apiDomain + '/order/orders'
export const showOrderUrl = apiDomain + '/order/orders'
export const getOrderUrl = apiDomain + '/order/orders-for-reseller'
export const paymentConfirmOrderUrl = apiDomain + '/order/orders/confirmPayment'

// From Store Service
export const getStoreUrl = apiDomain + '/store/get-store'
export const createStoreUrl = apiDomain + '/store/create-store'

// From Inventory Service
export const inventoryStockUrl = apiDomain + '/inventory/stocks'

// From Payment Service
export const paymentConfirmationUrl = apiDomain + '/payment/payment-confirmations'

// From Voucher Service
export const checkCouponUrl = apiDomain + '/voucher/check-coupon'


export const getHeader = function () {
  // debugger
  if (window.localStorage.getItem('authUser') === null) { return }
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + tokenData.access_token
  }
  return headers
}

export const getAccessToken = function () {
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  return 'access_token=' + tokenData.access_token
}

export const getAccessTokenKey = function () {
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  return tokenData.access_token
}

export const logout = function () {
  window.localStorage.removeItem('authUser')
  router.push('/')
}

export const getRouter = function () {
  const routerData = JSON.parse(window.localStorage.getItem('routerUser'))
  return routerData
}

export const getMenu = function () {
  const menuData = JSON.parse(window.localStorage.getItem('menuUser'))
  return menuData
}
export const getProfile = function () {
  const profile = JSON.parse(window.localStorage.getItem('profileUser'))
  return profile
}
