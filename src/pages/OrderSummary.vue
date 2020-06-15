<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/cart">
					<q-icon name="arrow_back" color="white" />
				</q-btn>
				<q-toolbar-title>
					<span style="font-size: 16px; font-weight: bold"
						>Ringkasan Pesanan</span
					>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-footer
			class="bg-white text-black mobile-layout-on-desktop"
			style="border-top: 2px solid #eee"
		>
			<q-toolbar class="bg-white text-black">
				<q-space />
				<q-btn
					flat
					class="bg-orange-8 text-white full-width"
					@click.once="checkout"
					>Lakukan Pembayaran</q-btn
				>
			</q-toolbar>
		</q-footer>

		<q-page-container class="mobile-layout-on-desktop">
			<q-page class="bg-white">
				<div class="bg-grey-3" style="height: 100%">
					<div
						style="background-color: white; margin-bottom: 5px; padding: 13px 0 10px 0"
					>
						<div class="row q-px-md">
							<div class="col">
								<h5 class="title-text">Rincian Pesanan</h5>
							</div>
							<div class="col text-right self-center">
								<q-btn
									to="/cart"
									flat
									dense
									color="white"
									class="text-red text-capitalize"
									style="font-size: 10px; font-weight: 400"
									>Ubah Pesanan</q-btn
								>
							</div>
						</div>
						<br />
						<template>
							<div
								class="row q-px-lg"
								v-for="(item, index) in this.$attrs.cartData.cart_detail"
								:key="index"
							>
								<div class="col-3">
									<img
										:src="item.featured_image"
										width="100%"
										style="border: 1px solid whitesmoke"
									/>
								</div>
								<div class="col-6" style="padding: 0 15px">
									<h5
										style="margin: 0; font-size: 14px; font-weight: bold; line-height: 16px"
									>
										{{ item.product_name }}
									</h5>
									<h6
										style="margin: 5px 0 0 0; font-size: 12px; line-height: 14px"
									>
										<span v-for="(opt, i) in item.options" :key="i">{{
											opt.option + ": " + opt.value
										}}</span>
									</h6>
									<h6 style="margin: -5px 0 0 0; font-size: 12px;">
										Qty {{ item.qty }} x Rp{{ formatPrice(item.reseller_price) }}
									</h6>
								</div>
								<div class="col-3 text-right">
									<h6 style="margin: 0; font-size: 12px;" class="text-black">
										Rp{{ formatPrice(item.qty * item.reseller_price) }}
									</h6>
								</div>
							</div>
						</template>
						<!-- {{ skuProduct }} -->
						<div class="row q-px-lg">
							<div class="col">
								<h5 class="title-text">Subtotal</h5>
							</div>
							<div class="col text-right">
								<h6 style="margin: 0; font-size: 12px;" class="text-black">
									Rp{{ formatPrice(this.$attrs.cartData.total_amount) }}
								</h6>
							</div>
						</div>
					</div>
					<div
						style="background-color: white; margin-bottom: 5px; padding: 13px 0 10px 0"
					>
						<div class="row q-px-md">
							<div class="col">
								<h5 class="title-text">Ongkos Kirim</h5>
							</div>
							<div class="col text-right self-center">
								<q-btn
									to="/shipping"
									flat
									dense
									color="white"
									class="text-red text-capitalize"
									style="font-size: 10px; font-weight: 400"
									>Ubah Ekspedisi</q-btn
								>
							</div>
						</div>
						<br />
						<div
							class="row q-px-sm"
							v-if="$attrs.shipment.type === 'courierService'"
						>
							<div class="col">
								<q-list dense>
									<q-item>
										<q-item-section
											side
											v-if="
												$attrs.shipment.courierName ===
													'Jalur Nugraha Ekakurir (JNE)'
											"
										>
											<img
												src="~/assets/images/components/ekspedisi/jne.png"
												width="65"
											/>
										</q-item-section>
										<q-item-section
											side
											v-else-if="$attrs.shipment.courierName === 'J&T Express'"
										>
											<img
												src="~/assets/images/components/ekspedisi/jnt.png"
												width="65"
											/>
										</q-item-section>
										<q-item-section
											side
											v-else-if="
												$attrs.shipment.courierName === 'POS Indonesia (POS)'
											"
										>
											<img
												src="~/assets/images/components/ekspedisi/pos.png"
												width="65"
											/>
										</q-item-section>

										<q-item-section>{{
											$attrs.shipment.courierName +
												" " +
												$attrs.shipment.serviceSelected
										}}</q-item-section>
										<q-item-section side>
											<h6
												style="margin: 0; font-size: 12px;"
												class="text-black text-right"
											>
												Rp{{ formatPrice($attrs.shipment.shippingCost) }}
											</h6>
										</q-item-section>
									</q-item>
								</q-list>
								<!-- <hr style="border: 1px solid #eee" /> -->
							</div>
						</div>
						<div class="row q-px-sm" v-else>
							<div class="col">
								<q-list dense>
									<q-item>
										<q-item-section>Resi Otomatis </q-item-section>
										<q-item-section side>
											<h6
												style="margin: 0; font-size: 12px;"
												class="text-black text-right"
											>
												Rp{{ formatPrice(this.$attrs.shipment.shippingCost) }}
											</h6>
										</q-item-section>
									</q-item>
								</q-list>
							</div>
						</div>
					</div>
					<div
						style="background-color: white; margin-bottom: 5px; padding: 13px 0 10px 0"
						v-if="this.$attrs.cartData.voucher_id !== null"
					>
						<div class="row q-px-md">
							<div class="col">
								<h5 class="title-text">Potongan Harga</h5>
							</div>
						</div>
						<div class="row q-px-sm">
							<div class="col">
								<q-list dense>
									<q-item>
										<q-item-section avatar>
											<img
												src="~/assets/images/components/coupon.png"
												width="30"
												class="self-center"
											/>
										</q-item-section>

										<q-item-section>
											<span style="font-size: 12px">
												Kode Kupon
												<b>"{{ this.$attrs.cartData.voucher_code_name }}"</b>
											</span>
										</q-item-section>

										<q-item-section side>
											<h6
												style="margin: 0; font-size: 12px;"
												class="text-red text-right"
											>
												-Rp{{
													formatPrice(
														(this.$attrs.cartData.grand_total * this.$attrs.cartData.voucher_discount) /
															100
													)
												}}
											</h6>
										</q-item-section>
									</q-item>
								</q-list>
								<!-- <hr style="border: 1px solid #eee" /> -->
							</div>
						</div>
					</div>
					<div style="background-color: white;; padding: 13px 0 10px 0">
						<!-- <div class="row q-px-lg">
							<div class="col">
								<h5 class="title-text">Donasi</h5>
							</div>
							<div class="col text-right">
								<h5 class="link-text text-red">Ubah Donasi</h5>
							</div>
						</div>
						<div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
							<div class="col-xs-8">
								<h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> melalui lembaga ACT</h6>
								<h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> untuk Rumah Quran</h6>
							</div>
							<div class="col-xs-4 text-right">
								<h6 style="margin: 0; font-size: 12px;" class="text-black">Rp600</h6>
							</div>
						</div>
						<center>
							<hr style="border: 1px solid #eee; width: 90%;" />
            </center>-->
						<div class="row q-px-lg">
							<div class="col">
								<h5
									style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
								>
									Total
								</h5>
							</div>
							<div class="col text-right">
								<h5
									style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
									v-if="this.$attrs.cartData.voucher_id === null"
								>
									Rp{{ formatPrice(this.$attrs.cartData.total_amount + this.$attrs.shipment.shippingCost) }}
								</h5>
								<h5
									style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
									v-else-if="this.$attrs.cartData.voucher_id !== null"
								>
									Rp{{
										formatPrice(
											this.$attrs.cartData.grand_total -
												(this.$attrs.cartData.grand_total * this.$attrs.cartData.voucher_discount) / 100
										)
									}}
								</h5>
							</div>
						</div>
						<hr style="border: none; height: 30px" />
						<div class="row q-px-lg">
							<div class="col">
								<h6
									style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px; text-align: center;"
								>
									Jika kamu sudah yakin dengan pesanan ini silahkan tekan tombol
									<b>Lakukan Pembayaran</b>
								</h6>
							</div>
						</div>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapState } from "vuex";
import {
	getCartUrl,
	addShippingToCart,
	catalogProductUrl,
	postToOrderUrl,
	destroyCart,
	inventoryStockUrl,
	getHeader
} from "src/config";
// components
import MainLayout from "../layouts/MainLayout.vue";

export default {
	name: "OrderSummary",
	components: { MainLayout },
	data() {
		return {
			items: [],
			subTotal: null,
			addressSelect: true,
			ekspedisiSelected: "",
			skuProduct: []
		};
	},
	computed: {
		...mapState(["globalState"])
	},
	created() {},
	methods: {
		async checkout() {
			let postOrder = new FormData();
			postOrder.set("customer_id", this.$attrs.cartData.customer_id);
			postOrder.set("customer_address_id", this.$attrs.shipment.destinationId);
			postOrder.set("shipment_fee", this.$attrs.shipment.shippingCost);
			postOrder.set("useStoreName", this.$attrs.shipment.useStoreName);
			if (this.$attrs.shipment.type === "resiOtomatis") {
				postOrder.set("shipmentType", "resiOtomatis");
				postOrder.set("awb", this.$attrs.shipment.autoReceiptNumber);
				postOrder.set("courier_name", this.$attrs.shipment.autoReceiptCourier);
			} else if (this.$attrs.shipment.type === "courierService") {
				postOrder.set("shipmentType", "courierService");
				postOrder.set("courier_name", this.$attrs.shipment.courierName);
				postOrder.set("service_name", this.$attrs.shipment.serviceSelected);
			}

			await this.$axios
				.post(postToOrderUrl, postOrder, { headers: getHeader() })
				.then(response => {
					if (response.status === 200) {
						this.$router.push({
							path: "/invoice",
							query: { orderID: response.data.data.id }
						});

						// Empty Cart
						this.$axios
							.delete(destroyCart + "/" + this.$attrs.cartData.id, {
								headers: getHeader()
							})
							.then(response => {})
							.catch(error => {
								if (error.response) {
									console.log(error.response);
								}
							});
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		formatPrice(value) {
			let val = (value / 1).toFixed(0).replace(".", ",");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	}
};
</script>

<style>
.title-text {
	font-family: "Open Sans";
	font-size: 13px;
	font-weight: bold;
	margin: 0;
}
.link-text {
	font-family: "Open Sans";
	font-size: 13px;
	margin: 0;
}
</style>
