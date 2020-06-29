<template>
	<q-footer class="mobile-layout-on-desktop">
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
				>
					<span style="font-size: 10px;">Beranda</span>
				</q-route-tab>
				<q-route-tab
					icon="receipt"
					to="/orderList"
					style="text-transform: capitalize; font-family: 'Open Sans'"
				>
					<span style="font-size: 10px;">Pesanan</span>
				</q-route-tab>
				<q-route-tab
					icon="local_mall"
					to="/cart"
					style="text-transform: capitalize; font-family: 'Open Sans'"
				>
					<span style="font-size: 10px;">Keranjang</span>
					<q-badge
						color="red"
						text-color="white"
						floating
						v-if="totalCartItem !== null"
					>
						<b>{{ totalCartItem }}</b>
					</q-badge>
				</q-route-tab>
				<q-route-tab
					icon="account_circle"
					to="/dashboard"
					style="text-transform: capitalize; font-family: 'Open Sans'"
				>
					<span style="font-size: 10px;">Profil</span>
				</q-route-tab>
			</q-tabs>
		</center>
	</q-footer>
</template>

<script>
import { mapState } from "vuex";
import { totalCartItemUrl, getHeader } from "../config";

export default {
	name: "Navigation",
	data() {
		return {
			totalCartItem: null
		};
	},
	computed: {
		...mapState(["globalState"])
	},

	async created() {
		// Get Total Cart Item
		// await this.$axios
		// 	.get(totalCartItemUrl + "/" + this.user.id, { headers: getHeader() })

		const getCartTotalItemRes = await this.$axios({
			method: "get",
			url: `${totalCartItemUrl}/${this.globalState.userProfile.id}`,
			headers: getHeader()
		});

		if (getCartTotalItemRes.data.data !== "cart_is_empty") {
			this.totalCartItem = getCartTotalItemRes.data.data;
		}
	}
};
</script>

<style></style>
