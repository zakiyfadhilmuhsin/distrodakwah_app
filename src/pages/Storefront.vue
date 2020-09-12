<template>
	<HomeLayout>
		<div class="page-content">
			<div
				class="bg-distrodakwah q-px-md row"
				style="padding-top: 15px; padding-bottom: 40px"
			>
				<div class="col-sm-2">
					<div
						v-if="
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
								<q-icon name="style" style="font-size: 13px; color: #db5959" />
								Pesanan
							</p>
						</div>
					</router-link>
				</div>
			</div>
			<Slider class="slider" />
			<CategoryGrid
				v-if="categoryData.length > 0"
				:categoryData="categoryData"
			/>
			<Showcase
				class="showcase"
				title="Best Outdoor Wear for Moslem"
				:productArr="adzzumarProductData"
				:user="globalState.userProfile"
				showcaseBackground="#fea500"
			/>
			<Showcase
				class="showcase"
				title="Mofast"
				:productArr="mofastProductData"
				:user="globalState.userProfile"
			/>
			<Showcase
				class="showcase"
				title="Produk Terbaru"
				:productArr="newProductData"
				:user="globalState.userProfile"
			/>
			<Showcase
				class="showcase"
				title="Produk Unggulan"
				:productArr="featuredProductData"
				:user="globalState.userProfile"
			/>
			<Showcase
				class="showcase"
				title="Produk Best Seller"
				:productArr="bestSellerProductData"
				:user="globalState.userProfile"
			/>
			<Showcase
				class="showcase"
				title="Produk Custom"
				:productArr="customProductData"
				:user="globalState.userProfile"
			/>
		</div>
	</HomeLayout>
</template>

<script>
import { mapState } from "vuex";

//plugins

// helpers
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
	totalCartItemUrl
} from "src/config";
import { openURL } from "quasar";

//components
import CategoryGrid from "../components/Storefront/Categories/CategoryGrid.vue";
import HomeLayout from "../layouts/HomeLayout.vue";
import Showcase from "../components/Storefront/Showcase.vue";
import Slider from "../components/Storefront/Sliders/Slider";
//methods
export default {
	components: {
		CategoryGrid,
		HomeLayout,
		Showcase,
		Slider
	},

	data() {
		return {
			// Slider Section
			dataSlider: [],
			slide: "style",
			lorem: "Lorem ipsum dolor, sit amet consectetur ",
			// Category Section
			categoryData: [],
			// Brand Section
			dataBrand: [],
			// Product Section
			dataProducts: [],
			adzzumarProductData: [],
			newProductData: [],
			mofastProductData: [],
			featuredProductData: [],
			bestSellerProductData: [],
			customProductData: [],
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
			// Total Count Cart Item
			totalCartItem: null,
			startProduct: 1
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
		await this.getCategories();
		await this.getAdzzumarProducts();
		await this.getMofastProducts();
		await this.getNewProducts();
		await this.getFeaturedProducts();
		await this.getBestSellerProducts();
		this.getCustomProducts();
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

	methods: {
		async getTotalRevenue() {
			const revenueRes = await this.$axios.get(
				`${apiDomain}/analytics/get-total-revenue`,
				{ headers: getHeader() }
			);
			this.globalState.userProfile.total_revenue =
				revenueRes.data.data.total_revenue;
		},
		getCategories() {
			return new Promise(async (resolve, reject) => {
				const categoryRes = await this.$axios.get(catalogCategoryUrl, {
					headers: getHeader()
				});

				this.categoryData = categoryRes.data.data;
				resolve();
			});
		},
		async getNewProducts() {
			const products = await this.$axios({
				method: "get",
				url: `${getProductByClassUrl}/new`,
				headers: getHeader()
			});
			this.newProductData = products.data.data.filter(product =>
				product.product_variants.some(
					variant => variant.stock_qty - variant.keep_stock_qty > 0
				)
			);
		},
		// non paginated
		async getAdzzumarProducts() {
			const formParams = {
				brandIdArr: [30],
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

			const p = productRes.data.data.filter(product =>
				product.product_variants.some(
					variant => variant.stock_qty - variant.keep_stock_qty > 0
				)
			);
			this.adzzumarProductData = p;
		},
		async getMofastProducts() {
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

			const p = productRes.data.data.data.filter(product =>
				product.product_variants.some(
					variant => variant.stock_qty - variant.keep_stock_qty > 0
				)
			);

			this.mofastProductData = p
		},
		getFeaturedProducts() {
			this.featuredProductData = [];

			this.$axios
				.get(getProductByClassUrl + "/" + "produk-unggulan", {
					headers: getHeader()
				})
				.then(response => {
					if (response.status === 200) {
						this.featuredProductData = response.data.data.filter(product =>
							product.product_variants.some(
								variant => variant.stock_qty - variant.keep_stock_qty > 0
							)
						);
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		async getBestSellerProducts() {
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
				this.bestSellerProductData = catalogRes.data.data.data.filter(product =>
					product.product_variants.some(
						variant => variant.stock_qty - variant.keep_stock_qty > 0
					)
				);
			} catch (error) {
				console.log("error products");
				console.log(error.message);
			}
		},
		getCustomProducts() {
			this.customProductData = [];

			this.$axios
				.get(getProductByClassUrl + "/" + "product-custom", {
					headers: getHeader()
				})
				.then(response => {
					if (response.status === 200) {
						this.customProductData = response.data.data;
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
.page-content {
	display: grid;
	grid-template-columns: 100%;
	/* align-items: center; */
	/* justify-items: center; */
	/* flex-direction: column; */
}

/* .class */

.slider {
	padding: 0 15px;
	width: 100%;
	margin-top: -30px;
	justify-self: center;
}
.orange-background {
	background: #fea500;
}
</style>
