<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <!-- <q-toolbar-title>
          Distrodakwah
        </q-toolbar-title> -->
        <q-btn 
          flat
          dense
          round
        >
          <q-icon name="notifications" />      
        </q-btn>

        <q-space />

        <img src="~/assets/images/components/logo-distrodakwah.png" width="50%" />
        <!-- <div class="row no-wrap">
          <center>
            
            <q-input type="text" dense outlined color="amber-8" bg-color="white" placeholder="Mau Belanja Apa Hari Ini?" style=" margin: 8px 0px">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </center>
        </div> -->

        <q-space />

        <q-btn 
          flat
          dense
          round
          dropdown
          to="/"
        >
          <q-icon name="search" />     
        </q-btn>
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
          <q-route-tab
            icon="verified_user"
            to="/storefront"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Support</span></q-route-tab>
        </q-tabs>
      </center>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page>
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white; margin-bottom: 10px">
            <!-- swiper -->
            <div style="padding: 20px 0 0 15px">
              <swiper :options="swiperOption">
                <swiper-slide v-for="(slider, index) in dataSlider" :key="index"><img :src="slider.slider_image" width="100%"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="row q-pa-xs">
              <div class="col">
                <!-- <h5 class="promo-text">Promo</h5> -->
              </div>
              <div class="col text-right">
                <h5 class="link-text text-orange-9" style="margin-bottom: 0">Lihat Semua</h5>
              </div>
            </div>
          </div>
          <div style="background-color: white; margin-bottom: 10px">
            <div class="row q-pa-xs">
              <div class="col">
                <h5 class="promo-text">Kategori</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-orange-8">Lihat Semua</h5>
              </div>
            </div>
            <div class="row" style="padding: 0px 10px 15px 10px">
              <div class="col-4" v-for="(category, index) in dataCategory" :key="index">
                <div style="background-color: white; border: 2px solid #e0e0e0; border-radius: 10px; margin: 5px">
                  <h4 class="category-title">{{category.category_name}}</h4>
                </div>
              </div>
            </div>
          </div>
          <div style="background-color: white; margin-bottom: 10px; padding-bottom: 15px">
            <div class="row q-pa-xs">
              <div class="col">
                <h5 class="promo-text">Produk Baru</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-orange-8">Lihat Semua</h5>
              </div>
            </div>
            <div class="row q-px-md" style="padding: 5px 10px 10px 10px">
              <div class="col">
                <swiper :options="swiperProductListOption">
                  <swiper-slide v-for="(product, index) in dataProduct" :key="index">
                    <q-card class="my-card bg-grey-2" style="margin: 0 5px" flat bordered>
                      <transition
                        appear
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                      >
                        <img :src="product.featured_image" style="width: 100%" v-show="featuredImageShow == true">
                      </transition>

                      <center>
                        <q-spinner
                          color="dark"
                          size="2em"
                          v-show="innerLoading == true"
                          style="margin: 10px 0"
                        />
                      </center>

                      <q-card-section style="padding: 10px 16px 16px 16px">
                        <center>
                          <div style="font-family: 'Open Sans';font-size: 12px; font-weight: bold; margin-bottom: 5px">{{product.product_name}}</div>
                          <div class="text-black" style="font-size: 10px;">Keuntungan Anda :</div>
                          <div class="q-px-sm q-py-xs bg-green">
                            <div class="text-white" style="font-weight: bolder; margin-top:0" v-if="user.role.id === 9">{{'Rp' + formatPrice(product.category_detail.tier_1_discount)}}</div>
                            <div class="text-white" style="font-weight: bolder; margin-top:0" v-else-if="user.role.id === 8">{{'Rp' + formatPrice(product.category_detail.tier_2_discount)}}</div>
                          </div>
                        </center>
                      </q-card-section>

                      <q-card-section>
                        <q-btn :to="'/detail/' + product.id" flat class="bg-orange-8 text-white" style="padding-top: 0px; padding-bottom: 0px"><span style="text-transform: capitalize;">Beli Sekarang</span></q-btn>
                      </q-card-section>

                    </q-card>
                  </swiper-slide>
                  <div class="swiper-product-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </div>
          <div style="background-color: white; margin-bottom: 10px; padding-bottom: 15px">
            <div class="row q-pa-xs">
              <div class="col">
                <h5 class="promo-text">Produk Laris</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-orange-8">Lihat Semua</h5>
              </div>
            </div>
            <div class="row q-px-md" style="padding: 5px 10px 15px 10px">
              <div class="col">
                <swiper :options="swiperProductListOption">
                  <swiper-slide v-for="(product, index) in dataProduct" :key="index">
                    <q-card class="my-card bg-grey-2" style="margin: 0 5px" flat bordered>
                      <transition
                        appear
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                      >
                        <img :src="product.featured_image" style="width: 100%" v-show="featuredImageShow == true">
                      </transition>

                      <center>
                        <q-spinner
                          color="dark"
                          size="2em"
                          v-show="innerLoading == true"
                          style="margin: 10px 0"
                        />
                      </center>

                      <q-card-section style="padding: 10px 16px 16px 16px">
                        <center>
                          <div style="font-family: 'Open Sans';font-size: 12px; font-weight: bold; margin-bottom: 5px">{{product.product_name}}</div>
                          <div class="text-black" style="font-size: 10px;">Keuntungan Anda :</div>
                          <div class="q-px-sm q-py-xs bg-green">
                            <div class="text-white" style="font-weight: bolder; margin-top:0" v-if="user.role.id === 9">{{'Rp' + formatPrice(product.category_detail.tier_1_discount)}}</div>
                            <div class="text-white" style="font-weight: bolder; margin-top:0" v-else-if="user.role.id === 8">{{'Rp' + formatPrice(product.category_detail.tier_2_discount)}}</div>
                          </div>
                        </center>
                      </q-card-section>

                      <q-card-section>
                        <q-btn :to="'/detail/' + product.id" flat class="bg-orange-8 text-white" style="padding-top: 0px; padding-bottom: 0px"><span style="text-transform: capitalize;">Beli Sekarang</span></q-btn>
                      </q-card-section>

                    </q-card>
                  </swiper-slide>
                  <div class="swiper-product-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import axios from 'axios';
import {apiDomain, catalogCategoryUrl, catalogProductUrl, identitySliderUrl, getHeader} from 'src/config';

export default {
  data () {
    return {
      // Slider Section
      dataSlider: [],
      // Category Section
      dataCategory: [],
      // Product Section
      dataProduct: [],
      // Slider Section
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      swiperProductListOption: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-product-pagination',
          clickable: true
        }
      },
      // Loading
      innerLoading: false,
      featuredImageShow: true,
      // user
      user: [],
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
  },
  mounted () {
    this.getCategory();
    this.getProduct();
    this.getSlider();
  },
  methods: {
    getCategory () {

      axios.get( catalogCategoryUrl, { headers: getHeader() } )
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
    getProduct () {
      
      this.innerLoading = true;
      this.featuredImageShow = false;

      axios.get( catalogProductUrl, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataProduct = response.data.data;
            setTimeout(() => {
              this.innerLoading = false;
              this.featuredImageShow = true;
            }, 1000);
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    getSlider () {

      axios.get( identitySliderUrl, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataSlider = response.data.data;
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
  },
  components: { swiper, swiperSlide }
}
</script>

<style>
  .promo-text{
    font-family: 'Open Sans';
    font-size: 13px;
    font-weight: bold;
    margin: 0;
    padding-left: 12px;
  }
  .link-text{
    font-family: 'Open Sans';
    font-size: 13px;
    margin: 0;
    padding-right: 10px;
  }
  .swiper-slide{
    width: 85%;
  }
  .category-title{
    font-size: 13px;
    margin: 0;
    text-align: center;
    text-transform: capitalize;
    line-height: 15px;
    font-weight: 400;
    padding: 10px 0px;
  }
</style>
