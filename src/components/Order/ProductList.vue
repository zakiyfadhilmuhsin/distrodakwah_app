<template>
	<div
		style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0"
	>
		<template v-if="cartDataProp.cart_detail.length > 0">
			<div v-for="(item, index) in cartDataProp.cart_detail" :key="index">
				<div
					class="row q-px-lg q-py-sm"
					:class="{ 'product-list': !item.stock_sufficient }"
				>
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
					<q-banner v-if="!item.stock_sufficient" class="insufficient-stock">
						Stok tidak tersedia, silahkan kembali ke Keranjang Belanjan dan
						hapus produk ini dari keranjang
					</q-banner>
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
import { getHeader } from "../../config";
import { currencyFormat } from "../../libraries/stringManipulation";

export default {
	name: "ProductList",
	props: { cartDataProp: Object },
	data() {
		return {
			editQtyDialog: false,
			qtyForm: null,

			//editQty
			cartDetailIdEdit: null,
			cartDetailQtyEdit: null,
			productSkuIdEdit: null
		};
	},
	computed: {
		...mapState(["globalState"])
	},
	methods: {
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
