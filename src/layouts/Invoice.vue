<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated>
      <q-toolbar class="bg-orange-8 text-white">
        <q-btn
          flat
          round
          dense
          to="/cart"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-title><span style="font-size: 16px; font-weight: bold">Invoice</span></q-title>
      </q-toolbar>
    </q-header>

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