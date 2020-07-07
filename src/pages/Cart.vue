<template>
	<MainLayout
		:HeaderProp="'Keranjang Belanja'"
		v-if="Object.keys(globalState.userProfile).length > 0"
	>
		<template v-slot:main>
			<q-page class="bg-white">
				<div class="bg-grey-3" style="height: 100%">
					<ProductList
						v-if="cartData"
						:cartDataProp="cartData"
						@getCartData="getCartData"
					/>
					<!-- Voucher -->
					<div
						style="background-color: white; margin-bottom: 5px"
						v-if="couponUse === false && cartData.cart_detail.length > 0"
					>
						<div class="row q-pa-xs items-center">
							<div class="col">
								<q-list dense>
									<q-item clickable v-ripple @click="addCouponDialog = true">
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

					<div
						style="background-color: white; margin-bottom: 5px"
						v-else-if="couponUse === true && cartData.cart_detail.length > 0"
					>
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
												<b>"{{ couponCode }}"</b> Terpasang..
											</span>
										</q-item-section>

										<q-item-section side>
											<q-btn
												flat
												dense
												icon="backspace"
												color="red"
												@click="removeCoupon"
											/>
										</q-item-section>
									</q-item>
								</q-list>
							</div>
						</div>
					</div>

					<div
						style="background-color: white; margin-bottom: 5px"
						v-if="cartData.cart_detail.length > 0"
					>
						<div
							class="row q-px-lg items-center"
							style="padding-top: 15px; padding-bottom: 15px"
						>
							<div class="col">
								<h6
									style="font-size: 16px; margin: 0; font-family: 'Open Sans'"
								>
									Total Item
								</h6>
								<h6
									style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold"
								>
									{{ allowOrder ? totalItem : 0 }}
								</h6>
							</div>
							<div class="col">
								<h6
									style="font-size: 16px; margin: 0; font-family: 'Open Sans'"
								>
									Subtotal
								</h6>
								<h6
									style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold"
									class="text-red"
								>
									Rp {{ allowOrder ? formatPrice(cartData.total_amount) : 0 }}
								</h6>
							</div>
						</div>
					</div>
					<div
						style="background-color: white; margin-bottom: 5px"
						v-if="cartData.cart_detail.length > 0"
					>
						<div
							class="row q-px-lg items-center"
							style="padding-top: 15px; padding-bottom: 15px"
						>
							<div class="col">
								<img src="~/assets/images/components/peti.png" width="130" />
							</div>
							<div class="col">
								<h6
									style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px"
								>
									Alhamdulillah potensi keuntungan kamu adalah
								</h6>
								<h6
									style="font-size: 28px; margin: 8px 0; font-family: 'Open Sans'; font-weight: bold"
								>
									Rp {{ allowOrder ? formatPrice(totalProfit) : 0 }}
								</h6>
								<h6
									style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px"
								>
									Jangan lupa sedekah ya :)
								</h6>
							</div>
						</div>
					</div>
					<!-- <div style="background-color: white; margin-bottom: 5px">
						<div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
							<div class="col">
								<q-checkbox keep-color color="orange-8" dense v-model="donasi_act"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp 300</span> melalui lembaga ACT</h6></q-checkbox>
								<q-checkbox keep-color color="orange-8" dense v-model="donasi_rq"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp 300</span> untuk Rumah Quran</h6></q-checkbox>
							</div>
						</div>
          </div>-->
				</div>
				<div class="row bg-white q-pa-md" v-if="cartData.cart_detail.length > 0">
					<div class="col">
						<q-btn
							flat
							:disable="!allowOrder"
							class="bg-orange-8 text-white full-width"
							@click="setShippingAddress"
							>Atur Alamat Pengiriman</q-btn
						>
					</div>
				</div>
			</q-page>

			<q-dialog v-model="addCouponDialog" position="bottom">
				<q-card style="min-width: 360px">
					<!-- <q-card-section>
						<div class="text-h6">Tambah Pelanggan</div>
          </q-card-section>-->

					<q-card-section>
						<q-input
							type="text"
							outlined
							dense
							color="orange-8"
							label="Kode Voucher"
							v-model="couponCode"
							placeholder="Silahkan masukkan kode voucher disini.."
							@input="
								val => {
									couponCode = val.toUpperCase();
								}
							"
						/>
					</q-card-section>

					<q-card-actions class="q-px-md q-pb-md q-pt-xs">
						<q-btn
							flat
							label="Pasang Voucher"
							color="white"
							class="bg-orange-8 text-capitalize full-width"
							@click="addCoupon"
							v-close-popup
						/>
					</q-card-actions>
				</q-card>
			</q-dialog>
		</template>
	</MainLayout>
</template>

<script>
import { mapState } from "vuex";
import {
	cartService,
	catalogService,
	getCartUrl,
	catalogProductUrl,
	removeProductCartUrl,
	totalCartItemUrl,
	updateCartQtyUrl,
	checkCouponUrl,
	addVoucherCartUrl,
	removeVoucherCartUrl,
	getHeader
} from "src/config";
// Loading
import { QSpinnerPuff } from "quasar";
// components
import MainLayout from "../layouts/MainLayout.vue";
import ProductList from "../components/Cart/ProductList.vue";

export default {
	name: "CartPage",
	components: { MainLayout, ProductList },
	data() {
		return {
			// Data Keranjang/Cart
			cartData: {
				cart_detail: [],
				total_amount: 0
			},
			totalProfit: 0,
			totalItem: 0,
			// totalCartItem: 0,
			// Donasi
			donasi_act: false,
			donasi_rq: false,
			// User

			// Total Count Cart Item

			// Edit Qty

			addCouponDialog: false,
			couponCode: null,
			couponUse: false,

			//guard
			allowOrder: false
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
			// set allow order to false initially
			this.$q.loading.show({
				spinner: QSpinnerPuff,
				spinnerColor: "black",
				spinnerSize: 50,
				backgroundColor: "grey",
				message: "<b>Mohon Tunggu..</b>",
				messageColor: "black"
			});
			this.allowOrder = false
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
								productParent : ["id", "product_name", "featured_image"]
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
					tempCart.cart_detail[index].product_name = findProductSku.product_parent.product_name;

					tempCart.cart_detail[index].featured_image = findProductSku.product_parent.featured_image;
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
		formatPrice(value) {
			let val = (value / 1).toFixed(0).replace(".", ",");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},

		async setShippingAddress() {
			await this.getCartData();
			if (this.allowOrder) {
				this.$router.push({
					name: "Shipping"
				});
			} else {
				alert("Keranjang Belanja Masih Kosong!");
			}
		},

		addCoupon() {
			this.$axios
				.get(checkCouponUrl + "/" + this.couponCode, { headers: getHeader() })
				.then(response => {
					console.log(response);

					if (response.status === 200 && response.data.length !== 0) {
						let postVoucher = new FormData();

						postVoucher.set("cart_id", this.cartData.id);
						postVoucher.set("coupon_id", response.data.id);
						postVoucher.set("coupon_code", response.data.coupon_code);
						postVoucher.set("coupon_discount", response.data.coupon_discount);

						// Add Coupon
						this.$axios
							.post(addVoucherCartUrl, postVoucher, { headers: getHeader() })
							.then(response => {
								console.log(response);

								if (response.status === 200) {
									this.getCartData();
									this.couponUse = true;
								}
							})
							.catch(error => {
								if (error.response) {
									console.log(error.response);
								}
							});
					} else {
						this.$q.notify({
							position: "top",
							color: "red",
							message: "Kupon tidak tersedia!"
						});
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
						this.$q.notify({
							position: "top",
							color: "red",
							message: "Kupon tidak tersedia!"
						});
					}
				});
		},
		removeCoupon() {
			this.$axios
				.delete(removeVoucherCartUrl + "/" + this.cartData.voucher_id, {
					headers: getHeader()
				})
				.then(response => {
					console.log(response);

					if (response.status === 200) {
						setTimeout(() => {
							this.getCartData();
							this.couponUse = false;
							this.couponCode = null;
						}, 500);
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		}
	}
};
</script>

<style></style>
