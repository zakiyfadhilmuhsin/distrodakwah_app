<template>
	<q-layout view="hHh lpR fFf">
		<q-header class="mobile-layout-on-desktop">
			<q-toolbar class="bg-distrodakwah text-white">
				<q-btn flat round dense to="/dashboard">
					<q-icon name="arrow_back" color="white" />
				</q-btn>
				<q-toolbar-title
					><span style="font-size: 16px; font-weight: bold"
						>Bantuan dan Support</span
					></q-toolbar-title
				>
			</q-toolbar>
		</q-header>

		<q-page-container class="mobile-layout-on-desktop">
			<q-page class="bg-white">
				<div class="row order-list-section">
					<div class="col q-pa-lg">
						<q-card bordered class="shadow-1">
							<q-card-section>
								<div class="q-pa-xs">
									<div
										style="font-size: 14px; margin: 0 0 5px 0; font-weight: bold"
									>
										Tipe Bantuan :
									</div>
									<q-select
										outlined
										dense
										color="orange-8"
										v-model="typeHelp"
										:options="typeHelpOption"
										:options-dense="true"
										@input="problemSelectionGenerate"
									/>
								</div>
								<div class="q-pa-xs" v-if="typeHelp !== ''">
									<div
										style="font-size: 14px; margin: 0 0 5px 0; font-weight: bold"
										v-if="typeHelp !== 'Saran dan Masukkan'"
									>
										Pilihan Masalah :
									</div>
									<div
										style="font-size: 14px; margin: 0 0 5px 0; font-weight: bold"
										v-else
									>
										Pilihan Saran :
									</div>
									<q-select
										outlined
										dense
										color="orange-8"
										v-model="problemSelection"
										:options="problemSelectionOpt"
										:options-dense="true"
									/>
								</div>
								<div class="q-pa-xs">
									<div
										style="font-size: 14px; margin: 0 0 5px 0; font-weight: bold"
									>
										Judul :
									</div>
									<q-input
										outlined
										dense
										color="orange-8"
										type="text"
										v-model="titleHelp"
										placeholder="Silahkan Masukkan Judul"
									/>
								</div>
								<div class="q-pa-xs">
									<div
										style="font-size: 14px; margin: 0 0 5px 0; font-weight: bold"
									>
										Deskripsi/Penjelasan :
									</div>
									<q-input
										dense
										outlined
										color="orange-8"
										type="textarea"
										rows="8"
										placeholder="Isi Masukkan Anda Disini.."
										v-model="entryHelp"
									/>
								</div>
								<!-- <div class="q-pa-xs">
                </div>
                <div class="q-pa-xs">
                </div> -->
							</q-card-section>
						</q-card>
						<br />
						<q-card bordered class="shadow-1">
							<q-card-section>
								<div class="q-pa-xs">
									<q-btn
										@click="sendTicket"
										flat
										class="bg-orange-8 text-white text-capitalize full-width"
										>Kirim</q-btn
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
import { openURL } from "quasar";
// import Vue from "vue";
// import Tawk from "vue-tawk";
// Vue.use(Tawk, {
// 	tawkSrc: "https://embed.tawk.to/5f101bf55b59f94722bad5d5/default"
// });

export default {
	name: "HelpDesk",
	data() {
		return {
			typeHelp: "",
			typeHelpOption: ["Sistem Web/Aplikasi", "Pesanan", "Saran dan Masukkan"],
			problemSelection: "",
			problemSelectionOpt: [],
			titleHelp: "",
			entryHelp: "",
			user: null
		};
	},
	created() {
		this.user = JSON.parse(window.localStorage.getItem("profileUser"));
	},
	async mounted() {
		await this.loadTawkTo();
		// global.Tawk_API.visitor = {
		// 	name: 'fajar sidiq ssasd',
		// 	email: 'fsidiqs@hotmail.co.id',
		// 	hash
		// }
		global.Tawk_LoadStart = new Date();
		global.Tawk_API.onLoad = function() {
			global.Tawk_API.setAttributes(
				{
					name: "fajar sidiq xas",
					email: "fsidiqs@hotmail.co.id",
					hash:
						"e72218dbb13316b3db4854cef6e32b8d2bcbde14beb062b052f94c59f762c30a"
				},
				function(error) {
					console.log(error);
				}
			);
		};

		// setTimeout(() => {
		// 	console.log(global.$_Tawk_AccountKey);
		// }, 6000);

		// this.$Tawk.$updateChatUser({
		// 	name: 'fajar abcd',
		// 	email: 'fssalviro@gmail.com',
		// 	hash: '6575de7b843e846cb59a8afbda4841155927aaddabdb76d8b6d608993e5bcc86'
		// })

		// Tawk.showWidget();
		// Tawk.Tawk = {
		// 	name: 'Fajar Sidiq SSS',
		// 	email: 'fssalviro@gmail.com',
		// }
		// Tawk.created
	},
	methods: {
		loadTawkTo() {
			return new Promise((resolve, reject) => {
				let tawkToScript = document.createElement("script");
				const s0 = document.getElementsByTagName("script")[0];
				tawkToScript.async = true;
				tawkToScript.src =
					"https://embed.tawk.to/5f101bf55b59f94722bad5d5/default";
				tawkToScript.charset = "UTF-8";
				tawkToScript.setAttribute("crossorigin", "*");
				s0.parentNode.insertBefore(tawkToScript, s0);

				tawkToScript.onload = () => {
					resolve();
				};
			});
		},
		problemSelectionGenerate() {
			this.problemSelection = "";
			this.problemSelectionOpt = [];

			switch (this.typeHelp) {
				case "Sistem Web/Aplikasi":
					this.problemSelectionOpt.push("Masalah pada Web/Aplikasi");
					break;
				case "Pesanan":
					this.problemSelectionOpt.push(
						"Kiriman",
						"Komplain Masalah Produk",
						"Tidak Sesuai Pesanan",
						"Pembayaran"
					);
					break;
				case "Saran dan Masukkan":
					this.problemSelectionOpt.push(
						"Produk",
						"Pelayanan",
						"Sistem Web/Aplikasi",
						"Saran dan Masukkan lain"
					);
					break;
				default:
			}
		},
		sendTicket() {
			openURL(
				"https://wa.me/62895804141559?text===*Tiket%20Bantuan*==%0A" +
					"%0A*Nama%20User:*%20" +
					this.user.name +
					"%0A*Email%20User:*%20" +
					this.user.email +
					"%0A*No%20HP%20User:*%200" +
					this.user.phone +
					"%0A*Tipe%20Bantuan:*%20" +
					this.typeHelp +
					"%0A*Problem/Saran:*%20" +
					this.problemSelection +
					"%0A*Judul:*%20" +
					this.titleHelp +
					"%0A*Deskripsi/Penjelasan:*%20" +
					this.entryHelp +
					"%20"
			);
		}
	}
};
</script>
