import Vue from "vue";
import VueRouter from "vue-router";
import { LocalStorage } from "quasar";

import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function(/* { store, ssrContext } */) {
	const Router = new VueRouter({
		scrollBehavior: () => ({ x: 0, y: 0 }),
		routes,

		// Leave these as is and change from quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		mode: "history",
		base: "/"
	});

	Router.beforeEach((to, from, next) => {
		console.log(JSON.parse(localStorage.getItem("profileUser"))==null);
    if(	JSON.parse(localStorage.getItem("profileUser")) != null) {
      if(		JSON.parse(localStorage.getItem("profileUser")).email ==
      "fssalviro@gmail.com") {
        next();
      }
    } else if(to.fullPath == "/maintenance" || to.fullPath == "/login-testing") {
      next()
    } else {
      next('/maintenance')
    }
	

		if (to.matched.some(item => item.meta.requiresAuth)) {
			// const authUser = JSON.parse(window.localStorage.getItem('authUser'))

			if (LocalStorage.has("authUser")) {
				if (
					LocalStorage.getItem("authUser") &&
					LocalStorage.getItem("authUser").access_token !== "undefined"
				) {
					//console.log(authUser.access_token)
					next();
				}
			} else {
				next({
					path: "/login",
					query: { redirect: to.fullPath }
				});
			}
		} else {
			next();
		}
	});

	return Router;
}
