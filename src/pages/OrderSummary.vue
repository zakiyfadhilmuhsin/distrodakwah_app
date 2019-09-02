<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="mobile-layout-on-desktop">
      <q-toolbar class="bg-orange-8 text-white">
        <q-btn
          flat
          round
          dense
          to="/shipping"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Ringkasan Pesanan</span></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black mobile-layout-on-desktop" style="border-top: 2px solid #eee">
      <q-toolbar class="bg-white text-black">
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white full-width"
          to="invoice"
        >
          Lakukan Pembayaran
        </q-btn>
      </q-toolbar>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-white">
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white; margin-bottom: 5px; padding: 13px 0 10px 0">
            <div class="row q-px-md">
              <div class="col">
                <h5 class="title-text">Rincian Pesanan</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-red">Ubah Pesanan</h5>
              </div>
            </div>
            <br/>
            <div class="row q-px-lg">
              <div class="col-3">
                <img src="~/assets/images/product/247merah-square.png" width="100%" />
              </div>
              <div class="col-6" style="padding: 0 15px">
                <h5 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; line-height: 18px;">Kaos Dakwah AM250</h5>
                <h6 style="margin: -15px 0; font-size: 12px;">Varian : Merah, L</h6>
                <h6 style="margin: -15px 0; font-size: 12px;">Qty 3 x Rp80.000</h6>
              </div>
              <div class="col-3 text-right">
                <h6 style="margin: 0; font-size: 12px;" class="text-black">Rp240.000</h6>
              </div>
            </div>
            <div class="row q-px-lg">
              <div class="col-3">
                <img src="~/assets/images/product/247merah-square.png" width="100%" />
              </div>
              <div class="col-6" style="padding: 0 15px">
                <h5 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; line-height: 18px;">Kaos Dakwah AM250</h5>
                <h6 style="margin: -15px 0; font-size: 12px;">Varian : Merah, L</h6>
                <h6 style="margin: -15px 0; font-size: 12px;">Qty 3 x Rp80.000</h6>
              </div>
              <div class="col-3 text-right">
                <h6 style="margin: 0; font-size: 12px;" class="text-black">Rp240.000</h6>
              </div>
            </div>
          </div>
          <div style="background-color: white; margin-bottom: 5px; padding: 13px 0 10px 0">
            <div class="row q-px-md">
              <div class="col">
                <h5 class="title-text">Ongkos Kirim</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-red">Ubah Ekspedisi</h5>
              </div>
            </div>
            <br/>
            <div class="row q-px-sm">
              <div class="col">
                <q-list dense>
                  <q-item clickable v-ripple>
                    <q-item-section side><img src="~/assets/images/components/ekspedisi/ninja.png" width="65" /></q-item-section>

                    <q-item-section>Ninja REG<br/><span style="font-size: 10px">1 Kg x Rp9.375</span></q-item-section>
                    <q-item-section side><h6 style="margin: 0; font-size: 12px;" class="text-black text-right">Rp94.000</h6></q-item-section>
                  </q-item>
                </q-list>
                <!-- <hr style="border: 1px solid #eee" /> -->
              </div>
            </div>
            <!-- <div class="row q-px-lg">
              <div class="col">
                <h5 class="title-text">Subtotal</h5>
              </div>
              <div class="col text-right">
                <h6 style="margin: 0; font-size: 12px;" class="text-black">Rp248.000</h6>
              </div>
            </div> -->
          </div>
          <!-- <div style="background-color: white;; padding: 13px 0 10px 0">
            <div class="row q-px-lg">
              <div class="col">
                <h5 class="title-text">Donasi</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-red">Ubah Donasi</h5>
              </div>
            </div>
            <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
              <div class="col-xs-8">
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> melalui lembaga ACT</h6>
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> untuk Rumah Quran</h6>
              </div>
              <div class="col-xs-4 text-right">
                <h6 style="margin: 0; font-size: 12px;" class="text-black">Rp600</h6>
              </div>
            </div>
            <center>
              <hr style="border: 1px solid #eee; width: 90%;" />
            </center>
            <div class="row q-px-lg">
              <div class="col">
                <h5 style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold">Total</h5>
              </div>
              <div class="col text-right">
                <h5 style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold">Rp296.000</h5>
              </div>
            </div>
            <hr style="border: none; height: 100px" />
            <div class="row q-px-lg">
              <div class="col">
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px; text-align: center;">Jika kamu sudah yakin dengan pesanan ini silahkan tekan tombol <b>Lakukan Pembayaran</b></h6>
              </div>
            </div>
          </div> -->
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      addressSelect: true,
      ekspedisiSelected: ''
    }
  }
}
</script>

<style>
  .title-text{
    font-family: 'Open Sans';
    font-size: 13px;
    font-weight: bold;
    margin: 0;
  }
  .link-text{
    font-family: 'Open Sans';
    font-size: 13px;
    margin: 0;
  }
</style>
