<template>
  <q-page>
  	<div class="row dashboard-section">
  		<div class="col">
        <center>
    		  <img src="~/assets/images/components/silver_badge.png" width="75" />
          <h6 style="font-size: 16px; font-family: 'Open Sans'; font-weight: bold; margin: 0">Malik Saefurrizqi</h6>
          <h6 class="dashboard-small-text">Reseller Pro</h6>
          <br/>
          <q-btn flat rounded size="sm" class="bg-orange text-white">Upgrade Member</q-btn>
          <h6 class="dashboard-small-text" style="font-size: 10px; line-height: 11px; margin-top: 8px">Untuk dapatkan keuntungan<br/>yang lebih besar</h6>
        </center>
        <br/>
        <div class="row">
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
        <br/>
        <div class="row">
          <div class="col">
            <h4 style="font-weight: bold; font-size: 21px; font-family: 'Open Sans'; margin: 0;">Alhamdulillah!</h4>
            <h5 style="font-size: 12px; line-height: 15px; margin: 0">Kamu telah mendapatkan untuk <b>Rp.1.450.000</b><br/>Sejak bergabung menjadi reseller distrodakwah</h5>
          </div>
        </div>
        <div class="row" style="padding-top: 15px">
          <div class="col">
            <h5 style="font-size: 14px; font-weight: bold; margin: 10px 0">Pesanan Saya</h5>
            <center>
              <div class="row">
                <div class="col">
                  <q-icon name="fas fa-wallet" style="font-size: 30px; margin: 0 0 5px 0" />
                  <p style="font-size: 10px; margin: 0">Belum Bayar</p>
                </div>
                <div class="col">
                  <q-icon name="fas fa-box-open" style="font-size: 30px; margin: 0 0 5px 0" />
                  <p style="font-size: 10px; margin: 0">Dikemas</p>
                </div>
                <div class="col">
                  <q-icon name="fas fa-shipping-fast" style="font-size: 30px; margin: 0 0 5px 0" />
                  <p style="font-size: 10px; margin: 0">Dikirim</p>
                </div>
                <div class="col">
                  <q-icon name="fas fa-clipboard-check" style="font-size: 30px; margin: 0 0 5px 0" />
                  <p style="font-size: 10px; margin: 0">Selesai</p>
                </div>
                <div class="col">
                  <router-link to="/orderList" style="text-decoration: none; color: black">
                    <q-icon name="fas fa-list-alt" style="font-size: 30px; margin: 0 0 5px 0" />
                    <p style="font-size: 10px; margin: 0">Lihat Semua</p>
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

                  <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Promo & Voucher Saya</span></q-item-section>

                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item dense clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="o_favorite" />
                  </q-item-section>

                  <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Produk Favorit Saya</span></q-item-section>

                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item dense clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="supervised_user_circle" />
                  </q-item-section>

                  <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Daftar Pelanggan Saya</span></q-item-section>

                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item dense clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="store_mall_directory" />
                  </q-item-section>

                  <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Web Replika Saya</span></q-item-section>

                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item dense clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="move_to_inbox" />
                  </q-item-section>

                  <q-item-section><span style="font-size: 12px; color: black; line-height: 15px">Download Katalog</span></q-item-section>

                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                </q-item>

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
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
    	</div>
    </div>
  </q-page>
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
export default {
  name: 'Dashboard'
}
</script>
