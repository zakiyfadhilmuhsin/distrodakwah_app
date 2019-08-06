<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated>
      <q-toolbar class="bg-orange-8 text-white">
        <q-btn
          flat
          round
          dense
          to="/detail"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-title><span style="font-size: 16px; font-weight: bold">Keranjang Belanja</span></q-title>
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

    <!-- <q-footer class="bg-white text-black" style="border-top: 2px solid #eee">
      <q-toolbar class="bg-white text-black">
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white full-width"
          to="/shipping"
        >
          Atur Alamat Pengiriman
        </q-btn>
      </q-toolbar>
    </q-footer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>