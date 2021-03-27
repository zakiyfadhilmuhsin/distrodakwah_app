<template>
	<div
		class="showcase"
		:style="[showcaseBackground ? { background: showcaseBackground } : {}]"
		style="z-index: 0 !important"
	>
		<div class="bg-grey-3" style="height: 8px"></div>
		<center>
			<img
				v-if="productArr[0].brand_id == 30"
				src="https://ik.imagekit.io/kurakurahijau/logo_putih_m0UMvIWLJV.png"
			/>
		</center>
		<div class="row q-pa-xs">
			<div class="col-8">
				<h5 :class="promoText">{{ title }}</h5>
			</div>
			<div class="col-4 text-right">
				<!-- <router-link> -->
				<h5 :class="textLink">Lihat Semua</h5>
				<!-- </router-link> -->
			</div>
		</div>

		<div class="row q-px-md swiper-content">
			<swiper :options="swiperProductListOption">
				<swiper-slide v-for="(product, index) in productArr" :key="index">
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
</template>

<script>
//plugins
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

//components
import VendorProductCard from "../ProductCard/vendorProductCard.vue";
import KeepProductCard from "../ProductCard/keepProductCard";

export default {
	name: "Showcase",
	components: {
		swiper,
		swiperSlide,
		KeepProductCard,
		VendorProductCard
	},
	props: {
		productArr: Array,
		title: String,
		user: Object,
		showcaseBackground: String
	},
	data() {
		return {
			swiperProductListOption: {
				slidesPerView: 2,
				centeredSlides: false,
				spaceBetween: 10,
				pagination: {
					el: ".swiper-product-pagination",
					clickable: true
				}
			}
		};
	},
	computed: {
		textLink: function() {
			return this.productArr[0].brand_id == 30
				? { "link-text": true, "text-white": true }
				: { "link-text": true, "text-orange-8": true };
		},
		promoText: function() {
			return this.productArr[0].brand_id == 30
				? { "promo-text": true, "text-white": true }
				: { "promo-text": true, "text-black-8": true };
		}

	}
};
</script>

<style scoped>
.dd-background {
	background: #fea500;
}

.swiper-content {
	padding: 5px 10px 10px 10px;
}

.showcase img {
	width: 85px;
	margin-top: 20px;
	margin-bottom: 5px;
}

.swiper-container{
	display: flex;
	flex-direction: column;
}
</style>
