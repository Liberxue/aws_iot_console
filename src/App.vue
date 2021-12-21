<template>
  <v-app id="app">
    <app-header></app-header>
    <v-main style="padding: 50px 0px 0px;">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { Auth, Hub } from 'aws-amplify';
import Header from './components/Header';

export default {
  name: 'App',
  data () {
    return {
      signedIn: false
    };
  },
  components: {
    appHeader: Header
  },
  beforeCreate () {
    Hub.listen('auth', data => {
      const { payload } = data;
      if (payload.event === 'signIn') {
        this.$store.dispatch('setUser', data);
        this.$store.dispatch('setDashboards', data);
        this.$router.push('/dashboards');
      }
      if (payload.event === 'signOut') {
        const path = '/auth';
        if (this.$route.path !== path) { this.$router.push(path); }
        // flush state data
        this.$store.dispatch('reset', data);
      }
    });
    Auth.currentAuthenticatedUser()
      .then((data) => {
        this.signedIn = true;
        this.user = data;
      })
      .catch(() => {
        this.signedIn = false;
      });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

body {
  margin: 0px;
}

#app {
  background: #fafdff;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: 100% 0;
  background-size: contain;
  overflow: scroll;
}

@media only screen and (max-width: 490px) {
  #app {
    background-size: cover;
  }
}

h1, h2, h3, p, label, input {
  font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif !important;
}

/* amplify theme */
:root {
  --amplify-primary-color: #fd9653;
  --amplify-primary-tint: #e05800;
  --amplify-primary-shade: #fd9653;
  --sr-annote-color-0: #b4d9fb;
  --sr-annote-color-1: #ffeb3b;
  --sr-annote-color-2: #a2e9f2;
  --sr-annote-color-3: #a1e0ff;
  --sr-annote-color-4: #a8ea68;
  --sr-annote-color-5: #ffb7da;
}

</style>
