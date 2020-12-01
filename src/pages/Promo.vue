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
                <p
                  class="text-caption text-grey"
                >
                  Deskripsi <br/><br/>
                  Spesial untukmu! Nikmati diskon 70% untuk pembelian Paket Brader Hemat di Distrodakwah.id
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
                <p
                  class="text-caption text-grey"
                >
                  Deskripsi <br/><br/>
                  Beli produk Yaumee Disc 50% di Distrodakwah.id. Brader, cek sekarang!
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
              <router-link to="/detail/keep/519/" class="full-width">
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
              <router-link to="/detail/keep/520/" class="full-width">
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
              <router-link to="/detail/keep/521/" class="full-width">
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
                <p
                  class="text-caption text-grey"
                >
                  Deskripsi <br/><br/>
                  Beli 1 Produk Distrodakwah.id selama Bulan Desember, ada Voucher Umroh senilai 1 jt.
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
            <q-img src="https://imgur.com/AV2k68G.jpg" />
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
              <q-card-section class="q-pt-none">
                <!-- <p
                  class="text-caption text-grey"
                >
                  Deskripsi <br/><br/>
                  Beli 1 Produk Distrodakwah.id selama Bulan Desember, ada Voucher Umroh senilai 1 jt.
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
                    > -->
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <!-- <q-btn
                @click="onClickHandler"
                class="full-width"
                style="background: orange"
                flat
                color="white"
              >
                Join Group
              </q-btn> -->
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
    };
  },
  methods: {
  onClickHandler(){
	  openURL('https://t.me/joinchat/N8T-JkTxgPIGaxbkvbks2w')
  }
  }
 
};
</script>

<style></style>
