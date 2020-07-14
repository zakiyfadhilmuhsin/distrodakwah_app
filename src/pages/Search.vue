<template>
	<q-layout view="lHh Lpr lFf">
		<q-header class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/" style="margin-right: 15px">
					<q-icon name="arrow_back" color="white" />
				</q-btn>

				<q-space />

				<q-input
					v-model="search"
					outlined
					dense
					placeholder="Cari Produk.."
					color="orange-8"
					bg-color="white"
					class="full-width"
					autofocus
					clearable
					@change="getProduct"
					@clear="getProduct"
				>
				</q-input>
				<q-btn color="orange-8" label="cari" @click="getProduct" />
			</q-toolbar>
		</q-header>

		<q-page-container class="mobile-layout-on-desktop">
			<q-page>
				<div class="bg-grey-3" style="height: 100%">
					<div
						style="background-color: white; margin-bottom: 10px; padding-bottom: 15px"
					>
						<div class="row q-px-md" style="padding: 15px 10px">
							<div
								class="col-6"
								style="margin-bottom: 15px"
								v-for="(product, index) in newProduct"
								:key="index"
							>
								<template v-if="product.brand_id === 7">
									<FreePlanKeepProductCard
										:product="product"
										:user="globalState.userProfile"
										v-if="globalState.userProfile.role_id === 10"
									/>
									<KeepProductCard
										:product="product"
										:user="globalState.userProfile"
										v-else
									/>
								</template>
								<template v-else>
									<FreePlanVendorProductCard
										:product="product"
										:user="globalState.userProfile"
										v-if="globalState.userProfile.role_id === 10"
									/>
									<VendorProductCard
										:product="product"
										:user="globalState.userProfile"
										v-else
									/>
								</template>
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
	apiDomain,
	catalogProductUrl,
	searchProductUrl,
	getHeader
} from "src/config";
// Loading
import { QSpinnerPuff } from "quasar";
//components
import VendorProductCard from "../components/vendorProductCard.vue";
import KeepProductCard from "../components/keepProductCard.vue";
import FreePlanKeepProductCard from "../components/ProductCard/FreePlanKeepProductCard.vue";
import FreePlanVendorProductCard from "../components/ProductCard/FreePlanVendorProductCard.vue";

export default {
	components: {
		VendorProductCard,
		KeepProductCard,
		FreePlanKeepProductCard,
		FreePlanVendorProductCard
	},
	data() {
		return {
			// Product Section
			dataProduct: [],
			// Loading
			innerLoading: false,
			featuredImageShow: true,
			// user
			user: [],
			search: ""
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
		this.brandName = this.$route.params.brand;
		this.brandID = this.$route.params.brand_id;
		this.$q.loading.show({
			spinner: QSpinnerPuff,
			spinnerColor: "black",
			spinnerSize: 50,
			backgroundColor: "grey",
			message: "<b>Mohon Tunggu..</b>",
			messageColor: "black"
		});
		setTimeout(() => {
			this.$q.loading.hide();
		}, 500);
	},
	// mounted () {
	//   this.getProduct();
	// },
	methods: {
		getProduct() {
			if (this.search !== "") {
				this.dataProduct = [];

				// Loading
				this.featuredImageShow = false;

				// Form Data
				let formData = new FormData();

				formData.set("search", this.search);

				this.$axios
					.post(searchProductUrl, formData, { headers: getHeader() })
					.then(response => {
						console.log(response);

						if (response.status === 200) {
							this.dataProduct = response.data.data;

							setTimeout(() => {
								this.featuredImageShow = true;
							}, 700);
						}
					})
					.catch(error => {
						if (error.response) {
							console.log(error.response);
						}
					});
			} else if (this.search === "") {
				this.dataProduct = [];
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
</style>
