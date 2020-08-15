<template>
  <q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
  	<q-page-container>
		<q-page class="bg-white flex flex-center">
			<div class="row logo-distrodakwah">
				<div class="col">
					<!-- <center>
						<img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
					</center>
					<br/> -->
					<h1 class="create-account-text">Buat Akun Gratis</h1>
					<p class="create-account-small-text text-center">Satu akun untuk dapatkan berbagai macam<br/>keuntungan di Distrodakwah.id</p>

					<!-- <q-btn flat class="bg-amber-8 full-width"><span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">Buat Akun</span></q-btn> -->
					<q-stepper
						v-model="step"
						vertical
						color="orange-8"
						animated
						flat
						bordered
						done-color="light-green-7"
						active-color="amber-8"
						inactive-color="orange-8"
					>
						<q-step
							:name="1"
							title="Informasi Login"
							icon="lock"
							:done="step > 1"
						>
							<q-input v-model="email" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Email" />
							<q-input v-model="password" color="orange-8" type="password" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Kata Sandi" />
							<q-input v-model="passwordConfirmation" color="orange-8" type="password" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Konfirmasi Kata Sandi" />

							<q-stepper-navigation>
							<q-btn flat class="bg-amber-8" @click="step = 2"><span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">Lanjut</span></q-btn>
							</q-stepper-navigation>
						</q-step>

						<q-step
							:name="2"
							title="Informasi Pribadi"
							icon="how_to_reg"
							:done="step > 2"
						>
							<q-input v-model="name" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Nama Lengkap" />
							<q-input v-model="phone" prefix="+62" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan No Handphone" />
							<!-- <q-input color="orange-8" dense class="bg-grey-2 q-mb-sm" outlined v-model="birthday" placeholder="Pilih Tanggal Lahir">
								<template v-slot:append>
									<q-icon name="event" class="cursor-pointer">
									<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
										<q-date minimal color="orange-8" v-model="birthday" mask="YYYY-MM-DD" @input="() => $refs.qDateProxy.hide()" />
									</q-popup-proxy>
									</q-icon>
								</template>
							</q-input> -->
							<label>Tanggal Lahir :</label>
							<div class="q-field row no-wrap items-start bg-grey-2 q-mb-sm q-input q-field--outlined q-field--float q-field--dense">
								<div class="q-field__inner relative-position col self-stretch column justify-center">
									<div class="q-field__control relative-position row no-wrap text-orange-8">
										<div class="q-field__control-container col relative-position row no-wrap q-anchor--skip">
											<flat-pickr v-model="birthday" class="q-field__native" placeholder="Pilih Tanggal Lahir"></flat-pickr>
										</div>
									</div>
								</div>
							</div>
							<q-radio color="amber-8" v-model="gender" val="male" label="Pria" />
							<q-radio color="amber-8" v-model="gender" val="female" label="Wanita" />

							<q-stepper-navigation>
							<q-btn flat @click="step = 3" class="bg-amber-8"><span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">Lanjut</span></q-btn>
							<q-btn flat @click="step = 1" color="amber-8" class="q-ml-sm"><span style="font-weight: bolder; font-family: 'Open Sans'">Kembali</span></q-btn>
							</q-stepper-navigation>
						</q-step>

						<q-step
							:name="3"
							title="Informasi Alamat"
							icon="home"
						>
							<q-input v-model="address" rows="3" color="orange-8" type="textarea" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Alamat Lengkap" />
							<!-- <q-input v-model="subdistrict" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Kecamatan" />
							<q-input v-model="city" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Kabupaten/Kota" />
							<q-input v-model="province" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Provinsi" /> -->
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
				              style="margin-bottom: 5px"
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
				              style="margin-bottom: 5px"
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
				              style="margin-bottom: 5px"
				            />


							<q-stepper-navigation>
							<q-btn flat @click="step = 2" color="amber-8" class="q-ml-sm"><span style="font-weight: bolder; font-family: 'Open Sans'">Kembali</span></q-btn>
							<q-btn flat @click="createAccount" class="bg-amber-8"><span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">Selesai</span></q-btn>
							</q-stepper-navigation>
						</q-step>
					</q-stepper>
					<center>
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Yris35E2Qqm-zDd2-j2jzYxg6fERvMjK56cmD3e4WG9bLF1m" width="120" />
					</center>
				</div>
			</div>
		</q-page>
  	</q-page-container>
  </q-layout>
</template>

<style>
	.logo-distrodakwah{
		padding: 30px;
	}
	.create-account-text{
		font-size: 26px;
		font-weight: bolder;
		font-family: 'Open Sans';
		margin-top: 0px;
		margin-bottom: 0px;
		line-height: 1.5em;
        text-align: center;
	}
	.create-account-small-text{
		font-family: 'Open Sans';
		font-size: 12px;
		margin-top: 0px;
		padding-left: 2px;
	}
	.forgot-password-text{
		font-size: 12px;
	}
</style>

<script>
import axios from 'axios';
import { createAccountUrl, getProvinceNoAuthUrl, getCityNoAuthUrl, getSubdistrictNoAuthUrl, getHeader } from 'src/config';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'CreateAccountFree',
  components: {
  	flatPickr
  },
  data () {
    return {
	  step: 1,
	  // Form Create Account
      email: '',
	  password: '',
	  passwordConfirmation: '',
	  name: '',
	  phone: '',
	  gender: '',
	  birthday: '',
	  address: '',
	  province: '',
	  city: '',
	  subdistrict: '',
	  // Data Province, City, and Subdistrict
	  subdistrictSelected: null,
	  citySelected: null,
	  provinceSelected: null,
	  dataProvince: [],
      dataCity: [],
      dataSubdistrict: [],
    }
  },
  mounted () {
    this.getProvince();
  },
  methods: {
  	getProvince () {

      axios.get( getProvinceNoAuthUrl )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataProvince = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    getCity () {

      this.citySelected = null;

      axios.get( getCityNoAuthUrl + '/' + this.provinceSelected.id )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataCity = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    getSubdistrict () {

      this.subdistrictSelected = null;

      axios.get( getSubdistrictNoAuthUrl + '/' + this.citySelected.id )
        .then(response => {
          console.log(response)

          if (response.status === 200) {
            this.dataSubdistrict = response.data.data;
          }

        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })

    },
    setAddress () {

    	// Set Province
      	this.province = this.provinceSelected.province;
      	// Set City
	    this.city = this.citySelected.type + ' ' + this.citySelected.city;
	    // Set Subdistrict
	    this.subdistrict = this.subdistrictSelected.subdistrict;

    },
    createAccount () {
		if( this.email === '' ){
			this.notifForm('Email');
		}
		else if( this.password === '' ){
			this.notifForm('Kata Sandi');
		}
		else if( this.passwordConfirmation === '' ){
			this.notifForm('Konfirmasi Kata Sandi');
		}
		else if( this.name === '' ){
			this.notifForm('Nama');
		}
		else if( this.phone === '' ){
			this.notifForm('No Handphone');
		}
		else if( this.gender === '' ){
			this.notifForm('Jenis Kelamin');
		}
		else if( this.birthday === '' ){
			this.notifForm('Tanggal Lahir');
		}
		else if( this.address === '' ){
			this.notifForm('Alamat');
		}
		else if( this.subdistrict === '' ){
			this.notifForm('Kecamatan');
		}
		else if( this.city === '' ){
			this.notifForm('Kota/Kabupaten');
		}
		else if( this.province === '' ){
			this.notifForm('Provinsi');
		}else if( this.password !== this.passwordConfirmation ){
			this.$q.notify({position: 'top', color: 'red-4', message: '<b>Konfirmasi Password</b> Tidak Sama!', html: true});
		}
		else{

			let createForm = new FormData();

			createForm.set('name', this.name);
			createForm.set('email', this.email);
			createForm.set('password', this.password);
			createForm.set('password_confirmation', this.passwordConfirmation);
			createForm.set('phone', this.phone);
			createForm.set('province', this.province);
			createForm.set('city', this.city);
			createForm.set('subdistrict', this.subdistrict);
			createForm.set('address', this.address);
			createForm.set('gender', this.gender);
			createForm.set('birthday', this.birthday);
			createForm.set('role_id', 10);

			axios.post(createAccountUrl, createForm).then(response => {

				if(response.status === 201){
					this.$router.push('/login/createsuccess');
				}

			}).catch(error => {

				if (error.response) {
					console.log(error.response)
					console.log(error.response.data.error.email[0])
					if(error.response.data.error.email[0] === 'The email has already been taken.'){
						this.$q.notify({position: 'top', color: 'red-4', message: 'Mohon maaf! Email Sudah Terdaftar!', html: true});
					}
				}

			})

		}
	},
	notifForm (field) {
		this.$q.notify({position: 'top', color: 'red-4', message: 'Kolom ' + field.bold() + ' Belum Diisi!', html: true});
	},
	dateNow () {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
		dd = '0' + dd;
		}
		if (mm < 10) {
		mm = '0' + mm;
		}
		var today = yyyy + '-' + mm + '-' + dd;
		return today;
	}
  }
}
</script>
