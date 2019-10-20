<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn
          flat
          round
          dense
          to="/cart"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Alamat Pengiriman</span></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black mobile-layout-on-desktop" style="border-top: 2px solid #eee">
      <q-toolbar class="bg-white text-black">
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white full-width"
          @click="reviewOrder"
        >
          Lihat Ringkasan Pesanan
        </q-btn>
      </q-toolbar>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-white">
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0">
            <div class="rpw q-px-lg">
              <div class="column justify-start">
                <div class="col">
                  <!-- <h6 style="font-size: 12px; margin: 0 0 8px 0; font-family: 'Open Sans'; line-height: 18px">Pilih dari daftar pelanggan kamu</h6>
                  <q-checkbox keep-color dense color="orange-8" v-model="addressSelect" style="margin-bottom: 10px"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px; font-weight: bold">Abdullah - 0821233344455</h6><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Perumahan Taman Adhidarma No B3, Jl Serbaguna, Kelurahan Klayan, Kecamatan Gunungjati, Kabupaten Cirebon</h6></q-checkbox>
                  <h6 style="font-size: 12px; margin: 0 0 8px 0; font-family: 'Open Sans'; line-height: 18px" class="text-red">Lihat semua daftar pelanggan</h6> -->
                  <center>
                  <q-btn flat size="sm" class="bg-orange-8 text-white" @click="selectCustomerDialog = true">Pilih Pelanggan</q-btn><span style="font-size: 10px; margin: 0; padding: 0 10px">atau</span><q-btn outline size="sm" color="black" @click="addCustomer = true">Tambah Pelanggan</q-btn>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div style="background-color: white; margin-bottom: 5px">
            <div class="row q-pa-lg items-center">
              <div class="col">
                <h6 style="font-size: 14px; margin: 0 0 8px 0; font-family: 'Open Sans'; line-height: 18px; font-weight: bold">Pesanan kamu akan dikirim ke alamat :</h6>
                <template v-if="dataCustomerSelected !== null">
                  <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px; font-weight: bold" class="text-blue-10">{{ dataCustomerSelected.customer_name }} - {{ dataCustomerSelected.customer_phone }}</h6><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">{{ dataCustomerSelected.address_detail }}, Kecamatan {{ dataCustomerSelected.subdistrict.subdistrict }}, {{ dataCustomerSelected.city.type + ' ' + dataCustomerSelected.city.city }}, Provinsi {{ dataCustomerSelected.province.province }}, {{ dataCustomerSelected.postal_code }}</h6>
                </template>
                <template v-else>
                  Pelanggan Belum Dipilih
                </template>
              </div>
            </div>
          </div>
          <div style="background-color: white;">
            <div class="row q-pa-xs items-center" style="padding-top: 20px; padding-bottom: 20px">
              <div class="col">
                <template v-if="dataCustomerSelected !== null">
                  <h6 style="font-size: 14px; margin: 0; padding: 0 20px 10px 20px; font-family: 'Open Sans'; line-height: 18px; font-weight: bold">Pilih ekspedisi :</h6>
                  <center>
                    <div class="q-px-md">
                      <q-select 
                        dense
                        outlined 
                        color="orange-8" 
                        options-dense
                        v-model="courierSelected"
                        :options='[
                          {value: "jne", label: "<div class=\"row\"><div class=\"self-center\" style=\"margin-right: 10px\">JNE</div> <img src=\"https://i.imgur.com/hhJyhyS.png\" height=\"20\" /></div>"},
                          {value: "jnt", label: "<div class=\"row\"><div class=\"self-center\" style=\"margin-right: 10px\">J&T</div> <img src=\"https://i.imgur.com/TNdagJs.png\" height=\"20\" /></div>"},
                          {value: "pos", label: "<div class=\"row\"><div class=\"self-center\" style=\"margin-right: 10px\">POS</div> <img src=\"https://i.imgur.com/2VEBPMp.png\" height=\"20\" /></div>"}
                        ]'
                        option-value="value"
                        option-label="label"
                        emit-value
                        map-options
                        @input="getCostShipping"
                      />
                    </div>
                  </center>
                </template>
                  <!-- <q-btn-toggle
                    v-model="courierSelected"
                    unelevated
                    toggle-color="blue-grey-1"
                    @input="getCostShipping"
                    :options="[
                      {value: 'jne', slot: 'jne'},
                      {value: 'jnt', slot: 'jnt'},
                      {value: 'pos', slot: 'pos'}
                    ]"
                  >
                    <template v-slot:jne>
                      <div class="row items-center no-wrap">
                        <img src="~/assets/images/components/ekspedisi/jne.png" width="65" />
                      </div>
                    </template>

                    <template v-slot:jnt>
                      <div class="row items-center no-wrap">
                        <img src="~/assets/images/components/ekspedisi/jnt.png" width="65" />
                      </div>
                    </template>

                    <template v-slot:pos>
                      <div class="row items-center no-wrap">
                        <img src="~/assets/images/components/ekspedisi/pos.png" width="65" />
                      </div>
                    </template>
                  </q-btn-toggle> -->
                <!-- {{ dataCost.results[0].costs }} -->
                <br/>
                <h6 style="font-size: 14px; margin: 0; padding: 0 20px 10px 20px; font-family: 'Open Sans'; line-height: 18px; font-weight: bold" v-if="courierSelected !== '' && dataCustomerSelected !== null">Pilih tarif :</h6>
                <q-list dense>
                  <q-item v-for="(cost, index) in dataCost" :key="index">
                    <q-item-section side>
                      <q-radio keep-color color="orange-8" dense v-model="costShipping" :val="cost.cost[0].value" @input="serviceSelected = cost.service" />
                    </q-item-section>
                    <!-- {{ dataCost.results.name }} -->
                    <q-item-section>{{ courierName }} {{ cost.service }}<br/><span style="font-size: 10px">Rp{{ formatPrice(cost.cost[0].value) }} <span v-if="cost.cost[0].etd !== ''">{{ '(Estimasi ' + cost.cost[0].etd + ' Hari)' }}</span></span></q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </div>

        <q-dialog v-model="selectCustomerDialog" position="bottom">
          <q-card style="min-width: 360px">
            <q-card-section>
              <div class="text-h6">Pilih Pelanggan</div>
            </q-card-section>

            <q-card-section>
              <template v-if="dataCustomers.length > 0">
                <q-scroll-area style="height: 350px; max-width: 360px;">
                  <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px; margin-bottom: 20px" v-for="(customer, index) in dataCustomers" :key="index">
                    <div class="row">
                      <div class="col-xs-8">
                      </div>
                      <div class="col-xs-4">
                        <q-btn flat dense size="xs" class="bg-orange-8 text-white float-right text-capitalize" @click="selectCustomer(customer.id)" v-close-popup>Pilih Pelanggan</q-btn>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                            <h6 class="text-list"><b>Nama Customer </b></h6>
                            <h6 class="text-list"><b>No Handphone </b></h6>
                            <h6 class="text-list"><b>Provinsi </b></h6>
                            <h6 class="text-list"><b>Kota/Kabupaten </b></h6>
                            <h6 class="text-list"><b>Kecamatan </b></h6>
                            <h6 class="text-list"><b>Detail Alamat </b></h6>
                          </div>
                          <div class="col">
                            <h6 class="text-list"><b>:</b> {{ customer.customer_name }}</h6>
                            <h6 class="text-list"><b>:</b> {{ customer.customer_phone }}</h6>
                            <h6 class="text-list"><b>:</b> {{ customer.province.province }}</h6>
                            <h6 class="text-list"><b>:</b> {{ customer.city.type + ' ' + customer.city.city }}</h6>
                            <h6 class="text-list"><b>:</b> {{ customer.subdistrict.subdistrict }}</h6>
                            <h6 class="text-list"><b>:</b> {{ customer.address_detail }}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-scroll-area>
              </template>
              <template v-else>
                <div class="q-pa-md">
                  <center>
                    <img src="https://image.flaticon.com/icons/svg/145/145859.svg" width="75" style="margin-bottom: 25px" />
                    <div class="text-bold text-black">Belum Ada Pelanggan</div>
                    <div class="text-bold text-grey">Silahkan Tambah Pelanggan terlebih dahulu</div>
                  </center>
                </div>
              </template>
            </q-card-section>

            <!-- <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions> -->
          </q-card>
        </q-dialog>
      </q-page>

      <q-dialog v-model="addCustomer" position="bottom">
        <q-card style="min-width: 360px">
          <!-- <q-card-section>
            <div class="text-h6">Tambah Pelanggan</div>
          </q-card-section> -->

          <q-card-section>
            <q-input type="text" color="orange-8" v-model="customerName" label="Nama Pelanggan" dense outlined style="margin-bottom: 5px" />
            <q-input type="text" color="orange-8" v-model="customerPhone" label="No Handphone" dense outlined style="margin-bottom: 5px" />
            <q-input type="textarea" color="orange-8" v-model="addressDetail" label="Detail Alamat" dense outlined style="margin-bottom: 5px" />
            <q-select 
              color="orange-8"
              dense
              outlined
              v-model="provinceID"
              :options="dataProvince"
              option-value="id"
              option-label="province"
              label="Provinsi"
              emit-value
              map-options
              @input="getCity"
              style="margin-bottom: 5px"
            />
            <q-select 
              color="orange-8"
              dense
              outlined
              v-model="cityID"
              :options="dataCity"
              option-value="id"
              :option-label="opt => opt.type + ' ' + opt.city"
              label="Kota/Kabupaten"
              emit-value
              map-options
              @input="getSubdistrict"
              style="margin-bottom: 5px"
            />
            <q-select 
              color="orange-8"
              dense
              outlined
              v-model="subdistrictID"
              :options="dataSubdistrict"
              option-value="id"
              option-label="subdistrict"
              label="Kecamatan"
              emit-value
              map-options
              style="margin-bottom: 5px"
            />
            <q-input type="text" color="orange-8" v-model="postalCode" label="Kode POS (Opsional)" dense outlined style="margin-bottom: 5px" />
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn flat label="Simpan Data" color="white" class="bg-orange-8 text-capitalize full-width" @click="addNewCustomer" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { getCustomerUrl, showCustomerUrl, addNewCustomerUrl, addShippingToCart, getProvinceUrl, getCityUrl, getSubdistrictUrl, getCostShippingUrl, getCartUrl, getHeader } from 'src/config';

export default {
  data () {
    return {
      // Detail Address
      dataCustomerSelected: null,
      // Form Add New Customer
      customerName: '',
      customerPhone: '',
      addressDetail: '',
      provinceID: null,
      cityID: null,
      subdistrictID: null,
      postalCode: '',
      // Data Shipping
      dataCustomers: [],
      dataProvince: [],
      dataCity: [],
      dataSubdistrict: [],
      dataCost: [],
      courierName: null,
      // Toogle Dialog
      addCustomer: false,
      selectCustomerDialog: false,
      courierSelected: '',
      serviceSelected: '',
      costShipping: '',

      cartData: [],
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
  },
  mounted () {
    this.getCustomers();
    this.getProvince();
    this.getCart();
  },
  methods: {
    getCart () {
       axios.get( getCartUrl + '/' + this.user.id, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {

            this.cartData = response.data.data;

          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })
    },
    getCustomers () {
      
      axios.get( getCustomerUrl + '/' + this.user.id, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataCustomers = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    selectCustomer (id) {

      axios.get( showCustomerUrl + '/' + id, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataCustomerSelected = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    getProvince () {

      axios.get( getProvinceUrl, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataProvince = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    getCity () {

      this.cityID = null,

      axios.get( getCityUrl + '/' + this.provinceID, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataCity = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    getSubdistrict () {

      this.subdistrictID = null,
      
      axios.get( getSubdistrictUrl + '/' + this.cityID, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataSubdistrict = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    addNewCustomer () {

      let customerData = new FormData();
      customerData.set('customer_name', this.customerName);
      customerData.set('customer_phone', this.customerPhone);
      customerData.set('address_detail', this.addressDetail);
      customerData.set('province_id', this.provinceID);
      customerData.set('city_id', this.cityID);
      customerData.set('subdistrict_id', this.subdistrictID);
      customerData.set('postal_code', this.postalCode);
      customerData.set('user_id', this.user.id);

      axios.post( addNewCustomerUrl, customerData, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.$q.notify({position: 'top', color: 'dark', message: 'Pelanggan Berhasil Ditambahkan'});
            this.getCustomers();
            this.customerName = '';
            this.customerPhone = '';
            this.addressDetail = '';
            this.provinceID = null;
            this.cityID = null;
            this.subdistrictID = null;
            this.postalCode = '';
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    getCostShipping () {

        if(this.dataCustomerSelected === null){

          alert('Silahkan Pilih Pelanggan dulu');
        
        }else{

          let postCost = new FormData();
          postCost.set('origin', 108);
          postCost.set('originType', 'city');
          postCost.set('destination', this.dataCustomerSelected.subdistrict_id);
          postCost.set('destinationType', 'subdistrict');
          postCost.set('weight', Number(this.cartData.total_weight));
          postCost.set('courier', this.courierSelected);

          axios.post( getCostShippingUrl, postCost, { 
              headers: getHeader() 
            })
            .then(response => {
              console.log(response)

              if (response.status === 200) {
                this.dataCost = response.data.rajaongkir.results[0].costs;
                this.courierName = response.data.rajaongkir.results[0].name;
              }

            })
            .catch(error => {
              if (error.response) {
                console.log(error.response)
              }
            })

        }

    },
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    reviewOrder () {

        let post = new FormData();
        post.set('shipment_fee', this.costShipping);
        post.set('courier_name', this.courierName);
        post.set('service_name', this.serviceSelected);
        post.set('customer_address_id', this.dataCustomerSelected.id);

        axios.post( addShippingToCart + '/' + this.user.id, post, { headers: getHeader() } )
          .then(response => {
            console.log(response)

            if (response.status === 200) {
              this.$router.push('/orderSummary');
            }

          })
          .catch(error => {
            if (error.response) {
              console.log(error.response)
            }
          })

    }
  }
}
</script>

<style>
</style>
