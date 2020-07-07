<template>
  <q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
    <q-header class="mobile-layout-on-desktop">
      <q-toolbar class="bg-distrodakwah text-white">
        <q-btn flat round dense to="/dashboard">
          <q-icon name="arrow_back" color="white" />
        </q-btn>
        <q-toolbar-title>
          <span style="font-size: 16px; font-weight: bold">Ganti Password</span>
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
              <p class="create-account-small-text text-center">Ganti Password</p>
              <q-input
                v-model="oldPassword"
                color="orange-8"
                type="text"
                dense
                class="bg-grey-2 q-mb-sm"
                outlined
                placeholder="Password lama(sekarang dipakai)"
              />
              <q-input
                v-model="newPassword"
                :color="passwordColor"
                :bg-color="passwordBg"
                type="password"
                dense
                class="bg-grey-2 q-mb-sm"
                outlined
                placeholder="Password Baru"
              />

              <q-input
                v-model="newPasswordConfirmation"
                :color="passwordColor"
                :bg-color="passwordBg"
                type="password"
                dense
                class="bg-grey-2 q-mb-sm"
                outlined
                placeholder="Ketik Ulang Password Baru"
                :error="allowUpdateButton"
              >
                <template v-slot:error>pastikan kolom password dan konfirmasi sama</template>
              </q-input>

              <q-btn
                :disabled="allowUpdateButton"
                @click="onUpdate"
                flat
                class="bg-amber-8 full-width q-mb-sm"
              >
                <span
                  class="text-white"
                  style="font-weight: bolder; font-family: 'Open Sans'"
                >Ganti Password</span>
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
  name: "UpdatePassword",
  components: {
    flatPickr
  },
  data() {
    return {
      newPassword: "",
      newPasswordConfirmation: "",
      oldPassword: "",
      loading: false
    };
  },
  computed: {
    passwordColor: function() {
      return this.newPassword === this.newPasswordConfirmation
        ? "teal"
        : "orange-8";
    },
    passwordBg: function() {
      if (this.newPassword === "" || this.newPasswordConfirmation === "")
        return "";
      return this.newPassword === this.newPasswordConfirmation
        ? "teal"
        : "red-12";
    },
    allowUpdateButton() {
      return this.newPassword !== "" && this.newPasswordConfirmation !== ""
        ? this.newPassword === this.newPasswordConfirmation
          ? false
          : true
        : true;
    }
  },
  watch: {
    loading: function() {
      if (this.loading == true) {
        this.$q.loading.show({
          spinner: QSpinnerPuff,
          spinnerColor: "black",
          spinnerSize: 50,
          backgroundColor: "grey",
          message: "<b>Sedang mengupdate Password..</b>",
          messageColor: "black"
        });
      } else {
        this.$q.loading.hide();
      }
    }
  },
  methods: {
    async onUpdate() {
      if (this.newPassword !== this.newPasswordConfirmation) return;

      this.loading = true;

      let updatePasswordForm = new FormData();
      updatePasswordForm.set("oldPassword", this.oldPassword);
      updatePasswordForm.set("newPassword", this.newPassword);
      updatePasswordForm.set(
        "newPassword_confirmation",
        this.newPasswordConfirmation
      );

      try {
        let response = await this.$axios.post(
          apiDomain + "/auth/updatePassword",
          updatePasswordForm,
          { headers: getHeader() }
        );

        if (response.data.message === "password_changed") {
          this.$q.notify({
            position: "top",
            color: "green",
            message: "Password Berhasil Diganti!",
            html: true
          });
          window.localStorage.removeItem("authUser");
          window.localStorage.removeItem("profileUser");
        }
      } catch (err) {
        if (err.response.data.message === "old_password_wrong") {
          this.$q.notify({
            position: "top",
            color: "red",
            message: "Password lama salah!",
            html: true
          });
        } else {
          console.log("error");
        }
      } finally {
        this.loading = false;
        this.$router.push("/");
      }
    }
  }
};
</script>
