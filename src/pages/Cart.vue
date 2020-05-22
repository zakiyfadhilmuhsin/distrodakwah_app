<template>
	<q-layout view="hHh lpR fFf">
		<q-header class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/">
					<q-icon name="arrow_back" color="white" />
				</q-btn>
				<q-toolbar-title>
					<span style="font-size: 16px; font-weight: bold"
						>Keranjang Belanja</span
					>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-footer class="mobile-layout-on-desktop">
			<center>
				<q-tabs
					dense
					class="bg-white text-black"
					style="border-top: 2px solid #eeeeee;"
					animated
					swipeable
					align="justify"
				>
					<q-route-tab
						icon="home"
						to="/"
						style="text-transform: capitalize; font-family: 'Open Sans'"
					>
						<span style="font-size: 10px;">Beranda</span>
					</q-route-tab>
					<q-route-tab
						icon="receipt"
						to="/orderList"
						style="text-transform: capitalize; font-family: 'Open Sans'"
					>
						<span style="font-size: 10px;">Pesanan</span>
					</q-route-tab>
					<q-route-tab
						icon="local_mall"
						to="/cart"
						style="text-transform: capitalize; font-family: 'Open Sans'"
					>
						<span style="font-size: 10px;">Keranjang</span>
						<q-badge
							color="red"
							text-color="white"
							floating
							v-if="totalCartItem !== null"
						>
							<b>{{ totalCartItem }}</b>
						</q-badge>
					</q-route-tab>
					<q-route-tab
						icon="account_circle"
						to="/dashboard"
						style="text-transform: capitalize; font-family: 'Open Sans'"
					>
						<span style="font-size: 10px;">Profil</span>
					</q-route-tab>
					<!-- <q-route-tab
						icon="verified_user"
						to="/storefront"
						style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Support</span></q-route-tab>-->
				</q-tabs>
			</center>
		</q-footer>

		<q-page-container class="mobile-layout-on-desktop">
			<q-page class="bg-white">
				<div class="bg-grey-3" style="height: 100%">
					<div
						style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0"
					>
						<q-banner inline-actions rounded class="bg-orange text-white">
							Orderan Kami Tutup Memperingati Hari Raya Iedul Fitr
						</q-banner>
						<template v-if="totalItem > 0">
							<div
								class="row q-px-lg q-py-sm"
								v-for="(item, index) in items"
								:key="index"
							>
								<div class="col-3">
									<img
										:src="item.product_image"
										width="100%"
										style="border: 1px solid whitesmoke"
									/>
								</div>
								<div class="col-7" style="padding: 0 15px">
									<h5
										style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; line-height: 16px"
									>
										{{ item.product_name }}
									</h5>
									<h6
										v-for="(opt, i) in item.options"
										:key="i"
										style="margin: -15px 0; font-size: 12px;"
									>
										{{ opt.option + ": " + opt.value }}
									</h6>
									<h6 style="margin: -15px 0; font-size: 12px;">
										Qty {{ item.qty }} x Rp {{ formatPrice(item.price) }}
									</h6>
									<h6
										style="margin: -15px 0; font-size: 12px;"
										class="text-orange-8"
									>
										Rp {{ formatPrice(item.qty * item.price) }}
									</h6>
								</div>
								<div class="col-2 text-right self-center">
									<q-btn
										flat
										round
										icon="create"
										style="font-size: 10px"
										@click="
											editQty(
												item.id,
												item.price,
												item.qty,
												item.product_sku_id
											)
										"
									/>
									<q-btn
										flat
										color="red"
										round
										icon="delete_forever"
										style="font-size: 10px"
										@click="removeProduct(item.product_sku_id)"
									/>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="row q-pa-lg">
								<div class="col">
									<center>
										<img
											src="http://balitakita.com/packages/yusidabcs/checkout/img/empty-cart-vector.png"
											width="85"
										/>
										<div>Yah, Keranjang Masih Kosong.. Belanja Yuk!</div>
									</center>
								</div>
							</div>
						</template>
						<!-- {{items}} -->
					</div>
					<!-- Voucher -->
					<div
						style="background-color: white; margin-bottom: 5px"
						v-if="couponUse === false"
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
						v-else-if="couponUse === true"
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
					<div style="background-color: white; margin-bottom: 5px">
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
									{{ totalItem }}
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
									Rp {{ formatPrice(subTotal) }}
								</h6>
							</div>
						</div>
					</div>
					<div style="background-color: white; margin-bottom: 5px">
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
									Rp {{ formatPrice(totalProfit) }}
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
				<div class="row bg-white q-pa-md">
					<div class="col">
						<q-btn
							flat
							class="bg-orange-8 text-white full-width"
							@click="setShippingAddress"
							>Atur Alamat Pengiriman</q-btn
						>
					</div>
				</div>
			</q-page>
			<q-dialog v-model="editQtyDialog">
				<q-card style="width: 800px; max-width: 90vw;">
					<q-card-section class="row items-center">
						<h6 style="margin: 0; font-size: 16px">Ubah Jumlah Barang</h6>
						<q-space />
						<q-btn icon="close" size="sm" flat round dense v-close-popup />
					</q-card-section>

					<q-card-section>
						<div class="row items-center">
							<div class="col">
								<q-input
									type="number"
									outlined
									dense
									color="orange-8"
									label="Jumlah"
									v-model="qtyForm"
								/>
							</div>
						</div>
					</q-card-section>

					<q-card-actions class="q-px-md q-pb-md">
						<q-btn
							flat
							class="bg-orange-8 text-white text-capitalize full-width"
							@click="updateQty"
							>Ubah</q-btn
						>
					</q-card-actions>
				</q-card>
			</q-dialog>
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
		</q-page-container>
	</q-layout>
</template>

<script>
import axios from "axios";
import {
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

export default {
	data() {
		return {
			// Data Keranjang/Cart
			cartData: {},
			items: [],
			totalItem: 0,
			subTotal: null,
			totalProfit: 0,
			// Donasi
			donasi_act: false,
			donasi_rq: false,
			// User
			user: null,
			// Total Count Cart Item
			totalCartItem: null,
			editQtyDialog: false,
			// Edit Qty
			qtyForm: null,
			cartDetailIdEdit: null,
			cartDetailPrice: null,
			cartDetailQtyEdit: null,
			productSkuIdEdit: null,
			addCouponDialog: false,
			couponCode: null,
			couponUse: false
		};
	},
	created() {
		this.user = JSON.parse(window.localStorage.getItem("profileUser"));
	},
	mounted() {
		this.getCartData();
		// Get Total Cart Item
		// axios
		//   .get(totalCartItemUrl + "/" + this.user.id, { headers: getHeader() })
		//   .then(response => {
		//     console.log(response);

		//     if (response.status === 200) {
		//       this.totalCartItem = response.data.data;
		//     }
		//   })
		//   .catch(error => {
		//     if (error.response) {
		//       console.log(error.response);
		//     }
		//   });
	},
	methods: {
		getCartData() {
			this.$q.loading.show({
				spinner: QSpinnerPuff,
				spinnerColor: "black",
				spinnerSize: 50,
				backgroundColor: "grey",
				message: "<b>Mohon Tunggu..</b>",
				messageColor: "black"
			});

			this.cartData = [];
			this.items = [];
			this.totalProfit = 0;
			this.totalItem = 0;

			axios
				.get(getCartUrl + "/" + this.user.id, { headers: getHeader() })
				.then(response => {
					if (response.status === 200) {
						this.$q.loading.hide();

						this.cartData = response.data.data;

						if (this.cartData.voucher_id !== null) {
							this.couponUse = true;
							this.couponCode = this.cartData.voucher_code_name;
						}

						for (let i = 0; i < this.cartData.cart_detail.length; i++) {
							// alert(this.cartData.cart_detail[i].product_id);
							axios
								.get(
									catalogProductUrl +
										"/" +
										this.cartData.cart_detail[i].product_id,
									{ headers: getHeader() }
								)
								.then(response => {
									let product_name = response.data.data.product_name;
									let product_image = response.data.data.featured_image;
									let qty = this.cartData.cart_detail[i].qty;
									let product_id = this.cartData.cart_detail[i].product_id;
									let id = this.cartData.cart_detail[i].id;

									if (this.cartData.cart_detail[i].product_sku_id !== null) {
										axios
											.get(
												catalogProductUrl +
													"/" +
													this.cartData.cart_detail[i].product_id +
													"/" +
													this.cartData.cart_detail[i].product_sku_id,
												{ headers: getHeader() }
											)
											.then(response => {
												console.log(response.data.data);

												// let options = JSON.parse(this.cartData.cart_detail[i].options);
												// for(var opt=0; opt<options.length; opt++){
												//   console.log(options[opt].option + 'adalah' + options[opt].value);
												// }
												let price = null;
												if (this.user.role.id === 9) {
													price = response.data.data.reseller_exclusive_price;
												} else if (this.user.role.id === 8) {
													price = response.data.data.reseller_pro_price;
												} else if (this.user.role.id === 10) {
													price = response.data.data.reseller_free_price;
												}
												this.items.push({
													id: id,
													product_id: product_id,
													product_name: product_name,
													product_image: product_image,
													price,
													options: JSON.parse(
														this.cartData.cart_detail[i].options
													),
													qty: qty,
													product_sku_id: this.cartData.cart_detail[i]
														.product_sku_id
												});

												this.totalProfit +=
													(response.data.data.price - price) * qty;
												this.totalItem += qty;
											})
											.catch(error => {
												if (error.response) {
													console.log(error.response);
												}
											});
									} else {
										let price = null;
										if (this.user.role.id === 9) {
											price = response.data.data.reseller_exclusive_price;
										} else if (this.user.role.id === 8) {
											price = response.data.data.reseller_pro_price;
										} else if (this.user.role.id === 10) {
											price = response.data.data.reseller_free_price;
										}
										this.items.push({
											id: id,
											product_id: product_id,
											product_name: product_name,
											product_image: product_image,
											price,
											qty: qty,
											product_sku_id: this.cartData.cart_detail[i]
												.product_sku_id
										});

										this.totalProfit +=
											(response.data.data.price - price) * qty;
										this.totalItem += qty;
									}
								})
								.catch(error => {
									if (error.response) {
										console.log(error.response);
									}
								});
						}
					}

					this.subTotal = this.cartData.total_amount;
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
		},
		removeProduct(product_sku_id) {
			const removeProductParams = {
				product_sku_id: product_sku_id
			};
			axios
				.delete(removeProductCartUrl, {
					headers: getHeader(),
					params: removeProductParams
				})
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						this.getCartData();

						// Get Total Cart Item
						axios
							.get(totalCartItemUrl + "/" + this.user.id, {
								headers: getHeader()
							})
							.then(response => {
								console.log(response);

								if (response.status === 200) {
									this.totalCartItem = response.data.data;
								}
							})
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
		setShippingAddress() {
			// if (this.totalItem > 0) {
			// 	this.$router.push("/shipping");
			// } else {
			// 	alert("Keranjang Belanja Masih Kosong!");
			// }
		},
		editQty(id, price, qty, product_sku_id) {
			this.cartDetailIdEdit = id;
			// this.cartDetailPrice = price;
			this.cartDetailQtyEdit = qty;
			this.productSkuIdEdit = product_sku_id;
			this.qtyForm = qty;

			// Load editQtyDialog
			this.editQtyDialog = true;
		},
		updateQty() {
			let error = null;
			!/[0-9]/.test(this.qtyForm) || this.qtyForm <= 0
				? (error = "notAllowed")
				: "";

			if (!error) {
				// let currentQty = this.cartDetailQtyEdit;
				// let newQty = this.qtyForm;
				// let cartDetailPrice = this.cartDetailPrice * currentQty;
				// let newPrice = this.cartDetailPrice * newQty;
				// let totalAmount = this.subTotal;
				// let totalKurangi = totalAmount - cartDetailPrice;
				// let totalAkhir = totalKurangi + newPrice;

				let updateForm = new FormData();

				updateForm.set("cart_id", this.cartData.id);
				updateForm.set("cart_detail_id", this.cartDetailIdEdit);
				updateForm.set("role_id", this.user.role_id);
				updateForm.set("product_sku_id", this.productSkuIdEdit);
				// updateData.set("current_price", cartDetailPrice);
				// updateData.set("new_price", newPrice);
				updateForm.set("qty", this.qtyForm);

				axios
					.post(updateCartQtyUrl, updateForm, { headers: getHeader() })
					.then(response => {
						console.log(response);

						if (response.status === 200) {
							console.log(response.data.data);
							this.getCartData();
							this.qtyForm = null;

							// Get Total Cart Item
							axios
								.get(totalCartItemUrl + "/" + this.user.id, {
									headers: getHeader()
								})
								.then(response => {
									console.log(response);

									if (response.status === 200) {
										this.totalCartItem = response.data.data;
									}
								})
								.catch(error => {
									if (error.response) {
										console.log(error.response);
									}
								});
						}
					})
					.catch(error => {
						if (error.response.data.error == "insufficientStock") {
							this.$q.notify({
								position: "top",
								color: "red",
								message: "Stock Tidak Mencukupi"
							});
						}
					});

				// close Dialog
				this.editQtyDialog = false;
			} else {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Cek Jumlah Yang Anda Masukkan"
				});
			}
		},
		addCoupon() {
			axios
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
						axios
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
			axios
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
