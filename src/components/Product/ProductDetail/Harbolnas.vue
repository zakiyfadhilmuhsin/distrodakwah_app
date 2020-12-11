<template>
	<div class="">
		<h4
			style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
			class="harbolnas-grid-container"
			v-if="RoleId === 9"
		>
			<span class="harbolnas-profit-label">Tambahan Keuntungan Harbolnas</span>
			<span class="text-green harbolnas-profit-value">{{ harbolnasResellerExclusiveProfit }}</span>
			<span class="text-green profit-value"> {{ resellerExclusiveProfit }}</span>
		</h4>

		<h4
			style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
			v-else-if="RoleId === 8"
		>
			Tambahan Keuntungan Harbolnas
			<span class="text-green">{{ harbolnasResellerProProfit }}</span>
			<span class="text-green"> {{ resellerProProfit }}</span>
		</h4>
		<h4
			style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
			v-else-if="RoleId === 10"
		>
			Tambahan Keuntungan Harbolnas
			<span class="text-green"
				>"Silahkan mendaftar jadi reseller distrodakwah"</span
			>
		</h4>
	</div>
</template>

<script>
import { currencyFormat } from "../../../libraries/stringManipulation";

export default {
	name: "HarbolnasAdditionalPrice",
	props: ["RoleId", "SelectedVariant", "Qty"],
	computed: {
		resellerProProfit: function() {
			return `Rp${currencyFormat(
				Number(this.SelectedVariant.price) -
					Number(this.SelectedVariant.reseller_pro_price) -
					Number(this.SelectedVariant.pro_harbolnas_additional_price) *
						Number(this.Qty)
			)}`;
		},
		resellerExclusiveProfit: function() {
			return `Rp${currencyFormat(
				Number(this.SelectedVariant.price) -
					Number(this.SelectedVariant.reseller_exclusive_price) -
					Number(this.SelectedVariant.exclusive_harbolnas_additional_price) *
						Number(this.Qty)
			)}`;
		},
		harbolnasResellerProProfit: function() {
			return `Rp${currencyFormat(
				Number(this.SelectedVariant.pro_harbolnas_additional_price) *
					Number(this.Qty)
			)}`;
		},
		harbolnasResellerExclusiveProfit: function() {
			return `Rp${currencyFormat(
				Number(this.SelectedVariant.exclusive_harbolnas_additional_price) *
					Number(this.Qty)
			)}`;
		}
	}
};
</script>

<style>
.harbolnas-grid-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	background: purple;
}

.harbolnas-profi-label {
	grid-column: 1/span 2;
}
</style>
