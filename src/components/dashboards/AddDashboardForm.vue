<!-- eslint-disable -->
<template>
  <div>
    <div>
      <h2>Angle</h2>
      <input
        v-model.number="angle"
        type="number"
        :min="0"
        :max="180">
      <button @click="publish('angle')">Send command</button>
    </div>
    <div>
      <h2>HVAC Status</h2>
        <button @click="publish('standby')">Stand by</button>
        <button @click="publish('heating')">Heat</button>
        <button @click="publish('cooling')">Cool</button>
    </div>
  </div>
</template>

<script>
import { Iot } from 'aws-sdk';
import Amplify, { Auth, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-east-1',
  aws_pubsub_endpoint: 'wss://a2g12gxb5alkoc-ats.iot.us-east-1.amazonaws.com'
}));
export default {
  data: () => {
    return {
      angle: 0,
      message: null
    };
  },
  created: async () => {
    const credentials = await Auth.currentCredentials();
    const iot = new Iot({
      region: 'us-east-1',
      credentials: Auth.essentialCredentials(credentials)
    });
    
    const policyName = 'IoTPolicy';
    const target = credentials.identityId;
    const { policies } = await iot.listAttachedPolicies({ target }).promise();
    if (policies && !policies.find(policy => policy.policyName === policyName)) {
      await iot.attachPolicy({ policyName, target }).promise();
    }
  },
  watch: {
    angle: function (newNum, oldVal) {
      if (newNum < 0 || newNum >= 360) {
        alert('Illegal angle');
        this.angle = oldVal;
      }
    }
  },
  methods: {
    publish (arg) {
      let topic = '';
      let payload = '';
      switch (arg) {
        case 'angle':
          topic = '$aws/things/liber_test/shadow';
          payload = {
            state: {
              desired: {
                angle: this.Shadows
              }
            }
          };
          break;
        case 'standby':
          topic = '$aws/things/liber_test/shadow/update/rejected';
          payload = {
            state: {
              desired: {
                hvacStatus: 'STANDBY'
              }
            }
          };
          break;
        case 'heating':
          topic = '$aws/things/liber_test/shadow/get/accepted';
          payload = {
            state: {
              desired: {
                hvacStatus: 'HEATING'
              }
            }
          };
          break;
        case 'cooling':
          topic = '$aws/things/liber_test/shadow/update';
          payload = {
            state: {
              desired: {
                hvacStatus: 'COOLING'
              }
            }
          };
          break;
      }
      PubSub.publish(topic, payload);
    }
  }
};
</script>
