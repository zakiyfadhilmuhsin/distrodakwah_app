<template>
	<center>
		<q-tabs
			dense
			class="bg-white text-black"
			style="border-top: 2px solid #eeeeee;"
			animated
			swipeable
			align="justify"
		>
			<q-route-tab
				icon="home"
				to="/"
				style="text-transform: capitalize; font-family: 'Open Sans'"
				><span style="font-size: 10px;">Home</span></q-route-tab
			>
			<q-route-tab
				icon="receipt"
				to="/orderList/"
				style="text-transform: capitalize; font-family: 'Open Sans'"
				><span style="font-size: 10px;">Order</span></q-route-tab
			>
			<q-route-tab
				icon="local_mall"
				to="/cart"
				style="text-transform: capitalize; font-family: 'Open Sans'"
				><span style="font-size: 10px;">Cart</span></q-route-tab
			>
			<q-tab
				icon="fa fa-comments"
				@click="
					openURL('https://tawk.to/chat/5f101bf55b59f94722bad5d5/default')
				"
				style="text-transform: capitalize; font-family: 'Open Sans'"
			>
				<span style="font-size: 10px;">Live Chat</span>
			</q-tab>

			<q-route-tab
				icon="account_circle"
				to="/dashboard"
				style="text-transform: capitalize; font-family: 'Open Sans'"
			>
				<span style="font-size: 10px;">Profil</span>
			</q-route-tab>
		</q-tabs>
	</center>
</template>

<script>
import { openURL } from "quasar";

export default {
	name: "DashNav",
	data() {
		return {};
	},
	methods: {
		openURL
	}
};
</script>

<style></style>
