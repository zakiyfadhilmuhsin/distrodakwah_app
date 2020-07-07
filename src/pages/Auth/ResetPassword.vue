<template>
  <q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn flat round dense to="/dashboard">
          <q-icon name="arrow_back" color="white" />
        </q-btn>
        <q-toolbar-title>
          <span style="font-size: 16px; font-weight: bold">Reset Password</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="bg-white flex flex-center">
        <template>
          <div class="row" style="width: 70%">
            <div class="col">
              <center>
                <img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
              </center>
              <br />
              <p class="create-account-small-text text-center">Reset Password</p>
              <q-input
                v-model="email"
                color="orange-8"
                type="text"
                dense
                class="bg-grey-2 q-mb-sm"
                outlined
                placeholder="Masukkan Email"
              />
              <q-btn @click="onResetRequest" flat class="bg-amber-8 full-width q-mb-sm">
                <span
                  class="text-white"
                  style="font-weight: bolder; font-family: 'Open Sans'"
                >Kirim Permintaan Reset</span>
              </q-btn>
            </div>
          </div>
        </template>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.logo-distrodakwah {
  padding: 30px;
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
</style>

<script>
import axios from "axios";
import {
  apiDomain,
  createAccountUrl,
  getProvinceNoAuthUrl,
  getCityNoAuthUrl,
  getSubdistrictNoAuthUrl,
  getHeader
} from "src/config";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { QSpinnerPuff } from "quasar";

export default {
  name: "ResetPassword",
  components: {
    flatPickr
  },
  data() {
    return {
      email: "",
      loading: ""
    };
  },
  watch: {
    loading: function() {
      if (this.loading == true) {
        this.$q.loading.show({
          spinner: QSpinnerPuff,
          spinnerColor: "black",
          spinnerSize: 50,
          backgroundColor: "grey",
          message: "<b>Mohon Tunggu</b>",
          messageColor: "black"
        });
      } else {
        this.$q.loading.hide();
      }
    }
  },
  created() {
    this.loading = false;
  },
  methods: {
    async onResetRequest() {
      let resetForm = new FormData();
      resetForm.set("email", this.email);
      this.loading = true;

      try {
        let response = await this.$axios.post(
          apiDomain + "/auth/resetPasswordConfirmation",
          resetForm
        );
        if (response.data.message === "reset_password_email_sent") {
          this.$q.notify({
            position: "top",
            color: "green",
            message: "Cek Email Sekarang Untuk Mereset Password",
            html: true
          });
        }
      } catch (error) {
        if (error.response.data.message === "email_not_found") {
          this.$q.notify({
            position: "top",
            color: "red",
            message: "Email Tidak Ditemukan",
            html: true
          });
        } else {
          console.log("error");
        }
      } finally {
        this.loading = false;
        this.$router.push("/dashboard");
      }
    }
  }
};
</script>
