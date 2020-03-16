<template>
  <q-layout view="lHh Lpr lFf" class="mobile-layout-on-desktop">
    <q-page-container>
      <q-page class="bg-white flex flex-center">
        <template v-if="dataUser.length === 0">
          <div class="row" style="width: 70%">
            <div class="col">
              <center>
                <img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
              </center>
              <br />
              <p class="create-account-small-text text-center">Verifikasi email anda disini</p>
              <q-input
                v-model="emailVerify"
                color="orange-8"
                type="text"
                dense
                class="bg-grey-2 q-mb-sm"
                outlined
                placeholder="Masukkan Email"
              />
              <q-btn @click="verifyEmail" flat class="bg-amber-8 full-width q-mb-sm">
                <span
                  class="text-white"
                  style="font-weight: bolder; font-family: 'Open Sans'"
                >Verifikasi</span>
              </q-btn>

              <q-btn
                v-if="preventReactivation"
                @click="()=>this.$router.push('/login')"
                flat
                class="full-width text-black"
                label="Login 🡲"
                :size="xs"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row logo-distrodakwah">
            <div class="col">
              <!-- <center>
							<img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
						</center>
              <br/>-->
              <h1 class="create-account-text">Buat Akun</h1>
              <p class="create-account-small-text text-center">
                Satu akun untuk dapatkan berbagai macam
                <br />keuntungan di Distrodakwah.id
              </p>

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
                <q-step :name="1" title="Informasi Login" icon="lock" :done="step > 1">
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
                      >Lanjut</span>
                    </q-btn>
                  </q-stepper-navigation>
                </q-step>

                <q-step :name="2" title="Informasi Pribadi" icon="how_to_reg" :done="step > 2">
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
                    <dropdown-datepicker
                      minDate="1700-01-01"
                      :maxDate="dateNow()"
                      :daySuffixes="false"
                      dayLabel="Tanggal"
                      monthLabel="Bulan"
                      yearLabel="Tahun"
                      class="dd-datepicker"
                      v-model="birthday"
                      :defaultDate="birthday"
                    ></dropdown-datepicker>
                  </div>
                  <label>Jenis Kelamin:</label>
                  <div class="gender">
                    <q-radio color="amber-8" v-model="gender" val="male" label="Pria" />
                    <q-radio color="amber-8" v-model="gender" val="female" label="Wanita" />
                  </div>

                  <q-stepper-navigation>
                    <q-btn flat @click="step = 3" class="bg-amber-8">
                      <span
                        class="text-white"
                        style="font-weight: bolder; font-family: 'Open Sans'"
                      >Lanjut</span>
                    </q-btn>
                    <q-btn flat @click="step = 1" color="amber-8" class="q-ml-sm">
                      <span style="font-weight: bolder; font-family: 'Open Sans'">Kembali</span>
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
                    <q-btn flat @click="step = 2" color="amber-8" class="q-ml-sm">
                      <span style="font-weight: bolder; font-family: 'Open Sans'">Kembali</span>
                    </q-btn>
                    <q-btn flat @click="createAccount" class="bg-amber-8">
                      <span
                        class="text-white"
                        style="font-weight: bolder; font-family: 'Open Sans'"
                      >Selesai</span>
                    </q-btn>
                  </q-stepper-navigation>
                </q-step>
              </q-stepper>
              <center>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Yris35E2Qqm-zDd2-j2jzYxg6fERvMjK56cmD3e4WG9bLF1m"
                  width="120"
                />
              </center>
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
}

.dd-datepicker > * {
  margin: 5px;
}

/* .gender {
	display: flex;
}
.gender > * {
	flex: 1 1 20px;
} */
</style>

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
import { log } from "util";
import { access } from "fs";

export default {
  name: "CreateAccount",
  components: {
    DropdownDatepicker
  },
  data() {
    return {
      step: 1,
      emailVerify: "",
      dataUser: [],
      roleName: "",
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
  },
  methods: {
    getProvince() {
      this.$axios
        .get(getProvinceNoAuthUrl)
        .then(response => {
          console.log(response);

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
          console.log(response);

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
          console.log(response);

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
      if (this.emailVerify !== "" && /\s/.test(this.emailVerify) === false) {
        // Set Verify Email
        let OO_GetUser;

        let emailParam = { email: this.emailVerify };
        let registeredUserV1;
        try {
          registeredUserV1 = await this.$axios.get(
            apiDomain + "/auth/searchUser",
            {
              headers: getHeader(),
              params: emailParam
            }
          );          
        } catch (error) {
          console.log(error.response.data.error);
        }
        //registered/exists?
console.log('faksf');
console.log(registeredUserV1.data);


        if (registeredUserV1.data !== "does not exist") {
          this.$q.notify({
            position: "top",
            color: "red-4",
            message: "Email Sudah Pernah Terdaftar!, Silakan Login",
            html: true
          });
          this.preventReactivation = true;
          this.$q.loading.hide();
          return;
        }

        // authorize
        let OO_Cred = new FormData();
        OO_Cred.set("email", "vanprelid2@gmail.com");
        OO_Cred.set("password", "qwerty1234");
        let accessToken;
        try {
          const OO_Auth = await this.$axios.post(
            "https://api.orderonline.id/auth",
            OO_Cred
          );
          accessToken = OO_Auth.data.data.access_token;
        } catch (error) {}
        //findUser in orderonline
        try {
          const OO_user = {
            limit: 1,
            sort_by: "created_at",
            sort: "desc",
            page: 1,
            since: "2018-09-27",
            until: this.dateNow(),
            keyword: this.emailVerify,
            payment_status: "paid"
          };
          let config = {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + accessToken
            },
            params: OO_user
          };

          OO_GetUser = await this.$axios.get(
            "https://api.orderonline.id/submission",
            config
          );
        } catch (error) {}
        //empty means not found
        // find on another account

        if (OO_GetUser.data.data.length == 0) {
          let OO_Cred = new FormData();
          OO_Cred.set("email", "kangdesu97@gmail.com");
          OO_Cred.set("password", "dd1234");

          let accessToken;
          try {
            const OO_Auth = await this.$axios.post(
              "https://api.orderonline.id/auth",
              OO_Cred
            );
            accessToken = OO_Auth.data.data.access_token;
          } catch (error) {}

          try {
            const OO_user = {
              limit: 1,
              sort_by: "created_at",
              sort: "desc",
              page: 1,
              since: "2018-09-27",
              until: this.dateNow(),
              keyword: this.emailVerify,
              payment_status: "paid"
            };
            let config = {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + accessToken
              },
              params: OO_user
            };

            OO_GetUser = await this.$axios.get(
              "https://api.orderonline.id/submission",
              config
            );
          } catch (error) {}
        } else {
          this.dataUser = OO_GetUser.data.data;
          let DBV1User;
          try {
            DBV1User = await this.$axios.get(apiDomain + "/auth/old_user", {
              params: emailParam
            });
          } catch (error) {
            this.roleName = this.dataUser[0].product_name;
            this.email = this.dataUser[0].customer_data.email;
            this.name = "";
            this.phone = this.dataUser[0].customer_data.phone.replace(
              "+62",
              ""
            );
          }

          this.roleName = DBV1User.data.role_name;
          this.email = this.dataUser[0].customer_data.email;
          this.name = "";
          this.phone = this.dataUser[0].customer_data.phone.replace("+62", "");
        }

        if (OO_GetUser.data.data.length == 0) {
          try {
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
            console.log("fajar");

            this.preventReactivation = false;
            this.$q.notify({
              position: "top",
              color: "red-4",
              message: "<b>Email</b> Belum Terdaftar!",
              html: true
            });
          }
        } else {
          this.dataUser = OO_GetUser.data.data;
          let DBV1User;
          try {
            DBV1User = await this.$axios.get(apiDomain + "/auth/old_user", {
              params: emailParam
            });
          } catch (error) {
            this.roleName = this.dataUser[0].product_name;
            this.email = this.dataUser[0].customer_data.email;
            this.name = "";
            this.phone = this.dataUser[0].customer_data.phone.replace(
              "+62",
              ""
            );
          }

          this.roleName = DBV1User.data.role_name;
          this.email = this.dataUser[0].customer_data.email;
          this.name = "";
          this.phone = this.dataUser[0].customer_data.phone.replace("+62", "");
        }

        this.$q.loading.hide();
      } else {
        this.$q.notify({
          position: "top",
          color: "red-4",
          message: "<b>Email</b> Salah atau mengandung spasi!",
          html: true
        });
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
        this.$q.notify({
          position: "top",
          color: "red-4",
          message: "<b>Konfirmasi Password</b> Tidak Sama!",
          html: true
        });
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
        if (
          this.roleName === "AM Reseller PRO" ||
          this.roleName === "Reseller Pro" ||
          this.roleName === "KB Reseller PRO"
        ) {
          createForm.set("role_id", 8);
        } else if (
          this.roleName === "AM Reseller EKSKLUSIF" ||
          this.roleName === "Reseller Exclusive" ||
          this.roleName === "KB Reseller Exclusive"
        ) {
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
                this.$q.notify({
                  position: "top",
                  color: "red-4",
                  message: "Mohon maaf! Email Sudah Terdaftar!",
                  html: true
                });
              }
            }
          });
      }
    },
    notifForm(field) {
      this.$q.notify({
        position: "top",
        color: "red-4",
        message: "Kolom " + field.bold() + " Belum Diisi!",
        html: true
      });
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
    }
  }
};
</script>
