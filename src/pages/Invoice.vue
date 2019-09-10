<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn
          flat
          round
          dense
          to="/"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Invoice</span></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-white">
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white;; padding: 13px 0 10px 0">
            <div class="row q-px-md q-py-xs">
              <div class="col">
                <h5 class="title-text" style="padding-left: 8px">Ringkasan Pembayaran</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-red">Lihat Detail</h5>
              </div>
            </div>
            <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
              <div class="col-xs-8">
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Total Harga Barang</h6>
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Ongkos Kirim</h6>
                <!-- <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi</h6> -->
              </div>
              <div class="col-xs-4 text-right">
                <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp{{ formatPrice(dataOrder.total_amount) }}</h6>
                <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp{{ formatPrice(dataOrder.shipment_fee) }}</h6>
                <!-- <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp600</h6> -->
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
                <h5 style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold">Rp{{ formatPrice(dataOrder.grand_total + dataOrder.code_unique) }}</h5>
              </div>
            </div>
            <div class="row q-px-lg items-center">
              <div class="col-xs-8">
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Kode Unik</h6>
              </div>
              <div class="col-xs-4 text-right">
                <h6 style="margin: 0; font-size: 12px; line-height: 18px" class="text-black">Rp-{{ formatPrice(dataOrder.code_unique) }}</h6>
              </div>
            </div>
            <hr style="border: none; height: 30px" />
            <div class="row q-px-lg">
              <div class="col">
                <h6 style="font-size: 14px; margin: 10px 0; font-family: 'Open Sans'; text-align: center;">Total Yang Harus Kamu Transfer</h6>
                <h6 style="font-size: 36px; margin: 0 0 18px 0; font-family: 'Open Sans'; text-align: center; font-weight: bold">Rp{{ formatPrice(dataOrder.grand_total) }} <q-btn flat size="xs" class="bg-red text-white">Salin</q-btn></h6>
                <h6 style="font-size: 14px; margin: 10px 0; font-family: 'Open Sans'; text-align: center; line-height: 16px">Silahkan melakukan pembayaran melalui transfer bank ke salah satu rekening berikut.</h6>
              </div>
            </div>
          </div>
          <div style="background-color: white;; padding: 13px 0 10px 0">
            <div class="row q-pa-lg">
              <div class="col">
                <q-list>
                  <q-item v-for="(bank, index) in dataBank" :key="index">
                    <q-item-section side>
                      <img :src="bank.bank_image" width="50" />
                    </q-item-section>

                    <q-item-section side>{{ bank.account_number }}<br/><span style="font-size: 10px">A.N {{ bank.account_name }}</span></q-item-section>

                    <q-item-section><q-btn flat size="xs" class="bg-red text-white">Salin</q-btn></q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import axios from 'axios';
import { showOrderUrl, identityBankUrl, getHeader } from 'src/config';

export default {
  data () {
    return {
      dataBank: [],
      dataOrder: [],
    }
  },
  mounted () {
    this.getDataBank();
    this.getOrder();
  },
  methods: {
    getOrder() {

        axios.get( showOrderUrl + '/' + this.$route.query.orderID, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.dataOrder = response.data.data;
            }

          })
          .catch(error => {
            if (error.response) {
              console.log(error.response)
            }
          })

    },
    getDataBank() {

        axios.get( identityBankUrl, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.dataBank = response.data.data;
            }

          })
          .catch(error => {
            if (error.response) {
              console.log(error.response)
            }
          })

    },
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
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
