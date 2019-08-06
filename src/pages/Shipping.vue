<template>
  <q-page>
    <div class="bg-grey-3" style="height: 100%">
      <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0">
        <div class="rpw q-px-lg">
          <div class="column justify-start">
            <div class="col">
              <!-- <h6 style="font-size: 12px; margin: 0 0 8px 0; font-family: 'Open Sans'; line-height: 18px">Pilih dari daftar pelanggan kamu</h6>
              <q-checkbox keep-color dense color="orange-8" v-model="addressSelect" style="margin-bottom: 10px"><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px; font-weight: bold">Abdullah - 0821233344455</h6><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Perumahan Taman Adhidarma No B3, Jl Serbaguna, Kelurahan Klayan, Kecamatan Gunungjati, Kabupaten Cirebon</h6></q-checkbox>
              <h6 style="font-size: 12px; margin: 0 0 8px 0; font-family: 'Open Sans'; line-height: 18px" class="text-red">Lihat semua daftar pelanggan</h6> -->
              <center>
              <q-btn flat size="sm" class="bg-orange-8 text-white">Pilih Pelanggan</q-btn><span style="font-size: 10px; margin: 0; padding: 0 10px">atau</span><q-btn outline size="sm" color="black">Tambah Pelanggan</q-btn>
              </center>
            </div>
          </div>
        </div>
      </div>
      <div style="background-color: white; margin-bottom: 5px">
        <div class="row q-pa-lg items-center">
          <div class="col">
            <h6 style="font-size: 14px; margin: 0 0 8px 0; font-family: 'Open Sans'; line-height: 18px; font-weight: bold">Pesanan kamu akan dikirim ke alamat :</h6>
            <h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px; font-weight: bold" class="text-blue-10">Abdullah - 0821233344455</h6><h6 style="font-size: 12px; margin: 0; font-family: 'Open Sans'; line-height: 18px">Perumahan Taman Adhidarma No B3, Jl Serbaguna, Kelurahan Klayan, Kecamatan Gunungjati, Kabupaten Cirebon</h6>
          </div>
        </div>
      </div>
      <div style="background-color: white;">
        <div class="row q-pa-xs items-center" style="padding-top: 20px; padding-bottom: 20px">
          <div class="col">
            <h6 style="font-size: 14px; margin: 0; padding: 0 20px 10px 20px; font-family: 'Open Sans'; line-height: 18px; font-weight: bold">Pilih ekspedisi :</h6>
            <q-list dense>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-radio keep-color color="orange-8" dense v-model="ekspedisiSelected" val="ninja" />
                </q-item-section>

                <q-item-section side><img src="~/assets/images/components/ekspedisi/ninja.png" width="65" /></q-item-section>

                <q-item-section>Ninja REG<br/><span style="font-size: 10px">Rp10.000 (ETD 4 Hari)</span></q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-radio keep-color color="orange-8" dense v-model="ekspedisiSelected" val="jne" />
                </q-item-section>

                <q-item-section side><img src="~/assets/images/components/ekspedisi/jne.png" width="65" /></q-item-section>

                <q-item-section>JNE REG<br/><span style="font-size: 10px">Rp10.000 (ETD 4 Hari)</span></q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-radio keep-color color="orange-8" dense v-model="ekspedisiSelected" val="tiki" />
                </q-item-section>

                <q-item-section side><img src="~/assets/images/components/ekspedisi/tiki.png" width="65" /></q-item-section>

                <q-item-section>TIKI REG<br/><span style="font-size: 10px">Rp10.000 (ETD 4 Hari)</span></q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-radio keep-color color="orange-8" dense v-model="ekspedisiSelected" val="jnt" />
                </q-item-section>

                <q-item-section side><img src="~/assets/images/components/ekspedisi/jnt.png" width="65" /></q-item-section>

                <q-item-section>J&T REG<br/><span style="font-size: 10px">Rp10.000 (ETD 4 Hari)</span></q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-radio keep-color color="orange-8" dense v-model="ekspedisiSelected" val="pos" />
                </q-item-section>

                <q-item-section side><img src="~/assets/images/components/ekspedisi/pos.png" width="65" /></q-item-section>

                <q-item-section>POS Express<br/><span style="font-size: 10px">Rp10.000 (ETD 4 Hari)</span></q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      addressSelect: true,
      ekspedisiSelected: ''
    }
  }
}
</script>

<style>
</style>
