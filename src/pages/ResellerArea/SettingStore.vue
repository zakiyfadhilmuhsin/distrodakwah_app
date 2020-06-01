<template>
	<q-layout view="hHh lpR fFf">
		<q-header class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/dashboard">
					<q-icon name="arrow_back" color="white" />
				</q-btn>
				<q-toolbar-title
					><span style="font-size: 16px; font-weight: bold"
						>Web Replika Saya</span
					></q-toolbar-title
				>
			</q-toolbar>
		</q-header>

		<q-page-container class="mobile-layout-on-desktop">
			<q-page class="bg-grey-2">
				<div class="row">
					<div class="col q-pa-lg">
						<q-card bordered class="shadow-1">
							<q-card-section>
								<div class="q-pa-xs">
									<q-input
										outlined
										dense
										color="orange-8"
										type="text"
										v-model="storeName"
										label="Nama Toko"
										placeholder="Masukkan Nama Toko"
									/>
								</div>
								<div class="q-pa-xs">
									<q-input
										prefix="prodakwah.com/"
										outlined
										dense
										color="orange-8"
										type="text"
										v-model="storeUrl"
										label="Slug/URL Toko"
										placeholder="Masukkan URL Toko"
									/>
									<p style="margin: 0; font-size: 10px; color: red">
										Perhatian! Url Web Replika hanya boleh berisi huruf
										kecil.<br />contoh: tokoku
									</p>
								</div>
								<div class="q-pa-xs">
									<!-- <q-input prefix="+62" outlined dense color="green-6" type="text" v-model="whatsappNumber" label="Nomor Whatsapp" placeholder="Masukkan Nomor Whatsapp" /> -->
									<vue-tel-input
										v-model="whatsappNumber"
										enabledCountryCode
										mode="international"
										:disabledFormatting="true"
										placeholder="Masukkan Nomor Whatsapp"
										style="height: 40px; margin-bottom: 5px"
									></vue-tel-input>
								</div>
								<template v-if="dataStore !== null">
									<br />
									<div class="q-pa-xs">
										<center>
											<q-btn
												@click="toStore"
												flat
												dense
												style="font-size: 12px"
												class="q-py-sm bg-white text-primary text-capitalize"
												>Kunjungi Web Replika
												<q-icon
													name="launch"
													color="primary"
													style="font-size: 16px"
											/></q-btn>
											<div class="q-py-sm">
												Share Web Replika :
												<br />
												<facebook
													:url="url + '/' + storeUrl"
													scale="2"
													class="q-pa-sm"
												></facebook>
												<telegram
													:url="url + '/' + storeUrl"
													scale="2"
													class="q-pa-sm"
												></telegram>
												<twitter
													:url="url + '/' + storeUrl"
													scale="2"
													class="q-pa-sm"
												></twitter>
												<whats-app
													:url="url + '/' + storeUrl"
													scale="2"
													class="q-pa-sm"
												></whats-app>
												<email
													:url="url + '/' + storeUrl"
													scale="2"
													class="q-pa-sm"
												></email>
											</div>
										</center>
									</div>
								</template>
							</q-card-section>
						</q-card>
						<br />
						<q-card bordered class="shadow-1">
							<q-card-section>
								<div class="q-pa-xs">
									<q-btn
										flat
										class="bg-orange-8 text-white text-capitalize full-width"
										@click="createStore"
										>Simpan</q-btn
									>
								</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<style>
.order-list-section {
	padding: 20px 0;
}
</style>

<script>
import axios from "axios";
import {
	getStoreUrl,
	createStoreUrl,
	getHeader,
	webReplicaDomain
} from "src/config";
import { openURL } from "quasar";
// Sharing Social Media
import {
	Facebook,
	Telegram,
	Twitter,
	WhatsApp,
	Email
} from "vue-socialmedia-share";
import Vue from "vue";
import VueTelInput from "vue-tel-input";

Vue.use(VueTelInput);

export default {
	components: {
		Facebook,
		Telegram,
		Twitter,
		WhatsApp,
		Email
	},
	name: "OrderList",
	data() {
		return {
			storeName: "",
			storeUrl: "",
			whatsappNumber: "",
			dataStore: [],
			url: webReplicaDomain
		};
	},
	created() {
		this.user = JSON.parse(window.localStorage.getItem("profileUser"));
	},
	mounted() {
		this.getStore();
	},
	methods: {
		getStore() {
			axios
				.get(getStoreUrl + "/" + this.user.id, { headers: getHeader() })
				.then(response => {
					if (response.status === 200) {
						this.dataStore = response.data.data;

						this.storeName = this.dataStore.store_name;
						this.storeUrl = this.dataStore.store_slug;
						this.whatsappNumber = this.dataStore.whatsapp_number;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		async createStore() {
			var regex = new RegExp("^[a-z]+$");

			if (regex.test(this.storeUrl)) {
				let formData = new FormData();
				formData.set("store_name", this.storeName);
				formData.set("store_slug", this.storeUrl);
				formData.set("whatsapp_number", this.whatsappNumber.replace(/\D/g, ""));
				formData.set("user_id", this.user.id);
				try {
					const createStoreRes = await axios.post(
						createStoreUrl + "/" + this.user.id,
						formData,
						{ headers: getHeader() }
					);
					this.$q.notify({
						position: "top",
						color: "light-green-6",
						message: "Berhasil Disimpan!"
					});
				} catch ({
					response: {
						data: { error }
					}
				}) {
					console.log(error);

					if (error === "data_not_changed") {
						this.$q.notify({
							position: "top",
							color: "red",
							message: "Gagal mengupdate, Tidak ada perubahan data"
						});
					} else if (
						error?.store_slug?.[0] === "The store slug has already been taken."
					) {
						this.$q.notify({
							position: "top",
							color: "red",
							message: "Url Toko sudah ada yang memiliki"
						});
					}
				} finally {
					this.getStore();
				}
				// const createStoreRes = await axios
				// 	.post(createStoreUrl + "/" + this.user.id, formData, {
				// 		headers: getHeader()
				// 	})
				// 	.then(response => {
				// 		if (response.status === 200) {
				// 			this.$q.notify({
				// 				position: "top",
				// 				color: "light-green-6",
				// 				message: "Berhasil Disimpan!"
				// 			});
				// 			this.storeName = "";
				// 			this.storeUrl = "";
				// 			this.whatsappNumber = "";
				// 			this.getStore();
				// 		}
				// 	})
				// 	.catch(error => {
				// 		if (error.response) {
				// 			console.log(error.response);
				// 		}
				// 	});
			} else {
				this.$q.notify({
					position: "top",
					color: "red",
					message: "Format Slug/Url Web Replika Anda Salah!"
				});
			}
		},
		toStore() {
			openURL(webReplicaDomain + "/" + this.storeUrl);
		}
	}
};
</script>
