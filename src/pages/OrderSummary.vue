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
					:disable="!allowOrder"
					flat
					class="bg-orange-8 text-white full-width"
					@click.once="checkout"
					>Lakukan Pembayaran
				</q-btn>
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
							<ProductList
								v-if="cartData"
								:productDataProp="cartData"
							/>
						</template>
						<!-- {{ skuProduct }} -->
						<div class="row q-px-lg">
							<div class="col">
								<h5 class="title-text">Subtotal</h5>
							</div>
							<div class="col text-right">
								<h6 style="margin: 0; font-size: 12px;" class="text-black">
									Rp{{ formatPrice(cartData.total_amount) }}
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
						v-if="cartData.voucher_id !== null"
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
												<b>"{{ cartData.voucher_code_name }}"</b>
											</span>
										</q-item-section>

										<q-item-section side>
											<h6
												style="margin: 0; font-size: 12px;"
												class="text-red text-right"
											>
												-Rp{{
													formatPrice(
														(cartData.grand_total * cartData.voucher_discount) /
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
									v-if="cartData.voucher_id === null"
								>
									Rp{{
										formatPrice(
											cartData.total_amount + $attrs.shipment.shippingCost
										)
									}}
								</h5>
								<h5
									style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
									v-else-if="cartData.voucher_id !== null"
								>
									<!-- (grand_total-shippingCost) - discount -->
									Rp{{
										formatPrice(
											cartData.total_amount -
												cartData.total_amount *
													(cartData.voucher_discount / 100) +
												$attrs.shipment.shippingCost
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
	cartService,
	catalogService,
	postToOrderUrl,
	destroyCart,
	getHeader
} from "src/config";
// components
import MainLayout from "../layouts/MainLayout.vue";
import ProductList from "../components/Order/ProductList.vue";
export default {
	name: "OrderSummary",
	components: { MainLayout, ProductList },
	data() {
		return {
			allowOrder: false,
			cartData: {
				cart_detail: [],
				total_amount: 0
			},
			totalItem: 0,
			totalProfit: 0
		};
	},
	computed: {
		...mapState(["globalState"])
	},
	async created() {
		if (Object.keys(this.globalState.userProfile).length === 0) {
			await this.$store.dispatch("globalState/getUserProfile");
		}

		await this.getCartData();
	},
	methods: {
		calculateProfit() {
			let tempProfit = 0;
			this.cartData.cart_detail.forEach(cartDetail => {
				tempProfit +=
					(cartDetail.retail_price - cartDetail.reseller_price) *
					cartDetail.qty;
			});
			this.totalProfit = tempProfit;
		},
		async getCartData() {
			this.$q.loading.show({
				backgroundColor: "grey",
				message: "<b>Mohon Tunggu..</b>",
				messageColor: "black"
			});
			this.allowOrder = false;
			let tempCart,
				tempProduct,
				tempProductSkuArr,
				cartRes,
				productRes,
				productSkuRes,
				tempTotalItem = 0;

			try {
				cartRes = await this.$axios({
					method: "get",
					url: `${cartService}/get-cart/${this.globalState.userProfile.id}`,
					headers: getHeader()
				});
			} catch (error) {
				console.log("error fetching cart");
				console.log(error.message);
			}
			tempCart = cartRes.data.data;
			if (
				tempCart && // cart has been created
				tempCart.cart_detail.length > 0
			) {
				if (tempCart.voucher_id !== null) {
					this.couponUse = true;
					this.couponCode = tempCart.voucher_code_name;
				}

				try {
					productSkuRes = await this.$axios({
						method: "post",
						url: `${catalogService}/get-product-skus-by-id`,
						headers: getHeader(),
						data: {
							productSkuIdArr: tempCart.cart_detail.map(e => e.product_sku_id),
							select: ["id", "stock_qty", "keep_stock_qty", "product_id"],
							eagerLoad: {
								productParent: ["id", "product_name", "featured_image"]
							}
						}
					});
				} catch (error) {}

				tempProductSkuArr = productSkuRes.data.data;
				tempCart.cart_detail.forEach((cart_detail, index) => {
					tempTotalItem += cart_detail.qty;

					const findProductSku = tempProductSkuArr.find(
						productSku => productSku.id === cart_detail.product_sku_id
					);
					tempCart.cart_detail[index].product_name =
						findProductSku.product_parent.product_name;

					tempCart.cart_detail[index].featured_image =
						findProductSku.product_parent.featured_image;
					tempCart.cart_detail[index].options = JSON.parse(
						tempCart.cart_detail[index].options
					);

					// findProductSku.qty - findproductSku.Keep - cart qty
					tempCart.cart_detail[index].stock_sufficient =
						findProductSku.stock_qty - findProductSku.keep_stock_qty <
						cart_detail.qty
							? false
							: true;
				});

				this.cartData = tempCart;
				this.allowOrder = !tempCart.cart_detail.some(
					productSku => productSku.stock_sufficient === false
				);
			} else {
				this.cartData = {
					cart_detail: [],
					total_amount: 0
				};
			}
			this.totalItem = tempTotalItem;
			this.calculateProfit();
			this.$q.loading.hide();
		},
		async checkout() {
			this.allowOrder = false;
			await this.getCartData();
			if (this.allowOrder) {
				this.$q.loading.show({
					message: "Mohon Tunggu"
				});

				let postOrder = new FormData();
				postOrder.set("customer_id", this.cartData.customer_id);
				postOrder.set(
					"customer_address_id",
					this.$attrs.shipment.destinationId
				);
				postOrder.set("shipment_fee", this.$attrs.shipment.shippingCost);
				postOrder.set(
					"shipAsDropshipper",
					this.$attrs.shipment.shipAsDropshipper
				);
				if (this.$attrs.shipment.shipAsDropshipper) {
					postOrder.set("customer_name", this.$attrs.shipment.dropshipperName);
					postOrder.set(
						"customer_phone",
						this.$attrs.shipment.dropshipperPhoneNumber
					);
				}
				if (this.$attrs.shipment.type === "resiOtomatis") {
					postOrder.set("shipmentType", "resiOtomatis");
					postOrder.set("awb", this.$attrs.shipment.autoReceiptNumber);
					postOrder.set(
						"courier_name",
						this.$attrs.shipment.autoReceiptCourier
					);
				} else if (this.$attrs.shipment.type === "courierService") {
					postOrder.set("shipmentType", "courierService");
					postOrder.set("courier_name", this.$attrs.shipment.courierName);
					postOrder.set("service_name", this.$attrs.shipment.serviceSelected);
				}
				let postToOrder = null;
				try {
					postToOrder = await this.$axios.post(postToOrderUrl, postOrder, {
						headers: getHeader()
					});
					await this.$axios.delete(destroyCart + "/" + this.cartData.id, {
						headers: getHeader()
					});
				} catch (error) {
					console.log("error checkout");
				}

				this.$q.loading.hide();
				this.$router.push({
					path: "/invoice",
					query: { orderID: postToOrder.data.data.id }
				});
			}
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
