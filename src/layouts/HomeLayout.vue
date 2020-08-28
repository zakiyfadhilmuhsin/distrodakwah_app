<template>
	<q-layout view="lHh Lpr lFf" class="home-layout">
		<q-toolbar class="bg-distrodakwah text-white toolbar">
			<img
				src="~/assets/images/components/logo-distrodakwah.png"
				width="50%"
				class="q-ml-xs"
			/>
			<q-badge color="red" class="text-bold q-ml-sm">
				BETA
			</q-badge>

			<q-space />
			<Notification />
			<q-btn flat dense round dropdown to="/search">
				<q-icon name="search" />
			</q-btn>
		</q-toolbar>

		<slot />
		<DashNav />
	</q-layout>
</template>

<script>
import { openURL } from "quasar";

import DashNav from "./DashNav.vue";
import Notification from "../components/Storefront/notification.vue";
export default {
	name: "HomeLayout",
	components: {
		DashNav,
		Notification
	},
	methods: {
		openURL
	}
};
</script>

<style>
.home-layout {
	width: 360px;
}

.home-layout > :first-child {
	position: fixed;
	top: 0px;
	width: 360px;
	z-index: 99;
}

.home-layout > :nth-child(2) {
	padding: 50px 0;
}

.home-layout > :last-child {
	position: fixed;
	bottom: 0px;
	width: 360px;
	z-index: 99;
}
</style>
