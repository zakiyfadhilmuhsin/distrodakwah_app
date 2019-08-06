<template>
  <q-layout view="lHh Lpr lFf">
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
	          to="/"
	          style="text-transform: capitalize; font-family: 'Open Sans'"
	        ><span style="font-size: 10px;">Home</span></q-route-tab>
	        <q-route-tab
	          icon="receipt"
	          to="/storefront"
	          style="text-transform: capitalize; font-family: 'Open Sans'"
	        ><span style="font-size: 10px;">Order</span></q-route-tab>
	        <q-route-tab
	          icon="local_mall"
	          to="/storefront"
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {}
  }
}
</script>

<style>
</style>
