<template>
  <q-page class="bg-white">
    <div class="row order-list-section">
      <div class="col">
        <q-tabs
        v-model="orderTab"
        class="text-orange-8"
        dense
        style="text-transform: capitalize;"
        >
          <q-tab name="all" label="Semua" />
          <q-tab name="belum_dibayar" label="Belum Dibayar" />
          <q-tab name="menunggu_verifikasi" label="Menunggu Verifikasi" />
          <q-tab name="dikemas" label="Dikemas" />
          <q-tab name="dikirim" label="Dikirim" />
          <q-tab name="pending" label="Pending" />
          <q-tab name="selesai" label="Selesai" />
          <q-tab name="dibatalkan" label="Dibatalkan" />
        </q-tabs>
        <hr style="margin:0" />
        <div class="row q-pa-md">
          <div class="col-xs-7">
            <q-input dense outlined v-model="searchOrder" color="orange-8" placeholder="Cari Invoice" style="margin-right: 5px">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-5">
            <q-input dense outlined v-model="date" color="orange-8" mask="date" :rules="['date']" placeholder="Filter Tanggal" style="margin-left: 5px">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-px-md">
          <div class="col">
            <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px">
              <div class="row">
                <div class="col-xs-8">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Invoice 990123 / 16 Juli 19<br/>Nama Pelanggan : Abdurahman</h6>
                </div>
                <div class="col-xs-4">
                  <router-link to="/detailOrder" style="text-decoration: none;">
                    <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Lihat Detail</p>
                  </router-link>
                </div>
              </div>
              <br/>
              <div class="row">
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Total Pembayaran<br/><b>Rp76.000</b></h6>
                </div>
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px" class="text-right">Status Pesanan<br/><span style="font-weight: bold;" class="text-red-7">Belum Dibayar</span></h6>
                </div>
              </div>
            </div>
            <br/>
            <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px">
              <div class="row">
                <div class="col-xs-8">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Invoice 990123 / 16 Juli 19<br/>Nama Pelanggan : Abdurahman</h6>
                </div>
                <div class="col-xs-4">
                  <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Lihat Detail</p>
                </div>
              </div>
              <br/>
              <div class="row">
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Total Pembayaran<br/><b>Rp76.000</b></h6>
                </div>
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px" class="text-right">Status Pesanan<br/><span style="font-weight: bold;" class="text-blue-10">Dikemas</span></h6>
                </div>
              </div>
            </div>
            <br/>
            <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px">
              <div class="row">
                <div class="col-xs-8">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Invoice 990123 / 16 Juli 19<br/>Nama Pelanggan : Abdurahman</h6>
                </div>
                <div class="col-xs-4">
                  <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Lihat Detail</p>
                </div>
              </div>
              <br/>
              <div class="row">
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Total Pembayaran<br/><b>Rp76.000</b></h6>
                </div>
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px" class="text-right">Status Pesanan<br/><span style="font-weight: bold;" class="text-green-8">Dikirim</span></h6>
                </div>
              </div>
            </div>
            <br/>
            <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px">
              <div class="row">
                <div class="col-xs-8">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Invoice 990123 / 16 Juli 19<br/>Nama Pelanggan : Abdurahman</h6>
                </div>
                <div class="col-xs-4">
                  <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Lihat Detail</p>
                </div>
              </div>
              <br/>
              <div class="row">
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Total Pembayaran<br/><b>Rp76.000</b></h6>
                </div>
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px" class="text-right">Status Pesanan<br/><span style="font-weight: bold;" class="text-red-7">Belum Dibayar</span></h6>
                </div>
              </div>
            </div>
            <br/>
            <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px">
              <div class="row">
                <div class="col-xs-8">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Invoice 990123 / 16 Juli 19<br/>Nama Pelanggan : Abdurahman</h6>
                </div>
                <div class="col-xs-4">
                  <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Lihat Detail</p>
                </div>
              </div>
              <br/>
              <div class="row">
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Total Pembayaran<br/><b>Rp76.000</b></h6>
                </div>
                <div class="col-xs-6">
                  <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px" class="text-right">Status Pesanan<br/><span style="font-weight: bold;" class="text-red-7">Belum Dibayar</span></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
  .order-list-section{
    padding: 20px 0;
  }
</style>

<script>
export default {
  name: 'OrderList',
  data () {
    return {
      orderTab: 'all',
      searchOrder: null,
      date: null
    }
  }
}
</script>
