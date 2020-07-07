<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn
          flat
          round
          dense
          to="/dashboard"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Download Katalog</span></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-white">
        <div class="row order-list-section">
          <div class="col q-pa-lg">
            <q-list bordered separator>
                <q-item>
                    <q-item-section>Katalog Hawary</q-item-section>
                    <q-item-section side><q-btn @click="downloadHawary" flat class="bg-red-8 text-white full-width" size="sm">Download</q-btn></q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>Katalog Asshaf</q-item-section>
                    <q-item-section side><q-btn @click="downloadAsshaf" flat class="bg-red-8 text-white full-width" size="sm">Download</q-btn></q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>Katalog Sirwal</q-item-section>
                    <q-item-section side><q-btn @click="downloadSirwal" flat class="bg-red-8 text-white full-width" size="sm">Download</q-btn></q-item-section>
                </q-item>
            </q-list>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
  .order-list-section{
    padding: 20px 0;
  }
</style>

<script>
import { openURL } from 'quasar';

export default {
  name: 'HelpDesk',
  data () {
    return {
      //
    }
  },
  methods: {
    downloadYaumee() {
      openURL("https://t.me/yaumeeDistrodakwahID");
    },
    downloadHawary() {
      openURL("https://t.me/HawaryDistrodakwahID");
    },
    downloadAsshaf() {
      openURL("https://t.me/asshafDistrodakwahID");
    },
    downloadSirwal() {
      openURL("https://t.me/katalogsirwalrsadd");
    }
  }
}
</script>
