<template>
	<div class="grid-voucher">
		<div class="voucher-header">
			Voucher
		</div>
		<img src="~/assets/images/components/coupon.png" />
		<span>
			<b>"{{ orderData.voucher_code }}"</b>
			{{ voucherValue }}
		</span>
		<span class="result">Rp{{ currencyFormat(voucherResult) }}</span>
	</div>

</template>

<script>
import { currencyFormat } from "../../libraries/stringManipulation";
export default {
	name: "VoucherDetails",
	props: ["orderData"],
	computed: {
		voucherValue: function() {
			if (this.orderData.voucher_type_id == 1) {
				return `Diskon produk ${this.orderData.voucher_value}%`;
			}
		},
		voucherResult: function() {
			if (this.orderData.voucher_type_id == 1) {
				return (
					-(this.orderData.total_amount * this.orderData.voucher_value) / 100
				);
			}
		}
	},
	methods: {
		currencyFormat
	}
};
</script>

<style>
.grid-voucher {
	display: grid;
	grid-template-columns: 1fr 4fr 2fr;
	grid-gap: 5px;
	justify-items: center;
	align-items: center;
	margin: 0 24px;
}
.grid-voucher .voucher-header {
	font-weight: bold;
	grid-column: 1/-1;
	justify-self: left;
}
.grid-voucher img {
	/* margin: 5px; */
	width: 100%;
}

.grid-voucher .result {
	justify-self: end;
	color: red;
}
</style>
