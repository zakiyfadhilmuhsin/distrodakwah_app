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
			<q-btn flat dense round>
				<q-icon name="notifications" />
				<span class="bubble">pesan masuk</span>
			</q-btn>
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

export default {
	name: "HomeLayout",
	components: {
		DashNav
	},
	data() {
		return {};
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

.bubble {
	background: #e02424;
	position: absolute;
	right: 5px;
	top: -5px;
	/* height: 15px; */
	padding: 1px 6px;
	color: #fff;
	font: bold 0.4em Tahoma, Arial, Helvetica;
	border-radius: 3px;
}
</style>
