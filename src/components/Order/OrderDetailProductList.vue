<template>
	<div
		style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0"
	>
		<template v-if="productDataProp.order_detail.length > 0">
			<div v-for="(item, index) in productDataProp.order_detail" :key="index">
				<div class="row q-px-lg q-py-sm">
					<div class="col-3">
						<img
							:src="item.featured_image"
							width="100%"
							style="border: 1px solid whitesmoke"
						/>
					</div>
					<div class="col-6" style="padding: 0 15px">
						<h5
							style="margin: 0; font-size: 14px; font-weight: bold; line-height: 16px"
						>
							{{ item.product_name }}
						</h5>
						<h6
							v-for="(opt, i) in Object.keys(item.options)"
							:key="i"
							style="margin: -15px 0; font-size: 12px;"
						>
							{{ opt + ": " + item.options[opt] }}
						</h6>
						<h6 style="margin: -5px 0 0 0; font-size: 12px;">
							Qty {{ item.qty }} x Rp{{ currencyFormat(item.reseller_price) }}
						</h6>
					</div>
					<div class="col-3 text-right">
						<h6 style="margin: 0; font-size: 12px;" class="text-black">
							Rp{{ currencyFormat(item.qty * item.reseller_price) }}
						</h6>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="row q-pa-lg">
				<div class="col">
					<center>
						<img
							src="http://balitakita.com/packages/yusidabcs/checkout/img/empty-cart-vector.png"
							width="85"
						/>
						<div>Yah, Keranjang Masih Kosong.. Belanja Yuk!</div>
					</center>
				</div>
			</div>
		</template>
		<!-- {{items}} -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { getHeader, apiDomain, catalogService } from "../../config";
import { currencyFormat } from "../../libraries/stringManipulation";

export default {
	name: "OrderDetailProductList",
	props: { productDataProp: Object },
	data() {
		return {
			editQtyDialog: false,
			qtyForm: null,

			//editQty
			productDataPopulated: {}
		};
	},
	computed: {
		...mapState(["globalState"])
	},
	created() {
		this.getProducts();
	},
	methods: {
		async getProducts() {
			let tempTotalItem = 0;
			const productSkuRes = await this.$axios({
				method: "post",
				url: `${catalogService}/get-product-skus-by-id`,
				headers: getHeader(),
				data: {
					productSkuIdArr: this.productDataProp.order_detail.map(
						e => e.product_sku_id
					),
					select: ["id", "stock_qty", "keep_stock_qty", "product_id"],
					eagerLoad: {
						productParent: ["id", "product_name", "featured_image"]
					}
				}
			});
			this.productDataProp.order_detail.forEach((order, index) => {
				tempTotalItem += order.qty;

				const findProductSku = productSkuRes.data.data.find(
					productSku => productSku.id === parseInt(order.product_sku_id)
				);
				this.productDataProp.order_detail[index].product_name =
					findProductSku.product_parent.product_name;

				this.productDataProp.order_detail[index].featured_image =
					findProductSku.product_parent.featured_image;
				this.productDataProp.order_detail[index].options = JSON.parse(
					this.productDataProp.order_detail[index].options
				);
			});
		},
		currencyFormat
	}
};
</script>

<style>
.product-list {
	background-color: grey;
}

.insufficient-stock {
	border-radius: 5px;
	background: #f3ef01;
}
</style>
