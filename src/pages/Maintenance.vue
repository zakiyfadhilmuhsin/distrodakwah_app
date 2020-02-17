<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="mobile-layout-on-desktop transparent no-shadow">
      <q-toolbar>
        <q-btn flat round dense to="/" style="background-color: rgba(0, 0, 0, 0.15)">
          <q-icon name="arrow_back" color="white" />
        </q-btn>
        <q-space />
        <!-- <q-btn
          flat
          dense
          round
          icon="shopping_cart"
        >
          <q-badge color="amber-5" class="text-black" floating>3</q-badge>
        </q-btn>
        <q-btn
          flat
          dense
          round
        >
          <q-icon name="share" color="white" />
        </q-btn>-->
      </q-toolbar>
    </q-header>

    <q-footer
      class="bg-white text-black mobile-layout-on-desktop"
      style="border-top: 2px solid #eee"
    >

    </q-footer>

    <q-page-container class="mobile-layout-on-desktop bg-white justify-center">
        <div class="center">
            Web Distrodakwah Sedang Dalam Perbaikan
        </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MaintenancePage'
}
</script>

<style lang="stylus" scoped>
    .center{
        text-align : center;
                align-items: center;

    }

    .justify-center{
        display : flex;
    }
</style>