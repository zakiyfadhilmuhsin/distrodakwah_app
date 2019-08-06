<template>
  <q-page>
    <div class="bg-grey-3" style="height: 100%">
      <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0">
        <div class="row q-px-lg">
          <div class="col-3">
            <img src="~/assets/images/product/247merah-square.png" width="100%" />
          </div>
          <div class="col-7" style="padding: 0 15px">
            <h5 style="margin: 0; font-size: 14px; font-weight: bold">Kaos Dakwah AM250</h5>
            <h6 style="margin: -15px 0; font-size: 12px;">Varian : Merah, L</h6>
            <h6 style="margin: -15px 0; font-size: 12px;">Qty 3 x Rp80.000</h6>
            <h6 style="margin: -15px 0; font-size: 12px;" class="text-orange-8">Rp240.000</h6>
          </div>
          <div class="col-2 text-right self-center">
            <q-icon name="delete_forever" style="font-size: 20px" />
          </div>
        </div>
        <div class="row q-px-lg">
          <div class="col-3">
            <img src="~/assets/images/product/247merah-square.png" width="100%" />
          </div>
          <div class="col-7" style="padding: 0 15px">
            <h5 style="margin: 0; font-size: 14px; font-weight: bold">Kaos Dakwah AM250</h5>
            <h6 style="margin: -15px 0; font-size: 12px;">Varian : Merah, L</h6>
            <h6 style="margin: -15px 0; font-size: 12px;">Qty 3 x Rp80.000</h6>
            <h6 style="margin: -15px 0; font-size: 12px;" class="text-orange-8">Rp240.000</h6>
          </div>
          <div class="col-2 text-right self-center">
            <q-icon name="delete_forever" style="font-size: 20px" />
          </div>
        </div>
      </div>
      <div style="background-color: white; margin-bottom: 5px">
        <div class="row q-pa-xs items-center">
          <div class="col">
            <q-list dense>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <img src="~/assets/images/components/coupon.png" width="30" class="self-center" />
                </q-item-section>

                <q-item-section>Punya kode voucher?</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div style="background-color: white; margin-bottom: 5px">
        <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
          <div class="col">
            <h6 style="font-size: 16px; margin: 0; font-family: 'Open Sans'">Total Item</h6>
            <h6 style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold">3</h6>
          </div>
          <div class="col">
            <h6 style="font-size: 16px; margin: 0; font-family: 'Open Sans'">Subtotal</h6>
            <h6 style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold">Rp480.000</h6>
          </div>
        </div>
      </div>
      <div style="background-color: white; margin-bottom: 5px">
        <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
          <div class="col">
            <img src="~/assets/images/components/peti.png" width="130" />
          </div>
          <div class="col">
            <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Alhamdulillah potensi keuntungan kamu adalah</h6>
            <h6 style="font-size: 28px; margin: 8px 0; font-family: 'Open Sans'; font-weight: bold" class="text-red">Rp120.000</h6>
            <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Jangan lupa sedekah ya :)</h6>
          </div>
        </div>
      </div>
      <div style="background-color: white; margin-bottom: 5px">
        <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
          <div class="col">
            <q-checkbox keep-color color="orange-8" dense v-model="donasi_act"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> melalui lembaga ACT</h6></q-checkbox>
            <q-checkbox keep-color color="orange-8" dense v-model="donasi_rq"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> untuk Rumah Quran</h6></q-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white q-pa-md">
      <div class="col">
        <q-btn
          flat
          class="bg-orange-8 text-white full-width"
          to="/shipping"
        >
          Atur Alamat Pengiriman
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      donasi_act: false,
      donasi_rq: false,
    }
  }
}
</script>

<style>
</style>
