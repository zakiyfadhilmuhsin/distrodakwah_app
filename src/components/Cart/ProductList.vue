<template>
	<div
		style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0"
	>
		<template v-if="productDataProp.cart_detail.length > 0">
			<div v-for="(item, index) in productDataProp.cart_detail" :key="index">
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
					<div class="col-7" style="padding: 0 15px">
						<h5
							style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; line-height: 16px"
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
						<h6 style="margin: -15px 0; font-size: 12px;">
							Qty: {{ item.qty }} Harga: Rp
							{{ currencyFormat(item.reseller_price) }}
						</h6>
						<h6 style="margin: -15px 0; font-size: 12px;" class="text-orange-8">
							Total: Rp {{ currencyFormat(item.qty * item.reseller_price) }}
						</h6>
					</div>
					<div class="col-2 text-right self-center">
						<q-btn :disable="!item.stock_sufficient"
							flat
							round
							icon="create"
							style="font-size: 10px"
							@click="
								editQty(
									item.id,
									item.reseller_price,
									item.qty,
									item.product_sku_id
								)
							"
						/>
						<q-btn
							flat
							color="red"
							round
							icon="delete_forever"
							style="font-size: 10px"
							@click="removeProduct(item.product_sku_id)"
						/>
					</div>
					<q-banner v-if="!item.stock_sufficient" class="insufficient-stock">
						Stok tidak tersedia, hapus produk ini untuk melanjutkan pesanan
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
						<div>Yah, Keranjang Masih Kosong. Belanja Yuk!</div>
					</center>
				</div>
			</div>
		</template>
		<!-- {{items}} -->
		<q-dialog v-model="editQtyDialog">
			<q-card style="width: 800px; max-width: 90vw;">
				<q-card-section class="row items-center">
					<h6 style="margin: 0; font-size: 16px">Ubah Jumlah Barang</h6>
					<q-space />
					<q-btn icon="close" size="sm" flat round dense v-close-popup />
				</q-card-section>

				<q-card-section>
					<div class="row items-center">
						<div class="col">
							<q-input
								type="number"
								outlined
								dense
								color="orange-8"
								label="Jumlah"
								v-model="qtyForm"
							/>
						</div>
					</div>
				</q-card-section>

				<q-card-actions class="q-px-md q-pb-md">
					<q-btn
						flat
						class="bg-orange-8 text-white text-capitalize full-width"
						@click="updateQty"
						>Ubah</q-btn
					>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import { mapState } from "vuex";
import {
	removeProductCartUrl,
	updateCartQtyUrl,
	getHeader
} from "../../config";
import { currencyFormat } from "../../libraries/stringManipulation";

export default {
	name: "ProductList",
	props: { productDataProp: Object },
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
		async removeProduct(product_sku_id) {
			this.$q.loading.show({
				message: "Sedang Menghapus"
			});
			const removeProductParams = {
				product_sku_id: product_sku_id
			};

			try {
				await this.$axios.delete(removeProductCartUrl, {
					headers: getHeader(),
					params: removeProductParams
				});
				await this.$emit("getCartData");

				// Get Total Cart Item
			} catch (error) {
				console.log("error deleting product");
			}
				this.$q.loading.hide();
		},
		editQty(id, price, qty, product_sku_id) {
			this.cartDetailIdEdit = id;
			// this.cartDetailPrice = price;
			this.cartDetailQtyEdit = qty;
			this.productSkuIdEdit = product_sku_id;
			this.qtyForm = qty;

			// Load editQtyDialog
			this.editQtyDialog = true;
		},
		async updateQty() {
			let error = null;
			!/[0-9]/.test(this.qtyForm) || this.qtyForm <= 0
				? (error = "notAllowed")
				: "";

			if (!error) {
				let updateForm = new FormData();

				updateForm.set("cart_id", this.productDataProp.id);
				updateForm.set("cart_detail_id", this.cartDetailIdEdit);
				updateForm.set("role_id", this.globalState.userProfile.role_id);
				updateForm.set("product_sku_id", this.productSkuIdEdit);
				// updateData.set("current_price", cartDetailPrice);
				// updateData.set("new_price", newPrice);
				updateForm.set("qty", this.qtyForm);

				try {
					await this.$axios.post(updateCartQtyUrl, updateForm, {
						headers: getHeader()
					});
				} catch (error) {
					if (error.response.data.error == "insufficientStock") {
						this.$q.notify({
							position: "top",
							color: "red",
							message: "Stock Tidak Mencukupi"
						});
					}
				}

				this.$emit("getCartData");
				this.qtyForm = null;

				// close Dialog
				this.editQtyDialog = false;
			} else {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Cek Jumlah Yang Anda Masukkan"
				});
			}
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
