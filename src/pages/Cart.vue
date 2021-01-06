<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="mobile-layout-on-desktop">
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
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0">
            <template v-if="totalItem > 0">
              <div class="row q-px-lg q-py-sm" v-for="(item, index) in items" :key="index">
                <div class="col-3">
                  <img :src="item.product_image" width="100%" style="border: 1px solid whitesmoke" />
                </div>
                <div class="col-7" style="padding: 0 15px">
                  <h5 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; line-height: 16px">{{ item.product_name }}</h5>
                  <h6 style="margin: -15px 0; font-size: 12px;"><span v-for="(opt, i) in item.options" :key="i">{{opt.option + ': ' + opt.value}} </span></h6>
                  <h6 style="margin: -15px 0; font-size: 12px;">Qty {{ item.qty }} x Rp{{ formatPrice(item.price) }}</h6>
                  <h6 style="margin: -15px 0; font-size: 12px;" class="text-orange-8">Rp{{ formatPrice(item.qty * item.price) }}</h6>
                </div>
                <div class="col-2 text-right self-center">
                  <q-btn flat round icon="create" style="font-size: 10px" @click="editQty(item.id, item.price, item.qty)" />
                  <q-btn flat color="red" round icon="delete_forever" style="font-size: 10px" @click="removeProduct(item.product_id, item.product_sku_id, item.qty, item.price)" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="row q-pa-lg">
                <div class="col">
                  <center>
                    <!-- <img src="http://balitakita.com/packages/yusidabcs/checkout/img/empty-cart-vector.png" width="85" /> -->
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
                <h6 style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold" class="text-red">Rp{{ formatPrice(subTotal) }}</h6>
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
                <h6 style="font-size: 28px; margin: 8px 0; font-family: 'Open Sans'; font-weight: bold">Rp{{formatPrice(totalProfit)}}</h6>
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
      <q-dialog v-model="editQtyDialog">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-card-section class="row items-center">
            <h6 style="margin: 0; font-size: 16px">Ubah Qty</h6>
            <q-space />
            <q-btn icon="close" size="sm" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <q-input type="number" outlined dense color="orange-8" label="Qty" v-model="qty" />
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-px-md q-pb-md">
            <q-btn flat class="bg-orange-8 text-white text-capitalize full-width" @click="updateQty">Ubah</q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { getCartUrl, catalogProductUrl, removeProductCartUrl, totalCartItemUrl, updateCartQtyUrl, getHeader } from 'src/config';
// Loading
import { QSpinnerPuff } from 'quasar'

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
      // Total Count Cart Item
      totalCartItem: null,
      editQtyDialog: false,
      // Edit Qty
      qty: null,
      cartID: null,
      cartPrice: null,
      cartQty: null,
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
  },
  mounted () {
    this.getCartData();
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
    getCartData () {

      this.$q.loading.show({
        spinner: QSpinnerPuff,
        spinnerColor: 'black',
        spinnerSize: 50,
        backgroundColor: 'grey',
        message: '<b>Mohon Tunggu..</b>',
        messageColor: 'black'
      })

      this.cartData = [];
      this.items = [];
      this.totalProfit = 0;
      this.totalItem = 0;

      axios.get( getCartUrl + '/' + this.user.id, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {

            this.$q.loading.hide()

            this.cartData = response.data.data;

            for(let i=0; i<this.cartData.cart_detail.length; i++){
              // alert(this.cartData.cart_detail[i].product_id);
              axios.get(catalogProductUrl + '/' + this.cartData.cart_detail[i].product_id, { headers: getHeader() } )
                .then(response => {

                  let product_name = response.data.data.product_name;
                  let product_image = response.data.data.featured_image;
                  let qty = this.cartData.cart_detail[i].qty;
                  let product_id = this.cartData.cart_detail[i].product_id;
                  let id = this.cartData.cart_detail[i].id;
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
                            id: id,
                            product_id: product_id,
                            product_name: product_name,
                            product_image: product_image,
                            price: response.data.data.price - (response.data.data.price * reseller_discount / 100),
                            options: JSON.parse(this.cartData.cart_detail[i].options),
                            qty: qty,
                            product_sku_id: this.cartData.cart_detail[i].product_sku_id,
                        });

                        this.totalProfit += (response.data.data.price * reseller_discount / 100) * qty;
                        this.totalItem += qty;

                      }).catch(error => {

                        if (error.response) {
                          console.log(error.response)
                        }

                      })

                  }else{

                    this.items.push({
                        id: id,
                        product_id: product_id,
                        product_name: product_name,
                        product_image: product_image,
                        price: response.data.data.price - (response.data.data.price * reseller_discount / 100),
                        qty: qty,
                        product_sku_id: this.cartData.cart_detail[i].product_sku_id,
                    });

                    this.totalProfit += (response.data.data.price * reseller_discount / 100) * qty;
                    this.totalItem += qty;

                  }

                }).catch(error => {

                  if (error.response) {
                    console.log(error.response)
                  }

                })

            }

          }

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
    removeProduct(id, product_sku_id, qty, price) {
        let sku_id = null;

        if(product_sku_id !== null){
          sku_id = product_sku_id;
        }else{
          sku_id = 0;
        }
          
        axios.delete( removeProductCartUrl + '/' + this.user.id + '/' + id + '/' + sku_id + '/' + qty + '/' + price, { headers: getHeader() } )
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.getCartData();

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
    },
    editQty (id, price, qty) {
      this.cartID = id;
      this.cartPrice = price;
      this.cartQty = qty;

      this.qty = qty;

      // Load editQtyDialog
      this.editQtyDialog = true;
    },
    updateQty () {
      let currentQty = this.cartQty;
      let newQty = this.qty;
      let currentPrice = this.cartPrice * currentQty;
      let newPrice = this.cartPrice * newQty;
      let totalAmount = this.subTotal;
      let totalKurangi = totalAmount - currentPrice;
      let totalAkhir = totalKurangi + newPrice;

      console.log('Harga Lama : ' + currentPrice);
      console.log('Harga Baru : ' + newPrice);

      console.log('Total Setelah Dikurangi : ' + totalKurangi);
      console.log('Total Akhir : ' + totalAkhir);

      let updateData = new FormData();

      updateData.set('cart_id', this.cartID);
      updateData.set('current_price', currentPrice);
      updateData.set('new_price', newPrice);
      updateData.set('qty', newQty);

      // Update Qty
      axios.post( updateCartQtyUrl, updateData, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            console.log(response.data.data);
            this.getCartData();
            this.qty = null;

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
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

      // close Dialog
      this.editQtyDialog = false;
    }
  }
}
</script>

<style>
</style>
