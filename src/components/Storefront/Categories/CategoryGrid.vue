<template>
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
			<div class="col-3" v-for="(category, index) in categoryData" :key="index">
				<div style="margin: 5px">
					<router-link
						:to="
							'/allProductBrand/' + category.category_name + '/' + category.id
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
</template>

<script>
export default {
	name: "CategoryGrid",
	props: { categoryData: Array },
	async created() {}
};
</script>

<style></style>
