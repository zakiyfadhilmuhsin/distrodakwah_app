<template>
	<q-layout view="lHh Lpr lFf">
		<q-header
			class="mobile-layout-on-desktop"
			style="box-shadow: none !important"
		>
			<q-toolbar class="bg-distrodakwah text-white">
				<!-- <q-space /> -->
				<img
					src="~/assets/images/components/logo-distrodakwah.png"
					width="50%"
					class="q-ml-xs"
				/>
				<q-badge color="red" class="text-bold q-ml-sm">
					BETA
				</q-badge>

				<q-space />
				<q-btn flat dense round to="/inbox">
					<q-icon name="notifications" />
					<span v-if="newMessage" class="notify-bubble"></span>
				</q-btn>
				<q-btn flat dense round dropdown to="/search">
					<q-icon name="search" />
				</q-btn>
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
					<q-tab
						icon="fa fa-comments"
						@click="
							openURL('https://tawk.to/chat/5f101bf55b59f94722bad5d5/default')
						"
						style="text-transform: capitalize; font-family: 'Open Sans'"
					>
						<span style="font-size: 10px;">Live Chat</span>
					</q-tab>
					<q-route-tab
						icon="account_circle"
						to="/dashboard"
						style="text-transform: capitalize; font-family: 'Open Sans'"
					>
						<span style="font-size: 10px;">Profil</span>
					</q-route-tab>
				</q-tabs>
			</center>
		</q-footer>

		<q-page-container class="mobile-layout-on-desktop" id="storefront">
			<q-page>
				<div class="bg-grey-1" style="height: 100%">
					<!----------------------->
					<!-- Header Storefront -->
					<!----------------------->
					<div
						class="bg-distrodakwah q-px-md row"
						style="padding-top: 15px; padding-bottom: 40px"
					>
						<div class="col-sm-2">
							<div
								v-if="
									user &&
										globalState.userProfile.role &&
										globalState.userProfile.role.id &&
										globalState.userProfile.role.id === 8
								"
							>
								<img
									src="~/assets/images/components/new_silver_badge.png"
									width="62"
								/>
							</div>
							<div
								style="margin-top: 2px"
								v-if="
									user &&
										globalState.userProfile.role &&
										globalState.userProfile.role.id &&
										globalState.userProfile.role.id === 9
								"
							>
								<img
									src="~/assets/images/components/new_gold_badge.png"
									width="62"
								/>
							</div>
							<div
								v-if="
									user &&
										globalState.userProfile.role &&
										globalState.userProfile.role.id &&
										globalState.userProfile.role.id === 10
								"
							>
								<img
									src="~/assets/images/components/new_bronze_badge.png"
									width="62"
								/>
							</div>
						</div>
						<div class="col-sm-7 q-px-md">
							<p
								class="text-white text-bold"
								style="margin: 0; font-family:'Open Sans'; font-size: 14px"
							>
								{{ globalState.userProfile.name }}
							</p>
							<p class="text-white" style="margin: 0 0 5px 0; font-size: 11px">
								{{
									user &&
										globalState.userProfile.role &&
										globalState.userProfile.role.role_name
								}}
							</p>
							<div
								class="bg-white shadow-2"
								style="border-radius: 5px; width: max-content; padding: 2px 5px"
							>
								<p
									class="text-bold text-amber-9"
									style="margin: 0; font-size: 10px"
								>
									Total Pendapatan :
									<span class="text-green"
										>Rp{{
											currencyFormat(this.globalState.userProfile.total_revenue)
										}}</span
									>
								</p>
							</div>
						</div>
						<div class="col-sm-3">
							<router-link to="/orderList/" style="text-decoration: none;">
								<div
									class="bg-white shadow-2 float-right"
									style="border-radius: 15px; width: max-content; padding: 4px 6px"
								>
									<p
										class="text-bold text-grey-9"
										style="margin: 0; font-size: 11px; font-family: 'Poppins'"
									>
										<q-icon
											name="style"
											style="font-size: 13px; color: #db5959"
										/>
										Pesanan
									</p>
								</div>
							</router-link>
						</div>
					</div>
					<!------------------>
					<!-- Slider Promo -->
					<!------------------>
					<div
						style="margin-top: -43px; margin-bottom: -20px"
						v-if="dataSlider.length !== 0"
					>
						<div class="q-pa-md">
							<carousel
								:autoplay="true"
								:nav="false"
								:items="1"
								:center="true"
								:loop="true"
								:stagePadding="0"
								:margin="0"
								:responsive="{
									0: { items: 1, nav: false },
									600: { items: 1, nav: false }
								}"
								style="width: 100%"
							>
								<img
									v-for="(slider, index) in dataSlider"
									:key="index"
									:src="slider.slider_image"
								/>
							</carousel>
						</div>
					</div>
					<br />
					<!--------------------->
					<!-- Kategori Produk -->
					<!--------------------->
					<div style="background-color: #FAFAFA;">
						<div class="row q-pa-xs">
							<div class="col">
								<h5 class="promo-text">Kategori Produk</h5>
							</div>
							<!-- <div class="col text-right">
								<h5 class="link-text text-orange-8">Lihat Semua</h5>
							</div> -->
						</div>
						<div class="row" style="padding: 0px 10px 15px 10px">
							<div
								class="col-3"
								v-for="(category, index) in dataCategory"
								:key="index"
							>
								<div style="margin: 5px">
									<router-link
										:to="
											'/allProductBrand/' +
												category.category_name +
												'/' +
												category.id
										"
										style="text-decoration: none; color: black !important;"
									>
										<center>
											<div
												style="background-color: #f4e1cb; padding-top: 12px; padding-bottom: 10px; border-radius: 8px; margin: 6px"
											>
												<center>
													<img :src="category.image_url" width="35" />
												</center>
											</div>
										</center>
										<p
											style="margin: 0; font-size: 10px; text-align: center; font-weight: bold"
										>
											{{ category.category_name }}
										</p>
									</router-link>
								</div>
							</div>
						</div>
					</div>
					<div class="row q-pa-xs orange-background">
						<div class="col-8">
							<h5 class="promo-text text-white">Produk Mofast</h5>
						</div>
						<div class="col-4 text-right">
							<!-- <router-link> -->
							<h5 class="link-text text-white">Lihat Semua</h5>
							<!-- </router-link> -->
						</div>
					</div>
					<div
						class="row q-px-md orange-background"
						style="padding: 5px 10px 10px 10px"
					>
						<div class="col">
							<swiper :options="swiperProductListOption">
								<swiper-slide
									v-for="(product, index) in orderBy(
										dataMofastProduct,
										'product_name'
									).reverse()"
									:key="index"
								>
									<template v-if="product.brand_id === 7 && product.id !== 412">
										<KeepProductCard :product="product" :user="user" />
									</template>
									<template v-else>
										<VendorProductCard :product="product" :user="user" />
									</template>
								</swiper-slide>
								<div class="swiper-product-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>

					<!------------------------->
					<!-- New Product Section -->
					<!------------------------->
					<div class="bg-grey-3" style="height: 8px"></div>
					<div class="row q-pa-xs">
						<div class="col-8">
							<h5 class="promo-text">Produk Terbaru</h5>
						</div>
						<div class="col-4 text-right">
							<!-- <router-link> -->
							<h5 class="link-text text-orange-8">Lihat Semua</h5>
							<!-- </router-link> -->
						</div>
					</div>

					<div class="row q-px-md" style="padding: 5px 10px 10px 10px">
						<div class="col">
							<swiper :options="swiperProductListOption">
								<swiper-slide
									v-for="(product, index) in orderBy(
										dataNewProduct,
										'product_name'
									).reverse()"
									:key="index"
								>
									<template v-if="product.brand_id === 7 && product.id !== 412">
										<KeepProductCard :product="product" :user="user" />
									</template>
									<template v-else>
										<VendorProductCard :product="product" :user="user" />
									</template>
								</swiper-slide>
								<div class="swiper-product-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>
					<!----------------------------->
					<!-- Produk Unggulan Section -->
					<!----------------------------->
					<div class="bg-grey-3" style="height: 8px"></div>
					<div class="row q-pa-xs">
						<div class="col-8">
							<h5 class="promo-text">Produk Unggulan</h5>
						</div>
						<div class="col-4 text-right">
							<!-- <router-link> -->
							<h5 class="link-text text-orange-8">Lihat Semua</h5>
							<!-- </router-link> -->
						</div>
					</div>
					<div class="row q-px-md" style="padding: 5px 10px 10px 10px">
						<div class="col">
							<swiper :options="swiperProductListOption">
								<swiper-slide
									v-for="(product, index) in orderBy(
										dataFeaturedProduct,
										'product_name'
									).reverse()"
									:key="index"
								>
									<template v-if="product.brand_id === 7 && product.id !== 412">
										<KeepProductCard :product="product" :user="user" />
									</template>
									<template v-else>
										<VendorProductCard :product="product" :user="user" />
									</template>
								</swiper-slide>
								<div class="swiper-product-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>
					<!----------------------------->
					<!-- Produk Terlaris Section -->
					<!----------------------------->
					<div class="bg-grey-3" style="height: 8px"></div>
					<div class="row q-pa-xs">
						<div class="col-8">
							<h5 class="promo-text">Produk Best Seller</h5>
						</div>
						<div class="col-4 text-right">
							<!-- <router-link> -->
							<h5 class="link-text text-orange-8">Lihat Semua</h5>
							<!-- </router-link> -->
						</div>
					</div>
					<div class="row q-px-md" style="padding: 5px 10px 10px 10px">
						<div class="col">
							<swiper :options="swiperProductListOption">
								<swiper-slide
									v-for="(product, index) in orderBy(
										dataBestSellerProduct,
										'product_name'
									).reverse()"
									:key="index"
								>
									<template v-if="product.brand_id === 7 && product.id !== 412">
										<KeepProductCard :product="product" :user="user" />
									</template>
									<template v-else>
										<VendorProductCard :product="product" :user="user" />
									</template>
								</swiper-slide>
								<div class="swiper-product-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>
					<!--------------------------->
					<!-- Produk Custom Section -->
					<!--------------------------->
					<div class="bg-grey-3" style="height: 8px"></div>
					<div class="row q-pa-xs">
						<div class="col-8">
							<h5 class="promo-text">Produk Custom</h5>
						</div>
						<div class="col-4 text-right">
							<!-- <router-link> -->
							<h5 class="link-text text-orange-8">Lihat Semua</h5>
							<!-- </router-link> -->
						</div>
					</div>
					<div class="row q-px-md" style="padding: 5px 10px 10px 10px">
						<div class="col">
							<swiper :options="swiperProductListOption">
								<swiper-slide
									v-for="(product, index) in orderBy(
										dataProductCustom,
										'product_name'
									).reverse()"
									:key="index"
								>
									<!--  7 = yaumee
								412 = cap -->
									<template v-if="product.brand_id === 7 && product.id !== 412">
										<KeepProductCard :product="product" :user="user" />
									</template>
									<template v-else>
										<VendorProductCard :product="product" :user="user" />
									</template>
								</swiper-slide>
								<div class="swiper-product-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapState } from "vuex";
import io from "socket.io-client";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import carousel from "vue-owl-carousel";
import { currencyFormat } from "../libraries/stringManipulation";
import {
	apiDomain,
	catalogCategoryUrl,
	catalogBrandUrl,
	catalogProductUrl,
	catalogService,
	getHeader,
	getProductByCategoryUrl,
	getNewProductUrl,
	getProductByClassUrl,
	identitySliderUrl,
	orderService,
	totalCartItemUrl,
	socketIoEndpoint
} from "src/config";

let socket;

// Loading
import { QSpinnerPuff } from "quasar";
//components
import VendorProductCard from "../components/ProductCard/vendorProductCard.vue";
import KeepProductCard from "../components/ProductCard/keepProductCard.vue";
import Vue2Filters from "vue2-filters";

//methods
import { openURL } from "quasar";
export default {
	components: {
		swiper,
		swiperSlide,
		carousel,
		VendorProductCard,
		KeepProductCard
	},
	mixins: [Vue2Filters.mixin],

	data() {
		return {
			// Slider Section
			dataSlider: [],
			slide: "style",
			lorem: "Lorem ipsum dolor, sit amet consectetur ",
			// Category Section
			dataCategory: [],
			// Brand Section
			dataBrand: [],
			// Product Section
			dataProducts: [],
			dataNewProduct: [],
			dataMofastProduct: [],
			dataFeaturedProduct: [],
			dataBestSellerProduct: [],
			dataProductCustom: [],
			dataProductByBrand: [],
			// Slider Section
			swiperProductListOption: {
				slidesPerView: 2,
				centeredSlides: false,
				spaceBetween: 10,
				pagination: {
					el: ".swiper-product-pagination",
					clickable: true
				}
			},
			// Loading
			innerLoading: false,
			// user
			user: {},
			// Total Count Cart Item
			totalCartItem: null,
			startProduct: 1,
			newMessage: false
		};
	},
	computed: {
		...mapState(["globalState"]),
		newProduct() {
			return this.dataProduct.slice().reverse();
		}
	},
	async created() {
		if (Object.keys(this.globalState.userProfile).length === 0) {
			await this.$store.dispatch("globalState/getUserProfile");
		}
		this.getUser();
		this.getBrand();
		this.getSlider();
		this.getProductByCategory();
		this.getMofastProduct();
		this.getNewProduct();
		this.getFeaturedProduct();
		this.getBestSellerProduct();
		this.getProductCustom();
		this.getTotalRevenue();
		this.initiateSocketIO();
	},
	async mounted() {
		// Get Total Cart Item
		try {
			const totalCartItems = await this.$axios.get(
				totalCartItemUrl + "/" + this.globalState.userProfile.id,
				{ headers: getHeader() }
			);
			if (totalCartItems.data.data !== "cart_is_empty") {
				this.totalCartItem = totalCartItems.data.data;
			}
		} catch (error) {}
	},
	async destroyed() {
		console.log("wawa");
		socket.disconnect();
	},

	methods: {
		initiateSocketIO() {
			socket = io(socketIoEndpoint);
			socket.on("notify", message => {
				console.log("asdasd");
				this.newMessage = true;
			});
		},
		async getUser() {
			return new Promise(async resolve => {
				try {
					const userRes = await this.$axios.get(`${apiDomain}/auth/user`, {
						headers: getHeader()
					});

					window.localStorage.setItem(
						"profileUser",
						JSON.stringify(userRes.data)
					);
					this.user = userRes.data;
					return resolve();
				} catch (error) {
					console.log("error fetching user");
				}
			});
		},
		async getTotalRevenue() {
			const revenueRes = await this.$axios.get(
				`${apiDomain}/analytics/get-total-revenue`,
				{ headers: getHeader() }
			);
			this.globalState.userProfile.total_revenue =
				revenueRes.data.data.total_revenue;
		},
		getProductByCategory() {
			this.dataProducts = [];

			this.$axios
				.get(catalogCategoryUrl, { headers: getHeader() })
				.then(response => {
					if (response.status === 200) {
						this.dataCategory = response.data.data;

						for (let i = 0; i < this.dataCategory.length; i++) {
							this.$axios
								.get(getProductByCategoryUrl + "/" + this.dataCategory[i].id, {
									headers: getHeader()
								})
								.then(response => {
									if (response.status === 200) {
										this.dataProducts.push({
											id: this.dataCategory[i].id,
											category_name: this.dataCategory[i].category_name,
											products: response.data.data
										});
									}
								})
								.catch(error => {
									if (error.response) {
										console.log(error.response);
									}
								});
						}
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		getNewProduct() {
			this.dataNewProduct = [];

			this.$axios
				.get(getProductByClassUrl + "/" + "new", {
					headers: getHeader()
				})
				.then(response => {
					if (response.status === 200) {
						this.dataNewProduct = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		async getMofastProduct() {
			const formParams = {
				brandIdArr: [24],
				limit: 6,
				eagerLoad: {
					brand: ["*"],
					product_sku: ["*"]
				}
			};
			const productRes = await this.$axios({
				method: "post",
				url: `${catalogService}/get-products-by-brand-id`,
				data: formParams,
				headers: getHeader()
			});

			this.dataMofastProduct = [...productRes.data.data.data];
		},
		getFeaturedProduct() {
			this.dataFeaturedProduct = [];

			this.$axios
				.get(getProductByClassUrl + "/" + "produk-unggulan", {
					headers: getHeader()
				})
				.then(response => {
					if (response.status === 200) {
						this.dataFeaturedProduct = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		async getBestSellerProduct() {
			let orderRes, catalogRes, productIdArr;
			try {
				orderRes = await this.$axios.get(
					`${orderService}/get-frequently-purchased-products`,
					{
						headers: getHeader()
					}
				);
				//orderIds of best seller
				productIdArr = orderRes.data.data.map(order => order.product_id);
			} catch (error) {
				console.log("error fetching best seller");
				console.log(error.message);
			}
			//get products by product id arr
			const getProductsParams = {
				limit: 10,
				productIdArr,
				eagerLoad: {
					brand: ["id"],
					product_sku: ["*"]
				}
			};

			try {
				catalogRes = await this.$axios({
					method: "post",
					url: `${catalogService}/get-products-by-id`,
					headers: getHeader(),
					data: getProductsParams
				});
				this.dataBestSellerProduct = catalogRes.data.data.data;
			} catch (error) {
				console.log("error products");
				console.log(error.message);
			}
		},
		getProductCustom() {
			this.dataProductCustom = [];

			this.$axios
				.get(getProductByClassUrl + "/" + "product-custom", {
					headers: getHeader()
				})
				.then(response => {
					if (response.status === 200) {
						this.dataProductCustom = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		getBrand() {
			this.$axios
				.get(catalogBrandUrl, { headers: getHeader() })
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

		getSlider() {
			this.$axios
				.get(identitySliderUrl, { headers: getHeader() })
				.then(response => {
					if (response.status === 200) {
						this.dataSlider = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		currencyFormat,
		openURL
	}
};
</script>

<style>
.orange-background {
	background: #fea500;
}
.promo-text {
	font-family: "Poppins" !important;
	font-size: 13px;
	font-weight: 500 !important;
	margin: 0;
	padding-left: 12px;
}
.link-text {
	font-family: "Poppins" !important;
	font-size: 13px;
	margin: 0;
	padding-right: 10px;
}
.swiper-slide {
	width: 85%;
}
.category-title {
	font-size: 13px;
	margin: 0;
	text-align: center;
	text-transform: capitalize;
	line-height: 15px;
	font-weight: 400;
	padding: 10px 0px;
}
#storefront .owl-carousel .owl-item img {
	width: 100%;
	border-radius: 10px;
	float: left;
	height: auto;
}
#storefront .owl-carousel .owl-stage-outer {
	border-radius: 10px;
	box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14),
		0 1px 10px rgba(0, 0, 0, 0.12);
}
.owl-theme .owl-dots .owl-dot.active span {
	background: #fea500 !important;
}
.q-btn__wrapper {
	width: auto;
}

.notify-bubble {
	background: lightseagreen;
	position: absolute;
	right: 5px;
	top: -1px;
	padding: 2px 6px;
	color: #fff;
	font: bold 0.6em Tahoma, Arial, Helvetica;
	height: 30%;
	border-radius: 3px;
}
</style>
