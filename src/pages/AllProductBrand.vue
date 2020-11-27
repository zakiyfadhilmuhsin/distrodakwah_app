<template>
	<q-layout view="lHh Lpr lFf">
		<q-header class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/">
					<q-icon name="arrow_back" color="white" />
				</q-btn>

				<q-toolbar-title>
					<span style="font-size: 16px; font-weight: bold">{{
						categoryName
					}}</span>
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<!-- <q-footer class="mobile-layout-on-desktop">
      <center>
        filter disini
      </center>
    </q-footer>-->

		<q-page-container class="mobile-layout-on-desktop">
			<q-page>
				<div class="bg-grey-3" style="height: 100%">
					<div style="background-color: white;">
						<div
							class="row q-px-md q-py-lg"
							style="margin-bottom: 15px padding: 15px 10px"
						>
							<div
								class="col-6"
								style="margin-bottom: 15px"
								v-for="(product, index) in newProduct"
								:key="index"
							>
								<template
									v-if="
										product.brand_id === 7 &&
											product.id !== 412 &&
											product.id !== 519 &&
											product.id !== 520 &&
											product.id !== 521
									"
								>
									<KeepProductCard :product="product" :user="user" />
								</template>
								<template
									v-else-if="
										product.id === 519 ||
											product.id === 520 ||
											product.id === 521
									"
								>
									<PromotionProductCard :product="product" :user="user" />
								</template>

								<template v-else>
									<VendorProductCard :product="product" :user="user" />
								</template>
							</div>
						</div>

						<div class="q-pb-lg flex flex-center">
							<q-pagination
								flat
								v-model="page"
								color="orange-8"
								:max="lastPage"
								:max-pages="6"
								:direction-links="true"
								@input="onChangePage"
							></q-pagination>
						</div>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import axios from "axios";
import { apiDomain, getProductByCategoryUrl, getHeader } from "src/config";
// Loading
import { QSpinnerPuff, QSpinnerDots } from "quasar";
import Vue from "vue";
//components
import VendorProductCard from "../components/ProductCard/vendorProductCard.vue";
import KeepProductCard from "../components/ProductCard/keepProductCard.vue";
import PromotionProductCard from "../components/ProductCard/promotionProductCard.vue";

export default {
	name: "ProductsByCategory",
	components: {
		VendorProductCard,
		KeepProductCard,
		PromotionProductCard
	},
	data() {
		return {
			// Product Section
			dataProduct: [],
			sortField: "id",
			sortOrder: "desc",
			defaultSortOrder: "desc",
			page: 1,
			perPage: 4,
			isPaginated: true,
			// Loading
			innerLoading: false,
			featuredImageShow: true,
			// user
			user: [],
			categoryName: "",
			categoryID: null,
			// limit: 2,
			productsCount: 0,
			busy: false,
			lastPage: 0
		};
	},
	computed: {
		newProduct() {
			return this.dataProduct.slice().reverse();
		}
	},
	created() {
		this.user = JSON.parse(window.localStorage.getItem("profileUser"));
		this.categoryName = this.$route.params.category;
		this.categoryID = this.$route.params.category_id;
		this.$q.loading.show({
			spinner: QSpinnerPuff,
			spinnerColor: "black",
			spinnerSize: 50,
			backgroundColor: "grey",
			message: "<b>Mohon Tunggu..</b>",
			messageColor: "black"
		});
	},
	mounted() {
		this.$q.loading.hide();

		this.getProduct();
	},
	methods: {
		onChangePage(page) {
			this.getProduct();
		},
		getProduct() {
			// if (this.productsCount !== this.dataProduct.length || this.productsCount === 0) {
			if (this.productsCount === 0) {
				const params = [
					//'api_key=bb6f51bef07465653c3e553d6ab161a8',
					`sort=${this.sortField}`,
					`order=${this.sortOrder}`,
					`limit=${this.perPage}`,
					`page=${this.page}`
				].join("&");

				this.innerLoading = true;
				this.featuredImageShow = false;
				this.busy = true;

				axios
					.get(getProductByCategoryUrl + "/" + this.categoryID + `?${params}`, {
						headers: getHeader()
					})
					.then(response => {
						const data = response.data.data;
						if (response.status === 200) {
							// const append = response.data.data.slice(
							// const append = data.data.slice(
							//   this.dataProduct.length,
							//   this.dataProduct.length + this.perPage
							// );
							// this.productsCount = response.data.data.length
							// this.productsCount = data.data.length  ;
							this.dataProduct = data.data;
							this.lastPage = data.last_page;
							this.page = data.current_page;
							setTimeout(() => {
								this.$q.loading.hide();
								this.busy = false;
								this.innerLoading = false;
								this.featuredImageShow = true;
							}, 100);
						}
					})
					.catch(error => {
						if (error.response) {
							console.log(error.response);
						}
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

<style scoped>
.promo-text {
	font-family: "Open Sans";
	font-size: 13px;
	font-weight: bold;
	margin: 0;
	padding-left: 12px;
}
.link-text {
	font-family: "Open Sans";
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

.pagination-container {
	margin: 0 10px;
}
</style>
