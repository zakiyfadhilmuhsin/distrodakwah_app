<template>
	<q-layout view="lHh Lpr lFf" class="grid-layout">
		<q-header class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/">
					<q-icon name="arrow_back" color="white" />
				</q-btn>
				<q-toolbar-title>
					<span style="font-size: 16px; font-weight: bold">
						{{Header ? Header : "" }}</span>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>



		<q-page-container
			class="container"
		>
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
		Header: String
	}
};
</script>

<style scoped>
.grid-layout{
	display: grid;
	grid-template-columns: 360px;
}

</style>
