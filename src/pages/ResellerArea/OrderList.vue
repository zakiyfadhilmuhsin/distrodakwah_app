<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn
          flat
          round
          dense
          @click="goBack"
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
          ><span style="font-size: 10px;">Keranjang</span></q-route-tab>
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
        <div class="row order-list-section">
          <div class="col">
            <q-tabs
            v-model="orderTab"
            class="text-orange-8"
            dense
            style="text-transform: capitalize;"
            @input="getOrder"
            >
              <q-tab name="waiting_payment" label="Belum Dibayar" />
              <q-tab name="waiting_fo_verification" label="Menunggu Verifikasi" />
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
                <q-input dense outlined v-model="dateFilter" color="orange-8" placeholder="Filter Tanggal" style="margin-left: 5px; margin-bottom: 0" @input="getOrder">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="dateFilter" mask="YYYY-MM-DD" @input="getOrder" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            
            <div class="row q-pa-md">
              <div class="col">
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
              </div>
            </div>

          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
  .order-list-section{
    padding: 20px 0;
  }
</style>

<script>
import axios from 'axios';
import { getOrderUrl, showCustomerUrl, getHeader } from 'src/config';

export default {
  name: 'OrderList',
  data () {
    return {
      orderTab: 'waiting_payment',
      searchInvoice: '',
      dateFilter: '',
      orderData: [],
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
    this.getOrder();
  },
  methods: {
    getOrder () {
      
      this.orderData = [];

      let formatUrl = null;

      if(this.searchInvoice !== ''){
        formatUrl = getOrderUrl + '/' + this.user.id + '?status=' + this.orderTab + '&search=' + this.searchInvoice;
      }else if(this.dateFilter !== ''){
        formatUrl = getOrderUrl + '/' + this.user.id + '?status=' + this.orderTab + '&date=' + this.dateFilter;
      }else{
        formatUrl = getOrderUrl + '/' + this.user.id + '?status=' + this.orderTab;
      }

      axios.get( formatUrl, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
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
    }
  }
}
</script>
