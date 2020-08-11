<template>
	<div
		class="row q-px-lg items-center"
		style="padding-top: 15px;"
		id="price-details"
	>
		<div class="col-xs-8">
			<h6
				style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px"
			>
				Total Harga Barang
			</h6>
			<h6
				style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px"
			>
				Ongkos Kirim
			</h6>

			<!-- <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi</h6> -->
		</div>
		<div class="col-xs-4 text-right">
			<span
				style="margin: 0; font-size: 12px; line-height: 18px"
				class="text-black"
			>
				Rp{{ currencyFormat(orderData.total_amount) }}
			</span>
			<span
				style="margin: 0; font-size: 12px; line-height: 18px"
				class="text-black"
			>
				Rp{{ currencyFormat(orderData.shipment_fee) }}
			</span>
		</div>
	</div>
</template>

<script>
import { currencyFormat } from "../../libraries/stringManipulation";

export default {
	name: "PriceDetails",
	props: ["orderData"],
	computed: {
		discount: function() {
			if (this.orderData.type_id === 1) {
				return (
					(this.orderData.total_amount * this.orderData.voucher_value) / 100
				);
			}
		}
	},
	methods: {
		currencyFormat
	}
};
</script>

<style></style>
