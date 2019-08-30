import router from 'src/router/routes'

export const hostDomain = 'http://apigateway.test'

export const apiDomain = hostDomain

export const loginUrl = apiDomain + '/auth/login'
export const signGoogleUrl = apiDomain + 'googlesign'
export const signFacebookUrl = apiDomain + 'facebooksign'
export const userUrl = apiDomain + 'api/user'
export const menuUrl = apiDomain + 'v1/menuformat'
export const routerUrl = apiDomain + 'v1/routerformat'
export const forgotPassword = apiDomain + 'api/forgot-password'
export const resetPassword = apiDomain + 'api/reset-password'

export const catalogProductUrl = apiDomain + '/catalog/products'
export const catalogBrandUrl = apiDomain + '/catalog/brands'
export const catalogCategoryUrl = apiDomain + '/catalog/categories'

export const addToCartUrl = apiDomain + '/cart/add-to-cart'

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
