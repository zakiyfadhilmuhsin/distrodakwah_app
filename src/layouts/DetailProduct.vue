<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="mobile-layout-on-desktop">
      <q-toolbar class="bg-orange-8 text-white">
        <q-btn
          flat
          round
          dense
          to="/"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-space />
        <q-btn
          flat
          dense
          round
          icon="shopping_cart"
        >
          <q-badge color="amber-5" class="text-black" floating>3</q-badge>
        </q-btn>
        <q-btn
          flat
          dense
          round
        >
          <q-icon name="share" color="white" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black mobile-layout-on-desktop" style="border-top: 2px solid #eee">
      <q-toolbar class="bg-white text-black">
        <span>
          <h4 style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold">KAMU UNTUNG 20.000</h4>
        </span>
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white"
          @click="confirmOrder = true"
        >
          Beli Sekarang
        </q-btn>
      </q-toolbar>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <router-view />
      <q-dialog v-model="confirmOrder">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-card-section class="row items-center">
            <h6 style="margin: 0; font-size: 16px">Berhasil Masuk Keranjang</h6>
            <q-space />
            <q-btn icon="close" size="sm" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <!-- <div class="row">
              <div class="col-4">
                <img src="~/assets/images/product/247merah-square.png" width="80" />
              </div>
              <div class="col-6">
                <h5 style="margin: -10px 0px 10px 0px; font-size: 14px; font-weight: bold">Kaos Dakwah AM250</h5>
                <h6 style="margin: -15px 0; font-size: 14px;">Warna : Merah</h6>
                <h6 style="margin: -15px 0; font-size: 14px;">Ukuran : Merah</h6>
                <h6 style="margin: -15px 0; font-size: 14px;">Qty : 3</h6>
              </div>
              <div class="col-2 text-right self-center">
                <q-icon name="delete" style="font-size: 20px" />
              </div>
            </div> -->
            <div class="row">
              <div class="col-4">
                <img src="~/assets/images/product/247merah-square.png" width="80" />
              </div>
              <div class="col-8">
                <h5 style="margin: -10px 0px 10px 0px; font-size: 14px; font-weight: bold">Kaos Dakwah AM250</h5>
                <h6 style="margin: -15px 0; font-size: 14px;">Warna : Merah</h6>
                <h6 style="margin: -15px 0; font-size: 14px;">Ukuran : Merah</h6>
                <h6 style="margin: -15px 0; font-size: 14px;">Qty : 3</h6>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col">
                <h5 style="font-size: 21px; margin: 0; font-weight: bold">Subtotal</h5>
              </div>
              <div class="col text-right">
                <h5 style="font-size: 21px; margin: 0;">Rp200.000</h5>
                <h5 style="font-size: 10px; margin: -12px 0;">Harga belum termasuk ongkir</h5>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col">
                <q-btn to="/cart" flat class="bg-orange-8 text-white full-width"><b>Checkout</b></q-btn>
                <h5 style="font-size: 10px; margin: 0; text-align: center;">Atau</h5>
                <q-btn to="/storefront" outline color="black" class="full-width"><b>Lanjut Belanja</b></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      confirmOrder: false,
      qty: '1',
    }
  }
}
</script>