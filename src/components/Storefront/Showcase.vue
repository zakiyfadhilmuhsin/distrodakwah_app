<template>
	<div>
		<div class="bg-grey-3" style="height: 8px"></div>
		<div class="row q-pa-xs">
			<div class="col-8">
				<h5 class="promo-text">{{title}}</h5>
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
		user: Object
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
	}
};
</script>

<style>
.swiper-slide {
	width: 10px;
}
</style>
