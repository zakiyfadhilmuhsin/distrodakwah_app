<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn
          flat
          round
          dense
          to="/shipping"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Ringkasan Pesanan</span></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black mobile-layout-on-desktop" style="border-top: 2px solid #eee">
      <q-toolbar class="bg-white text-black">
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white full-width"
          @click="checkout"
        >
          Lakukan Pembayaran
        </q-btn>
      </q-toolbar>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-white">
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white; margin-bottom: 5px; padding: 13px 0 10px 0">
            <div class="row q-px-md">
              <div class="col">
                <h5 class="title-text">Rincian Pesanan</h5>
              </div>
              <div class="col text-right self-center">
                <q-btn to="/cart" flat dense color="white" class="text-red text-capitalize" style="font-size: 10px; font-weight: 400">Ubah Pesanan</q-btn>
              </div>
            </div>
            <br/>
            <template v-if="totalItem > 0">
              <div class="row q-px-lg" v-for="(item, index) in items" :key="index">
                <div class="col-3">
                  <img :src="item.product_image" width="100%" style="border: 1px solid whitesmoke" />
                </div>
                <div class="col-6" style="padding: 0 15px">
                  <h5 style="margin: 0; font-size: 14px; font-weight: bold; line-height: 16px">{{ item.product_name }}</h5>
                  <h6 style="margin: 5px 0 0 0; font-size: 12px; line-height: 14px"><span v-for="(opt, i) in item.options" :key="i">{{opt.option + ': ' + opt.value}} </span></h6>
                  <h6 style="margin: -5px 0 0 0; font-size: 12px;">Qty {{ item.qty }} x Rp{{ formatPrice(item.price) }}</h6>
                </div>
                <div class="col-3 text-right">
                  <h6 style="margin: 0; font-size: 12px;" class="text-black">Rp{{ formatPrice(item.qty * item.price) }}</h6>
                </div>
              </div>
            </template>
            <!-- {{ skuProduct }} -->
            <div class="row q-px-lg">
              <div class="col">
                <h5 class="title-text">Subtotal</h5>
              </div>
              <div class="col text-right">
                <h6 style="margin: 0; font-size: 12px;" class="text-black">Rp{{ formatPrice(cartData.total_amount) }}</h6>
              </div>
            </div>
          </div>
          <div style="background-color: white; margin-bottom: 5px; padding: 13px 0 10px 0">
            <div class="row q-px-md">
              <div class="col">
                <h5 class="title-text">Ongkos Kirim</h5>
              </div>
              <div class="col text-right self-center">
                <q-btn to="/shipping" flat dense color="white" class="text-red text-capitalize" style="font-size: 10px; font-weight: 400">Ubah Ekspedisi</q-btn>
              </div>
            </div>
            <br/>
            <div class="row q-px-sm">
              <div class="col">
                <q-list dense>
                  <q-item>
                    <q-item-section side v-if="cartData.courier_name === 'Jalur Nugraha Ekakurir (JNE)'"><img src="~/assets/images/components/ekspedisi/jne.png" width="65" /></q-item-section>
                    <q-item-section side v-else-if="cartData.courier_name === 'J&T Express'"><img src="~/assets/images/components/ekspedisi/jnt.png" width="65" /></q-item-section>
                    <q-item-section side v-else-if="cartData.courier_name === 'POS Indonesia (POS)'"><img src="~/assets/images/components/ekspedisi/pos.png" width="65" /></q-item-section>

                    <q-item-section>{{ cartData.courier_name + ' ' + cartData.service_name }}</q-item-section>
                    <q-item-section side><h6 style="margin: 0; font-size: 12px;" class="text-black text-right">Rp{{ formatPrice(cartData.shipment_fee) }}</h6></q-item-section>
                  </q-item>
                </q-list>
                <!-- <hr style="border: 1px solid #eee" /> -->
              </div>
            </div>
          </div>
          <div style="background-color: white;; padding: 13px 0 10px 0">
            <!-- <div class="row q-px-lg">
              <div class="col">
                <h5 class="title-text">Donasi</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-red">Ubah Donasi</h5>
              </div>
            </div>
            <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
              <div class="col-xs-8">
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> melalui lembaga ACT</h6>
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Donasi <span class="text-bold">Rp300</span> untuk Rumah Quran</h6>
              </div>
              <div class="col-xs-4 text-right">
                <h6 style="margin: 0; font-size: 12px;" class="text-black">Rp600</h6>
              </div>
            </div>
            <center>
              <hr style="border: 1px solid #eee; width: 90%;" />
            </center> -->
            <div class="row q-px-lg">
              <div class="col">
                <h5 style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold">Total</h5>
              </div>
              <div class="col text-right">
                <h5 style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold">Rp{{ formatPrice(cartData.grand_total) }}</h5>
              </div>
            </div>
            <hr style="border: none; height: 30px" />
            <div class="row q-px-lg">
              <div class="col">
                <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px; text-align: center;">Jika kamu sudah yakin dengan pesanan ini silahkan tekan tombol <b>Lakukan Pembayaran</b></h6>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { getCartUrl, catalogProductUrl, postToOrderUrl, destroyCart, inventoryStockUrl, getHeader } from 'src/config';

export default {
  data () {
    return {
      cartData: [],
      items: [],
      totalItem: 0,
      subTotal: null,
      addressSelect: true,
      ekspedisiSelected: '',
      skuProduct: [],
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
      this.skuProduct = [];

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
                    reseller_discount = response.data.data.reseller_exclusive_price;
                  }else if(this.user.role.id === 8){
                    reseller_discount = response.data.data.reseller_pro_price;
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
                            price: response.data.data.price - (response.data.data.price * reseller_discount / 100),
                            options: JSON.parse(this.cartData.cart_detail[i].options),
                            qty: qty,
                        });

                        this.skuProduct.push({
                          sku: response.data.data.sku,
                          qty: qty,
                        });

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
                        price: response.data.data.price - (response.data.data.price * reseller_discount / 100),
                        qty: qty,
                    });

                    this.skuProduct.push({
                      sku: response.data.data.sku,
                      qty: qty,
                    });

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
    checkout () {

        let postOrder = new FormData();
        postOrder.set('total_amount', this.cartData.total_amount);
        postOrder.set('total_weight', this.cartData.total_weight);
        postOrder.set('grand_total', this.cartData.grand_total);
        postOrder.set('shipment_fee', this.cartData.shipment_fee);
        postOrder.set('courier_name', this.cartData.courier_name);
        postOrder.set('service_name', this.cartData.service_name);
        postOrder.set('customer_address_id', this.cartData.customer_address_id);
        postOrder.set('customer_id', this.cartData.customer_id);
        postOrder.set('customer_name', this.cartData.customer_name);
        postOrder.set('customer_email', this.cartData.customer_email);
        postOrder.set('customer_phone', this.cartData.customer_phone);
        postOrder.set('cart_details', JSON.stringify(this.cartData.cart_detail, 2, null));

        axios.post( postToOrderUrl, postOrder, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.$router.push({ path:'/invoice', query: { orderID: response.data.data.id } });

              // Empty Cart
              axios.delete( destroyCart + '/' + this.cartData.id, { headers: getHeader() } )
                .then(response => {
                  console.log(response)
                })
                .catch(error => {
                  if (error.response) {
                    console.log(error.response)
                  }
                })


              // Add Keep Stock
              let skuProductPost = new FormData();

              skuProductPost.set('sku', JSON.stringify(this.skuProduct, 2, null));

              axios.post( inventoryStockUrl + '/addKeepStock', skuProductPost, { headers: getHeader() } )
                .then(response => {
                  console.log(response)
                })
                .catch(error => {
                  if (error.response) {
                    console.log(error.response)
                  }
                })


              // Reduce Stock Product //

              // axios.post( inventoryStockUrl + '/reduceStock', skuProductPost, { headers: getHeader() } )
              //   .then(response => {
              //     console.log(response)
              //   })
              //   .catch(error => {
              //     if (error.response) {
              //       console.log(error.response)
              //     }
              //   })

              // End Reduce Stock Product //

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
