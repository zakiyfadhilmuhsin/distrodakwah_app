<template>
  <q-page>
  	<swiper :options="swiperOptionDetail">
      <swiper-slide>
        <img src="~/assets/images/product/247merah-square.png" width="100%" />
      </swiper-slide>
      <swiper-slide>
        <img src="~/assets/images/product/247merah-square.png" width="100%" />
      </swiper-slide>
      <swiper-slide>
        <img src="~/assets/images/product/247merah-square.png" width="100%" />
      </swiper-slide>
      <div class="swiper-pagination-detail" slot="pagination"></div>
    </swiper>
    <div class="row q-px-md">
      <div class="col">
        <h5 class="category-text">Kategori : <span class="text-red">Lengan Pendek</span></h5>
        <h4 class="product-title-text">Kaos Dakwah AM250</h4>
        <!-- Pilih Warna & Ukuran -->
        <div class="row" style="margin-bottom: 7px">
          <div class="col-xs-4">
            <h5 class="options-title">Pilih Warna</h5>
          </div>
          <div class="col-xs-8">
            <q-select dense outlined color="orange-8" options-dense v-model="colorSelected" :options="colorOptions" />
          </div>
        </div>
        <div class="row" style="margin-bottom: 7px">
          <div class="col-xs-4">
            <h5 class="options-title">Pilih Ukuran</h5>
          </div>
          <div class="col-xs-8">
            <q-select dense outlined color="orange-8" options-dense v-model="sizeSelected" :options="sizeOptions" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4">
            <h5 class="options-title">Qty</h5>
          </div>
          <div class="col-xs-8">
            <q-input type="number" dense outlined color="orange-8" options-dense v-model="qty" />
          </div>
        </div>
        <br/>
        <!-- Informasi Harga -->
        <div class="row">
          <div class="col-xs-6">
            <h5 class="price-title-small-text">Harga Konsumen</h5>
          </div>
          <div class="col-xs-6">
            <h5 class="price-title-small-text">Harga Reseller Pro</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <h5 class="price-detail-text">Rp100.000</h5>
          </div>
          <div class="col-xs-6">
            <h5 class="price-detail-text text-green">Rp80.000</h5>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h4 class="upgrade-cta-text"><span class="text-black" style="text-decoration: underline;">Upgrade Dulu Aja!</span> Agar Dapat Harga <b>Rp65.000</b></h4>
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
                <q-btn flat class="bg-red text-white" size="sm" label="Salin" />
              </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
  .category-text {
    font-size: 13px;
    font-family: 'Open Sans';
    color: black;
    margin: 0;
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
import "swiper/dist/css/swiper.css"
import { swiper, swiperSlide } from "vue-awesome-swiper"

export default {
  name: 'DetailProduct',
  data () { 
    return {
      swiperOptionDetail: {
        pagination: {
          // slidesPerView: 'auto',
          centeredSlides: false,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination-detail',
            clickable: true
          }
        }
      },
      colorSelected: '',
      colorOptions: ['Merah', 'Hitam', 'Putih', 'Navy'],
      sizeSelected: '',
      sizeOptions: ['M','L','XL']
    } 
  },
  components: { swiper, swiperSlide }
}
</script>
