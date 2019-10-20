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
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Kasih Masukkan</span></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
      <q-page class="bg-grey-2">
        <div class="row dashboard-section">
          <div class="col">
            <q-card bordered class="shadow-1">
              <q-card-section>
                <div class="q-pa-xs">
                  <div style="font-size: 14px; margin: 0 0 5px 0; font-weight: bold">Masukkan Anda :</div>
                  <q-input dense outlined color="orange-8" type="textarea" rows="8" placeholder="Isi Masukkan Anda Disini.." v-model="feedback" />
                </div>
              </q-card-section>
            </q-card>
            <br/>
            <q-card bordered class="shadow-1">
              <q-card-section>
                <div class="q-pa-xs">
                    <q-btn flat class="bg-orange-8 text-white text-capitalize full-width" @click="sendFeedback">Kirim Masukkan</q-btn>
                </div>
              </q-card-section>
            </q-card>
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
import axios from 'axios';
import { identityFeedbackUrl, getHeader } from 'src/config';
// Loading
import { QSpinnerPuff } from 'quasar'

export default {
  name: 'Feedback',
  data () {
    return {
      user: null,
      feedback: '',
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
  methods: {
    sendFeedback () {

        let postData = new FormData();

        postData.set('feedback', this.feedback);
        postData.set('user_id', this.user.id);
        postData.set('user_name', this.user.name);
        postData.set('user_email', this.user.email);
        postData.set('user_phone', this.user.phone);
        postData.set('user_role', this.user.role.role_name);

        axios.post(identityFeedbackUrl, postData, {headers: getHeader()}).then(response => {

            if(response.status === 200){
              this.$q.notify({position: 'top', color: 'dark', message: 'Masukkan Anda Sudah Dikirim! Terima Kasih :)'});
              this.$router.push('/dashboard');
            }

          }).catch(error => {
            
            if (error.response) {
              console.log(error.response)
            }
          
          })

    }
  }
}
</script>
