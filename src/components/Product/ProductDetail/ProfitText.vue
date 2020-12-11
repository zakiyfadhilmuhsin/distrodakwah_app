<template>
	<div>
		<span v-if="SelectedVariant">
			<h4
				style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
				v-if="RoleId === 9"
			>
				KAMU UNTUNG
				<span class="text-green">{{ resellerExclusiveProfit }}</span>
			</h4>

			<h4
				style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
				v-else-if="RoleId === 8"
			>
				KAMU UNTUNG
				<span class="text-green">{{ resellerProProfit }}</span>
			</h4>
			<h4
				style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
				v-else-if="RoleId === 10"
			>
				KAMU UNTUNG
				<span class="text-green">{{ resellerFreeProfit }}</span>
			</h4>
			<harbolnas-additional-profit
				v-if="
					SelectedVariant.exclusive_harbolnas_additional_price &&
						SelectedVariant.pro_harbolnas_additional_price
				"
				:SelectedVariant="SelectedVariant"
				:RoleId="RoleId"
				:Qty="Qty"
			/>
		</span>
	</div>
</template>

<script>
import { currencyFormat } from "../../../libraries/stringManipulation";
import HarbolnasAdditionalProfit from "./Harbolnas.vue";
export default {
	name: "ProfitText",
	props: ["RoleId", "SelectedVariant", "ProductData", "Qty"],
	components: {
		HarbolnasAdditionalProfit
	},
	computed: {
		isFreeNotReady: function() {
			return cloneDeep(this.ProductData.product_variants)
				.map(variant => variant.reseller_free_price)
				.some(price => price === null);
		},
		resellerProProfit: function() {
			return `Rp${currencyFormat(
				Number(
					this.SelectedVariant.price - this.SelectedVariant.reseller_pro_price
				) * Number(this.Qty)
			)}`;
		},
		resellerExclusiveProfit: function() {
			return `Rp${currencyFormat(
				Number(
					this.SelectedVariant.price -
						this.SelectedVariant.reseller_exclusive_price
				) * Number(this.Qty)
			)}`;
		},
		resellerFreeProfit: function() {
			return this.isFreeNotReady
				? "Belum Siap"
				: `Rp${currencyFormat(
						this.SelectedVariant.price -
							this.SelectedVariant.reseller_free_price
				  )}`;
		},
		resellerFreePrice: function() {
			return this.isFreeNotReady
				? "Belum Siap"
				: `Rp${currencyFormat(
						Number(
							this.SelectedVariant.price -
								this.SelectedVariant.reseller_free_price
						) * Number(this.Qty)
				  )}`;
		}
	}
};
</script>

<style></style>
