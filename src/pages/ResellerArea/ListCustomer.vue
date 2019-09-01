<template>

  <q-layout view="hHh lpR fFf">

    <q-header elevated class="mobile-layout-on-desktop">
      <q-toolbar class="bg-orange-8 text-white">
        <q-btn
          flat
          round
          dense
          to="/dashboard"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Pelanggan Saya</span></q-toolbar-title>
        <q-btn
          flat
          dense
          class="bg-orange-10 text-capitalize"
          size="sm"
          icon="add"
          @click="addCustomer = true"
        >
          Tambah Pelanggan
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-white mobile-layout-on-desktop">
      <q-page class="bg-white">
        <div class="bg-grey-3" style="height: 100%">
          <div style="background-color: white;; padding: 13px 0 10px 0">
            <div class="row q-pa-lg">
              <div class="col">
                <div style="border: 1px solid #bdbdbd; border-radius: 5px; padding: 12px; margin-bottom: 20px" v-for="n in 10" :key="n">
                  <div class="row">
                    <div class="col-xs-8">
                    </div>
                    <div class="col-xs-4">
                      <router-link to="/detailOrder" style="text-decoration: none;">
                        <p style="margin: 0; font-size: 9px" class="text-orange-8 text-right">Ubah Data</p>
                      </router-link>
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
                          <h6 class="text-list"><b>:</b> Abdurahman</h6>
                          <h6 class="text-list"><b>:</b> RT RW</h6>
                          <h6 class="text-list"><b>:</b> Abdurahman</h6>
                          <h6 class="text-list"><b>:</b> RT RW</h6>
                          <h6 class="text-list"><b>:</b> Abdurahman</h6>
                          <h6 class="text-list"><b>:</b> RT RW</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </q-page>

      <q-dialog v-model="addCustomer" position="bottom">
        <q-card style="min-width: 360px">
          <!-- <q-card-section>
            <div class="text-h6">Tambah Pelanggan</div>
          </q-card-section> -->

          <q-card-section>
            <q-input type="text" color="orange-8" v-model="addressName" label="Nama Alamat" dense outlined style="margin-bottom: 5px" />
            <q-input type="text" color="orange-8" v-model="customerName" label="Nama Pelanggan" dense outlined style="margin-bottom: 5px" />
            <q-input type="text" color="orange-8" v-model="customerPhone" label="No Handphone" dense outlined style="margin-bottom: 5px" />
            <q-input type="text" color="orange-8" v-model="recipientName" label="Nama Penerima" dense outlined style="margin-bottom: 5px" />
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
            <q-input type="text" color="orange-8" v-model="postalCode" label="Kode POS" dense outlined style="margin-bottom: 5px" />
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn flat label="Simpan Data" color="white" class="bg-orange-8 text-capitalize full-width" @click="addNewCustomer" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  
  </q-layout>
  
</template>

<script>
import axios from 'axios';
import { getCustomerUrl, addNewCustomerUrl, getProvinceUrl, getCityUrl, getSubdistrictUrl, getHeader } from 'src/config';

export default {
  data () {
    return {
      // Form Add New Customer
      addressName: '',
      customerName: '',
      customerPhone: '',
      recipientName: '',
      addressDetail: '',
      provinceID: null,
      cityID: null,
      subdistrictID: null,
      postalCode: '',
      // Data Shipping
      dataProvince: [],
      dataCity: [],
      dataSubdistrict: [],
      // Toogle Dialog
      addCustomer: false,
    }
  },
  mounted () {
    this.getProvince();
  },
  methods: {
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
      customerData.set('address_name', this.addressName);
      customerData.set('customer_name', this.customerName);
      customerData.set('customer_phone', this.customerPhone);
      customerData.set('recipient_name', this.recipientName);
      customerData.set('address_detail', this.addressDetail);
      customerData.set('province_id', this.provinceID);
      customerData.set('city_id', this.cityID);
      customerData.set('subdistrict_id', this.subdistrictID);
      customerData.set('postal_code', this.postalCode);

      axios.post( addNewCustomerUrl, customerData, { headers: getHeader() } )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.$q.notify({position: 'top', color: 'dark', message: 'Pelanggan Berhasil Ditambahkan'});
            this.$router.go();
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
  .text-list {
    margin: 0; 
    font-size: 12px; 
    font-family: 'Open Sans'; 
    line-height: 18px;
  }
</style>
