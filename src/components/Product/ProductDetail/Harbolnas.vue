<template>
	<div>
		<div class="q-pa-md bg-grey-3" v-if="RoleId === 9">
			<div style="font-size: 18px; margin-top: -5px; margin-bottom:-10px; font-family: 'Teko'; font-weight: bold" class="row harbolnas-profit-label">Rincian Disc : </div> <br />
			<div style="margin-top: -13px; " class="row">
				<div class="col-xs-6">
					<h5 class="price-title-small-text">Harbolnas</h5>
				</div>
				<div class="col-xs-6">
					<h5 class="price-title-small-text">Reseller </h5>
				</div>
			</div>
			<div style="margin-bottom: -15px;" class="row">
				<div class="col-xs-6">
					<h5 class="price-detail-text text-green">
						{{ harbolnasResellerExclusiveProfit }}
					</h5>
				</div>
				<div
					class="col-xs-6"

				>
					<h5 class="price-detail-text text-green">
						{{ resellerExclusiveProfit }}
					</h5>
				</div>
			</div>
		</div>
		<div class="q-pa-md bg-grey-3" v-else-if="RoleId === 8">
			<div style="font-size: 18px; margin-top: -5px; margin-bottom:-10px; font-family: 'Teko'; font-weight: bold" class="row harbolnas-profit-label">Rincian Disc : </div> <br />
			<div style="margin-top: -13px; " class="row">
				<div class="col-xs-6">
					<h5 class="price-title-small-text">Harbolnas</h5>
				</div>
				<div class="col-xs-6">
					<h5 class="price-title-small-text">Reseller </h5>
				</div>
			</div>
			<div style="margin-bottom: -15px;" class="row">
				<div class="col-xs-6">
					<h5 class="price-detail-text text-green">
						{{ harbolnasResellerExclusiveProfit }}
					</h5>
				</div>
				<div
					class="col-xs-6"

				>
					<h5 class="price-detail-text text-green">
						{{ resellerExclusiveProfit }}
					</h5>
				</div>
			</div>
		</div>
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
}

.harbolnas-profit-label {
	grid-column: 1 / span 2;
}
</style>
