<template>
	<q-card
		class="vendor-catalog-card bg-white"
		style="margin: 0 5px; cursor:pointer"
		flat
		bordered
		@click="onCardClick"
	>
		<transition
			appear
			enter-active-class="animated fadeIn"
			leave-active-class="animated fadeOut"
		>
			<q-img
				:src="product.featured_image"
				style="width: 100%"
				v-show="featuredImageShow == true"
			/>
		</transition>

		<center>
			<q-spinner
				color="dark"
				size="2em"
				v-show="innerLoading == true"
				style="margin: 10px 0"
			/>
		</center>

		<q-card-section style="padding: 10px 16px 16px 16px">
			<center>
				<div
					style="font-family: 'Open Sans';font-size: 12px; font-weight: bold; margin-bottom: 5px; height: 35px"
				>
					{{ productNameFormat(product.product_name) }}
				</div>
				<div class="text-black" style="font-size: 10px;">
					Keuntungan Anda :
				</div>
				<div class="profit-button" v-if="globalState.userProfile.role.id === 9">
					{{
						"Rp" +
							currencyFormat(
								product.product_variants[0].price -
									product.product_variants[0].reseller_exclusive_price
							)
					}}
				</div>
				<div
					class="profit-button"
					v-else-if="globalState.userProfile.role.id === 8 && product.id !== 412"
				>
					{{
						"Rp" +
							currencyFormat(
								product.product_variants[0].price -
									product.product_variants[0].reseller_pro_price
							)
					}}
				</div>

				<div
					class="upgrade-button"
					v-else-if="
						globalState.userProfile.role.id === 10 || (product.id === 412 && globalState.userProfile.role_id === 8)
					"
				>
					Silakan Upgrade
				</div>
			</center>
		</q-card-section>

		<!-- <q-card-section>
      <center>
        <q-btn
          :to="'/detail/' + product.id"
          flat
          class="bg-orange-8 text-white centered-text"
          style
        >
          <span style="text-transform: capitalize;">Beli Sekarang</span>
        </q-btn>
      </center>
    </q-card-section> -->
	</q-card>
</template>

<script>
import { mapState } from "vuex";
import { openURL } from "quasar";
import { currencyFormat } from "../../libraries/stringManipulation";

export default {
	name: "VendorProductCard",
	props: ["product"],
	data() {
		return {
			featuredImageShow: true,
			innerLoading: false
		};
	},
	computed: {
		...mapState(["globalState"])
	},
	async created() {
		if (Object.keys(this.globalState.userProfile).length === 0) {
			await this.$store.dispatch("globalState/getUserProfile");
		}
	},
	methods: {
		onCardClick() {
			if (this.product.status === "coming-soon") return;
			if (
				this.globalState.userProfile.role_id === 10 ||
				(this.globalState.userProfile.role_id === 8 && this.product.id === 412)
			) {
				openURL("https://kayaberkah.orderonline.id/upgrade-Reseller");
				return;
			}
			this.$router.push(`/detail/${this.product.id}`);
		},
		productNameFormat(str) {
			if (str.length >= 30) {
				return str.substring(0, 30) + "...";
			}
			return str;
		},

		currencyFormat
	}
};
</script>

<style>
.vendor-catalog-card {
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
	border: 1px solid #e5e3e3;
	border-radius: 5px;
}
.profit-button {
	padding: 5px;
	border-radius: 5px;
	color: white;
	font-weight: bolder;
	background-color: #4caf50;
}
.upgrade-button {
	padding: 5px;
	border-radius: 5px;
	color: white;
	font-weight: bolder;
	background-color: #ff9800;
}
</style>
