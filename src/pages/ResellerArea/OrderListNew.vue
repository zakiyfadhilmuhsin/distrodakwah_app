<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="mobile-layout-on-desktop" style="box-shadow: none !important">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn
          flat
          round
          dense
          to="/"
        >
          <q-icon name="arrow_back" color="white" />
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Pesanan Saya</span></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer class="mobile-layout-on-desktop">
      <center>
        <q-tabs
          dense
          class="bg-white text-black"
          style="border-top: 2px solid #eeeeee;"
          animated
          swipeable
          align="justify"
        >
          <q-route-tab
            icon="home"
            to="/"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Beranda</span></q-route-tab>
          <q-route-tab
            icon="receipt"
            to="/orderList"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Pesanan</span></q-route-tab>
          <q-route-tab
            icon="local_mall"
            to="/cart"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Keranjang</span><q-badge color="red" text-color="white" floating v-if="totalCartItem !== null"><b>{{ totalCartItem }}</b></q-badge></q-route-tab>
          <q-route-tab
            icon="account_circle"
            to="/dashboard"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Profil</span></q-route-tab>
          <!-- <q-route-tab
            icon="verified_user"
            to="/storefront"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Support</span></q-route-tab> -->
        </q-tabs>
      </center>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-white">
        <center>
          <div class="row row q-px-lg q-pt-md">
            <div class="col">
              <q-input dense outlined rounded v-model="searchInvoice" color="orange-8" placeholder="Cari Invoice" style="margin-right: 5px; margin-bottom: 0" @input="getOrder">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-px-lg q-py-md">
            <div class="col">
              <div @click="changeStatus('all')" style="cursor:pointer" :class="orderStatus === '' ? 'text-amber-9' : ''">
                <q-icon
                  name="fas fa-list-alt"
                  style="font-size: 30px; margin: 0 0 5px 0"
                />
                <p style="font-size: 10px; margin: 0">Semua</p>
              </div>
            </div>
            <div class="col">
              <div @click="changeStatus('waiting_payment')" style="cursor:pointer" :class="orderStatus === 'waiting_payment' ? 'text-amber-9' : ''">
                <q-icon
                  name="fas fa-wallet"
                  style="font-size: 30px; margin: 0 0 5px 0"
                />
                <p style="font-size: 10px; margin: 0">Belum Bayar</p>
              </div>
            </div>
            <div class="col">
              <div @click="changeStatus('processed')" style="cursor:pointer" :class="orderStatus === 'processed' ? 'text-amber-9' : ''">
                <q-icon
                  name="fas fa-box-open"
                  style="font-size: 30px; margin: 0 0 5px 0"
                />
                <p style="font-size: 10px; margin: 0">Diproses</p>
              </div>
            </div>
            <div class="col">
              <div @click="changeStatus('shipped')" style="cursor:pointer" :class="orderStatus === 'shipped' ? 'text-amber-9' : ''">
                <q-icon
                  name="fas fa-shipping-fast"
                  style="font-size: 30px; margin: 0 0 5px 0"
                />
                <p style="font-size: 10px; margin: 0">Dikirim</p>
              </div>
            </div>
            <div class="col">
              <div @click="changeStatus('pending')" style="cursor:pointer" :class="orderStatus === 'pending' ? 'text-amber-9' : ''">
                <q-icon
                  name="fas fa-clock"
                  style="font-size: 30px; margin: 0 0 5px 0"
                />
                <p style="font-size: 10px; margin: 0">Pending</p>
              </div>
            </div>
          </div>
        </center>
        <div class="bg-grey-3" style="height: 5px"></div>
        <q-scroll-area style="height: 450px;">
          <div class="row order-list-section">
            <div class="col q-px-md">
              <template v-if="orderData.length !== 0">
                <div class="box-order-list" style="padding: 12px; margin-bottom: 10px" v-for="(order, index) in orderBy(this.orderData, 'invoice').reverse()" :key="index">
                  <div class="row">
                    <div class="col-xs-8">
                      <h6 v-if="order.detail_customer.length !== 0" style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Invoice <b>{{ order.invoice }}</b><br/>{{ order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}<br/><br/>
                      Nama Pelanggan : {{ order.detail_customer[0].customer_name }}</h6>
                    </div>
                    <div class="col-xs-4">
                      <router-link :to="'/detailOrder/' + order.id" style="text-decoration: none;">
                        <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Lihat Detail</p>
                      </router-link>
                    </div>
                  </div>
                  <br/>
                  <div class="row">
                    <div class="col-xs-6">
                      <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Total Pembayaran<br/><b>Rp{{ formatPrice(order.grand_total) }}</b></h6>
                    </div>
                    <div class="col-xs-6">
                      <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px" class="text-right">Status Pesanan<br/>
                        <span style="font-weight: bold;" class="text-red-7" v-if="order.status === 'waiting_payment'">Menunggu Pembayaran</span>
                        <span style="font-weight: bold;" class="text-orange-7" v-else-if="order.status === 'waiting_for_verification'">Menunggu Verifikasi</span>
                        <span style="font-weight: bold;" class="text-primary" v-else-if="order.status === 'payment_confirmed'">Sudah Dibayar</span>
                        <span style="font-weight: bold;" class="text-yellow-10" v-else-if="order.status === 'processed'">Sedang Diproses</span>
                        <span style="font-weight: bold;" class="text-dark" v-else-if="order.status === 'packing'">Sedang Dikemas</span>
                        <span style="font-weight: bold;" class="text-green" v-else-if="order.status === 'shipped'">Sedang Dikirim</span>
                        <span style="font-weight: bold;" class="text-green" v-else-if="order.status === 'done'">Selesai</span>
                        <span style="font-weight: bold;" class="text-red-7" v-else-if="order.status === 'pending'">Pending</span>
                        <span style="font-weight: bold;" class="text-red-7" v-else-if="order.status === 'rejected'">Dibatalkan</span>
                      </h6>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="q-pa-md" style="padding-top: 150px">
                  <center>
                    <img src="~/assets/images/components/box_order.png" width="100" />
                    <div class="text-bold text-black">Belum Ada Pesanan</div>
                  </center>
                </div>
              </template>
            </div>
            <!-- <div class="col">
              <q-tabs
              v-model="orderTab"
              class="text-orange-8"
              dense
              style="text-transform: capitalize;"
              @input="getOrder"
              >
                <q-tab name="waiting_payment" label="Belum Dibayar" />
                <q-tab name="waiting_for_verification" label="Menunggu Verifikasi" />
                <q-tab name="payment_confirmed" label="Sudah Dibayar" />
                <q-tab name="processed" label="Sedang Diproses" />
                <q-tab name="packing" label="Sedang Dikemas" />
                <q-tab name="shipped" label="Sedang Dikirim" />
                <q-tab name="done" label="Selesai" />
                <q-tab name="pending" label="Pending" />
                <q-tab name="rejected" label="Dibatalkan" />
              </q-tabs>
              <hr style="margin:0" />
              <div class="row q-px-md" style="margin-top: 15px">
                <div class="col-xs-7">
                  <q-input dense outlined v-model="searchInvoice" color="orange-8" placeholder="Cari Invoice" style="margin-right: 5px; margin-bottom: 0" @input="getOrder">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-5">
                  <div class="q-field row no-wrap items-start bg-grey-2 q-mb-sm q-input q-field--outlined q-field--float q-field--dense">
                    <div class="q-field__inner relative-position col self-stretch column justify-center">
                      <div class="q-field__control relative-position row no-wrap text-orange-8">
                        <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                          <flat-pickr v-model="dateFilter" class="q-field__native" placeholder="Pilih Tgl Order" @input="getOrder"></flat-pickr>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-pa-md">
                <div class="col">
                  <template v-if="orderData.length !== 0">
                    <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px; margin-bottom: 10px" v-for="(order, index) in orderData" :key="index">
                      <div class="row">
                        <div class="col-xs-8">
                          <h6 v-if="order.detail_customer.length !== 0" style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Invoice <b>{{ order.invoice }}</b><br/>{{ order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}<br/><br/>
                          Nama Pelanggan : {{ order.detail_customer[0].customer_name }}</h6>
                        </div>
                        <div class="col-xs-4">
                          <router-link :to="'/detailOrder/' + order.id" style="text-decoration: none;">
                            <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Lihat Detail</p>
                          </router-link>
                        </div>
                      </div>
                      <br/>
                      <div class="row">
                        <div class="col-xs-6">
                          <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px">Total Pembayaran<br/><b>Rp{{ formatPrice(order.grand_total) }}</b></h6>
                        </div>
                        <div class="col-xs-6">
                          <h6 style="margin: 0; font-size: 12px; font-family: 'Open Sans'; line-height: 16px" class="text-right">Status Pesanan<br/>
                            <span style="font-weight: bold;" class="text-red-7" v-if="order.status === 'waiting_payment'">Menunggu Pembayaran</span>
                            <span style="font-weight: bold;" class="text-orange-7" v-else-if="order.status === 'waiting_fo_verification'">Menunggu Verifikasi</span>
                            <span style="font-weight: bold;" class="text-primary" v-else-if="order.status === 'payment_confirmed'">Sudah Dibayar</span>
                            <span style="font-weight: bold;" class="text-yellow-10" v-else-if="order.status === 'processed'">Sedang Diproses</span>
                            <span style="font-weight: bold;" class="text-dark" v-else-if="order.status === 'packing'">Sedang Dikemas</span>
                            <span style="font-weight: bold;" class="text-green" v-else-if="order.status === 'shipped'">Sedang Dikirim</span>
                            <span style="font-weight: bold;" class="text-green" v-else-if="order.status === 'done'">Selesai</span>
                            <span style="font-weight: bold;" class="text-red-7" v-else-if="order.status === 'pending'">Pending</span>
                            <span style="font-weight: bold;" class="text-red-7" v-else-if="order.status === 'rejected'">Dibatalkan</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="q-pa-md" style="padding-top: 40px">
                      <center>
                        <img src="~/assets/images/components/box_order.png" width="100" />
                        <div class="text-bold text-black">Belum Ada Pesanan</div>
                      </center>
                    </div>
                  </template>
                </div>
              </div>

            </div> -->
          </div>
        </q-scroll-area>
        <q-page-sticky position="bottom" :offset="[18, 18]">
          <q-btn @click="filterDateDialog = true" rounded color="amber-8 text-capitalize"><q-icon name="filter_list" size="xs" class="q-mr-sm" /> Filter</q-btn>
        </q-page-sticky>
      </q-page>
      <q-dialog v-model="filterDateDialog" position="bottom">
        <q-card style="min-width: 360px">
          <!-- <q-card-section>
            <div class="text-h6">Pilih Rentang Waktu</div>
          </q-card-section> -->

          <q-card-section>
            <p style="margin: 0 0 5px 0; font-weight: bold">Pilih Tanggal Order :</p>
            <div class="q-field row no-wrap items-start bg-grey-2 q-mb-sm q-input q-field--outlined q-field--float q-field--dense">
              <div class="q-field__inner relative-position col self-stretch column justify-center">
                <div class="q-field__control relative-position row no-wrap text-orange-8">
                  <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
                    <flat-pickr v-model="dateFilter" class="q-field__native" placeholder="Pilih Tgl Order"></flat-pickr>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
              flat
              label="Cari"
              color="white"
              class="bg-orange-8 text-capitalize full-width"
              v-close-popup
              @click="getOrder"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<style>
  .order-list-section{
    padding: 20px 0;
  }
  .box-order-list{
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    border: 1px solid #e5e3e3;
    border-radius: 5px;
  }
</style>

<script>
import axios from 'axios';
import { getOrderUrl, showCustomerUrl, totalCartItemUrl, getHeader } from 'src/config';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import Vue2Filters from 'vue2-filters';
// Loading
import { QSpinnerPuff } from 'quasar';

export default {
  name: 'OrderList',
  components: {
    flatPickr
  },
  mixins: [Vue2Filters.mixin],
  data () {
    return {
      orderStatus: '',
      searchInvoice: '',
      dateFilter: '',
      orderData: [],
      // Total Count Cart Item
      totalCartItem: null,
      //
      filterDateDialog: false,
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
    // if(this.$route.params.status){
    //   this.orderStatus = this.$route.params.status;
    // }else{
    //   this.getOrder();
    // }
    this.getOrder();
  },
  mounted () {
    // Get Total Cart Item
    axios.get( totalCartItemUrl + '/' + this.user.id, { headers: getHeader() } )
      .then(response => {
        console.log(response)

        if (response.data.data === 'Cart_is_empty') {
          this.totalCartItem = response.data.data;
        }

      })
      .catch(error => {
        if (error.response) {
          console.log(error.response)
        }
      })
  },
  methods: {
    getOrder () {

      this.$q.loading.show({
        spinner: QSpinnerPuff,
        spinnerColor: 'black',
        spinnerSize: 50,
        backgroundColor: 'grey',
        message: '<b>Mohon Tunggu..</b>',
        messageColor: 'black'
      })

      this.orderData = [];

      let formatUrl = null;

      // 1.Lihat Semua Pesanan v
      // 2.Filter Tanggal dari Semua Pesanan v
      // 3.Filter Search dari Semua Pesanan v
      // 4.Filter Tanggal & Search dari Semua Pesanan v
      // 5.Filter berdasarkan Status v
      // 6.Filter Tanggal dari Status tertentu v
      // 7.Filter Search dari Status Tertentu v --ini
      // 8.Filter Tanggal & Search dari Status Tertentu  v --ini
      // formatUrl = `${getOrderUrl}/${this.user.id}?`;
      // if(this.searchInvoice !==''){
      //   formatUrl =`${formatUrl}searchInvoice=${this.searchInvoice}`;
      // }
      // if(this.dateFilter !== ''){
      //   formatUrl = `${formatUrl}&dateFilter=${this.dateFilter}`;
      // }
      // if(this.status !== ''){
      //   formatUrl = `${formatUrl}&orderStatus=${this.orderStatus}`;
      // }
      if(this.searchInvoice !== '' && this.orderStatus !== '' && this.dateFilter !== ''){ // 8. Filter Tanggal & Search dari Status Tertentu
        formatUrl = getOrderUrl + '/' + this.user.id + '?orderStatus=' + this.orderStatus + '&dateFilter=' + this.dateFilter + '&searchInvoice=' + this.searchInvoice;
      }else if(this.searchInvoice !== '' && this.orderStatus !== ''){// 7. Filter Search dari  Status Tertentu
        formatUrl = getOrderUrl + '/' + this.user.id + '?orderStatus=' + this.orderStatus + '&searchInvoice=' + this.searchInvoice;
      }else if(this.dateFilter !== '' && this.orderStatus !== ''){// 6. Filter Tanggal dari Status tertentu v
        formatUrl = getOrderUrl + '/' + this.user.id + '?orderStatus=' + this.orderStatus + '&dateFilter=' + this.dateFilter;
      }else if(this.orderStatus !== ''){// 5. Filter berdasarkan Status tertentu v
        formatUrl = getOrderUrl + '/' + this.user.id + '?orderStatus=' + this.orderStatus;
      }else if (this.dateFilter !== '' && this.searchInvoice !== ''){ // 4.Filter Tanggal & Search dari Semua Pesanan v
        formatUrl = getOrderUrl + '/' + this.user.id + '?dateFilter=' + this.dateFilter + '&searchInvoice=' + this.searchInvoice;
      }else if (this.searchInvoice !== '') { // 3.Filter Search dari Semua Pesanan v
          formatUrl = getOrderUrl + '/' + this.user.id + '?searchInvoice=' + this.searchInvoice;
      }else if(this.dateFilter !== ''){ // 2.Filter Tanggal dari Semua Pesanan v
        formatUrl = getOrderUrl + '/' + this.user.id + '?dateFilter=' + this.dateFilter;
      }else{ // 1.Lihat Semua Pesanan v
        formatUrl = getOrderUrl + '/' + this.user.id;
      }

      axios.get( formatUrl, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {

            this.$q.loading.hide()

            //this.orderData = response.data.data;
            for(let i=0; i<response.data.data.length; i++){
              this.orderData.push({
                id: response.data.data[i].id,
                invoice: response.data.data[i].invoice,
                status: response.data.data[i].status,
                grand_total: response.data.data[i].grand_total,
                created_at: response.data.data[i].created_at,
                detail_customer: [],
              });

              axios.get(showCustomerUrl + '/' + response.data.data[i].customer_address_id, { headers: getHeader() }).then(response => {

                this.orderData[i].detail_customer.push({
                  customer_name: response.data.data.customer_name,
                });

              }).catch(error => {
                if (error.response) {
                  console.log(error.response)
                }
              })

            }
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
    goBack() {
      this.$router.go(-1);
    },
    changeStatus(status){
      if(status === 'all'){
        this.orderStatus = '';
      }else{
        this.orderStatus = status;
      }
      this.getOrder();
    }
  }
}
</script>
