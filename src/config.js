import router from 'src/router/routes'
import { API, API_DEV, SOCKETIO, SOCKETIO_DEV, WEBREPLICA_DOMAIN, WEBREPLICA_DOMAIN_DEV } from '../config/default'
//export const hostDomain = 'https://api-test.needherbal.web.id'
export const hostDomain = process.env.DEV ? API_DEV : API
export const webReplicaDomain = process.env.DEV ? WEBREPLICA_DOMAIN_DEV : WEBREPLICA_DOMAIN;
export const socketIoEndpoint = process.env.DEV ? SOCKETIO_DEV : SOCKETIO;
export const apiDomain = hostDomain

export const loginUrl = apiDomain + '/auth/login'
export const createAccountUrl = apiDomain + '/auth/signup'
export const trackingUrl = apiDomain + '/auth/tracking'
export const logoutUrl = apiDomain + `/auth/logout`


export const signGoogleUrl = apiDomain + 'googlesign'
export const signFacebookUrl = apiDomain + 'facebooksign'
export const userUrl = apiDomain + 'api/user'
export const menuUrl = apiDomain + 'v1/menuformat'
export const routerUrl = apiDomain + 'v1/routerformat'
export const forgotPassword = apiDomain + 'api/forgot-password'
export const resetPassword = apiDomain + 'api/reset-password'

// From Catalog Service
export const catalogService = apiDomain + '/catalog';
export const catalogProductUrl = apiDomain + '/catalog/products'
export const getProductByCategoryUrl = apiDomain + '/catalog/get-products'
export const searchProductUrl = apiDomain + '/catalog/searchProduct'
export const catalogBrandUrl = apiDomain + '/catalog/brands'
export const catalogCategoryUrl = apiDomain + '/catalog/categories'
export const getNewProductUrl = apiDomain + '/catalog/get-newest-products'
export const getProductByClassUrl = apiDomain + '/catalog/get-products-by-product-classification'
export const getBestSellerProductUrl = apiDomain + '/catalog/get-newest-products'

// From Cart Service
export const cartService = `${apiDomain}/cart`
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
export const orderService = apiDomain + '/order'
export const postToOrderUrl = apiDomain + '/order/orders'
export const showOrderUrl = apiDomain + '/order/orders'
export const getOrderUrl = apiDomain + '/order/orders-for-reseller'

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
