<!-- eslint-disable -->
<template>
  <div>
    <v-app-bar v-if="windowWidth >= 700" prominent dense app class="primary">
      <v-container v-resize="onResize" class="d-flex align-center justify-space-between" fluid>      
        <v-img
          src="@/assets/logo-icon.svg"
          alt="Logo"
          class='desktop-logo'
          min-width="80"
          max-width="80"
        ></v-img>
        <v-layout class='routing' align-center justify-end md="6">
          <router-link to='/dashboards'>
            <v-btn class='button' color='#EC7211' text>dashboards</v-btn>
          </router-link>
          <router-link to='/account'>
            <v-btn class='button' color='#EC7211' text>account</v-btn>
          </router-link>
          <div v-if="authState === 'signedin' || signedIn === true" text class="signout">
            <amplify-sign-out></amplify-sign-out>
          </div>
        </v-layout>
      </v-container>
    </v-app-bar>

    <v-app-bar v-else prominent app class="primary" height="200">
      <v-container v-resize="onResize" class="d-flex flex-column align-center">
        <v-img
          mb-4
          src="@/assets/logo-icon.svg"
          alt="Logo"
          class='mobile-logo'
        ></v-img>
        <router-link to='/dashboards'>
          <v-btn class='button' color='white' text>dashboards</v-btn>
        </router-link>
        <router-link to='/account'>
          <v-btn class='button' color='white' text>account</v-btn>
        </router-link>
        <div v-if="authState === 'signedin' || signedIn === true" text class="signout">
          <amplify-sign-out></amplify-sign-out>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
/* eslint-disable */
import { Auth } from "aws-amplify";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";

export default {
  name: "NavBar",
  data: () => ({
    logoIcon: "@/assets/logo-icon.svg",
    link: "https://console.aws.amazon.com",
    user: undefined,
    signedIn: undefined,
    authState: undefined,
    windowWidth: 0,
  }),
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    onAuthUIStateChange((authState) => {
      this.authState = authState;
    });
  },
  beforeCreate() {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        this.signedIn = true;
        this.user = data;
      })
      .catch(() => {
        this.signedIn = false;
      });
  },
  mounted() {
    this.onResize();
  },
};
</script>

<style scoped>
.button {
  float: right;
  color: white;
  padding: 9px;
  font-size: large;
}

button:active {
  outline-width: 1;
  outline-color: white;
}
.primary{
  height: 65px !important;
  width: 100%;
}
.v-application .primary {
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif !important;
    font-size: 14px !important;
    line-height: 1.8 !important;
    background-color: #fff !important;
    box-shadow: none  !important;
    position: fixed !important;
    z-index: 10;
    top: 0;
    display: block;
    width: 100%;
    padding: 0;
    text-align: right;
    -webkit-box-shadow: 0 1px 5px rgb(0 0 0 / 10%)  !important;
    -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, .1)  !important;
    box-shadow: 2px 2px 10px rgb(159 202 255 / 50%) !important;
    border-radius: 0.6rem  !important;
}
</style>
