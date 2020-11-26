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
				<div class="q-px-sm q-py-xs bg-green">
					<div
						class="text-white"
						style="font-weight: bolder; margin-top:0"
						v-if="user.role.id === 9"
					>
						{{
							"Rp" +
								currencyFormat(
									product.product_variants[0].price -
										product.product_variants[0].reseller_exclusive_price
								)
						}}
					</div>
					<div
						class="text-white"
						style="font-weight: bolder; margin-top:0"
						v-else-if="user.role.id === 8"
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
						class="text-white"
						style="font-weight: bolder; margin-top:0"
						v-else-if="user.role.id === 10"
					>
						0
					</div>
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
import { currencyFormat } from "../../libraries/stringManipulation";

export default {
	name: "ProductReviewCard",
	props: ["product", "user"],
	data() {
		return {
			featuredImageShow: true,
			innerLoading: false
		};
	},
	methods: {
		onCardClick() {
				this.$router.push(`/product-review-details/${this.product.id}`);
		},
		productNameFormat(str) {
			if (str.length >= 30) {
				return str.substring(0,30) + "..."

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
</style>
