<template>
  <q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
    <q-page-container>
      <q-page class="bg-white">
        <div class="row logo-distrodakwah">
          <div class="col">
            <img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
            <br/>
            <h1 class="login-text">LOGIN</h1>
            <p class="login-small-text">Untuk dapatkan berbagai macam<br/>keuntungan di Distrodakwah.id</p>
            <q-input v-model="email" color="orange-8" type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Email" />
            <q-input v-model="password" color="orange-8" type="password" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Kata Sandi" />
            <div class="text-right">
              <p class="forgot-password-text text-amber-8" style="margin-bottom: 10px">Lupa Kata Sandi?</p>
            </div>
            <q-btn @click="submitLogin" flat class="bg-amber-8 full-width"><span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">MASUK</span></q-btn>
            <br/>
            <center>
              <img src="~/assets/images/components/coin-big.png" style="width: 80%; margin-top: 35px" />
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
	.login-text{
		font-size: 36px;
		font-weight: bolder;
		font-family: 'Open Sans';
		margin-bottom: 0px;
		line-height: 1.5em;
	}
	.login-small-text{
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
import {apiDomain, loginUrl, signGoogleUrl, signFacebookUrl, getHeader} from 'src/config';

export default {
  name: 'PageIndex',
  data () {
    return {
      email: null,
      password: null,
    }
  },
  created () {
    if(this.$route.params.message === 'createsuccess'){
      this.$q.notify({position: 'top', color: 'green', message: 'Yes! Akun Berhasil Dibuat, Silahkan Login..', html: true});
    }
  },
  methods: {
    submitLogin () {
        const postData = {
          email: this.email,
          password: this.password
        }

        console.log(postData)
        const authUser = {}

        axios.post(loginUrl, postData)
          .then(response => {
            console.log(postData)

            if (response.status === 200) {

              authUser.access_token = response.data.access_token
              authUser.refresh_token = response.data.refresh_token

              window.localStorage.setItem('authUser', JSON.stringify(authUser))// simpan token
              
              let url = apiDomain + '/auth/user'
              axios.get(url, {headers: getHeader()})// ambil user profile
                .then(response => {
                  window.localStorage.setItem('profileUser', JSON.stringify(response.data))
                  // this.loginSukses = true // I assume that you would not want to leave it open upon navigating away
                  // this.$router.replace(this.$route.query.redirect || '/')
                  this.$router.push({ path: '/', redirect: this.$route.query.redirect })
                })

            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data.message)
            }
          })

    }
  }
}
</script>
