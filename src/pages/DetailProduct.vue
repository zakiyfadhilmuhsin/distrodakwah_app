<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal class="mobile-layout-on-desktop transparent no-shadow">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          to="/"
          style="background-color: rgba(0, 0, 0, 0.15)"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-space />
        <!-- <q-btn
          flat
          dense
          round
          icon="shopping_cart"
        >
          <q-badge color="amber-5" class="text-black" floating>3</q-badge>
        </q-btn>
        <q-btn
          flat
          dense
          round
        >
          <q-icon name="share" color="white" />
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black mobile-layout-on-desktop" style="border-top: 2px solid #eee">
      <q-toolbar class="bg-white text-black">
        <span v-if="dataProduct.length !== 0">
          <h4 style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold" v-if="user.role.id === 9">KAMU UNTUNG 
            <span class="text-green" v-if="this.productVariant.length > 0">{{'Rp' + formatPrice( Number(productVariant[0].price * dataProduct.reseller_exclusive_price / 100) * Number(this.qty) )}}</span>
            <span class="text-green" v-else>{{'Rp' + formatPrice( Number(dataProduct.price * dataProduct.reseller_exclusive_price / 100) * Number(this.qty) )}}</span>
          </h4>
          <h4 style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold" v-else-if="user.role.id === 8">KAMU UNTUNG 
            <span class="text-green" v-if="this.productVariant.length > 0">{{'Rp' + formatPrice( Number(productVariant[0].price * dataProduct.reseller_pro_price / 100) * Number(this.qty) )}}</span>
            <span class="text-green" v-else>{{'Rp' + formatPrice( Number(dataProduct.price * dataProduct.reseller_pro_price / 100) * Number(this.qty) )}}</span>
          </h4>
        </span>
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white"
          @click="addToCart"
        >
          Beli Sekarang
        </q-btn>
      </q-toolbar>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop bg-white">
      <q-page>
        <template v-if="dataProduct.length !== 0">
          <div style="margin-bottom: 10px; margin-top: -50px" v-if="dataProduct.image_gallery.length !== 0">
            <carousel :items="1" :nav="false" :loop="true" :autoplay="true">
                <img :src="gallery.image" v-for="(gallery, i) in dataProduct.image_gallery" :key="i">
            </carousel>
          </div>
          <div style="margin-bottom: 10px; margin-top: -50px" v-else>
            <img :src="dataProduct.featured_image" width="100%" />
          </div>
        </template>
        <div class="row q-px-md">
          <div class="col">
            <h5 class="category-text">Kategori : <span class="text-red">{{dataCategory.category_name}}</span></h5>
            <h5 class="category-text">Brand : <span class="text-red">{{dataBrand.brand_name}}</span></h5>
            <h4 class="product-title-text">{{dataProduct.product_name}}</h4>
            <div style="font-size: 12px; margin: 0; line-height: 14px; font-weight: bold" v-if="stockReady !== null">Stok Tersedia : <span class="text-red" v-if="stockReady === 0">0 (Stok Kosong)</span><span v-else>{{ stockReady }}</span></div>

            <hr style="margin: 15px 0" />
            
            <template v-if="dataProduct.product_type === 'Variant Product'">
              <!-- Pilih Warna & Ukuran -->
              <div class="row" style="margin-bottom: 7px" v-for="(opt, index) in inputOptions" :key="index">
                <div class="col-xs-4">
                  <h5 class="options-title">Pilih {{opt.optionTitle}}</h5>
                </div>
                <div class="col-xs-8">
                  <template v-if="opt.optionValue.length > 3">
                    <q-select 
                      dense
                      outlined 
                      color="orange-8" 
                      options-dense
                      v-model="opt.optionModel"
                      :options="opt.optionValue"
                      option-value="value"
                      option-label="label"
                      emit-value
                      map-options
                      @input="getProductVariant"
                    />
                  </template>
                  <template v-else-if="opt.optionValue.length <= 3">
                    <q-btn-toggle
                      v-model="opt.optionModel"
                      unelevated
                      toggle-color="orange-8"
                      color="white"
                      text-color="orange-8"
                      :options="opt.optionValue"
                      style="border: 1px solid #f57c00"
                      @input="getProductVariant"
                    />
                  </template>
                </div>
              </div>
              <!-- <div class="row" style="margin-bottom: 7px">
                <div class="col-xs-4">
                  <h5 class="options-title">Pilih Ukuran</h5>
                </div>
                <div class="col-xs-8">
                  <q-select dense outlined color="orange-8" options-dense v-model="sizeSelected" :options="sizeOptions" />
                </div>
              </div> -->
            </template>
            <div class="row">
              <div class="col-xs-4">
                <h5 class="options-title">Qty</h5>
              </div>
              <div class="col-xs-8">
                <q-input type="number" dense outlined color="orange-8" options-dense v-model="qty" style="width: 85px" :rules="[ val => val > 0 || 'Minimum 1 pcs' ]" lazy-rules />
              </div>
            </div>
            <br/>

            <!-- Informasi Harga -->
            <template v-if="this.dataProduct.product_type === 'Simple Product' || this.productVariant.length > 0">
              <div class="row">
                <div class="col-xs-6">
                  <h5 class="price-title-small-text">Harga Konsumen</h5>
                </div>
                <div class="col-xs-6">
                  <h5 class="price-title-small-text">Harga Reseller</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <h5 class="price-detail-text" v-if="this.productVariant.length > 0">Rp{{formatPrice(productVariant[0].price)}}</h5>
                  <h5 class="price-detail-text" v-else>Rp{{formatPrice(dataProduct.price)}}</h5>
                </div>
                <div class="col-xs-6" v-if="user.role.id === 9">
                  <h5 class="price-detail-text text-green" v-if="this.productVariant.length > 0">Rp{{formatPrice(productVariant[0].price - (productVariant[0].price * dataProduct.reseller_exclusive_price / 100))}}</h5>
                  <h5 class="price-detail-text text-green" v-else>Rp{{formatPrice(dataProduct.price - (dataProduct.price * dataProduct.reseller_exclusive_price / 100) )}}</h5>
                </div>
                <div class="col-xs-6" v-else-if="user.role.id === 8">
                  <h5 class="price-detail-text text-green" v-if="this.productVariant.length > 0">Rp{{formatPrice(productVariant[0].price - (productVariant[0].price * dataProduct.reseller_pro_price / 100) )}}</h5>
                  <h5 class="price-detail-text text-green" v-else>Rp{{formatPrice(dataProduct.price - (dataProduct.price * dataProduct.reseller_pro_price / 100) )}}</h5>
                </div>
              </div>
            </template>
            <div class="row" v-if="user.role.id === 8 && dataProduct.length !== 0">
              <div class="col">
                <h4 class="upgrade-cta-text"><span class="text-black" style="text-decoration: underline;"><q-btn @click="upgrade" flat rounded size="sm" class="bg-green text-white">Upgrade Dulu Aja!</q-btn></span> Agar Dapat Harga <b>Rp{{formatPrice(dataProduct.price - (dataProduct.price * dataProduct.reseller_exclusive_price / 100) )}}</b></h4>
              </div>
            </div>

            <hr style="margin: 15px 0" />

            <div class="row">
              <div class="col">
                <div class="row" style="margin-bottom: 5px">
                  <div class="col">
                    <h4 class="price-title-small-text">Rincian Produk</h4>
                  </div>
                  <div class="col text-right" style="padding-top: 5px">
                    <q-btn flat class="bg-red text-white" size="sm" label="Salin" @click="doCopy" />
                  </div>
                </div>
                <p v-html="dataProduct.product_description"></p>
              </div>
            </div>
          </div>
        </div>
      </q-page>
      <q-dialog v-model="confirmOrder">
        <q-card style="width: 800px; max-width: 90vw;">
          <!-- <q-card-section class="row items-center">
            <h6 style="margin: 0; font-size: 16px">Berhasil Masuk Keranjang</h6>
            <q-space />
            <q-btn icon="close" size="sm" flat round dense v-close-popup />
          </q-card-section> -->

          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <center>
                  <img src="~/assets/images/components/shopping-cart.svg" width="80" />
                </center>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col text-center">
                <h5 style="font-size: 18px; margin: 0; line-height: 24px"><b>{{ dataProduct.product_name }}</b><br/> telah dimasukkan ke keranjang belanja Anda</h5>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col">
                <q-btn to="/cart" flat class="bg-orange-8 text-white full-width"><b>Cek Keranjang</b></q-btn>
                <h5 style="font-size: 10px; margin: 0; text-align: center;">Atau</h5>
                <q-btn to="/" outline color="black" class="full-width"><b>Lanjut Belanja</b></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>

  </q-layout>
</template>

<style>
  .category-text {
    font-size: 13px;
    font-family: 'Open Sans';
    color: black;
    margin: 0;
    line-height: 15px;
  }
  .product-title-text {
    font-size: 21px;
    font-family: 'Open Sans';
    color: black;
    font-weight: bold;
    margin: 2px 0 15px 0;
  }
  .options-title {
    font-size: 14px;
    font-family: 'Open Sans';
    color: black;
    font-weight: bold;
    margin: 2px 0;
  }
  .price-title-small-text {
    font-size: 14px;
    font-family: 'Open Sans';
    color: black;
    font-weight: bold;
    margin: 0;
  }
  .price-detail-text {
    font-size: 21px;
    font-family: 'Open Sans';
    color: black;
    font-weight: bold;
    margin-top: -5px;
    margin-bottom: 10px;
  }
  .upgrade-cta-text {
    background-color: #ffca28;
    padding: 5px;
    font-size: 12px;
    font-family: 'Open Sans';
    color: black;
    margin: 2px 0;
    text-align: center;
    border-radius: 5px;
  }
</style>

<script>
import Vue from 'vue'
import carousel from 'vue-owl-carousel'
import axios from 'axios';
import {apiDomain, catalogCategoryUrl, catalogBrandUrl, catalogProductUrl, addToCartUrl, inventoryStockUrl, getHeader} from 'src/config';
import VueClipboard from 'vue-clipboard2'
import { openURL } from 'quasar';

Vue.use(VueClipboard);

export default {
  name: 'DetailProduct',
  data () { 
    return {
      // Product
      dataProduct: [],
      dataCategory: [],
      dataBrand: [],
      productDesc: null,
      // Product Option
      inputOptions: [],
      optionValueSelected: [],
      qty: 1,
      // Product Variant
      productVariant: [],
      // Extra
      confirmOrder: false,
      user: null,
      stockReady: null,
      skuSelected: null,
    } 
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
  },
  mounted () {
    this.getProductDetail();
  },
  methods: {
    getProductDetail () {

        axios.get( catalogProductUrl + '/' + this.$route.params.id, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.dataProduct = response.data.data;

              this.category_name = this.categoryProduct(this.dataProduct.category_id);
              this.brand_name = this.brandProduct(this.dataProduct.brand_id);

              this.productDesc = this.dataProduct.product_description;

              if(this.dataProduct.product_type === 'Variant Product'){
                this.getInputOptions();
              }else{

                  axios.get(inventoryStockUrl + '/' + this.dataProduct.sku, {headers: getHeader()}).then(response => {

                      if(response.status === 200){
                        this.stockReady = response.data.data.stock_qty - response.data.data.keep_stock_qty;
                        this.skuSelected = response.data.data.sku;
                      }

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
    categoryProduct(id){

        axios.get( catalogCategoryUrl + '/' + id, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.dataCategory = response.data.data;
            }

          })
          .catch(error => {
            if (error.response) {
              console.log(error.response)
            }
          })

    },
    brandProduct(id){

        axios.get( catalogBrandUrl + '/' + id, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.dataBrand = response.data.data;
            }

          })
          .catch(error => {
            if (error.response) {
              console.log(error.response)
            }
          })

    },
    getInputOptions() {

        let productOptions = this.dataProduct.product_options;

        for(var i=0; i<productOptions.length; i++){

          //alert(productOptions[i].option_name);
          this.inputOptions.push({
            optionTitle: productOptions[i].option_name,
            optionModel: '',
            optionValue: [],
          });

          for(var val=0; val<productOptions[i].values.length; val++){

            this.inputOptions[i].optionValue.push({label: productOptions[i].values[val].value_name, value: productOptions[i].values[val].value_name});

          }

        }

    },
    getProductVariant () {

      // Get option value
      let val = [];
      let productOptionSelected = [];

      for(var key in this.inputOptions){

        productOptionSelected.push({
          option: this.inputOptions[key].optionTitle,
          value: this.inputOptions[key].optionModel,
        });
        val.push(this.inputOptions[key].optionModel);

      }

      let optionSelected = val.join('');

      this.optionValueSelected = JSON.stringify(productOptionSelected);

      // Check product sku with option value     
      let varPro = JSON.parse(JSON.stringify(this.dataProduct.product_variants));

      this.productVariant = [];
      //let storeVar = [];
      for (var i = 0, l = varPro.length; i < l; i++) {
          
          if(optionSelected.toUpperCase() === varPro[i].sku.replace(this.dataProduct.sku,'')){
            
            // store product variant
            this.productVariant.push({
              id: varPro[i].id,
              product_id: varPro[i].product_id,
              sku: varPro[i].sku,
              price: varPro[i].price,
              stock: varPro[i].stock,
            })

            axios.get(inventoryStockUrl + '/' + varPro[i].sku, {headers: getHeader()}).then(response => {

                if(response.status === 200){
                  this.stockReady = response.data.data.stock_qty - response.data.data.keep_stock_qty;
                  this.skuSelected = response.data.data.sku;
                }

              }).catch(error => {
                
                if (error.response) {
                  console.log(error.response)
                }
              
              })

          }

      }
    },
    addToCart () {

        // Cek stok dulu
        if(this.stockReady > 0 && this.qty <= this.stockReady){

            let postData = new FormData();

            if(this.dataProduct.product_type === 'Variant Product'){
              postData.set('product_id', this.dataProduct.id);
              // Post Data Product Variant
              postData.set('product_sku_id', this.productVariant[0].id);
              postData.set('product_sku', this.skuSelected);
              postData.set('product_sku_price', this.productVariant[0].price);
              postData.set('options', this.optionValueSelected);
              postData.set('qty', this.qty);
              postData.set('customer_id', this.user.id);
              postData.set('customer_name', this.user.name);
              postData.set('customer_email', this.user.email);
              postData.set('customer_phone', this.user.phone);
              if(this.user.role.id === 9){
                postData.set('reseller_discount', this.productVariant[0].price * this.dataProduct.reseller_exclusive_price / 100);
                postData.set('reseller_discount_rate', this.dataProduct.reseller_exclusive_price);
              }else if(this.user.role.id === 8){
                postData.set('reseller_discount', this.productVariant[0].price * this.dataProduct.reseller_pro_price / 100);
                postData.set('reseller_discount_rate', this.dataProduct.reseller_pro_price);
              }
            }else{
              postData.set('product_id', this.dataProduct.id);
              postData.set('product_sku_id', 0);
              postData.set('product_sku', this.skuSelected);
              postData.set('qty', this.qty);
              postData.set('customer_id', this.user.id);
              postData.set('customer_name', this.user.name);
              postData.set('customer_email', this.user.email);
              postData.set('customer_phone', this.user.phone);
              if(this.user.role.id === 9){
                postData.set('reseller_discount', this.dataProduct.price * this.dataProduct.reseller_exclusive_price / 100);
                postData.set('reseller_discount_rate', this.dataProduct.reseller_exclusive_price);
              }else if(this.user.role.id === 8){
                postData.set('reseller_discount', this.dataProduct.price * this.dataProduct.reseller_pro_price / 100);
                postData.set('reseller_discount_rate', this.dataProduct.reseller_pro_price);
              }
            }

            axios.post(addToCartUrl, postData, {headers: getHeader()}).then(response => {

              if(response.status === 200){
                //this.$q.notify({position: 'top', color: 'dark', message: 'Produk Ditambahkan ke Keranjang'});
                this.confirmOrder = true;
              }

            }).catch(error => {
              
              if (error.response) {
                console.log(error.response)
              }
            
            })
        
        }else{

            this.$q.notify({position: 'top', color: 'red', message: 'Maaf, Stok Belum Ada!'});

        }

    },
    // checkStock () {
    //     //this.stockReady = null;
        
    //     if(this.productVariant.length > 0){

    //         axios.get(inventoryStockUrl + '/' + this.productVariant[0].sku, {headers: getHeader()}).then(response => {

    //             if(response.status === 200){
    //               this.stockReady = response.data.data.stock_qty;
    //             }

    //           }).catch(error => {
                
    //             if (error.response) {
    //               console.log(error.response)
    //             }
              
    //           })

    //     }
        
    // },
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    doCopy: function () {
      var h2p = require('html2plaintext');

      this.$copyText(h2p(this.productDesc)).then(function (e) {
        alert('Copied')
        console.log(e)
      }, function (e) {
        alert('Can not copy')
        console.log(e)
      })
    },
    upgrade () {
      openURL('https://wa.me/6287821550989?text=Saya%20Ingin%20Upgrade%20Ke%20Member%20Ekslusif');
    }
  },
  components: { carousel, openURL }
}
</script>
