<template>
	<q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
		<q-page-container>
			<!-- <center>
        <img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
      </center> -->
			<q-page class="flex flex-center bg-layer-1">
				<template v-if="!email">
					<!------------------------>
					<!--- Form Input Email --->
					<!------------------------>
					<div
						class="row bg-white shadow-5 q-pa-lg"
						style="width: 80%; border-radius: 5px; margin-top: 130px"
					>
						<div class="col">
							<h6 style="margin: 0px; font-weight: normal">
								<b>Buat Akun</b> Dengan nomor invoice anda
							</h6>
							<br />
							<label for="" style="font-weight: bolder">Invoice</label>
							<q-input
								v-model="invoice"
								color="orange-8"
								type="text"
								dense
								class="bg-grey-2 q-mb-sm"
								outlined
								placeholder="Masukkan Invoice"
							/>
							<q-btn
								@click="verifyEmail"
								flat
								class="bg-amber-8 full-width q-mb-sm"
							>
								<span
									class="text-white text-capitalize"
									style="font-weight: bolder; font-family: 'Open Sans'"
									>Verifikasi</span
								>
							</q-btn>

							<q-btn
								v-if="preventReactivation"
								@click="() => this.$router.push('/login')"
								flat
								class="full-width bg-green-8 text-white text-capitalize"
								style="font-weight: bolder; font-family: 'Open Sans'"
								label="Login"
								:size="xs"
							/>
						</div>
					</div>
					<div class="row flex-break" style="margin-top: 150px">
						<div class="col">
							<center>
								<img
									src="~/assets/images/components/logo-distrodakwah-small.png"
									width="150px"
								/>
								<p style="color: grey; font-size: 11px">Copyright © 2020</p>
							</center>
						</div>
					</div>
				</template>
				<template v-else>
					<!--------------------------->
					<!--- Form Create Account --->
					<!--------------------------->
					<div class="row logo-distrodakwah">
						<div class="col">
							<!-- <center>
							<img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
						</center>
              <br/>-->

							<!-- <q-btn flat class="bg-amber-8 full-width"><span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">Buat Akun</span></q-btn> -->
							<q-stepper
								v-model="step"
								vertical
								color="orange-8"
								animated
								done-color="light-green-7"
								active-color="amber-8"
								inactive-color="orange-8"
								class="shadow-5"
							>
								<div class="q-py-xs q-px-lg">
									<h1 class="create-account-text text-black">Buat Akun</h1>
									<p
										class="create-account-small-text text-center text-black text-bold"
									>
										Satu akun untuk dapatkan berbagai macam keuntungan di
										Distrodakwah.id
									</p>
								</div>
								<q-step
									:name="1"
									title="Informasi Login"
									icon="lock"
									:done="step > 1"
								>
									<q-banner dense class="bg-grey-2 q-mb-sm">
										{{ email }}
									</q-banner>
									<q-input
										v-model="password"
										color="orange-8"
										type="password"
										dense
										class="bg-grey-2 q-mb-sm"
										outlined
										placeholder="Kata Sandi"
									/>
									<q-input
										v-model="passwordConfirmation"
										color="orange-8"
										type="password"
										dense
										class="bg-grey-2 q-mb-sm"
										outlined
										placeholder="Konfirmasi Kata Sandi"
									/>

									<q-stepper-navigation>
										<q-btn flat class="bg-amber-8" @click="step = 2">
											<span
												class="text-white"
												style="font-weight: bolder; font-family: 'Open Sans'"
												>Lanjut</span
											>
										</q-btn>
									</q-stepper-navigation>
								</q-step>

								<q-step
									:name="2"
									title="Informasi Pribadi"
									icon="how_to_reg"
									:done="step > 2"
								>
									<q-input
										v-model="name"
										color="orange-8"
										type="text"
										dense
										class="bg-grey-2 q-mb-sm"
										outlined
										placeholder="Masukkan Nama Lengkap"
									/>
									<q-input
										v-model="phone"
										prefix="+62"
										color="orange-8"
										type="text"
										dense
										class="bg-grey-2 q-mb-sm"
										outlined
										placeholder="Masukkan No Handphone"
									/>
									<label>Tanggal Lahir :</label>
									<div>
										<q-select
											color="orange-8"
											dense
											options-dense
											outlined
											:options="dateBirthdayOpt"
											v-model="dateSelected"
											label="Tanggal"
											class="bg-grey-2 q-mb-sm"
											@input="finalBirthday"
										/>
										<q-select
											color="orange-8"
											dense
											options-dense
											outlined
											:options="monthBirthdayOpt"
											v-model="monthSelected"
											label="Bulan"
											class="bg-grey-2 q-mb-sm"
											@input="finalBirthday"
										/>
										<q-select
											color="orange-8"
											dense
											options-dense
											outlined
											:options="yearBirthdayOpt"
											v-model="yearSelected"
											label="Tahun"
											class="bg-grey-2 q-mb-sm"
											@input="finalBirthday"
										/>
									</div>
									<label>Jenis Kelamin:</label>
									<div class="gender">
										<q-radio
											color="amber-8"
											v-model="gender"
											val="male"
											label="Pria"
										/>
										<q-radio
											color="amber-8"
											v-model="gender"
											val="female"
											label="Wanita"
										/>
									</div>

									<q-stepper-navigation>
										<q-btn flat @click="step = 3" class="bg-amber-8">
											<span
												class="text-white"
												style="font-weight: bolder; font-family: 'Open Sans'"
												>Lanjut</span
											>
										</q-btn>
										<q-btn
											flat
											@click="step = 1"
											color="amber-8"
											class="q-ml-sm"
										>
											<span
												style="font-weight: bolder; font-family: 'Open Sans'"
												>Kembali</span
											>
										</q-btn>
									</q-stepper-navigation>
								</q-step>

								<q-step :name="3" title="Informasi Alamat" icon="home">
									<q-input
										v-model="address"
										rows="3"
										color="orange-8"
										type="textarea"
										dense
										class="bg-grey-2 q-mb-sm"
										outlined
										placeholder="Masukkan Alamat Lengkap"
									/>
									<!-- <q-input v-model="subdistrict" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Kecamatan" />
								<q-input v-model="city" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Kabupaten/Kota" />
                  <q-input v-model="province" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Provinsi" />-->
									<q-select
										color="orange-8"
										dense
										outlined
										v-model="provinceSelected"
										:options="dataProvince"
										:option-value="opt => opt"
										option-label="province"
										label="Provinsi"
										emit-value
										map-options
										@input="getCity"
										class="bg-grey-2 q-mb-sm"
									/>
									<q-select
										color="orange-8"
										dense
										outlined
										v-model="citySelected"
										:options="dataCity"
										:option-value="opt => opt"
										:option-label="opt => opt.type + ' ' + opt.city"
										label="Kota/Kabupaten"
										emit-value
										map-options
										@input="getSubdistrict"
										class="bg-grey-2 q-mb-sm"
									/>
									<q-select
										color="orange-8"
										dense
										outlined
										v-model="subdistrictSelected"
										:options="dataSubdistrict"
										:option-value="opt => opt"
										option-label="subdistrict"
										label="Kecamatan"
										emit-value
										map-options
										@input="setAddress"
										class="bg-grey-2 q-mb-sm"
									/>

									<q-stepper-navigation>
										<q-btn
											flat
											@click="step = 2"
											color="amber-8"
											class="q-ml-sm"
										>
											<span
												style="font-weight: bolder; font-family: 'Open Sans'"
												>Kembali</span
											>
										</q-btn>
										<q-btn flat @click="createAccount" class="bg-amber-8">
											<span
												class="text-white"
												style="font-weight: bolder; font-family: 'Open Sans'"
												>Selesai</span
											>
										</q-btn>
									</q-stepper-navigation>
								</q-step>
							</q-stepper>
							<!-- <center>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Yris35E2Qqm-zDd2-j2jzYxg6fERvMjK56cmD3e4WG9bLF1m"
                  width="120"
                />
              </center> -->
						</div>
					</div>
				</template>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import DropdownDatepicker from "../../components/shared/dropdown-datepicker";
import Vue from "vue";
import moment from "moment";
import { QSpinnerPuff, QSpinnerDots } from "quasar";

const lang = "id";
moment.locale(lang);
Vue.use(require("vue-moment"), { moment });

import {
	apiDomain,
	createAccountUrl,
	getProvinceNoAuthUrl,
	getCityNoAuthUrl,
	getSubdistrictNoAuthUrl,
	getHeader
} from "src/config";

export default {
	name: "CreateAccount",
	components: {
		DropdownDatepicker
	},
	data() {
		return {
			step: 1,
			invoice: "",
			dataUser: [],
			roleName: null,
			// Form Create Account
			email: "",
			password: "",
			passwordConfirmation: "",
			name: "",
			phone: "",
			gender: "",
			birthday: "",
			address: "",
			province: "",
			city: "",
			subdistrict: "",
			// Birthday Option
			dateSelected: "",
			monthSelected: "",
			yearSelected: "",
			dateBirthdayOpt: [
				"01",
				"02",
				"03",
				"04",
				"05",
				"06",
				"07",
				"08",
				"09",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17",
				"18",
				"19",
				"20",
				"21",
				"22",
				"23",
				"24",
				"25",
				"26",
				"27",
				"28",
				"29",
				"30",
				"31"
			],
			monthBirthdayOpt: [],
			yearBirthdayOpt: null,
			// Data Province, City, and Subdistrict
			subdistrictSelected: null,
			citySelected: null,
			provinceSelected: null,
			dataProvince: [],
			dataCity: [],
			dataSubdistrict: [],
			preventReactivation: false
		};
	},
	computed: {},
	mounted() {
		this.$q.loading.hide();
		this.getProvince();
		this.generateYearsnMonth();
	},
	methods: {
		getProvince() {
			this.$axios
				.get(getProvinceNoAuthUrl)
				.then(response => {

					if (response.status === 200) {
						this.dataProvince = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		getCity() {
			this.citySelected = null;

			this.$axios
				.get(getCityNoAuthUrl + "/" + this.provinceSelected.id)
				.then(response => {

					if (response.status === 200) {
						this.dataCity = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		getSubdistrict() {
			this.subdistrictSelected = null;

			this.$axios
				.get(getSubdistrictNoAuthUrl + "/" + this.citySelected.id)
				.then(response => {

					if (response.status === 200) {
						this.dataSubdistrict = response.data.data;
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
					}
				});
		},
		setAddress() {
			// Set Province
			this.province = this.provinceSelected.province;
			// Set City
			this.city = this.citySelected.type + " " + this.citySelected.city;
			// Set Subdistrict
			this.subdistrict = this.subdistrictSelected.subdistrict;
		},
		async verifyEmail() {
			this.$q.loading.show({
				spinner: QSpinnerPuff,
				spinnerColor: "black",
				spinnerSize: 50,
				backgroundColor: "grey",
				message: "<b>Mohon Tunggu..</b>",
				messageColor: "black"
			});
			//check contains whitespaces
			if (this.invoice !== "" && /\s/.test(this.invoice) === false) {
				// Set Verify Email
				let OO_Auth, OO_Cred, OO_GetUser, OO_AccessToken, V1User, userRes;
				const OO_GetUserParams = {
					limit: 1,
					sort_by: "payment.status",
					sort: "asc",
					page: 1,
					since: "2018-09-27",
					until: this.dateNow(),
					keyword: this.invoice,
					payment_status: "paid"
				};
				let emailParam = { email: this.invoice };

				try {
					userRes = await this.$axios.get(apiDomain + "/auth/searchUser", {
						headers: getHeader(),
						params: emailParam
					});
				} catch (error) {
					console.log(error.response.data.error);
				}
				//registered/exists?

				if (userRes.data !== "does not exist") {
					setTimeout(() => {
						this.$q.notify({
							progress: true,
							position: "bottom",
							color: "red-8",
							message: "<b>Email Sudah Pernah Terdaftar! Silahkan Login</b>",
							html: true
						});
					}, 500);
					this.preventReactivation = true;
					this.$q.loading.hide();
					return -1;
				}

				try {
					V1User = await this.$axios.get(`${apiDomain}/auth/old_user`, {
						params: emailParam
					});
				} catch (error) {
					console.log(error.response.data.error);
					V1User = error.response.data.error;
				}
				if (V1User !== "not found") {
					this.roleName =
						V1User.data.role_name === "Reseller Exclusive"
							? "Reseller Exclusive"
							: "Reseller Pro";
				}
				// authorize
				OO_Cred = new FormData();
				OO_Cred.set("email", "vanprelid2@gmail.com");
				OO_Cred.set("password", "qwerty1234");

				try {
					OO_Auth = await this.$axios.post(
						"https://api.orderonline.id/auth",
						OO_Cred
					);
					OO_AccessToken = OO_Auth.data.data.access_token;
				} catch (error) {}
				//findUser in orderonline
				try {
					let config = {
						headers: {
							Accept: "application/json",
							Authorization: "Bearer " + OO_AccessToken
						},
						params: OO_GetUserParams
					};

					OO_GetUser = await this.$axios.get(
						"https://api.orderonline.id/submission",
						config
					);
				} catch (error) {}
				//empty means not found
				// find on another account
				if (OO_GetUser.data.data.length === 0) {
					OO_Cred = new FormData();
					OO_Cred.set("email", "kangdesu97@gmail.com");
					OO_Cred.set("password", "dd1234");

					try {
						OO_Auth = await this.$axios.post(
							"https://api.orderonline.id/auth",
							OO_Cred
						);
						OO_AccessToken = OO_Auth.data.data.access_token;
					} catch (error) {}

					try {
						const config = {
							headers: {
								Accept: "application/json",
								Authorization: "Bearer " + OO_AccessToken
							},
							params: OO_GetUserParams
						};

						OO_GetUser = await this.$axios.get(
							"https://api.orderonline.id/submission",
							config
						);
					} catch (error) {}
				}

				if (OO_GetUser.data.data.length > 0) {
					if (V1User === "not found") {
						this.roleName = OO_GetUser.data.data[0].product_name; // get OO role
					} else if(V1User.data.role_name === "Reseller Exclusive"){ // get old role (exclusive)
						this.roleName = "Reseller Exclusive"
					} else {
						this.roleName = OO_GetUser.data.data[0].product_name; // get OO Role
					}

					this.email = OO_GetUser.data.data[0].customer_data.email;
					this.phone = OO_GetUser.data.data[0].customer_data.phone.replace(
						"+62",
						""
					);
				} else {
					try {
						console.log('asssssssssssssssss');
						const DBV1User = await this.$axios.get(
							apiDomain + "/auth/old_user",
							{
								params: emailParam
							}
						);
						this.dataUser = DBV1User.data;
						this.email = this.dataUser.email;
						this.roleName = this.dataUser.role_name;

						this.phone = this.dataUser.phone;
					} catch (error) {
						this.preventReactivation = false;
						setTimeout(() => {
							this.$q.notify({
								progress: true,
								position: "bottom",
								color: "red-8",
								message: "<b>Email</b> Belum Terdaftar!",
								html: true
							});
						}, 500);
					}
				}

				this.$q.loading.hide();
			} else {
				setTimeout(() => {
					this.$q.notify({
						progress: true,
						position: "bottom",
						color: "red-8",
						message: "<b>Email</b> Salah atau mengandung spasi!",
						html: true
					});
				}, 500);
			}
			this.$q.loading.hide();
		},
		createAccount() {

			if (this.email === "") {
				this.notifForm("Email");
			} else if (this.password === "") {
				this.notifForm("Kata Sandi");
			} else if (this.passwordConfirmation === "") {
				this.notifForm("Konfirmasi Kata Sandi");
			} else if (this.name === "") {
				this.notifForm("Nama");
			} else if (this.phone === "") {
				this.notifForm("No Handphone");
			} else if (this.gender === "") {
				this.notifForm("Jenis Kelamin");
			} else if (this.birthday === "") {
				this.notifForm("Tanggal Lahir");
			} else if (this.address === "") {
				this.notifForm("Alamat");
			} else if (this.subdistrict === "") {
				this.notifForm("Kecamatan");
			} else if (this.city === "") {
				this.notifForm("Kota/Kabupaten");
			} else if (this.province === "") {
				this.notifForm("Provinsi");
			} else if (this.password !== this.passwordConfirmation) {
				setTimeout(() => {
					this.$q.notify({
						progress: true,
						position: "bottom",
						color: "red-8",
						message: "<b>Konfirmasi Password</b> Tidak Sama!",
						html: true
					});
				}, 500);
			} else {
				let createForm = new FormData();

				createForm.set("name", this.name);
				createForm.set("email", this.email);
				createForm.set("password", this.password);
				createForm.set("password_confirmation", this.passwordConfirmation);
				createForm.set("phone", this.phone);
				createForm.set("province", this.province);
				createForm.set("city", this.city);
				createForm.set("subdistrict", this.subdistrict);
				createForm.set("address", this.address);
				createForm.set("gender", this.gender);
				createForm.set("birthday", this.birthday);

				const exclusiveRoleList = ["reseller eksklusif", "reseller exclusive"];
				const proRoleList = ["reseller pro"];
				let filteredRoleName = null;
				for (let i = 0; i < exclusiveRoleList.length; i++) {
					// TODO IMPROVE HERE
					if (this.roleName.toLowerCase().includes(exclusiveRoleList[i])) {
						filteredRoleName = "reseller exclusive";
						break;
					}
					if (this.roleName.toLowerCase().includes(proRoleList[i])) {
						filteredRoleName = "reseller pro";
					}
				}

				if (filteredRoleName === "reseller pro") {
					createForm.set("role_id", 8);
				} else if (filteredRoleName === "reseller exclusive") {
					createForm.set("role_id", 9);
				}
				this.$axios
					.post(createAccountUrl, createForm)
					.then(response => {
						if (response.status === 201) {
							this.$router.push("/login/createsuccess");
						}
					})
					.catch(error => {
						if (error.response) {
							console.log(error.response);
							console.log(error.response.data.error.email[0]);
							if (
								error.response.data.error.email[0] ===
								"The email has already been taken."
							) {
								setTimeout(() => {
									this.$q.notify({
										progress: true,
										position: "bottom",
										color: "green",
										message: "Mohon maaf! Email Sudah Terdaftar!",
										html: true
									});
								}, 2000);
							}
						}
					});
			}
		},
		notifForm(field) {
			setTimeout(() => {
				this.$q.notify({
					progress: true,
					position: "bottom",
					color: "red-8",
					message: "Kolom " + field.bold() + " Belum Diisi!",
					html: true
				});
			}, 500);
		},
		dateNow() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; //January is 0!

			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = "0" + dd;
			}
			if (mm < 10) {
				mm = "0" + mm;
			}
			var today = yyyy + "-" + mm + "-" + dd;
			return today;
		},
		finalBirthday() {
			var newBirthday = null;
			if (
				this.dateSelected != "" &&
				this.monthSelected != "" &&
				this.yearSelected != ""
			) {
				newBirthday =
					this.yearSelected +
					"-" +
					this.monthSelected.value +
					"-" +
					this.dateSelected;
			}
			this.birthday = newBirthday;
		},
		generateYearsnMonth() {
			var currentYear = new Date().getFullYear(),
				years = [];
			var startYear = 1900;
			while (startYear <= currentYear) {
				years.push(startYear++);
			}
			this.yearBirthdayOpt = years;

			this.monthBirthdayOpt.push(
				{
					label: "Januari",
					value: "01"
				},
				{
					label: "Februari",
					value: "02"
				},
				{
					label: "Maret",
					value: "03"
				},
				{
					label: "April",
					value: "04"
				},
				{
					label: "Mei",
					value: "05"
				},
				{
					label: "Juni",
					value: "06"
				},
				{
					label: "Juli",
					value: "07"
				},
				{
					label: "Agustus",
					value: "08"
				},
				{
					label: "September",
					value: "09"
				},
				{
					label: "Oktober",
					value: "10"
				},
				{
					label: "November",
					value: "11"
				},
				{
					label: "Desember",
					value: "12"
				}
			);
		}
	}
};
</script>

<style>
.logo-distrodakwah {
	padding: 30px;
	display: flex;
}

.create-account-text {
	font-size: 26px;
	font-weight: bolder;
	font-family: "Open Sans";
	margin-top: 0px;
	margin-bottom: 0px;
	line-height: 1.5em;
	text-align: center;
}
.create-account-small-text {
	font-family: "Open Sans";
	font-size: 12px;
	margin-top: 0px;
	padding-left: 2px;
}
.forgot-password-text {
	font-size: 12px;
}

.dd-datepicker {
	display: flex;
	flex-direction: column;
	font-weight: 400;
}

.dd-datepicker > * {
	margin: 5px;
}

.bg-layer-1 {
	background: rgb(254, 165, 0);
	background: linear-gradient(
		180deg,
		rgba(254, 165, 0, 1) 0%,
		rgba(254, 191, 0, 1) 30%,
		rgba(255, 255, 255, 1) 30%
	);
}
</style>
