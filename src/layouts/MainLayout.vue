<template>
	<q-layout view="lHh Lpr lFf">
		<q-header class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/">
					<q-icon name="arrow_back" color="white" />
				</q-btn>
				<q-toolbar-title>
					<span style="font-size: 16px; font-weight: bold">{{
						HeaderProp
					}}</span>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>
		<Navigation />
		<q-page-container class="mobile-layout-on-desktop">
			<slot name="main"></slot>
		</q-page-container>
	</q-layout>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
	name: "MainLayout",
	components: {
		Navigation
	},
	props: {
		HeaderProp: String
	},
	data() {
		return {};
	}
};
</script>

<style></style>
