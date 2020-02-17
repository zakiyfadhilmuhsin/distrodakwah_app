<template>
  <q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
    <q-page-container>
      <q-page class="bg-white">
        <div class="row logo-distrodakwah">
          <div class="col">
            <img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
            <br />
            <h1 class="login-text">LOGIN</h1>
            <p class="login-small-text">
              Untuk dapatkan berbagai macam
              <br />keuntungan di Distrodakwah.id
            </p>
            <q-input
              v-model="email"
              color="orange-8"
              type="text"
              dense
              class="bg-grey-2 q-mb-sm"
              outlined
              placeholder="Masukkan Email"
            />
            <!-- <q-input v-model="password" color="orange-8" type="password" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Kata Sandi" /> -->
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
              <div class="col">
                <q-checkbox dense v-model="rememberMe" val="true" color="orange-8" />
                <span
                  class="forgot-password-text"
                  style="margin: 5px 0; font-weight: 500; margin-left: 5px"
                >Ingat saya</span>
              </div>
              <!-- <div class="col text-right">
                <div class="forgot-password-text text-amber-8" style="margin: 2px 0 10px 0; font-weight: 500">Lupa Kata Sandi?</div>
              </div>-->
            </div>
            <q-btn @click="submitLogin" flat class="bg-amber-8 full-width">
              <span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">MASUK</span>
            </q-btn>
            <br />
            <center>
              <img
                src="~/assets/images/components/coin-big.png"
                style="width: 80%; margin-top: 35px"
              />
            </center>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

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
</style>

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
    this.$router.push('/maintenance');
    if (this.$route.params.message === "createsuccess") {
      this.$q.notify({
        position: "top",
        color: "green",
        message: "Yes! Akun Berhasil Dibuat, Silahkan Login..",
        html: true
      });
    }
  },
  methods: {
    submitLogin() {
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
        this.$q.notify({
          position: "top",
          color: "red-4",
          message: "Email dan Password tidak boleh kosong",
          html: true
        });

        return;
      }
      const authUser = {};

      axios
        .post(loginUrl, postData)
        .then(response => {
          if (response.status === 200) {
            authUser.access_token = response.data.access_token;
            authUser.refresh_token = response.data.refresh_token;

            window.localStorage.setItem("authUser", JSON.stringify(authUser)); // simpan token

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
          }
        })
        .catch(error => {
          if (error) {
            this.$q.notify({
              position: "top",
              color: "red-4",
              message: "Login Gagal!, Email atau Password Salah!",
              html: true
            });
            if (
              error.response.data.message ===
              "Login Failed!, Email Not Registered!"
            ) {
              this.$q.notify({
                position: "top",
                color: "red-4",
                message: "Login Gagal!, Email Belum Terdaftar!",
                html: true
              });
            } else if (error.response.data.message === "Unauthorized") {
              this.$q.notify({
                position: "top",
                color: "red-4",
                message: "Login Gagal!, Email atau Password Salah!",
                html: true
              });
            } else {
              this.$q.notify({
                position: "top",
                color: "red-4",
                message: "Login Gagal!, Email Belum Terdaftar!",
                html: true
              });
            }
          } else {
            this.$q.notify({
              position: "top",
              color: "red-4",
              message: "Login Gagal!, Email Belum Terdaftar!",
              html: true
            });
          }
        });
    }
  }
};
</script>
