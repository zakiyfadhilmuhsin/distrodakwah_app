<template>
	<div>
		<h4
			style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
			v-if="RoleId === 9"
		>
			Tambahan Keuntungan Harbolnas
			<span class="text-green">{{ harbolnasResellerExclusiveProfit }}</span>
		</h4>

		<h4
			style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
			v-else-if="RoleId === 8"
		>
			Tambahan Keuntungan Harbolnas
			<span class="text-green">{{ harbolnasResellerProProfit }}</span>
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

<style></style>
