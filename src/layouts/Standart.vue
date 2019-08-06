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
        <q-space />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black" style="border-top: 2px solid #eee">
      <q-toolbar class="bg-white text-black">
        <q-title>
          <h4 style="font-size: 21px; margin: 5px; padding-top: 5px; font-family: 'Teko'; font-weight: bold">KAMU UNTUNG 20.000</h4>
        </q-title>
        <q-space />
        <q-btn
          flat
          class="bg-orange-8 text-white"
          @click="confirmOrder = true"
        >
          Beli Sekarang
        </q-btn>
      </q-toolbar>
    </q-footer>

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