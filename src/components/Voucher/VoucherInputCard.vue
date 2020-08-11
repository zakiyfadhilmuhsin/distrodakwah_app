<template>
	<div>
		<div
			style="background-color: white; margin-bottom: 5px"
			v-if="
				Object.keys(voucherDataResult).length === 0 &&
					voucherDataResult.constructor === Object
			"
		>
			<div class="row q-pa-xs items-center">
				<div class="col">
					<q-list dense>
						<q-item clickable v-ripple @click="addVoucherDialog = true">
							<q-item-section avatar>
								<img
									src="~/assets/images/components/coupon.png"
									width="30"
									class="self-center"
								/>
							</q-item-section>

							<q-item-section>Punya kode voucher?</q-item-section>
						</q-item>
					</q-list>
				</div>
			</div>
		</div>

		<div style="background-color: white; margin-bottom: 5px" v-else>
			<div class="row q-pa-xs items-center">
				<div class="col">
					<q-list dense>
						<q-item dense>
							<q-item-section avatar style="margin-right: -20px">
								<q-icon color="green" name="check_circle" />
							</q-item-section>

							<q-item-section>
								<span>
									Kode
									<b>"{{ $props.voucherDataResult.code }}"</b> Terpasang..
								</span>
							</q-item-section>

							<q-item-section side>
								<q-btn
									flat
									dense
									icon="backspace"
									color="red"
									@click="removeVoucher"
								/>
							</q-item-section>
						</q-item>
						<div v-if="voucherDataResult.type_id" class="grid-voucher">
							<img src="~/assets/images/components/coupon.png" alt="" />
							<span>
								Nilai Diskon {{ voucherDataResult.voucher_percentage.value }}%
							</span>
							<span class="value"> -Rp.{{ currencyFormat(discount) }}</span>
						</div>
					</q-list>
				</div>
			</div>
		</div>

		<q-dialog v-model="addVoucherDialog" position="bottom">
			<q-card style="min-width: 360px">
				<q-card-section>
					<q-input
						type="text"
						outlined
						dense
						color="orange-8"
						label="Kode Voucher"
						v-model="voucherCodeInput"
						placeholder="Silahkan masukkan kode voucher disini.."
					/>
				</q-card-section>

				<q-card-actions class="q-px-md q-pb-md q-pt-xs">
					<q-btn
						flat
						label="Pasang Voucher"
						color="white"
						class="bg-orange-8 text-capitalize full-width"
						@click="addVoucher"
						v-close-popup
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import { getVoucherByCode } from "../../libraries/vouchers";
import { currencyFormat } from "../../libraries/stringManipulation";
export default {
	name: "VoucherInputCard",
	props: ["voucherDataResult", "cartData"],
	data() {
		return {
			useVoucher: false,
			addVoucherDialog: false,
			voucherCodeInput: null
		};
	},
	computed: {
		discount: function() {
			if (this.voucherDataResult.type_id === 1) {
				return (
					(this.cartData.total_amount *
						this.voucherDataResult.voucher_percentage.value) /
					100
				);
			}
		}
	},
	methods: {
		removeVoucher() {
			this.$emit("update:voucherDataResult", {});
		},
		async addVoucher() {
			let error = null;
			if (this.voucherCodeInput == "") error = "no input";

			if (error) {
				this.$q.notify({ message: "Kolom Voucher Kosong", color: "red" });
				return -1;
			}
			const getVoucherForm = {
				voucherCode: this.voucherCodeInput
			};

			try {
				const voucherRes = await getVoucherByCode(getVoucherForm);
				this.$emit("update:voucherDataResult", voucherRes.data.data);
			} catch (error) {
				this.$q.notify({
					message: "Kesalahan Saat Menginput Voucher",
					position: "top",
					color: "red"
				});
			}
		},
		currencyFormat
	}
};
</script>

<style scoped>
.grid-voucher {
	display: grid;
	grid-template-columns: 1fr 4fr 2fr;
	grid-gap: 5px;
	justify-items: center;
	align-items: center;
	margin: 0 20px;
}

.grid-voucher img {
	/* margin: 5px; */
	width: 100%;
}

.grid-voucher .value {
	justify-self: end;
	color: red;
}
</style>
