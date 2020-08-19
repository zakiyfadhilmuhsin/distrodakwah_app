<template>
	<q-dialog v-model="isOpen" position="bottom">
		<q-card style="min-width: 360px">
			<q-card-section>
				<div class="text-h6">Konfirmasi Pembayaran</div>
			</q-card-section>

			<q-card-section>
				<q-select
					color="orange-8"
					dense
					outlined
					v-model="receiverBank"
					:options="bankData"
					option-value="bank_name_tmp"
					option-label="bank_name_tmp"
					label="Bank Tujuan"
					emit-value
					map-options
					style="margin-bottom: 5px"
				/>
				<q-input
					type="text"
					color="orange-8"
					v-model="senderBank"
					label="Transfer Dari Bank"
					dense
					outlined
					style="margin-bottom: 5px"
				/>
				<q-input
					type="text"
					color="orange-8"
					v-model="senderName"
					label="Nama Pengirim"
					dense
					outlined
					style="margin-bottom: 5px"
				/>
				<q-input
					type="number"
					color="orange-8"
					v-model="transferAmount"
					label="Total Transfer"
					dense
					outlined
					style="margin-bottom: 5px"
				/>
				<div
					class="q-field row no-wrap items-start bg-grey-2 q-mb-sm q-input q-field--outlined q-field--float q-field--dense"
				>
					<div
						class="q-field__inner relative-position col self-stretch column justify-center"
					>
						<div
							class="q-field__control relative-position row no-wrap text-orange-8"
						>
							<div
								class="q-field__control-container col relative-position row no-wrap q-anchor--skip"
							>
								<flat-pickr
									v-model="transferDate"
									class="q-field__native"
									placeholder="Tanggal Transfer"
								></flat-pickr>
							</div>
						</div>
					</div>
				</div>
				<!-- <q-input dense outlined v-model="transferDate" color="orange-8" placeholder="Tanggal Transfer">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="transferDate" mask="YYYY-MM-DD" color="orange-8" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>-->
			</q-card-section>

			<q-card-actions class="q-px-md">
				<q-btn
					flat
					label="Konfirmasi Sekarang"
					color="white"
					class="bg-orange-8 text-capitalize full-width"
					@click="postPaymentConfirmation"
					v-close-popup
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
import { paymentConfirmationUrl, getHeader } from "../../config";
import { openURL } from "quasar";
// components
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
	name: "PaymentConfirmationDialog",
	components: {
		flatPickr
	},
	props: {
		order: Object,
		bankData: Array
	},
	data() {
		return {
			receiverBank: "",
			senderBank: "",
			senderName: "",
			transferAmount: "",
			transferDate: "",
			//
			isOpen: false
		};
	},
	methods: {
		async postPaymentConfirmation() {
			let paymentConfirm = new FormData();

			paymentConfirm.set("invoice", this.order.invoice);
			paymentConfirm.set("bank_receiver", this.receiverBank);
			paymentConfirm.set("bank_sender", this.senderBank);
			paymentConfirm.set("sender_name", this.senderName);
			paymentConfirm.set("total_transfer", this.transferAmount);
			paymentConfirm.set("transfer_date", this.transferDate);
			paymentConfirm.set("order_id", this.order.id);
			let paymentConfirmRes;
			try {
				paymentConfirmRes = await this.$axios({
					method: "post",
					url: paymentConfirmationUrl,
					data: paymentConfirm,
					headers: getHeader()
				});
				this.$emit("payment-confirm-succeed");
			} catch (error) {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Error Melakukan Konfirmasi"
				});
			}

			this.receiverBank = "";
			this.senderBank = "";
			this.senderName = "";
			this.transferAmount = "";
			this.transferDate = "";
		},
		toggle() {
			this.isOpen = !this.isOpen;
		}
	}
};
</script>

<style></style>
