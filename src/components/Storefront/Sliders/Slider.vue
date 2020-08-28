<template>
		<carousel
			v-if="sliderData.length !== 0"
			class="swiper-slide"
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
		>
			<img
				v-for="(slider, index) in sliderData"
				:key="index"
				:src="slider.slider_image"
			/>
		</carousel>
</template>

<script>
import { identitySliderUrl, getHeader } from "../../../config";
import carousel from "vue-owl-carousel";

export default {
	name: "Slider",
	components: { carousel },
	data() {
		return {
			sliderData: []
		};
	},
	async created() {
		const sliderRes = await this.$axios.get(identitySliderUrl, {
			headers: getHeader()
		});
		this.sliderData = sliderRes.data.data;
	}
};
</script>

<style>

.owl-carousel .owl-item img {
	/* //! important width: 100%; */
	border-radius: 10px;
	height: auto;
}
.owl-carousel .owl-stage-outer {
	border-radius: 10px;
	box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14),
		0 1px 10px rgba(0, 0, 0, 0.12);
}
.owl-theme .owl-dots .owl-dot.active span {
	background: #fea500 !important;
}
</style>
