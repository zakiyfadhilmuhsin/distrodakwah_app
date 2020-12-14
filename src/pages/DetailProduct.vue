<template>
	<q-layout view="hHh lpR fFf">
		<q-header reveal class="mobile-layout-on-desktop transparent no-shadow">
			<q-toolbar>
				<q-btn
					flat
					round
					dense
					to="/"
					style="background-color: rgba(0, 0, 0, 0.15)"
				>
					<q-icon name="arrow_back" color="white" />
				</q-btn>
				<q-space />
				<!-- <q-btn
          flat
          dense
          round
          icon="shopping_cart"
        >
          <q-badge color="amber-5" class="text-black" floating>3</q-badge>
        </q-btn>
        <q-btn
          flat
          dense
          round
        >
          <q-icon name="share" color="white" />
        </q-btn>-->
			</q-toolbar>
		</q-header>

		<q-footer
			class="bg-white text-black mobile-layout-on-desktop"
			style="border-top: 2px solid #eee"
		>
			<q-toolbar class="bg-white text-black" style="display:block !important;">
				<div class="q-pa-md">
					<ProfitText
					:RoleId="globalState.userProfile.role.id"
					:SelectedVariant="selectedVariant"
					:ProductData="productData"
					:Qty="qty"
				/>
				</div>

				<div class="q-pa-md full-width">
				<q-btn flat class="bg-orange-8 text-white full-width" @click="addToCart"
					>Beli Sekarang</q-btn
				>
				</div>
			</q-toolbar>
		</q-footer>

		<q-page-container class="mobile-layout-on-desktop bg-white">
			<q-page>
				<!-- <template v-if="dataProduct.length !== 0">
          <div style="margin-bottom: 10px; margin-top: -50px" v-if="dataProduct.image_gallery.length !== 0">
            <carousel :items="1" :nav="false" :loop="true" :autoplay="true">
                <img :src="gallery.image" v-for="(gallery, i) in dataProduct.image_gallery" :key="i">
            </carousel>
          </div>
          <div style="margin-bottom: 10px; margin-top: -50px" v-else>
            <img :src="dataProduct.featured_image" width="100%" />
          </div>
        </template>-->
				<!-------------------------->
				<!-- Product Image Slider -->
				<!-------------------------->
				<template v-if="!isEmpty(productData)">
					<div
						style="margin-bottom: 10px; margin-top: -50px"
						v-if="productData.product_variants.length !== 0"
					>
						<carousel :items="1" :nav="false" :loop="true" :autoplay="true">
							<img
								:src="images.image"
								v-for="(images, i) in productData.image_gallery"
								:key="i"
							/>
						</carousel>
					</div>
				</template>
				<!------------------------->
				<!-- Information Section -->
				<!------------------------->
				<div class="row q-px-md">
					<div class="col" v-if="!isEmpty(productData)">
						<!-- Informasi Umum -->
						<h5 class="category-text">
							Kategori :
							<span class="text-red">{{
								productData.category_detail.category_name
							}}</span>
						</h5>
						<h5 class="category-text">
							Brand :
							<span class="text-red">{{
								productData.brand_detail.brand_name
							}}</span>
						</h5>
						<h4 class="product-title-text">{{ productData.product_name }}</h4>
						<div
							style="font-size: 12px; margin: 0; line-height: 14px; font-weight: bold"
						>
							<span class="text-red" v-if="stockReady == null"
								>Pilih Varian Untuk Melihat Jumlah Stok</span
							>
							<span v-else
								>Stok Tersedia:
								{{
									stockReady === "not_available"
										? "Varian Tidak ada"
										: stockReady
								}}</span
							>
						</div>

						<hr style="margin: 15px 0" />
						<!-- Pilih Warna & Ukuran -->
						<template v-if="isOptionsAllowed">
							<div
								class="row"
								style="margin-bottom: 7px"
								v-for="(opt, index) in inputOptions"
								:key="index"
							>
								<div class="col-xs-4">
									<h5 class="options-title">Pilih {{ opt.option_name }}:</h5>
								</div>
								<div class="col-xs-8">
									<select
										:name="opt.option_name"
										id=""
										@change="constructSKU($event)"
									>
										<option value="" selected disabled></option>
										<option
											:value="value"
											v-for="(value, i) in opt.option_value"
											:key="i"
											>{{ value }}</option
										>
									</select>
									<!-- <q-select
										dense
										outlined
										color="orange-8"
										options-dense
										:options="opt.option_value"
										@change="constructSKU($event)"
									/> -->
								</div>
							</div>
						</template>
						<!-- <div class="row" style="margin-bottom: 7px">
                <div class="col-xs-4">
                  <h5 class="options-title">Pilih Ukuran</h5>
                </div>
                <div class="col-xs-8">
                  <q-select dense outlined color="orange-8" options-dense v-model="sizeSelected" :options="sizeOptions" />
                </div>
              </div>-->
						<div class="row">
							<div class="col-xs-4">
								<h5 class="options-title">Qty</h5>
							</div>
							<div class="col-xs-8">
								<q-input
									type="number"
									dense
									outlined
									color="orange-8"
									options-dense
									v-model="qty"
									style="width: 85px"
									:rules="[val => val > 0 || 'Minimum 1 pcs']"
									lazy-rules
								/>
							</div>
						</div>
						<br />
						<!-- Informasi Harga -->

						<div class="row">
							<div class="col-xs-6">
								<h5 class="price-title-small-text">Harga Konsumen</h5>
							</div>
							<div class="col-xs-6">
								<h5 class="price-title-small-text">Harga Reseller</h5>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-6">
								<h5 class="price-detail-text" v-if="selectedVariant">
									Rp{{ formatPrice(selectedVariant.price * qty) }}
								</h5>
							</div>
							<div
								class="col-xs-6"
								v-if="globalState.userProfile.role.id === 9"
							>
								<h5 class="price-detail-text text-green" v-if="selectedVariant">
									Rp{{
										formatPrice(selectedVariant.reseller_exclusive_price * qty)
									}}
								</h5>
							</div>
							<div
								class="col-xs-6"
								v-else-if="globalState.userProfile.role.id === 8"
							>
								<h5 class="price-detail-text text-green" v-if="selectedVariant">
									Rp{{ formatPrice(selectedVariant.reseller_pro_price * qty) }}
								</h5>
							</div>
							<div
								class="col-xs-6"
								v-else-if="globalState.userProfile.role.id === 10"
							>
								<h5 class="price-detail-text text-green" v-if="selectedVariant">
									{{ resellerFreePrice }}
								</h5>
							</div>
						</div>

						<div
							class="row"
							v-if="globalState.userProfile.role.id === 8 && selectedVariant"
						>
							<div class="col">
								<h4 class="upgrade-cta-text">
									<span class="text-black" style="text-decoration: underline;">
										<q-btn
											@click="upgrade"
											flat
											rounded
											size="sm"
											class="bg-green text-white"
											>Upgrade Dulu Aja!</q-btn
										>
									</span>
									Agar Dapat Harga
									<b
										>Rp{{
											formatPrice(selectedVariant.reseller_exclusive_price)
										}}</b
									>
								</h4>
							</div>
						</div>

						<hr style="margin: 15px 0" />

						<div class="row">
							<div class="col">
								<div class="row" style="margin-bottom: 5px">
									<div class="col">
										<h4 class="price-title-small-text">Rincian Produk</h4>
									</div>

									<div class="col text-right" style="padding-top: 5px">
										<q-btn
											flat
											class="bg-red text-white"
											size="sm"
											label="Salin"
											@click="doCopy"
										/>
									</div>
								</div>
								<p v-html="productData.product_description"></p>
							</div>
						</div>
					</div>
				</div>
			</q-page>
			<q-dialog v-model="confirmOrder">
				<q-card style="width: 800px; max-width: 90vw;">
					<!-- <q-card-section class="row items-center">
            <h6 style="margin: 0; font-size: 16px">Berhasil Masuk Keranjang</h6>
            <q-space />
            <q-btn icon="close" size="sm" flat round dense v-close-popup />
          </q-card-section>-->

					<q-card-section>
						<div class="row items-center">
							<div class="col">
								<center>
									<img
										src="~/assets/images/components/shopping-cart.svg"
										width="80"
									/>
								</center>
							</div>
						</div>
						<br />
						<div class="row">
							<div class="col text-center">
								<h5 style="font-size: 18px; margin: 0; line-height: 24px">
									<b>{{ productData.product_name }}</b>
									<br />telah dimasukkan ke keranjang belanja Anda
								</h5>
							</div>
						</div>
						<br />
						<div class="row">
							<div class="col">
								<q-btn
									to="/cart"
									flat
									class="bg-orange-8 text-white full-width"
								>
									<b>Cek Keranjang</b>
								</q-btn>
								<h5 style="font-size: 10px; margin: 0; text-align: center;">
									Atau
								</h5>
								<q-btn to="/" outline color="black" class="full-width">
									<b>Lanjut Belanja</b>
								</q-btn>
							</div>
						</div>
					</q-card-section>
				</q-card>
			</q-dialog>
		</q-page-container>
	</q-layout>
</template>

<style>
.category-text {
	font-size: 13px;
	font-family: "Open Sans";
	color: black;
	margin: 0;
	line-height: 15px;
}
.product-title-text {
	font-size: 21px;
	font-family: "Open Sans";
	color: black;
	font-weight: bold;
	margin: 2px 0 15px 0;
}
.options-title {
	font-size: 14px;
	font-family: "Open Sans";
	color: black;
	font-weight: bold;
	margin: 2px 0;
}
.price-title-small-text {
	font-size: 14px;
	font-family: "Open Sans";
	color: black;
	font-weight: bold;
	margin: 0;
}
.price-detail-text {
	font-size: 21px;
	font-family: "Open Sans";
	color: black;
	font-weight: bold;
	margin-top: -5px;
	margin-bottom: 10px;
}
.upgrade-cta-text {
	background-color: #ffca28;
	padding: 5px;
	font-size: 12px;
	font-family: "Open Sans";
	color: black;
	margin: 2px 0;
	text-align: center;
	border-radius: 5px;
}
</style>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { cloneDeep, isEmpty } from "lodash";
import h2p from "html2plaintext";
import {
	apiDomain,
	catalogService,
	catalogCategoryUrl,
	catalogBrandUrl,
	catalogProductUrl,
	addToCartUrl,
	inventoryStockUrl,
	getHeader
} from "src/config";
import VueClipboard from "vue-clipboard2";
import { openURL } from "quasar";
import carousel from "vue-owl-carousel";
//vanilla.js
import { currencyFormat } from "../libraries/stringManipulation";

Vue.use(VueClipboard);

export default {
	name: "DetailProduct",
	data() {
		return {
			productData: {},
			selectedSkuId: null,
			selectedOption: {},
			selectedVariant: null,
			inputOptions: {},

			optionValueSelected: [],
			qty: 1,
			productVariant: null,
			confirmOrder: false,
			innerLoading: [],
			user: null
			// skuSelected: null
		};
	},
	computed: {
		...mapState(["globalState"]),
		isFreeNotReady: function() {
			return cloneDeep(this.productData.product_variants)
				.map(variant => variant.reseller_free_price)
				.some(price => price === null);
		},
		resellerFreeProfit: function() {
			return this.isFreeNotReady
				? "Belum Siap"
				: `Rp${currencyFormat(
						this.selectedVariant.price -
							this.selectedVariant.reseller_free_price
				  )}`;
		},
		resellerFreePrice: function() {
			return this.isFreeNotReady
				? "Belum Siap"
				: `Rp${currencyFormat(this.selectedVariant.reseller_free_price)}`;
		},
		stockReady: function() {
			if (this.selectedSkuId) {
				const productSku = this.productData.product_variants.find(
					e => e.id == this.selectedSkuId
				);

				return productSku.stock_qty - productSku.keep_stock_qty;
			}

			return "not_available";
		},
		isOptionsAllowed: function() {
			return this.inputOptions.length > 0;
			// return !isEmpty(this.inputOptions) ? true: false;
		}
	},
	async created() {
		if (Object.keys(this.globalState.userProfile).length === 0) {
			await this.$store.dispatch("globalState/getUserProfile");
		}
		await this.getProductData();
		await this.getInputOptions();
	},
	mounted() {
		// this.getProductDetail();
	},
	methods: {
		async getProductData() {
			const getProductParams = {
				productIdArr: [this.$route.params.product_id],
				select: [
					"id",
					"product_name",
					"product_description",
					"brand_id",
					"category_id",
					"featured_image"
				],
				eagerLoad: {
					brand: ["id", "brand_name"],
					category_detail: ["id", "category_name"],
					product_sku: [
						"id",
						"product_id",
						"sku",
						"stock_qty",
						"keep_stock_qty",
						"price",
						"cogs",
						"reseller_pro_price",
						"reseller_exclusive_price",
						"reseller_free_price"
					],
					image_gallery: ["id", "image", "product_id"]
				}
			};

			const _productData = await this.$axios({
				method: "post",
				url: `${catalogService}/get-products-by-id`,
				headers: getHeader(),
				data: getProductParams
			});

			this.productData = cloneDeep(_productData.data.data[0]);
		},

		async getInputOptions() {
			const optionParams = {
				productIdArr: [this.productData.id],
				eagerLoad: {
					sku_values: ["*"]
				}
			};

			const optionRes = await this.$axios({
				method: "post",
				url: `${catalogService}/options/get-options-by-product-id`,
				headers: getHeader(),
				data: optionParams
			});

			this.productData.options = cloneDeep(optionRes.data.data);
			const _inputOptions = [];
			optionRes.data.data.forEach(option => {
				_inputOptions.push({
					option_name: option.option_name,
					option_value: [
						...new Set(option.sku_values.map(sku_value => sku_value.value))
					]
				});
			});

			this.inputOptions = cloneDeep(_inputOptions);
		},
		constructSKU(event) {
			(this.selectedSkuId = null),
				(this.selectedVariant = null),
				(this.selectedOption = {
					...this.selectedOption,
					[event.target.name]: event.target.value
				});
			let allOptionSelected = true;
			const allSku = [];

			this.inputOptions.forEach(opt => {
				if (!this.selectedOption.hasOwnProperty(opt.option_name))
					allOptionSelected = false;
			});

			if (allOptionSelected == false) return;

			this.productData.options.forEach(opt => {
				allSku.push(
					opt.sku_values
						.filter(
							sku_value =>
								sku_value.value.toLowerCase() === this.selectedOption[opt.option_name].toLowerCase()
						)
						.map(sku_value => sku_value.product_sku_id)
				);
			});

			const allSkuLength = allSku.length;
			let firstLength = 0;
			allSku.forEach(
				arrays =>
					(firstLength =
						arrays.length > firstLength ? arrays.length : firstLength)
			);

			if (allSku.length === 1) {
				// success
				this.selectedSkuId = parseInt(allSku[0][0]);
				this.selectedVariant = this.productData.product_variants.find(
					e => e.id == this.selectedSkuId
				);
				return 0;
			} else {
				let isAvailable = [];
				for (let index = 0; index < allSku[0].length; index++) {
					allSku.forEach(skuIDArr => {
						isAvailable.push(skuIDArr.some(skuID => skuID == allSku[0][index]));
						// console.log(skuIDCompare, "compare");
						// console.log(skuIDArr, "with");
						// console.log(skuIDArr.some(skuID => skuID == skuIDCompare));
						// console.log(allSku, "sku");
					});

					const allTrue = isAvailable.every(elem => {
						return elem == true;
					});

					if (allTrue) {
						this.selectedSkuId = parseInt(allSku[0][index]);
						this.selectedVariant = this.productData.product_variants.find(
							e => e.id == this.selectedSkuId
						);
						return 0;
						break;
					}

					isAvailable = [];
				}

				this.selectedSkuId = null;
			}
		},
		addToCart() {
			// this.getInputOptions();
			// return;
			// Cek stok dulu
			let error = null;
			// if (this.globalState.userProfile.role.id === 10 && this.isFreeNotReady) {
			// 	error = "notReady"; // product is not ready for free reseller
			// }

			if (!/[0-9]/.test(this.qty) || this.qty <= 0) {
				error = "notAllowed";
			}
			if (this.qty > this.stockReady || this.stockReady <= 0) {
				error = "insufficientStock";
			}
			if (this.stockReady == null) {
				error = "variantNotSelected";
			}

			if (this.stockReady === "not_available") error = "variant_not_available";

			if (!error) {
				let postData = new FormData();

				postData.set("product_id", this.productData.id);
				// Post Data Product Variant
				postData.set("product_sku_id", this.selectedSkuId);
				postData.set("product_sku", this.selectedVariant.sku);
				postData.set("options", JSON.stringify(this.selectedOption));
				postData.set("qty", this.qty);
				postData.set("customer_id", this.globalState.userProfile.id);
				postData.set("customer_name", this.globalState.userProfile.name);
				postData.set("customer_email", this.globalState.userProfile.email);
				postData.set("customer_phone", this.globalState.userProfile.phone);
				postData.set("role_id", this.globalState.userProfile.role.id);

				this.$axios
					.post(addToCartUrl, postData, { headers: getHeader() })
					.then(response => {
						if (response.status === 200) {
							//this.$q.notify({position: 'top', color: 'dark', message: 'Produk Ditambahkan ke Keranjang'});
							this.confirmOrder = true;
						}
					})
					.catch(error => {
						if (error.response.data.error == "insufficientStock") {
							this.$q.notify({
								position: "top",
								color: "red",
								message: "Keranjang anda melebihi stok yang tersedia"
							});
						} else {
							this.$q.notify({
								position: "top",
								color: "red",
								message: "Periksa Kembali Keranjang Anda"
							});
						}
					});
			} else if (error == "notAllowed") {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Cek Jumlah Yang Anda Masukkan"
				});
			} else if (error == "notReady") {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Produk Belum Siap"
				});
			} else if (error == "insufficientStock") {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Stock Belum Tersedia"
				});
			} else if (error == "variant_not_available") {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Varian tidak tersedia, pilih varian yang lain"
				});
			} else {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Silahkan Pilih Varian Terlebih Dahulu"
				});
			}
		},
		formatPrice(value) {
			let val = (value / 1).toFixed(0).replace(".", ",");
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
		doCopy: function() {
			this.$copyText(h2p(this.productData.product_description));
		},
		upgrade() {
			openURL("https://kayaberkah.orderonline.id/upgrade-Reseller");
		},
		isEmpty
	},
	components: { carousel, openURL }
};
</script>
