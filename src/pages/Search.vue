<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn flat round dense to="/" style="margin-right: 15px">
          <q-icon name="arrow_back" color="white" />
        </q-btn>

        <q-space />

        <q-input
          v-model="search"
          outlined
          dense
          placeholder="Cari Produk.."
          color="orange-8"
          bg-color="white"
          class="full-width"
          autofocus
          clearable
          @input="getProduct"
          @clear="getProduct"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page>
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white; margin-bottom: 10px; padding-bottom: 15px">
            <div class="row q-px-md" style="padding: 15px 10px">
              <div
                class="col-6"
                style="margin-bottom: 15px"
                v-for="(product, index) in newProduct"
                :key="index"
              >
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
                        style="font-family: 'Open Sans';font-size: 12px; font-weight: bold; margin-bottom: 5px"
                      >{{product.product_name}}</div>
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
                        class="bg-orange-8 text-white"
                        style="padding-top: 0px; padding-bottom: 0px"
                      >
                        <span style="text-transform: capitalize;">Beli Sekarang</span>
                      </q-btn>
                    </center>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import {
  apiDomain,
  catalogProductUrl,
  searchProductUrl,
  getHeader
} from "src/config";
// Loading
import { QSpinnerPuff } from "quasar";

export default {
  data() {
    return {
      // Product Section
      dataProduct: [],
      // Loading
      innerLoading: false,
      featuredImageShow: true,
      // user
      user: [],
      search: ""
    };
  },
  computed: {
    newProduct() {
      return this.dataProduct.slice().reverse();
    }
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("profileUser"));
    this.brandName = this.$route.params.brand;
    this.brandID = this.$route.params.brand_id;
    this.$q.loading.show({
      spinner: QSpinnerPuff,
      spinnerColor: "black",
      spinnerSize: 50,
      backgroundColor: "grey",
      message: "<b>Mohon Tunggu..</b>",
      messageColor: "black"
    });
    setTimeout(() => {
      this.$q.loading.hide();
    }, 500);
  },
  // mounted () {
  //   this.getProduct();
  // },
  methods: {
    getProduct() {
      if (this.search !== "") {
        this.dataProduct = [];

        // Loading
        this.featuredImageShow = false;

        // Form Data
        let formData = new FormData();

        formData.set("search", this.search);

        axios
          .post(searchProductUrl, formData, { headers: getHeader() })
          .then(response => {
            console.log(response);

            if (response.status === 200) {
              this.dataProduct = response.data.data;

              setTimeout(() => {
                this.featuredImageShow = true;
              }, 700);
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response);
            }
          });
      } else if (this.search === "") {
        this.dataProduct = [];
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
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
</style>
