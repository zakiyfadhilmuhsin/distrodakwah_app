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
			<q-toolbar class="bg-white text-black">
				<span v-if="productVariant">
					<h4
						style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
						v-if="globalState.userProfile.role.id === 9"
					>
						KAMU UNTUNG
						<span class="text-green">{{
							"Rp" +
								formatPrice(
									Number(
										productVariant.price -
											productVariant.reseller_exclusive_price
									) * Number(this.qty)
								)
						}}</span>
					</h4>
					<h4
						style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
						v-else-if="globalState.userProfile.role.id === 8"
					>
						KAMU UNTUNG
						<span class="text-green">{{
							"Rp" +
								formatPrice(
									Number(
										productVariant.price - productVariant.reseller_pro_price
									) * Number(this.qty)
								)
						}}</span>
					</h4>
					<h4
						style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold"
						v-else-if="globalState.userProfile.role.id === 10"
					>
						KAMU UNTUNG
						<span class="text-green"></span>
					</h4>
				</span>
				<q-space />
				<q-btn
					flat
					class="bg-orange-8 text-white"
					@click="addToCart"
					v-if="!IsCustomDesign || (IsCustomDesign && IsExclusive)"
				>
					Beli Sekarang
				</q-btn>
				<q-btn flat class="bg-green-8 text-white" v-else
					@click="upgrade">Upgrade Untuk Mendapatkan Fitur Ini</q-btn
				>
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
				<template v-if="dataProduct.length !== 0">
					<div
						style="margin-bottom: 10px; margin-top: -50px"
						v-if="dataProduct.product_variants.length !== 0"
					>
						<carousel :items="1" :nav="false" :loop="true" :autoplay="true">
							<img
								:src="images.image"
								v-for="(images, i) in dataProduct.image_gallery"
								:key="i"
							/>
						</carousel>
					</div>
					<div style="margin-bottom: 10px; margin-top: -50px" v-else>
						<img :src="dataProduct.featured_image" width="100%" />
					</div>
				</template>
				<!------------------------->
				<!-- Information Section -->
				<!------------------------->
				<div class="row q-px-md">
					<div class="col">
						<!-- Informasi Umum -->
						<h5 class="category-text">
							Kategori :
							<span class="text-red">{{ dataCategory.category_name }}</span>
						</h5>
						<h5 class="category-text">
							Brand :
							<span class="text-red">{{ dataBrand.brand_name }}</span>
						</h5>
						<h4 class="product-title-text">{{ dataProduct.product_name }}</h4>
						<div
							style="font-size: 12px; margin: 0; line-height: 14px; font-weight: bold"
						>
							<span class="text">Stok Tersedia</span>
						</div>

						<hr style="margin: 15px 0" />

						<template v-if="dataProduct.product_type === 'Variant Product'">
							<!-- Pilih Warna & Ukuran -->
							<div
								class="row"
								style="margin-bottom: 7px"
								v-for="(opt, index) in inputOptions"
								:key="index"
							>
								<div class="col-xs-4">
									<h5 class="options-title">Pilih {{ opt.optionTitle }}</h5>
								</div>
								<div class="col-xs-8">
									<template v-if="opt.optionValue.length > 3">
										<q-select
											dense
											outlined
											color="orange-8"
											options-dense
											v-model="opt.selectedOption"
											:options="opt.optionValue"
											option-value="value"
											option-label="label"
											emit-value
											map-options
											@input="getProductVariant"
										/>
									</template>
									<template v-else-if="opt.optionValue.length <= 3">
										<q-btn-toggle
											v-model="opt.selectedOption"
											unelevated
											toggle-color="orange-8"
											color="white"
											text-color="orange-8"
											:options="opt.optionValue"
											style="border: 1px solid #f57c00"
											@input="getProductVariant"
										/>
									</template>
								</div>
							</div>
							<!-- <div class="row" style="margin-bottom: 7px">
                <div class="col-xs-4">
                  <h5 class="options-title">Pilih Ukuran</h5>
                </div>
                <div class="col-xs-8">
                  <q-select dense outlined color="orange-8" options-dense v-model="sizeSelected" :options="sizeOptions" />
                </div>
              </div>-->
						</template>
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
						<template
							v-if="
								dataProduct.product_type === 'Simple Product' ||
									(productVariant !== null && productVariant !== '')
							"
						>
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
									<h5 class="price-detail-text" v-if="productVariant">
										Rp{{ formatPrice(productVariant.price * qty) }}
									</h5>

									<h5 class="price-detail-text" v-else>
										Rp{{ formatPrice(dataProduct.price * qty) }}
									</h5>
								</div>
								<div
									class="col-xs-6"
									v-if="globalState.userProfile.role.id === 9"
								>
									<h5
										class="price-detail-text text-green"
										v-if="productVariant"
									>
										Rp{{
											formatPrice(productVariant.reseller_exclusive_price * qty)
										}}
									</h5>
									<h5 class="price-detail-text text-green" v-else>
										Rp{{
											formatPrice(dataProduct.reseller_exclusive_price * qty)
										}}
									</h5>
								</div>
								<div
									class="col-xs-6"
									v-else-if="globalState.userProfile.role.id === 8"
								>
									<h5
										class="price-detail-text text-green"
										v-if="productVariant"
									>
										Rp{{ formatPrice(productVariant.reseller_pro_price * qty) }}
									</h5>
									<h5 class="price-detail-text text-green" v-else>
										Rp{{ formatPrice(dataProduct.reseller_pro_price * qty) }}
									</h5>
								</div>
								<div
									class="col-xs-6"
									v-else-if="globalState.userProfile.role.id === 10"
								>
									<h5
										class="price-detail-text text-green"
										v-if="productVariant"
									>
										Rp{{ formatPrice(productVariant.price) }}
									</h5>
									<h5 class="price-detail-text text-green" v-else>
										Rp{{ formatPrice(dataProduct.price) }}
									</h5>
								</div>
							</div>
						</template>
						<div
							class="row"
							v-if="globalState.userProfile.role.id === 8 && productVariant"
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
											formatPrice(productVariant.reseller_exclusive_price)
										}}</b
									>
								</h4>
							</div>
						</div>

						<hr style="margin: 15px 0" />
						<div class="row">
							<h4 class="price-title-small-text">
								Stok bahan baku:
								<span v-if="yaumeeSpreadsheetsTable.rows.length == 0"
									>Sedang Memuat</span
								>
							</h4>
							<table
								v-if="yaumeeSpreadsheetsTable.rows.length > 0"
								class="stocking-table"
							>
								<thead>
									<tr>
										<th
											v-for="(header, i) in yaumeeSpreadsheetsTable.headers"
											:key="i"
										>
											{{ header }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(row, i) in yaumeeSpreadsheetsTable.rows" :key="i">
										<td>{{ row.Warna }}</td>
										<td>{{ row.M }}</td>
										<td>{{ row.L }}</td>
										<td>{{ row.XL }}</td>
										<td>{{ row.XXL }}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<hr style="margin: 15px 0" />
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
						<p v-html="dataProduct.product_description"></p>
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
									<b>{{ dataProduct.product_name }}</b>
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

.stocking-table {
	border-collapse: collapse;
	background-color: white;
	overflow: hidden;
	width: 100%;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.stocking-table th,
.stocking-table td {
	font-family: "Motnserrat", sans-serif;
	text-align: left;
	font-size: 12px;
	padding: 10px;

	border: 1px solid #7691ab;
}
.stocking-table thead {
	background-color: #7691ab;
	color: white;
	border-radius: 3px;
}
</style>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import carousel from "vue-owl-carousel";
import axios from "axios";
import {
	apiDomain,
	catalogCategoryUrl,
	catalogBrandUrl,
	catalogProductUrl,
	addToCartUrl,
	inventoryStockUrl,
	getHeader
} from "src/config";
import VueClipboard from "vue-clipboard2";
import { openURL } from "quasar";
import { googleSpreadsheetDoc } from "../../config/googleSpreadsheets";
//vanilla.js
import { nthIndex } from "../libraries/stringManipulation";

Vue.use(VueClipboard);

export default {
	name: "KeepDetailProduct",
	data() {
		return {
			dataProduct: [],
			dataCategory: [],
			dataBrand: [],
			productDesc: null,
			yaumeeSpreadsheetsTable: {
				headers: [],
				rows: []
			},

			inputOptions: [],
			optionValueSelected: [],
			qty: 1,
			productVariant: null,
			confirmOrder: false,
			innerLoading: []

			// skuSelected: null
		};
	},
	computed: {
		...mapState(["globalState"]),
		stockReady: function() {
			if (this.productVariant)
				return (
					this.productVariant.stock_qty - this.productVariant.keep_stock_qty
				);
			return null;
		},
		IsCustomDesign: function() {
			return [409, 410, 411, 412].indexOf(this.dataProduct.id) !== -1;
		},
		IsExclusive: function() {
			return this.globalState.userProfile.role_id === 9;
		}
	},
	async created() {
		const doc = await googleSpreadsheetDoc();
		let sheet;
		if (this.dataProduct.category_id == 7 || this.dataProduct.sku == "OS") {
			sheet = await doc.sheetsByIndex[0];
		} else if (
			this.dataProduct.category_id == 8 ||
			this.dataProduct.sku == "OT"
		) {
			sheet = await doc.sheetsByIndex[1];
		} else if (
			this.dataProduct.category_id == 9 ||
			this.dataProduct.sku == "OU"
		) {
			sheet = await doc.sheetsByIndex[2];
		}
		if (sheet) {
			await sheet.loadHeaderRow();
			const rows = await sheet.getRows();
			const rowsMapSpreadsheet = [];
			for await (const row of rows) {
				rowsMapSpreadsheet.push({
					Warna: row["Varian"],
					M: row.M,
					L: row.L,
					XL: row.XL,
					XXL: row.XXL
				});
			}

			this.yaumeeSpreadsheetsTable.headers = sheet.headerValues;
			this.yaumeeSpreadsheetsTable.rows = rowsMapSpreadsheet;
		}
	},
	mounted() {
		this.getProductDetail();
	},
	methods: {
		getProductDetail() {
			axios
				.get(catalogProductUrl + "/" + this.$route.params.product_id, {
					headers: getHeader()
				})
				.then(response => {
					if (response.status === 200) {
						this.dataProduct = response.data.data;
						this.category_name = this.categoryProduct(
							this.dataProduct.category_id
						);
						this.brand_name = this.brandProduct(this.dataProduct.brand_id);

						this.productDesc = this.dataProduct.product_description;

						if (this.dataProduct.product_type === "Variant Product") {
							this.getInputOptions();
						}
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		categoryProduct(id) {
			axios
				.get(catalogCategoryUrl + "/" + id, { headers: getHeader() })
				.then(response => {
					if (response.status === 200) {
						this.dataCategory = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		brandProduct(id) {
			axios
				.get(catalogBrandUrl + "/" + id, { headers: getHeader() })
				.then(response => {
					if (response.status === 200) {
						this.dataBrand = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		getInputOptions() {
			const productVariantsLength = this.dataProduct.product_variants.length;
			let initialIndex = 0;

			this.inputOptions = this.dataProduct.product_options.map(
				(option, optionIndex) => {
					let optionValueSet = new Set();

					for (let index = 0; index < productVariantsLength; index++) {
						const variant = this.dataProduct.product_variants[index];
						const fromIndex = nthIndex(variant.sku, "~", optionIndex + 1) + 1; // ~ and move +1 index
						const toIndex = nthIndex(variant.sku, "~", optionIndex + 2); //next ~(+2) and move +1 index

						const result = variant.sku.substring(
							fromIndex,
							toIndex != -1 ? toIndex : variant.sku.length
						);
						optionValueSet.add(result);
					}

					const optionValueArr = [...optionValueSet];
					const optionValue = optionValueArr.map(optionValue => {
						return {
							label: optionValue,
							value: optionValue
						};
					});
					return {
						optionTitle: option.option_name,
						selectedOption: "",
						optionValue
					};
				}
			);

			// return;
			// for (var i = 0; i < productOptions.length; i++) {
			//   //alert(productOptions[i].option_name);
			//   this.inputOptions.push({
			//     optionTitle: productOptions[i].option_name,
			//     selectedOption: "",
			//     optionValue: []
			//   });

			//   for (var val = 0; val < productOptions[i].values.length; val++) {
			//     this.inputOptions[i].optionValue.push({
			//       label: productOptions[i].values[val].value_name,
			//       value: productOptions[i].values[val].value_name
			//     });
			//   }
			// }
		},
		getProductVariant() {
			// Get option value
			let val = [];
			let productOptionSelected = [];

			for (var key in this.inputOptions) {
				productOptionSelected.push({
					option: this.inputOptions[key].optionTitle,
					value: this.inputOptions[key].selectedOption
				});
				val.push(this.inputOptions[key].selectedOption);
			}

			let optionSelected = String(this.dataProduct.sku) + "~" + val.join("~");

			this.optionValueSelected = JSON.stringify(productOptionSelected);

			// Check product sku with option value
			let varPro = JSON.parse(
				JSON.stringify(this.dataProduct.product_variants)
			);

			this.productVariant = "";
			//let storeVar = [];
			for (var i = 0, l = varPro.length; i < l; i++) {
				if (optionSelected.toUpperCase() === varPro[i].sku) {
					// store product variant

					this.productVariant = {
						id: varPro[i].id,
						product_id: varPro[i].product_id,
						sku: varPro[i].sku,
						price: varPro[i].price,
						reseller_pro_price: varPro[i].reseller_pro_price,
						reseller_exclusive_price: varPro[i].reseller_exclusive_price,
						stock_qty: varPro[i].stock_qty,
						keep_stock_qty: varPro[i].keep_stock_qty
					};
				}
			}
		},
		addToCart() {
			// this.getInputOptions();
			// return;
			// Cek stok dulu
			let error = null;
			if (!/[0-9]/.test(this.qty) || this.qty <= 0) {
				error = "notAllowed";
			}
			if (this.qty > this.stockReady || this.stockReady <= 0) {
				error = "insufficientStock";
			}
			if (this.stockReady == null) {
				error = "variantNotSelected";
			}

			if (!error) {
				let postData = new FormData();

				postData.set("product_id", this.dataProduct.id);
				// Post Data Product Variant
				postData.set("product_sku_id", this.productVariant.id);
				postData.set("product_sku", this.productVariant.sku);
				postData.set("options", this.optionValueSelected);
				postData.set("qty", this.qty);
				postData.set("customer_id", this.globalState.userProfile.id);
				postData.set("customer_name", this.globalState.userProfile.name);
				postData.set("customer_email", this.globalState.userProfile.email);
				postData.set("customer_phone", this.globalState.userProfile.phone);
				postData.set("role_id", this.globalState.userProfile.role.id);

				axios
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
			} else if (error == "insufficientStock") {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Stock Belum Tersedia"
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
			var h2p = require("html2plaintext");

			this.$copyText(h2p(this.productDesc)).then(
				function(e) {
					alert("Copied");
				},
				function(e) {
					alert("Can not copy");
				}
			);
		},
		upgrade() {
			openURL("https://serbalaris.orderonline.id/upgrade-eksklusif");
		}
	},
	components: { carousel, openURL }
};
</script>
