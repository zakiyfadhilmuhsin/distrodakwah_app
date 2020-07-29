<template>
	<div class="col text-right">
		<h5
			style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
			v-if="
				Object.keys(voucherDataResult).length === 0 &&
					voucherDataResult.constructor === Object
			"
		>
			Rp{{ currencyFormat(cartData.total_amount + shipment.shippingCost) }}
		</h5>
		<h5
			style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
			v-else-if="voucherDataResult.type_id === 1"
		>
			<!-- (grand_total-shippingCost) - discount -->
			Rp{{
				currencyFormat(
					cartData.total_amount -
						cartData.total_amount * (voucherDataResult.voucher_percentage.value / 100) +
						shipment.shippingCost
				)
			}}
		</h5>
	</div>
</template>

<script>
import { currencyFormat } from "../../libraries/stringManipulation";
export default {
	name: "TotalCard",
	props: ["voucherDataResult", "cartData", "shipment"],
	methods: {
		currencyFormat
	}
};
</script>

<style></style>
