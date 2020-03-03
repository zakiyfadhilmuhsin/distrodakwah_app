<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <!-- <q-toolbar-title>
          Distrodakwah
        </q-toolbar-title>-->
        <q-btn flat dense round>
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
        </div>-->

        <q-space />

        <q-btn flat dense round dropdown to="/search">
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
          >
            <span style="font-size: 10px;">Beranda</span>
          </q-route-tab>
          <q-route-tab
            icon="receipt"
            to="/orderList"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          >
            <span style="font-size: 10px;">Pesanan</span>
          </q-route-tab>
          <q-route-tab
            icon="local_mall"
            to="/cart"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          >
            <span style="font-size: 10px;">Keranjang</span>
            <q-badge color="red" text-color="white" floating v-if="totalCartItem !== null">
              <b>{{ totalCartItem }}</b>
            </q-badge>
          </q-route-tab>
          <q-route-tab
            icon="account_circle"
            to="/dashboard"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          >
            <span style="font-size: 10px;">Profil</span>
          </q-route-tab>
          <!-- <q-route-tab
            icon="verified_user"
            to="/storefront"
            style="text-transform: capitalize; font-family: 'Open Sans'"
          ><span style="font-size: 10px;">Support</span></q-route-tab>-->
        </q-tabs>
      </center>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page>
        <div class="bg-grey-3" style="height: 100%">
          <!-- Slider Promo -->
          <!-- <div style="background-color: white; margin-bottom: 10px" v-if="dataSlider.length !== 0">
            <div class="q-pt-md q-pb-xs">
              <carousel
                :autoplay="true"
                :nav="false"
                :items="1"
                :center="true"
                :loop="true"
                :stagePadding="40"
                :margin="10"
                :responsive="{0:{items:1,nav:false},600:{items:1,nav:false}}"
                :autoWidth="false"
              >
                <img v-for="(slider, index) in dataSlider" :key="index" :src="slider.slider_image" />
              </carousel>
            </div>
             <div class="row q-pa-xs">
              <div class="col">
                <h5 class="promo-text">Promo</h5>
              </div>
              <div class="col text-right">
                <h5 class="link-text text-orange-9" style="margin-bottom: 0">Lihat Semua</h5>
              </div>
            </div>  should be commented
          </div> -->
          <!-- <div style="background-color: white; margin-bottom: 10px">
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
          </div> -->
          <div style="background-color: white; margin-bottom: 10px; padding-bottom: 15px" v-for="(category, i) in dataProducts" :key="i">
            <div class="row q-pa-xs">
              <div class="col">
                <h5 class="promo-text">{{ category.category_name }}</h5>
              </div>
              <div class="col text-right">
                <router-link
                  :to="'/allProductBrand/' + category.category_name + '/' + category.id"
                  style="text-decoration: none;"
                >
                  <h5 class="link-text text-orange-8">Lihat Semua</h5>
                </router-link>
              </div>
            </div>
            <div class="row q-px-md" style="padding: 5px 10px 10px 10px">
              <div class="col">
                <swiper :options="swiperProductListOption">
                  <swiper-slide v-for="(product, index) in category.products" :key="index">
                    <q-card class="my-card bg-grey-2" style="margin: 0 5px" flat bordered>
  
                      <transition
                        appear
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                      >
                        <img
                          :src="product.featured_image"
                          style="width: 100%"
                          v-show="featuredImageShow == true"
                        />
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
                          <div
                            style="font-family: 'Open Sans';font-size: 12px; font-weight: bold; margin-bottom: 5px; height: 35px"
                          >{{ product.product_name }}</div>
                          <div class="text-black" style="font-size: 10px;">Keuntungan Anda :</div>
                          <div class="q-px-sm q-py-xs bg-green">
                            <div
                              class="text-white"
                              style="font-weight: bolder; margin-top:0"
                              v-if="user.role.id === 9"
                            >{{'Rp' + formatPrice(product.product_variants[0].price - product.product_variants[0].reseller_exclusive_price)}}</div>
                            <div
                              class="text-white"
                              style="font-weight: bolder; margin-top:0"
                              v-else-if="user.role.id === 8"
                            >{{'Rp' + formatPrice(product.product_variants[0].price - product.product_variants[0].reseller_pro_price)}}</div>
                            <div
                              class="text-white"
                              style="font-weight: bolder; margin-top:0"
                              v-else-if="user.role.id === 10"
                            >0</div>
                          </div>
                        </center>
                      </q-card-section>

                      <q-card-section>
                        <center>
                          <q-btn
                            :to="'/detail/' + product.id"
                            flat
                            class="bg-orange-8 text-white centered-text"
                            style=""
                          >
                            <span style="text-transform: capitalize;">Beli Sekarang</span>
                          </q-btn>
                        </center>
                      </q-card-section>
                    </q-card>
                  </swiper-slide>
                  <div class="swiper-product-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </div>
          <!-- <div style="background-color: white; margin-bottom: 10px; padding-bottom: 15px">
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
                            <div class="text-white" style="font-weight: bolder; margin-top:0" v-if="user.role.id === 9">{{'Rp' + formatPrice(product.price * product.reseller_exclusive_price / 100)}}</div>
                            <div class="text-white" style="font-weight: bolder; margin-top:0" v-else-if="user.role.id === 8">{{'Rp' + formatPrice(product.price * product.reseller_pro_price / 100)}}</div>
                          </div>
                        </center>
                      </q-card-section>

                      <q-card-section>
                        <center>
                          <q-btn :to="'/detail/' + product.id" flat class="bg-orange-8 text-white" style="padding-top: 0px; padding-bottom: 0px"><span style="text-transform: capitalize;">Beli Sekarang</span></q-btn>
                        </center>
                      </q-card-section>

                    </q-card>
                  </swiper-slide>
                  <div class="swiper-product-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </div>-->
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import carousel from "vue-owl-carousel";
import axios from "axios";
import {
  apiDomain,
  catalogCategoryUrl,
  catalogBrandUrl,
  catalogProductUrl,
  identitySliderUrl,
  totalCartItemUrl,
  getHeader,
  getProductByCategoryUrl
} from "src/config";
// Loading
import { QSpinnerPuff } from "quasar";

export default {
  data() {
    return {
      // Slider Section
      dataSlider: [],
      // Category Section
      dataCategory: [],
      // Brand Section
      dataBrand: [],
      // Product Section
      dataProducts: [],
      // Slider Section
      swiperProductListOption: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-product-pagination",
          clickable: true
        }
      },
      // Loading
      innerLoading: false,
      featuredImageShow: true,
      // user
      user: [],
      // Total Count Cart Item
      totalCartItem: null,
      startProduct: 1
    };
  },
  computed: {
    newProduct() {
      return this.dataProduct.slice().reverse();
    }
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("profileUser"));
    this.getBrand();

    this.getSlider();
    this.getProductByCategory();
  },
  mounted() {
    // Get Total Cart Item
    axios
      .get(totalCartItemUrl + "/" + this.user.id, { headers: getHeader() })
      .then(response => {
        console.log(response);

        if (response.status === 200) {
          this.totalCartItem = response.data.data;
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });
  },
  methods: {
    getProductByCategory() {
      this.dataProducts = [];

      axios
        .get(catalogCategoryUrl, { headers: getHeader() })
        .then(response => {
          console.log(response);

          if (response.status === 200) {
            this.dataCategory = response.data.data;

            for (let i = 0; i < this.dataCategory.length; i++) {
              axios
                .get(getProductByCategoryUrl + "/" + this.dataCategory[i].id, {
                  headers: getHeader()
                })
                .then(response => {
                  console.log(response);

                  if (response.status === 200) {
                    this.dataProducts.push({
                      id: this.dataCategory[i].id,
                      category_name: this.dataCategory[i].category_name,
                      products: response.data.data
                    });
                  }
                })
                .catch(error => {
                  if (error.response) {
                    console.log(error.response);
                  }
                });
            }
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },
    getBrand() {
      axios
        .get(catalogBrandUrl, { headers: getHeader() })
        .then(response => {
          console.log(response);

          if (response.status === 200) {
            this.dataBrand = response.data.data;
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },

    getSlider() {
      axios
        .get(identitySliderUrl, { headers: getHeader() })
        .then(response => {
          console.log(response);

          if (response.status === 200) {
            this.dataSlider = response.data.data;
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  components: { swiper, swiperSlide, carousel }
};
</script>

<style>
.promo-text {
  font-family: "Open Sans";
  font-size: 13px;
  font-weight: bold;
  margin: 0;
  padding-left: 12px;
}
.link-text {
  font-family: "Open Sans";
  font-size: 13px;
  margin: 0;
  padding-right: 10px;
}
.swiper-slide {
  width: 85%;
}
.category-title {
  font-size: 13px;
  margin: 0;
  text-align: center;
  text-transform: capitalize;
  line-height: 15px;
  font-weight: 400;
  padding: 10px 0px;
}
.owl-carousel .owl-item img {
  width: 100%;
  border-radius: 10px;
  float: left;
  height: auto;
}
.owl-theme .owl-dots .owl-dot.active span {
  background: #fea500 !important;
}
.q-btn__wrapper{
  width:auto;
}
</style>
