<template>
  <main>
    <title>iot-console</title>
    <div v-if="signedIn === true" class="thermostat-collection-home" id='content'>
      <thermostat-collection></thermostat-collection>
    </div>
  </main>
</template>

<script>
import { Auth } from 'aws-amplify';
import ThermostatCollection from '@/components/dashboards/ThermostatCollection.vue';

export default {
  name: 'iot-console',
  data () {
    return {
      user: undefined,
      authState: undefined,
      signedIn: false
    };
  },
  components: {
    ThermostatCollection: ThermostatCollection
  },
  beforeCreate () {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.signedIn = true;
      })
      .catch(() => {
        this.signedIn = false;
      });
  }
};
</script>

<style>

.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

</style>
