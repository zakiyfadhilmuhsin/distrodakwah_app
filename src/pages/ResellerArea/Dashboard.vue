<template>
  <q-layout view="lHh Lpr lFf">
  	<q-footer class="mobile-layout-on-desktop">
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
	        ><span style="font-size: 10px;">Beranda</span></q-route-tab>
	        <q-route-tab
	          icon="receipt"
	          to="/orderList"
	          style="text-transform: capitalize; font-family: 'Open Sans'"
	        ><span style="font-size: 10px;">Pesanan</span></q-route-tab>
	        <q-route-tab
	          icon="local_mall"
	          to="/cart"
	          style="text-transform: capitalize; font-family: 'Open Sans'"
	        ><span style="font-size: 10px;">Keranjang</span><q-badge color="red" text-color="white" floating v-if="totalCartItem !== null"><b>{{ totalCartItem }}</b></q-badge></q-route-tab>
	        <q-route-tab
	          icon="account_circle"
	          to="/dashboard"
	          style="text-transform: capitalize; font-family: 'Open Sans'"
	        ><span style="font-size: 10px;">Profil</span></q-route-tab>
	        <!-- <q-route-tab
	          icon="verified_user"
	          to="/"
	          style="text-transform: capitalize; font-family: 'Open Sans'"
	        ><span style="font-size: 10px;">Support</span></q-route-tab> -->
	      </q-tabs>
	    </center>
	</q-footer>

  <q-page-container class="mobile-layout-on-desktop">
    <q-page class="bg-white">
      <div class="row dashboard-section">
        <div class="col">
          <center>
            <img src="~/assets/images/components/silver_badge.png" width="50" v-if="user.role.id === 8" />
            <img src="~/assets/images/components/gold_badge.png" width="50" v-else-if="user.role.id === 9" />
            <img src="https://image.flaticon.com/icons/svg/590/590470.svg" width="50" v-else-if="user.role.id === 10" />
            <h6 style="font-size: 16px; font-family: 'Open Sans'; font-weight: bold; margin: 0">{{ user.name }}</h6>
            <h6 class="dashboard-small-text">{{ user.role.role_name }}</h6>
            <br/>
            <!-- <div class="mb-5" style="font-size: 11px">
            Sisa Masa Keanggotaan Anda : {{ user.expired_at ? new Date(user.expired_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'numeric', day: 'numeric' }) : '' }}
            Sisa Masa Keanggotaan Anda : {{ user.created_at }}
            Masa keanggotaan anda <b>{{ user.expired_at | moment("from", "now", true) }}</b> lagi
            </div> -->
            <template v-if="user.role.id === 8">
              <q-btn @click="upgrade" flat rounded size="sm" class="bg-orange text-white">Upgrade Member</q-btn>
              <h6 class="dashboard-small-text" style="font-size: 10px; line-height: 11px; margin-top: 8px">Untuk dapatkan keuntungan<br/>yang lebih besar</h6>
            </template>
            <template v-else-if="user.role.id === 10">
              <q-btn @click="upgrade" flat rounded size="sm" class="bg-orange text-white">Upgrade Member</q-btn>
              <h6 class="dashboard-small-text" style="font-size: 10px; line-height: 11px; margin-top: 8px">Untuk dapatkan keuntungan<br/>yang lebih besar</h6>
            </template>
          </center>
          <br/>
          <!-- <div class="row">
            <div class="col">
              <q-list dense>
                <q-item dense clickable v-ripple>
                  <q-item-section side>
                    <img src="~/assets/images/components/dompet_distro.png" width="30" />
                  </q-item-section>

                  <q-item-section side><span style="font-size: 12px; color: black; line-height: 15px">DompetDistro</span><span style="font-size: 12px; line-height: 15px">Rp500.000</span></q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col">
              <q-list dense>
                <q-item dense clickable v-ripple>
                  <q-item-section side>
                    <img src="~/assets/images/components/point_distro.png" width="20" />
                  </q-item-section>

                  <q-item-section side><span style="font-size: 12px; color: black; line-height: 15px">PointDistro</span><span style="font-size: 12px; line-height: 15px">50 Points</span></q-item-section>
                </q-item>
              </q-list>
            </div> 
          </div>
          <br/> -->
          <!-- <div class="row">
            <div class="col">
              <h4 style="font-weight: bold; font-size: 21px; font-family: 'Open Sans'; margin: 0;">Alhamdulillah!</h4>
              <h5 style="font-size: 12px; line-height: 15px; margin: 0">Kamu telah mendapatkan untuk <b>Rp.1.450.000</b><br/>Sejak bergabung menjadi reseller distrodakwah</h5>
            </div>
          </div> -->
          <div class="row" style="padding-top: 15px">
            <div class="col">
              <h5 style="font-size: 14px; font-weight: bold; margin: 10px 0">Pesanan Saya</h5>
              <center>
                <div class="row">
                  <div class="col">
                    <router-link to="/orderList/waiting_payment" style="text-decoration: none; color: black">
                      <q-icon name="fas fa-wallet" style="font-size: 30px; margin: 0 0 5px 0" />
                      <p style="font-size: 10px; margin: 0">Belum Bayar</p>
                    </router-link>
                  </div>
                  <div class="col">
                    <router-link to="/orderList/processed" style="text-decoration: none; color: black">
                      <q-icon name="fas fa-list-alt" style="font-size: 30px; margin: 0 0 5px 0" />
                      <p style="font-size: 10px; margin: 0">Diproses</p>
                    </router-link>
                  </div>
                  <div class="col">
                    <router-link to="/orderList/packing" style="text-decoration: none; color: black">
                      <q-icon name="fas fa-box-open" style="font-size: 30px; margin: 0 0 5px 0" />
                      <p style="font-size: 10px; margin: 0">Dikemas</p>
                    </router-link>
                  </div>
                  <div class="col">
                    <router-link to="/orderList/shipped" style="text-decoration: none; color: black">
                      <q-icon name="fas fa-shipping-fast" style="font-size: 30px; margin: 0 0 5px 0" />
                      <p style="font-size: 10px; margin: 0">Dikirim</p>
                    </router-link>
                  </div>
                  <div class="col">
                    <router-link to="/orderList/done" style="text-decoration: none; color: black">
                      <q-icon name="fas fa-clipboard-check" style="font-size: 30px; margin: 0 0 5px 0" />
                      <p style="font-size: 10px; margin: 0">Selesai</p>
                    </router-link>
                  </div>
                </div>
              </center>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col">
                <q-list bordered>
                  <q-item dense clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="local_activity" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Promo & Voucher Saya <span class="bg-yellow-8 text-black" style="padding: 3px 5px; border-radius: 5px; font-size: 10px">soon</span></span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item dense clickable v-ripple to="/downloadCatalog">
                    <q-item-section avatar>
                      <q-icon name="move_to_inbox" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Download Katalog</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item dense clickable v-ripple to="/resetPassword">
                    <q-item-section avatar>
                      <q-icon name="lock_open" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Reset Password</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>


                  <q-separator />

                  <q-item dense clickable v-ripple to="/updatePassword">
                    <q-item-section avatar>
                      <q-icon name="lock_open" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Ganti Password</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>


                  <q-separator />

                  <!-- <q-item dense clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="o_favorite" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Produk Favorit Saya</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>

                  <q-separator /> -->

                  <q-item dense clickable v-ripple to="/listCustomer">
                    <q-item-section avatar>
                      <q-icon name="supervised_user_circle" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Daftar Pelanggan Saya</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>

                  <q-separator v-if="user.role.id === 8 || user.role.id === 9" />

                  <q-item dense clickable v-ripple to="settingStore" v-if="user.role.id === 8 || user.role.id === 9">
                    <q-item-section avatar>
                      <q-icon name="store_mall_directory" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Web Replika Saya</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <!-- <q-item dense clickable v-ripple to="/feedback">
                    <q-item-section avatar>
                      <q-icon name="insert_comment" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Kasih Masukkan</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item> -->

                  <q-item dense clickable v-ripple to="/helpdesk">
                    <q-item-section avatar>
                      <q-icon name="contact_support" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px"><b>Butuh Bantuan?</b></span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item dense clickable v-ripple @click="logout">
                    <q-item-section avatar>
                      <q-icon name="power_settings_new" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px; font-weight: bold" class="text-red">Logout</span></q-item-section>

                    <!-- <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section> -->
                  </q-item>

                  <!-- 

                  <q-separator />

                  <q-item dense clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="help" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Panduan</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item dense clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="build" />
                    </q-item-section>

                    <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Pengaturan</span></q-item-section>

                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                  </q-item> -->
                </q-list>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
	.dashboard-section{
		padding: 30px;
	}
	.dashboard-small-text{
		font-family: 'Open Sans';
		font-size: 14px;
		margin: 0px;
    line-height: 16px;
	}
</style>

<script>
import { totalCartItemUrl, getHeader } from 'src/config';
import axios from 'axios';
// Loading
import { QSpinnerPuff, openURL } from 'quasar';
import Vue from 'vue';

import moment from 'moment'

const lang = 'id'

moment.locale(lang)

Vue.use(require('vue-moment'), {moment})

export default {
  name: 'Dashboard',
  data () {
    return {
      // Total Count Cart Item
      totalCartItem: null,
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('profileUser'));
    this.$q.loading.show({
      spinner: QSpinnerPuff,
      spinnerColor: 'black',
      spinnerSize: 50,
      backgroundColor: 'grey',
      message: '<b>Mohon Tunggu..</b>',
      messageColor: 'black'
    })
    setTimeout(() => {
      this.$q.loading.hide()
    }, 500);
  },
  mounted () {
    // Get Total Cart Item
    axios.get( totalCartItemUrl + '/' + this.user.id, { headers: getHeader() } )
      .then(response => {
        console.log(response)

        if (response.status === 200) {
          this.totalCartItem = response.data.data;
        }

      })
      .catch(error => {
        if (error.response) {
          console.log(error.response)
        }
      })
  },
  methods: {
    logout () {
      window.localStorage.removeItem('authUser');
      window.localStorage.removeItem('profileUser');
      this.$router.push('/');
    },
    upgrade () {
      openURL('https://serbalaris.orderonline.id/upgrade-eksklusif');
    }
  }
}
</script>
