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
				<img class="full-width" src="https://imgur.com/24r3u20.jpg" alt="" />
				<!--  -->
				<div class="q-pa-md">
					<q-card class="my-card">
						<q-img src="https://imgur.com/igTcSci.jpg" />

						<q-card-section>
							<div class="row no-wrap items-center">
								<div class="col ellipsis" style="font-size: 16px">
									Ada promo spesial buat Brader fillah
								</div>
							</div>
							<q-rating v-model="stars" :max="5" size="32px" />
						</q-card-section>

						<q-card-section class="q-pt-none">
							<p
								class="text-caption text-grey"
								v-html="hardCodedDescription"
							></p>
						</q-card-section>

						<q-separator />

						<q-card-actions>
							<router-link to="/detail/516/" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Lihat Paket Brader Hemat 1
								</q-btn>
							</router-link>
						</q-card-actions>

						<q-card-actions>
							<router-link to="/detail/517/" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Lihat Paket Brader Hemat 2
								</q-btn>
							</router-link>
						</q-card-actions>
						<q-card-actions>
							<router-link to="/detail/518/" class="full-width">
								<q-btn
									class="full-width"
									style="background: orange"
									flat
									color="white"
								>
									Lihat Paket Brader Hemat 3
								</q-btn>
							</router-link>
						</q-card-actions>
					</q-card>
				</div>
				<!--  -->
				<div class="q-pa-md">
					<q-card class="my-card">
						<q-img src="https://imgur.com/afipahQ.jpg" />

						<q-card-section>
							<div class="row no-wrap items-center">
								<!-- <div class="col text-h6 ellipsis">
										Cafe Basilico
									</div> -->
							</div>
							<q-rating v-model="stars" :max="5" size="32px" />
						</q-card-section>

						<q-card-section class="q-pt-none">
							<!-- <div class="text-caption text-grey">
								Small plates, salads & sandwiches in an intimate setting.
								</div> -->
						</q-card-section>

						<q-separator />

						<q-card-actions>
							<!-- <q-btn class="full-width" style="background: orange;"  flat color="white">
									Lihat Detail
								</q-btn> -->
						</q-card-actions>
					</q-card>
				</div>
				<!--  -->
				<div class="q-pa-md">
					<q-card class="my-card">
						<q-img src="https://imgur.com/d87VviF.jpg" />

						<q-card-section>
							<div class="row no-wrap items-center">
								<!-- <div class="col text-h6 ellipsis">
										Cafe Basilico
									</div> -->
							</div>
							<q-rating v-model="stars" :max="5" size="32px" />
						</q-card-section>

						<q-card-section class="q-pt-none">
							<!-- <div class="text-caption text-grey">
								Small plates, salads & sandwiches in an intimate setting.
								</div> -->
						</q-card-section>

						<q-separator />

						<q-card-actions>
							<!-- <q-btn class="full-width" style="background: orange;"  flat color="white">
									Lihat Detail
								</q-btn> -->
						</q-card-actions>
					</q-card>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	data() {
		return {
			hardCodedDescription: `<p><span style="font-weight: 400;">Deskripsi</span></p>
<p><span style="font-weight: 400;">Spesial untukmu! Nikmati diskon 70% untuk pembelian Paket Brader Hemat di Distrodakwah.id</span></p>
<p><span style="font-weight: 400;">SYARAT DAN KETENTUAN</span></p>
<ol>
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
</ol>`
		};
	}
};
</script>

<style></style>
