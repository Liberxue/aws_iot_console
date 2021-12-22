import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-vue';
import vuetify from './plugins/vuetify';

import {
  applyPolyfills,
  defineCustomElements
} from '@aws-amplify/ui-components/loader';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Amplify.configure(awsconfig, { ssr: true });

Vue.config.productionTip = false;

applyPolyfills().then(() => {
  defineCustomElements(window);
});
Vue.config.ignoredElements = [/amplify-\w*/];

new Vue({
  router,
  store,
  vuetify,
  created: () => {
    store.dispatch('setDashboards');
  },
  render: h => h(App)
}).$mount('#app');
