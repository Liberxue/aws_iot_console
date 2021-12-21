
<template>
  <div class="modal add-dash-modal" v-show='value'>
    <v-container>
      <v-card class="pa-4 d-flex flex-column justify-start">
        <div class='modal-close'>
          <v-btn @click.prevent='close' class='modal-close-btn' small icon color='grey darken-1'>
            <v-icon>clear</v-icon>
          </v-btn>
        </div>
        <div>
          <h3 class="modal-title">Add Thermostat</h3>
        </div>
        <add-dashboard-form></add-dashboard-form>
      </v-card>
    </v-container>
  </div>
</template>
    
<script>

import AddThermostatForm from '@/components/dashboards/AddThermostatForm.vue';
export default {
  name: 'AddThermostatModal',
  props: {
    value: {
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('input', !this.value);
    }
  },
  components: {
    AddDashboardForm: AddThermostatForm
  }
};
</script>

<style lang="css" scoped>

.modal-close-btn {
  float: right;
}
.modal-close {
  justify-content: right;
}
.modal-title {
  padding: 0;
}
</style>
