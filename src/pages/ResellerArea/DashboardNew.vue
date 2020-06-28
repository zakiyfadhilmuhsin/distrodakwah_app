<template>
	<MainLayout :HeaderProp="'Profil'">
		<template v-slot:main>
			<q-page class="bg-grey-1">
				<div class="row dashboard-section">
					<div class="col">
						<!-- <center>
							<template v-if="user.role.id === 8">
								<q-btn
									@click="upgrade"
									flat
									rounded
									size="sm"
									class="bg-orange text-white"
									>Upgrade Member</q-btn
								>
								<h6
									class="dashboard-small-text"
									style="font-size: 10px; line-height: 11px; margin-top: 8px"
								>
									Untuk dapatkan keuntungan
									<br />yang lebih besar
								</h6>
							</template>
							<template v-else-if="user.role.id === 10">
								<q-btn
									@click="upgrade"
									flat
									rounded
									size="sm"
									class="bg-orange text-white"
									>Upgrade Member</q-btn
								>
								<h6
									class="dashboard-small-text"
									style="font-size: 10px; line-height: 11px; margin-top: 8px"
								>
									Untuk dapatkan keuntungan
									<br />yang lebih besar
								</h6>
							</template>
						</center> -->
						<div class="row">
							<div class="col">
								<q-list bordered class="bg-white">
                                    <template v-if="user.role.id === 8">
                                        <q-item dense clickable v-ripple @click="upgrade">
                                            <q-item-section avatar>
                                                <q-icon name="backup" />
                                            </q-item-section>

                                            <q-item-section>
                                                <span
                                                    style="font-size: 12px; color: black; line-height: 15px"
                                                >
                                                    Upgrade Membership
                                                </span>
                                            </q-item-section>

                                            <q-item-section side>
                                                <q-icon name="keyboard_arrow_right" />
                                            </q-item-section>
                                        </q-item>

                                        <q-separator />
                                    </template>

									<q-item dense clickable v-ripple>
										<q-item-section avatar>
											<q-icon name="local_activity" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
											>
												Promo & Voucher Saya
												<span
													class="bg-yellow-8 text-black"
													style="padding: 3px 5px; border-radius: 5px; font-size: 10px"
													>soon</span
												>
											</span>
										</q-item-section>

										<q-item-section side>
											<q-icon name="keyboard_arrow_right" />
										</q-item-section>
									</q-item>

									<q-separator />
									<q-item dense clickable v-ripple @click="onCourseClick">
										<q-item-section avatar>
											<q-icon name="book" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
											>
												Kursus Bisnis Online
											</span>
										</q-item-section>

										<q-item-section side>
											<q-icon name="keyboard_arrow_right" />
										</q-item-section>
									</q-item>

									<q-separator />

									<q-item dense clickable v-ripple to="/downloadCatalog">
										<q-item-section avatar>
											<q-icon name="move_to_inbox" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
												>Download Katalog</span
											>
										</q-item-section>

										<q-item-section side>
											<q-icon name="keyboard_arrow_right" />
										</q-item-section>
									</q-item>

									<q-separator />

									<q-item dense clickable v-ripple to="/resetPassword">
										<q-item-section avatar>
											<q-icon name="lock_open" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
												>Reset Password</span
											>
										</q-item-section>

										<q-item-section side>
											<q-icon name="keyboard_arrow_right" />
										</q-item-section>
									</q-item>

									<q-separator />

									<q-item dense clickable v-ripple to="/updatePassword">
										<q-item-section avatar>
											<q-icon name="fas fa-key" style="font-size: 18px" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
												>Ganti Password</span
											>
										</q-item-section>

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

										<q-separator />-->

									<q-item dense clickable v-ripple to="/listCustomer">
										<q-item-section avatar>
											<q-icon name="supervised_user_circle" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
												>Daftar Pelanggan Saya</span
											>
										</q-item-section>

										<q-item-section side>
											<q-icon name="keyboard_arrow_right" />
										</q-item-section>
									</q-item>

									<q-separator
										v-if="user.role.id === 8 || user.role.id === 9"
									/>

									<q-item
										dense
										clickable
										v-ripple
										to="settingStore"
										v-if="user.role.id === 8 || user.role.id === 9"
									>
										<q-item-section avatar>
											<q-icon name="store_mall_directory" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
												>Web Replika Saya</span
											>
										</q-item-section>

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
										</q-item>-->

									<q-item dense clickable v-ripple to="/helpdesk">
										<q-item-section avatar>
											<q-icon name="contact_support" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px"
											>
												<b>Butuh Bantuan?</b>
											</span>
										</q-item-section>

										<q-item-section side>
											<q-icon name="keyboard_arrow_right" />
										</q-item-section>
									</q-item>

									<q-separator />

									<q-item dense clickable v-ripple @click="logout">
										<q-item-section avatar>
											<q-icon name="power_settings_new" />
										</q-item-section>

										<q-item-section>
											<span
												style="font-size: 12px; color: black; line-height: 15px; font-weight: bold"
												class="text-red"
												>Logout</span
											>
										</q-item-section>

										<!-- <q-item-section side>
												<q-icon name="keyboard_arrow_right" />
											</q-item-section>-->
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
										</q-item>-->
								</q-list>
							</div>
						</div>
					</div>
				</div>
			</q-page>
		</template>
	</MainLayout>
</template>

<script>
import Vue from "vue";
import { getHeader, logoutUrl } from "src/config";
import axios from "axios";
// Loading
import { QSpinnerPuff, openURL } from "quasar";
import moment from "moment";

// components
import MainLayout from "../../layouts/MainLayout.vue";
import Navigation from "../../components/Navigation.vue";

const lang = "id";

moment.locale(lang);

Vue.use(require("vue-moment"), { moment });

export default {
	name: "Dashboard",
	components: {
		MainLayout,
		Navigation
	},
	data() {
		return {
			user: {}
		};
	},
	created() {
		this.user = JSON.parse(window.localStorage.getItem("profileUser"));
		this.$q.loading.show({
			spinner: QSpinnerPuff,
			spinnerColor: "black",
			spinnerSize: 50,
			backgroundColor: "grey",
			message: "<b>Mohon Tunggu..</b>",
			messageColor: "black"
		});
		setTimeout(() => {
			this.$q.loading.hide();
		}, 500);
	},
	mounted() {},
	methods: {
		async logout() {
			try {
				const logoutRes = await this.$axios.get(logoutUrl, {
					headers: getHeader()
				});
				window.localStorage.removeItem("authUser");
				window.localStorage.removeItem("profileUser");

				this.$router.push("/");
			} catch (error) {
				console.log(error.response);
				this.$router.push("/login");
			}
		},
		upgrade() {
			openURL("https://serbalaris.orderonline.id/upgrade-eksklusif");
		},
		onCourseClick() {
			if (this.user.role_id == 8) {
				openURL("https://penjualhebat.com/z71nt2pbv9xfxwet-pro/");
			} else if (this.user.role_id == 9) {
				openURL("https://penjualhebat.com/mgwnv57tsntpwvau-eksklusif/");
			}
		}
	}
};
</script>

<style>
.dashboard-section {
	padding: 30px;
}
.dashboard-small-text {
	font-family: "Open Sans";
	font-size: 14px;
	margin: 0px;
	line-height: 16px;
}
</style>
