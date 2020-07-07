<template>
	<q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
		<q-page-container>
			<q-page>
				<div class="bg-layer-1-login">
					<div class="bg-layer-2-login">
						<div class="row logo-distrodakwah">
							<div class="col">
								<div style="margin-top: 50px">
									<center>
										<img
											src="~/assets/images/components/logo-distrodakwah.png"
											width="200px"
										/>
									</center>
								</div>

								<div
									class="shadow-5 bg-white q-pa-lg"
									style="border-radius: 8px; margin-top: 30px"
								>
									<h5
										class="text-center text-bold"
										style="margin: 0; font-family: 'Open Sans'"
									>
										Login Reseller
									</h5>
									<br />
									<!-- <p class="login-small-text">
                    Untuk dapatkan berbagai macam
                    <br />keuntungan di Distrodakwah.id
                  </p> -->
									<q-input
										v-model="email"
										color="orange-8"
										type="text"
										dense
										class="bg-grey-2 q-mb-sm"
										outlined
										placeholder="Masukkan Email"
									/>
									<q-input
										v-model="password"
										color="orange-8"
										class="bg-grey-2 q-mb-sm"
										outlined
										dense
										:type="isPwd ? 'password' : 'text'"
										placeholder="Kata Sandi"
									>
										<template v-slot:append>
											<q-icon
												:name="isPwd ? 'visibility_off' : 'visibility'"
												class="cursor-pointer"
												@click="isPwd = !isPwd"
											/>
										</template>
									</q-input>
									<div class="row q-py-xs">
										<div class="col-6">
											<q-checkbox
												dense
												v-model="rememberMe"
												val="true"
												color="orange-8"
												size="sm"
											/>
											<span
												class="forgot-password-text"
												style="margin: 5px 0; font-weight: 500; margin-left: 5px; font-size: 12px"
												>Ingat saya</span
											>
										</div>
										<div class="col-6 text-right">
											<span
												class="forgot-password-text"
												style="margin: 5px 0; font-weight: 500; margin-left: 5px; font-size: 12px; cursor:pointer;"
												@click="$router.push('/resetPassword')"
												>Lupa Password?</span
											>
										</div>
									</div>
									<br />
									<q-btn
										@click="submitLogin"
										flat
										class="bg-amber-8 full-width"
									>
										<span
											class="text-white text-capitalize"
											style="font-weight: bolder; font-family: 'Open Sans'"
											>Masuk</span
										>
									</q-btn>
									<hr
										style="border-bottom: 1px solid #F8F8F8; margin: 15px 0"
									/>
									<p class="login-small-text text-center text-bold">
										Belum Punya Akun?
									</p>
									<q-btn to="/activation" flat class="bg-amber-8 full-width">
										<span
											class="text-white text-capitalize"
											style="font-weight: bolder; font-family: 'Open Sans'"
											>Buat Akun</span
										>
									</q-btn>
								</div>
							</div>
						</div>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import axios from "axios";
import {
	apiDomain,
	loginUrl,
	signGoogleUrl,
	signFacebookUrl,
	getHeader
} from "src/config";

export default {
	name: "PageIndex",
	data() {
		return {
			email: null,
			password: null,
			isPwd: true,
			rememberMe: true
		};
	},
	created() {
		this.$q.loading.hide();
		if (this.$route.params.message === "createsuccess") {
			setTimeout(() => {
				this.$q.notify({
					progress: true,
					position: "bottom",
					color: "green-8",
					message: "Yes! Akun Berhasil Dibuat, Silahkan Login..",
					html: true
				});
			}, 500);
		}
	},
	methods: {
		toActivation() {
			this.$router.push("/activation");
		},
		async submitLogin() {
			const postData = {
				email: this.email,
				password: this.password
			};

			if (
				this.email === null ||
				this.password === null ||
				this.email === "" ||
				this.password === ""
			) {
				setTimeout(() => {
					this.$q.notify({
						progress: true,
						position: "bottom",
						color: "red-8",
						message: "Email dan Password tidak boleh kosong",
						html: true
					});
				}, 500);

				return;
			}

			try {
				const authRes = await this.$axios.post(loginUrl, postData);

				window.localStorage.setItem("authUser", JSON.stringify(authRes.data)); // simpan token

				this.$store.dispatch("globalState/getUserProfile");
				let url = apiDomain + "/auth/user";
				axios
					.get(url, { headers: getHeader() }) // ambil user profile
					.then(response => {
						window.localStorage.setItem(
							"profileUser",
							JSON.stringify(response.data)
						);
						// this.loginSukses = true // I assume that you would not want to leave it open upon navigating away
						// this.$router.replace(this.$route.query.redirect || '/')
						this.$router.push({
							path: "/",
							redirect: this.$route.query.redirect
						});
					});
			} catch (error) {
				if (error) {
					setTimeout(() => {
						this.$q.notify({
							progress: true,
							position: "bottom",
							color: "red-8",
							message: "Login Gagal!, Email atau Password Salah!",
							html: true
						});
					}, 500);
					if (
						error.response.data.message ===
						"Login Failed!, Email Not Registered!"
					) {
						setTimeout(() => {
							this.$q.notify({
								progress: true,
								position: "bottom",
								color: "red-8",
								message: "Login Gagal!, Email Belum Terdaftar!",
								html: true
							});
						}, 500);
					} else if (error.response.data.message === "Unauthorized") {
						setTimeout(() => {
							this.$q.notify({
								progress: true,
								position: "bottom",
								color: "red-8",
								message: "Login Gagal!, Email atau Password Salah!",
								html: true
							});
						}, 500);
					} else {
						setTimeout(() => {
							this.$q.notify({
								progress: true,
								position: "bottom",
								color: "red-8",
								message: "Login Gagal!, Email Belum Terdaftar!",
								html: true
							});
						}, 500);
					}
				} else {
					setTimeout(() => {
						this.$q.notify({
							progress: true,
							position: "bottom",
							color: "red-8",
							message: "Login Gagal!, Email Belum Terdaftar!",
							html: true
						});
					}, 500);
				}
			}
		}
	}
};
</script>

<style>
.logo-distrodakwah {
	padding: 30px;
}
.login-text {
	font-size: 36px;
	font-weight: bolder;
	font-family: "Open Sans";
	margin-bottom: 0px;
	line-height: 1.5em;
}
.login-small-text {
	font-family: "Open Sans";
	font-size: 12px;
	margin-top: 0px;
	padding-left: 2px;
}
.forgot-password-text {
	font-size: 16px;
}
.bg-layer-2-login {
	height: 100vh !important;
	background-image: url("../../assets/images/components/bg-ramadhan.png");
	background-position: bottom;
	background-repeat: no-repeat;
	background-size: 100%;
}
.bg-layer-1-login {
	height: 100vh !important;
	background: rgb(254, 165, 0);
	background: linear-gradient(
		180deg,
		rgba(254, 165, 0, 1) 0%,
		rgba(254, 191, 0, 1) 100%,
		rgba(255, 255, 255, 1) 100%
	);
}
</style>
