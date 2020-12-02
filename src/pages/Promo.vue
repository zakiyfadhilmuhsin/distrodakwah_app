<template>
	<q-layout view="lHh Lpr lFf">
		<q-header
			class="mobile-layout-on-desktop"
			style="box-shadow: none !important"
		>
			<q-toolbar class="bg-distrodakwah text-white">
				<!-- <q-space /> -->
				<center>
					<img
						src="~/assets/images/components/logo-distrodakwah.png"
						width="45%"
						class="q-ml-xs"
						style="padding-top: 8px"
					/>
				</center>
			</q-toolbar>
		</q-header>
		<q-page-container
			class="mobile-layout-on-desktop"
			style="background: #f5f6fa"
		>
			<q-page>
				<img class="full-width" src="https://imgur.com/pNya0qj.jpg" alt="" />
				<!-- promo brader fillah -->
				<div class="q-pa-md">
					<q-card class="my-card">
						<q-img src="https://imgur.com/igTcSci.jpg" />
						<!--  -->
						<!-- <q-card dark bordered class="bg-red-9 my-card">
              <q-card-section>
                <div class="text-h10">Mohon maaf untuk promo ini sedang ada perbaikan</div>
              </q-card-section>
            </q-card> -->
						<!--  -->
						<q-card-section>
							<div class="row no-wrap items-center">
								<div class="col ellipsis" style="font-size: 16px">
									Ada promo spesial buat Brader fillah
								</div>
							</div>
							<q-rating v-model="stars" :max="5" size="32px" />
						</q-card-section>
						<!--  -->
						<q-card-section class="q-pt-none">
							<p class="text-caption text-grey">
								Deskripsi <br /><br />
								Spesial untukmu! Nikmati diskon 70% untuk pembelian Paket Brader
								Hemat di Distrodakwah.id
							</p>
							<q-expansion-item
								dense
								dense-toggle
								expand-separator
								class="text-caption text-grey"
								style="margin-left: -16px; margin-right: -16px;"
								label="SYARAT DAN KETENTUAN"
							>
								<q-card>
									<q-card-section
										class="text-caption text-grey"
										v-html="hardCodedDescription"
									>
									</q-card-section>
								</q-card>
							</q-expansion-item>
						</q-card-section>

						<q-separator />

						<q-card-actions>
							<router-link to="/search" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Search Promo Brader
								</q-btn>
							</router-link>
						</q-card-actions>
					</q-card>
				</div>
				<!--  -->
				<div class="q-pa-md">
					<q-card class="my-card">
						<q-img src="https://imgur.com/hemmr6q.jpg" />
						<!--  -->
						<q-card-section>
							<div class="row no-wrap items-center">
								<div class="" style="font-size: 16px">
									Diskon 50% untuk Produk Yaumee, Belanja lebih Hemat
								</div>
							</div>
							<q-rating v-model="stars" :max="5" size="32px" />
						</q-card-section>
						<!--  -->
						<q-card-section class="q-pt-none">
							<p class="text-caption text-grey">
								Deskripsi <br /><br />
								Beli produk Yaumee Disc 50% di Distrodakwah.id. Brader, cek
								sekarang!
							</p>
							<q-expansion-item
								dense
								dense-toggle
								expand-separator
								class="text-caption text-grey"
								style="margin-left: -16px; margin-right: -16px;"
								label="SYARAT DAN KETENTUAN"
							>
								<q-card>
									<q-card-section
										class="text-caption text-grey"
										v-html="hardCodedDescription2"
									>
									</q-card-section>
								</q-card>
							</q-expansion-item>
						</q-card-section>

						<q-separator />

						<q-card-actions>
							<router-link to="/promotions/detail/519/" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Lihat Yaumee Hodie
								</q-btn>
							</router-link>
						</q-card-actions>

						<q-card-actions>
							<router-link to="/promotions/detail/520/" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Lihat Yaumee Panjang
								</q-btn>
							</router-link>
						</q-card-actions>
						<q-card-actions>
							<router-link to="/promotions/detail/521/" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Lihat Yaumee Pendek
								</q-btn>
							</router-link>
						</q-card-actions>
					</q-card>
				</div>
				<!--  -->
				<div class="q-pa-md">
					<q-card class="my-card">
						<q-img src="https://imgur.com/0TcX4GG.jpg" />
						<!--  -->
						<q-card-section>
							<div class="row no-wrap items-center">
								<div class="" style="font-size: 16px">
									Wujudkan Mimpi Berangkat Umroh, Bersama Distrodakwah.id
								</div>
							</div>
							<q-rating v-model="stars" :max="5" size="32px" />
						</q-card-section>
						<!--  -->
						<q-card-section class="q-pt-none">
							<p class="text-caption text-grey">
								Deskripsi <br /><br />
								Beli 1 Produk Distrodakwah.id selama Bulan Desember, ada Voucher
								Umroh senilai 1 jt.
							</p>
							<q-expansion-item
								dense
								dense-toggle
								expand-separator
								class="text-caption text-grey"
								style="margin-left: -16px; margin-right: -16px;"
								label="SYARAT DAN KETENTUAN"
							>
								<q-card>
									<q-card-section
										class="text-caption text-grey"
										v-html="hardCodedDescription3"
									>
									</q-card-section>
								</q-card>
							</q-expansion-item>
						</q-card-section>

						<q-separator />

						<q-card-actions>
							<q-btn
								@click="onClickHandler"
								class="full-width"
								style="background: orange"
								flat
								color="white"
							>
								Join Group
							</q-btn>
						</q-card-actions>
					</q-card>
				</div>
				<!--  -->
				<div class="q-pa-md">
					<q-card class="my-card">
						<q-img src="https://imgur.com/dQUy0LV.jpg" />
						<!--  -->
						<q-card-section>
							<div class="row no-wrap items-center">
								<div class="" style="font-size: 16px">
									Promo Yaumee Day, Nikmati Promo sampai Akhir Tahun
								</div>
							</div>
							<q-rating v-model="stars" :max="5" size="32px" />
						</q-card-section>
						<!--  -->
						<q-card-actions style="padding-left: 16px; margin-top: -10px;">
							<p class="text-red">
								Kode Promo :
							</p>
							<p class="text-caption text-grey" style="margin-left: 5px;">
								{{ yaumee15PromoCode }}
							</p>
							<q-btn
								flat
								class="bg-red text-white"
								size="sm"
								label="Salin"
								@click="doCopy"
								style="margin-top: -18px; margin-left: 85px;"
							/>
						</q-card-actions>

						<q-card-section class="q-pt-none" style="margin-top: -10px;">
							<p class="text-caption text-grey">
								Deskripsi <br /><br />
								Pasti Promo buat Brader, nikmati keuntungan Brader sebagai
								Reseller.
							</p>
							<q-expansion-item
								dense
								dense-toggle
								expand-separator
								class="text-caption text-grey"
								style="margin-left: -16px; margin-right: -16px;"
								label="SYARAT DAN KETENTUAN"
							>
								<q-card>
									<q-card-section
										class="text-caption text-grey"
										v-html="hardCodedDescription4"
									>
									</q-card-section>
								</q-card>
							</q-expansion-item>
						</q-card-section>

						<q-separator />

						<q-card-actions>
							<router-link to="/search" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Search Promo Produk
								</q-btn>
							</router-link>
						</q-card-actions>
					</q-card>
				</div>
				<!--  -->
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { openURL } from "quasar";
import h2p from "html2plaintext";

export default {
	data() {
		return {
			hardCodedDescription: ` <ol>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Promo berlaku untuk pembelian Produk Yaumee Custom + Mikihat</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Potongan diskon 70% hanya berlaku untuk produk Mikihat</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Potongan diskon Produk Yaumee sesuai dengan Kategori Reseller (Pro/Ekslusif)</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller melakukan transaksi sesuai dengan stok yang tertampil d web Distrodakwah.id</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Untuk mendapatkan promo Paket Brader Hemat, brader harus :</span></li>
                              <ul>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Terdaftar sebagai Reseller Distrodakwah.id</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Buka aplikasi Distrodakwah.id &amp; klik promo</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Dapatkan promo Paket Brader Hemat &amp; lakukan pembayaran</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Produk yaumee (desain Distrodakwah) sesuai keinginan brader</span></li>
                              </ul>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller bisa mendapatkan promo Paket Brader Hemat sepuasanya selama persediaan masih ada.</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Syarat dan Ketentuan promo ini merupakan bagian yang tak terpisahkan dan satu kesatuan dengan S&amp;K sehubungan dengan promo ini</span></li>
                              <li style="font-weight: 400;"><span style="font-weight: 400;">Dengan mengikuti promo ini, pengguna dianggap mengerti dan menyetujui semua syarat &amp; ketentuan berlaku.</span></li>
                              </ol>`,

			hardCodedDescription2: `<ol>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Promo berlaku untuk pembelian Produk Yaumee Ready Stok</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Potongan diskon 50% dari Harga Jual berlaku untuk Reseller Pro / Ekslusif</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller melakukan transaksi sesuai produk promo yang tertampil di web Distrodakwah.id</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Untuk mendapatkan promo Yaumee Disc 50%, brader harus :</span></li>
                                  <ul>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Terdaftar sebagai Reseller Distrodakwah.id</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Buka aplikasi Distrodakwah.id &amp; klik promo</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;"> Dapatkan promo Disc 50% &amp; lakukan pembayaran</span></li>
                                  </ul>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller bisa mendapatkan promo Disc 50% sepuasanya selama persediaan masih ada.</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Syarat dan Ketentuan promo ini merupakan bagian yang tak terpisahkan dan satu kesatuan dengan S&amp;K sehubungan dengan promo ini</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Dengan mengikuti promo ini, brader dianggap mengerti dan menyetujui semua Syarat &amp; ketentuan berlaku.</span></li>
                              </ol>`,
			hardCodedDescription3: `<ol>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Voucher berlaku untuk keberangkatan Umroh melalui Distrodakwah.id</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Untuk mendapatkan Voucher ini, Reseller hanya perlu membeli 1 pcs produk Yaumee/Asshaf/Al-Ayubi/Al Dzumar khusus Bulan Desember</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller dapat memilih produk yang tersedia di Distrodakwah.id</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Untuk mendapatkan Voucher Umroh senilai 1.000.000,. brader harus :</span></li>
                                  <ul>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Terdaftar sebagai Reseller Distrodakwah.id</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Buka aplikasi Distrodakwah.id &amp; klik Voucher</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Brader mengirimkan bukti invoice (status : sudah dikonfirmasi) ke PR Nissa</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Brader akan diarahka ke Grup "Umroh New Normal" untuk mendapatkan ketentuan terkait Program Umroh</span></li>
                                  </ul>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller yang beruntung  bisa mendapatkan 1 Voucher Umroh saja.</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Syarat dan Ketentuan promo ini merupakan bagian yang tak terpisahkan dan satu kesatuan dengan S&amp;K sehubungan dengan promo ini</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Dengan mengikuti promo ini, brader dianggap mengerti dan menyetujui semua Syarat &amp; ketentuan berlaku.</span></li>
                              </ol>`,
			yaumee15PromoCode: "pastipromo",
			hardCodedDescription4: `<ol>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Promo berlaku untuk pembelian All Produk Yaumee</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Potongan diskon +15% berlaku untuk Reseller Pro / Ekslusif</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Penambahan potongan diskon untuk Reseller Pro sebesar 20% + 15%</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Penambahan potongan diskon untuk Reseller Ekslusif sebesar 35% + 15%</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Design Custom hanya berlaku untuk Reseller Ekslusif</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller melakukan transaksi sesuai dengan stok yang tertampil d web Distrodakwah.id</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Untuk mendapatkan promo tambahan Disc 15% brader harus :</span></li>
                                  <ul>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Terdaftar sebagai Reseller Distrodakwah.id</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Buka aplikasi Distrodakwah.id &amp; klik Voucher</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Pilih produk Yaumee kemudian masuk ke keranjang belanja</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Masukan kode voucer "PASTIPROMO" untuk mendapatkan potongan</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Wa Admin Produksi untuk pilihan produk Yaumee Custom (khusus Eklusif)</span></li>
                                    <li style="font-weight: 400;"><span style="font-weight: 400;">Potongan disc berlaku jika transaksi (invoice) berisi Produk Yaumee saja</span></li>
                                  </ul>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Reseller bisa mendapatkan promo sepuasanya selama persediaan masih ada.</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Syarat dan Ketentuan promo ini merupakan bagian yang tak terpisahkan dan satu kesatuan dengan S&amp;K sehubungan dengan promo ini</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Dengan mengikuti promo ini, brader dianggap mengerti dan menyetujui semua Syarat &amp; ketentuan berlaku.</span></li>
                              </ol>`
		};
	},
	methods: {
		onClickHandler() {
			openURL("https://t.me/joinchat/N8T-JkTxgPIGaxbkvbks2w");
		},
		doCopy() {
		const tempInput = document.createElement("input");
		tempInput.value = this.yaumee15PromoCode;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);
	}
	},

};
</script>

<style></style>
