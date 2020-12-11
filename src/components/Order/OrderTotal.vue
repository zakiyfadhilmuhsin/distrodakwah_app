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
			{{ total }}
		</h5>
		<h5
			style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
			v-else-if="voucherDataResult.type_id === 2"
		>
			{{ total }}
		</h5>
	</div>
</template>

<script>
import { currencyFormat } from "../../libraries/stringManipulation";
export default {
	name: "TotalCard",
	props: ["voucherDataResult", "cartData", "shipment"],
	computed: {
		deduction: function() {
			if (this.voucherDataResult.type_id === 2) {
				// if ongkir less than shipment promo
				if (
					this.shipment.shippingCost <=
					this.voucherDataResult.voucher_shipment_fee.value
				) {
					return this.shipment.shippingCost;
				} else {
					return this.voucherDataResult.voucher_shipment_fee.value;
				}
			} else if (this.voucherDataResult.type_id == 1) {
				return (
					this.cartData.total_amount *
					(voucherDataResult.voucher_percentage.value / 100)
				);
			}
			return 0;
		},
		total: function() {
			return `Rp
				${this.currencyFormat(
					this.cartData.total_amount +
						this.shipment.shippingCost -
						this.deduction
				)}`;
		}
	},
	methods: {
		currencyFormat
	}
};
</script>

<style></style>
