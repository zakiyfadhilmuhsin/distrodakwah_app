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

    <q-footer class="bg-white text-black mobile-layout-on-desktop" style="border-top: 2px solid #eee" v-if="this.dataOrder.status === 'waiting_payment'">
      <q-toolbar class="bg-white text-black">
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white full-width"
          @click="paymentConfirmation = true"
        >
          Konfirmasi Pembayaran
        </q-btn>
      </q-toolbar>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-white">
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white;; padding: 13px 0 10px 0">
            <div class="row q-px-md q-py-xs">
              <div class="col">
                <h5 class="title-text" style="padding-left: 8px">Ringkasan Pembayaran</h5>
              </div>
              <div class="col text-right">
                <router-link :to="'/detailOrder/' + this.$route.query.orderID" style="text-decoration: none;">
                  <h5 class="link-text text-red">Lihat Detail</h5>
                </router-link>
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
                <h6 style="font-size: 36px; margin: 0 0 18px 0; font-family: 'Open Sans'; text-align: center; font-weight: bold">Rp{{ formatPrice(dataOrder.grand_total) }} <q-btn @click="copyTotalTransfer" flat size="xs" class="bg-red text-white">Salin</q-btn></h6>
                <h6 style="font-size: 12px; margin: 10px 0; font-family: 'Open Sans'; text-align: center; line-height: 16px">Silahkan lakukan pembayaran melalui transfer bank ke salah satu rekening dibawah ini sebelum :</h6>
                <h6 class="text-center bg-yellow text-bold" style="font-size: 11px; margin: 0">{{ dataOrder.expired_time ? new Date(dataOrder.expired_time*1000).toLocaleString('id-ID', { dateStyle: 'full', timeZone: 'Asia/Jakarta' }) : '' }} pukul {{ dataOrder.expired_time ? new Date(dataOrder.expired_time*1000).toLocaleTimeString('en-GB') : '' }} WIB (1x24 jam)</h6>
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

                    <q-item-section><q-btn @click="copyAccountNumber(bank.account_number)" flat size="xs" class="bg-red text-white">Salin</q-btn></q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </q-page>
      <q-dialog v-model="paymentConfirmation" position="bottom">
        <q-card style="min-width: 360px">
          <q-card-section>
            <div class="text-h6">Konfirmasi Pembayaran</div>
          </q-card-section>

          <q-card-section>
            <q-select 
              color="orange-8"
              dense
              outlined
              v-model="bankReceiver"
              :options="dataBank"
              option-value="bank_name"
              option-label="bank_name"
              label="Bank Tujuan"
              emit-value
              map-options
              style="margin-bottom: 5px"
            />
            <q-input type="text" color="orange-8" v-model="bankSender" label="Transfer Dari Bank" dense outlined style="margin-bottom: 5px" />
            <q-input type="text" color="orange-8" v-model="senderName" label="Nama Pengirim" dense outlined style="margin-bottom: 5px" />
            <q-input type="number" color="orange-8" v-model="totalTransfer" label="Total Transfer" dense outlined style="margin-bottom: 5px" />
            <div class="q-field row no-wrap items-start bg-grey-2 q-mb-sm q-input q-field--outlined q-field--float q-field--dense">
              <div class="q-field__inner relative-position col self-stretch column justify-center">
                <div class="q-field__control relative-position row no-wrap text-orange-8">
                  <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                    <flat-pickr v-model="transferDate" class="q-field__native" placeholder="Tanggal Transfer"></flat-pickr>
                  </div>
                </div>
              </div>
            </div>
            <!-- <q-input dense outlined v-model="transferDate" color="orange-8" placeholder="Tanggal Transfer">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="transferDate" mask="YYYY-MM-DD" color="orange-8" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input> -->
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn flat label="Konfirmasi Sekarang" color="white" class="bg-orange-8 text-capitalize full-width" @click="postPaymentConfirmation" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>

  </q-layout>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { showOrderUrl, identityBankUrl, paymentConfirmationUrl, paymentConfirmOrderUrl, getHeader } from 'src/config';
import VueClipboard from 'vue-clipboard2';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { openURL } from 'quasar';

Vue.use(VueClipboard);

export default {
  components: {
    flatPickr
  },
  data () {
    return {
      dataBank: [],
      dataOrder: [],
      // Payment Confirmation
      bankReceiver: '',
      bankSender: '',
      senderName: '',
      totalTransfer: 0,
      transferDate: '',
      // Toggle
      paymentConfirmation: false,
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
    postPaymentConfirmation() {

        let paymentConfirm = new FormData();

        paymentConfirm.set('invoice', this.dataOrder.invoice);
        paymentConfirm.set('bank_receiver', this.bankReceiver);
        paymentConfirm.set('bank_sender', this.bankSender);
        paymentConfirm.set('sender_name', this.senderName);
        paymentConfirm.set('total_transfer', this.totalTransfer);
        paymentConfirm.set('transfer_date', this.transferDate);

        axios.post( paymentConfirmationUrl, paymentConfirm, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.getDataBank();
              this.getOrder();

              openURL("https://wa.me/6287821550989?text=Konfirmasi%20Pembayaran%0A%0ABank%20Penerima:%20" + this.bankReceiver + "%0ABank%20Pengirim:%20" + this.bankSender + "%0ANama%20Pengirim:%20" + this.senderName + "%0ATotal%20Transfer:%20" + this.totalTransfer + "%0ATanggal%20Transfer:%20" + this.transferDate + "%0A%0A*Jangan%20Lupa%20Kirim%20Bukti%20Pembayaran*");

              this.bankReceiver = '';
              this.bankSender = '';
              this.senderName = '';
              this.totalTransfer = '';
              this.transferDate = '';
            }

          })
          .catch(error => {
            if (error.response) {
              console.log(error.response)
            }
          })

        let changeStatus = new FormData();

        changeStatus.set('id', this.dataOrder.id);

        axios.post( paymentConfirmOrderUrl, changeStatus, { headers: getHeader() } )
          .then(response => {
            console.log(response)
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
    copyTotalTransfer: function () {
      this.$copyText(this.dataOrder.grand_total).then(function (e) {
        alert('Berhasil Disalin!')
        console.log(e)
      }, function (e) {
        alert('Gagal Disalin!')
        console.log(e)
      })
    },
    copyAccountNumber: function (accountNumber) {
      this.$copyText(accountNumber).then(function (e) {
        alert('Berhasil Disalin!')
        console.log(e)
      }, function (e) {
        alert('Gagal Disalin!')
        console.log(e)
      })
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
