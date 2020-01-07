<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn
          flat
          round
          dense
          to="/dashboard"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Bantuan dan Support</span></q-toolbar-title>
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
        <div class="row order-list-section">
          <div class="col">
              <div class="q-px-lg">
                <iframe title="Feedback Form" class="freshwidget-embedded-form" id="freshwidget-embedded-form" src="https://distrodakwah.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&screenshot=No&attachFile=no" scrolling="yes" height="530px" width="100%" frameborder="0" ></iframe>
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
import { getOrderUrl, showCustomerUrl, totalCartItemUrl, getHeader } from 'src/config';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
// Loading
import { QSpinnerPuff } from 'quasar'

export default {
  name: 'OrderList',
  components: {
    flatPickr
  },
  data () {
    return {
      orderTab: 'waiting_payment',
      searchInvoice: '',
      dateFilter: '',
      orderData: [],
      // Total Count Cart Item
      totalCartItem: null,
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
    if(this.$route.params.status){
      this.orderTab = this.$route.params.status;
    }else{
      this.getOrder();
    }
  },
  mounted () {
    // Get Total Cart Item
    axios.get( totalCartItemUrl + '/' + this.user.id, { headers: getHeader() } )
      .then(response => {
        console.log(response)

        if (response.status === 200) {
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
    }
  }
}
</script>
