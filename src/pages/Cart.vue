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
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Keranjang Belanja</span></q-toolbar-title>
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
          ><span style="font-size: 10px;">Home</span></q-route-tab>
          <q-route-tab
            icon="receipt"
            to="/orderList"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Order</span></q-route-tab>
          <q-route-tab
            icon="local_mall"
            to="/cart"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Cart</span></q-route-tab>
          <q-route-tab
            icon="account_circle"
            to="/dashboard"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Profile</span></q-route-tab>
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
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0">
            <template v-if="totalItem > 0">
              <div class="row q-px-lg" v-for="(item, index) in items" :key="index">
                <div class="col-3">
                  <img :src="item.product_image" width="100%" style="border: 1px solid whitesmoke" />
                </div>
                <div class="col-7" style="padding: 0 15px">
                  <h5 style="margin: 0; font-size: 14px; font-weight: bold">{{ item.product_name }}</h5>
                  <h6 style="margin: -15px 0; font-size: 12px;"><span v-for="(opt, i) in item.options" :key="i">{{opt.option + ': ' + opt.value}} </span></h6>
                  <h6 style="margin: -15px 0; font-size: 12px;">Qty {{ item.qty }} x Rp{{ formatPrice(item.price) }}</h6>
                  <h6 style="margin: -15px 0; font-size: 12px;" class="text-orange-8">Rp{{ formatPrice(item.qty * item.price) }}</h6>
                </div>
                <div class="col-2 text-right self-center">
                  <q-btn flat round icon="delete_forever" style="font-size: 10px" @click="removeProduct(item.product_id, item.qty, item.price)" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="row q-pa-lg">
                <div class="col">
                  <center>
                    <img src="http://balitakita.com/packages/yusidabcs/checkout/img/empty-cart-vector.png" width="85" />
                    <div>Yah, Keranjang Masih Kosong.. Belanja Yuk!</div>
                  </center>
                </div>
              </div>
            </template>
            <!-- {{items}} -->
          </div>
          <!-- <div style="background-color: white; margin-bottom: 5px">
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
          </div> -->
          <div style="background-color: white; margin-bottom: 5px">
            <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
              <div class="col">
                <h6 style="font-size: 16px; margin: 0; font-family: 'Open Sans'">Total Item</h6>
                <h6 style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold">{{ totalItem }}</h6>
              </div>
              <div class="col">
                <h6 style="font-size: 16px; margin: 0; font-family: 'Open Sans'">Subtotal</h6>
                <h6 style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold">Rp{{ formatPrice(subTotal) }}</h6>
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
                <h6 style="font-size: 28px; margin: 8px 0; font-family: 'Open Sans'; font-weight: bold" class="text-red">Rp{{formatPrice(totalProfit)}}</h6>
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Jangan lupa sedekah ya :)</h6>
              </div>
            </div>
          </div>
          <!-- <div style="background-color: white; margin-bottom: 5px">
            <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
              <div class="col">
                <q-checkbox keep-color color="orange-8" dense v-model="donasi_act"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> melalui lembaga ACT</h6></q-checkbox>
                <q-checkbox keep-color color="orange-8" dense v-model="donasi_rq"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> untuk Rumah Quran</h6></q-checkbox>
              </div>
            </div>
          </div> -->
        </div>
        <div class="row bg-white q-pa-md">
          <div class="col">
            <q-btn
              flat
              class="bg-orange-8 text-white full-width"
              @click="setShippingAddress"
            >
              Atur Alamat Pengiriman
            </q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { getCartUrl, catalogProductUrl, removeProductCartUrl, getHeader } from 'src/config';

export default {
  data () {
    return {
      // Data Keranjang/Cart
      cartData: [],
      items: [],
      totalItem: 0,
      subTotal: null,
      totalProfit: 0,
      // Donasi
      donasi_act: false,
      donasi_rq: false,
      // User
      user: null,
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
  },
  mounted () {
    this.getCartData();
  },
  methods: {
    getCartData () {
      this.cartData = [];
      this.items = [];
      this.totalProfit = 0;

      axios.get( getCartUrl + '/' + this.user.id, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {

            this.cartData = response.data.data;

            for(let i=0; i<this.cartData.cart_detail.length; i++){
              // alert(this.cartData.cart_detail[i].product_id);
              axios.get(catalogProductUrl + '/' + this.cartData.cart_detail[i].product_id, { headers: getHeader() } )
                .then(response => {

                  let product_name = response.data.data.product_name;
                  let product_image = response.data.data.featured_image;
                  let qty = this.cartData.cart_detail[i].qty;
                  let product_id = this.cartData.cart_detail[i].product_id;
                  let reseller_discount = null;
                  if(this.user.role.id === 9){
                    reseller_discount = response.data.data.category_detail.tier_1_discount;
                  }else if(this.user.role.id === 8){
                    reseller_discount = response.data.data.category_detail.tier_2_discount;
                  }

                  if(this.cartData.cart_detail[i].product_sku_id !== null){

                    axios.get(catalogProductUrl + '/' + this.cartData.cart_detail[i].product_id + '/' + this.cartData.cart_detail[i].product_sku_id, { headers: getHeader() } )
                      .then(response => {

                        // let options = JSON.parse(this.cartData.cart_detail[i].options);
                        // for(var opt=0; opt<options.length; opt++){
                        //   console.log(options[opt].option + 'adalah' + options[opt].value);
                        // }
                        
                        this.items.push({
                            product_id: product_id,
                            product_name: product_name,
                            product_image: product_image,
                            price: response.data.data.price - reseller_discount,
                            options: JSON.parse(this.cartData.cart_detail[i].options),
                            qty: qty,
                        });

                        this.totalProfit += reseller_discount * qty;

                      }).catch(error => {

                        if (error.response) {
                          console.log(error.response)
                        }

                      })

                  }else{

                    this.items.push({
                        product_id: product_id,
                        product_name: product_name,
                        product_image: product_image,
                        price: response.data.data.price - reseller_discount,
                        qty: qty,
                    });

                    this.totalProfit += reseller_discount * qty;

                  }

                }).catch(error => {

                  if (error.response) {
                    console.log(error.response)
                  }

                })

            }

          }

          this.totalItem = this.cartData.cart_detail.length;
          this.subTotal = this.cartData.total_amount;

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
    removeProduct(id, qty, price) {

        axios.delete( removeProductCartUrl + '/' + this.user.id + '/' + id + '/' + qty + '/' + price, { headers: getHeader() } )
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.getCartData();
            }
          }).catch(error => {
            if (error.response) {
              console.log(error.response)
            }
          })

    },
    setShippingAddress () {
      if(this.totalItem > 0){
        this.$router.push('/shipping');
      }else{
        alert('Keranjang Belanja Masih Kosong!');
      }
    }
  }
}
</script>

<style>
</style>
