<template>
  <q-page>
    <div class="bg-grey-3" style="height: 100%">
      <div style="background-color: white;; padding: 13px 0 10px 0">
        <div class="row q-px-lg">
          <div class="col">
            <h5 class="title-text" style="font-weight: normal;">Tgl Order : 16 Juli 19</h5>
          </div>
          <div class="col text-right">
            <q-btn flat disable size="sm" class="bg-red-7 text-white" style="text-transform: capitalize;">Belum Dibayar</q-btn>
          </div>
        </div>
        <br/>
        <div class="row q-px-lg">
          <div class="col">
            <h5 class="title-text">Ringkasan Pembayaran</h5>
          </div>
          <div class="col text-right">
            <h5 class="link-text text-red">Lihat Detail</h5>
          </div>
        </div>
        <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
          <div class="col-xs-8">
            <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Total Harga Barang</h6>
            <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Ongkos Kirim</h6>
            <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi</h6>
          </div>
          <div class="col-xs-4 text-right">
            <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp240.000</h6>
            <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp19.500</h6>
            <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp600</h6>
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
        <div class="row q-px-lg items-center"">
          <div class="col-xs-8">
            <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Kode Unik</h6>
          </div>
          <div class="col-xs-4 text-right">
            <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp-138</h6>
          </div>
        </div>
        <hr style="border: none; height: 30px" />
        <div class="row q-px-lg">
          <div class="col">
            <h6 style="font-size: 14px; margin: 10px 0; font-family: 'Open Sans'; text-align: center;">Total Yang Harus Kamu Transfer</h6>
            <h6 style="font-size: 36px; margin: 0 0 18px 0; font-family: 'Open Sans'; text-align: center; font-weight: bold">Rp2.095.432 <q-btn flat size="xs" class="bg-red text-white">Salin</q-btn></h6>
            <h6 style="font-size: 14px; margin: 10px 0; font-family: 'Open Sans'; text-align: center; line-height: 16px">Silahkan melakukan pembayaran melalui transfer bank ke salah satu rekening berikut.</h6>
          </div>
        </div>
      </div>
      <div style="background-color: white;; padding: 13px 0 10px 0">
        <div class="row q-pa-lg">
          <div class="col">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <img src="~/assets/images/components/bank/bca.png" width="50" />
                </q-item-section>

                <q-item-section side>08123456789<br/><span style="font-size: 10px">A.N CV. Distro Dakwah Indonesia</span></q-item-section>

                <q-item-section><q-btn flat size="xs" class="bg-red text-white">Salin</q-btn></q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <img src="~/assets/images/components/bank/bni.png" width="50" />
                </q-item-section>

                <q-item-section side>08123456789<br/><span style="font-size: 10px">A.N CV. Distro Dakwah Indonesia</span></q-item-section>

                <q-item-section><q-btn flat size="xs" class="bg-red text-white">Salin</q-btn></q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <img src="~/assets/images/components/bank/bri.png" width="50" />
                </q-item-section>

                <q-item-section side>08123456789<br/><span style="font-size: 10px">A.N CV. Distro Dakwah Indonesia</span></q-item-section>

                <q-item-section><q-btn flat size="xs" class="bg-red text-white">Salin</q-btn></q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <img src="~/assets/images/components/bank/mandiri.png" width="50" />
                </q-item-section>

                <q-item-section side>08123456789<br/><span style="font-size: 10px">A.N CV. Distro Dakwah Indonesia</span></q-item-section>

                <q-item-section><q-btn flat size="xs" class="bg-red text-white">Salin</q-btn></q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <br/>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
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
