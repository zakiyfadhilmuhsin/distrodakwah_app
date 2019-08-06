<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-orange-8 text-white">
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

        <div class="row no-wrap">
          <center>
            <q-input type="text" dense outlined color="amber-8" bg-color="white" placeholder="Mau Belanja Apa Hari Ini?" style=" margin: 8px 0px">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </center>
        </div>

        <q-space />

        <q-btn 
          flat
          dense
          round
          dropdown
          to="/"
        >
          <q-icon name="more_vert" />     
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer>
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
            to="/storefront"
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

    <q-page-container>
      <div class="bg-grey-3" style="height: 100%">
        <div style="background-color: white; margin-bottom: 10px" class="q-pb-md">
          <div class="row q-pa-xs">
            <div class="col">
              <h5 class="promo-text">Promo</h5>
            </div>
            <div class="col text-right">
              <h5 class="link-text text-orange-9">Lihat Semua</h5>
            </div>
          </div>
          <!-- swiper -->
          <div class="q-pl-md">
            <swiper :options="swiperOption">
              <swiper-slide><img src="~/assets/images/components/slider-contoh.png" width="100%"></swiper-slide>
              <swiper-slide><img src="~/assets/images/components/slider-contoh.png" width="100%"></swiper-slide>
              <swiper-slide><img src="~/assets/images/components/slider-contoh.png" width="100%"></swiper-slide>
              <swiper-slide><img src="~/assets/images/components/slider-contoh.png" width="100%"></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
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
            <div class="col-4">
              <div style="background-color: white; border: 2px solid #e0e0e0; border-radius: 10px; margin: 5px">
                <h4 class="category-title">Lengan<br/>Pendek</h4>
              </div>
            </div>
            <div class="col-4">
              <div style="background-color: white; border: 2px solid #e0e0e0; border-radius: 10px; margin: 5px">
                <h4 class="category-title">Lengan<br/>Panjang</h4>
              </div>
            </div>
            <div class="col-4">
              <div style="background-color: white; border: 2px solid #e0e0e0; border-radius: 10px; margin: 5px">
                <h4 class="category-title">Sweater<br/>Hoodie</h4>
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
              <q-card class="my-card bg-grey-2" style="margin: 0 5px" flat bordered>
                <img src="~/assets/images/product/242navy.jpg" style="width: 100%">

                <q-card-section style="padding: 10px 16px 16px 16px">
                  <center>
                    <div style="font-family: 'Open Sans';font-size: 12px; font-weight: bold">Kaos Dakwah AM242</div>
                    <div class="text-subtitle2 text-red" style="font-weight: bolder">UNTUNG Rp50.000</div>
                  </center>
                </q-card-section>

                <q-card-section>
                  <q-btn to="/detail" flat class="bg-orange-8 text-white full-width"><span style="text-transform: capitalize;">Beli Sekarang</span></q-btn>
                </q-card-section>

              </q-card>
            </div>
            <div class="col">
              <q-card class="my-card bg-grey-2" style="margin: 0 5px" flat bordered>
                <img src="~/assets/images/product/243putih.jpg" style="width: 100%">

                <q-card-section style="padding: 10px 16px 16px 16px">
                  <center>
                    <div style="font-family: 'Open Sans';font-size: 12px; font-weight: bold">Kaos Dakwah AM243</div>
                    <div class="text-subtitle2 text-red" style="font-weight: bolder">UNTUNG Rp50.000</div>
                  </center>
                </q-card-section>

                <q-card-section>
                  <q-btn to="/storefront" flat class="bg-orange-8 text-white full-width"><span style="text-transform: capitalize;">Beli Sekarang</span></q-btn>
                </q-card-section>

              </q-card>
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
              <q-card class="my-card bg-grey-2" style="margin: 0 5px" flat bordered>
                <img src="~/assets/images/product/242navy.jpg" style="width: 100%">

                <q-card-section style="padding: 10px 16px 16px 16px">
                  <center>
                    <div style="font-family: 'Open Sans';font-size: 12px; font-weight: bold">Kaos Dakwah AM242</div>
                    <div class="text-subtitle2 text-red" style="font-weight: bolder">UNTUNG Rp50.000</div>
                  </center>
                </q-card-section>

                <q-card-section>
                  <q-btn to="/storefront" flat class="bg-orange-8 text-white full-width"><span style="text-transform: capitalize;">Beli Sekarang</span></q-btn>
                </q-card-section>

              </q-card>
            </div>
            <div class="col">
              <q-card class="my-card bg-grey-2" style="margin: 0 5px" flat bordered>
                <img src="~/assets/images/product/243putih.jpg" style="width: 100%">

                <q-card-section style="padding: 10px 16px 16px 16px">
                  <center>
                    <div style="font-family: 'Open Sans';font-size: 12px; font-weight: bold">Kaos Dakwah AM243</div>
                    <div class="text-subtitle2 text-red" style="font-weight: bolder">UNTUNG Rp50.000</div>
                  </center>
                </q-card-section>

                <q-card-section>
                  <q-btn to="/storefront" flat class="bg-orange-8 text-white full-width"><span style="text-transform: capitalize;">Beli Sekarang</span></q-btn>
                </q-card-section>

              </q-card>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import "swiper/dist/css/swiper.css"
import { swiper, swiperSlide } from "vue-awesome-swiper"

export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
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
