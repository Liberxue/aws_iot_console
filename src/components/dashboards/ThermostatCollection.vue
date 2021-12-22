<template>
  <div id='thermostat-collection-container'>
    <v-dialog max-width="500" v-model="value" persistent>
      <v-card class="pa-4 d-flex flex-column justify-end">
        <div class='modal-close'>
          <v-btn @click.prevent='close' class='modal-close-btn' small icon color='grey darken-1'>
            <v-icon>clear</v-icon>
          </v-btn>
        </div>
        <div>
          <h3 class="modal-title">Detail Thermostat</h3>
        </div>
        <detail-thermostat-form></detail-thermostat-form>
      </v-card>
    </v-dialog>
    <v-container id=dashboard-grid-container class='thermostat-collection' mt-7>
      <v-row>
        <v-col>
          <v-row class= "pl-5 pb-5">
            <v-btn
              @click='showModal'
              class='mx-2 add-thermostat-modal-button'
              fab
              color='secondary'
              x-small
              elevation='4'
            >
            <v-icon class='add-button'>
              mdi-plus
            </v-icon>
            </v-btn>
            <add-thermostat-modal v-model='modalOpen'></add-thermostat-modal>
          </v-row>
          <v-row v-if='!dashboards'>
            <v-col>
              <span> No thermostat to display. Please add one</span>
            </v-col>
          </v-row>
          <v-row v-if='dashboards'>
            <v-col v-for="dashboard in dashboards" :key="dashboard.id" lg='4' md='6' s='6' xs='12' wrap id='dashboard-column'>
              <v-card class='justify-space-between mx-auto' elevation='4' outlined id='dashboard-card-container' color='primary'>
                <v-list-item three-line elevation='4'>
                  <v-list-item-content>
                    <v-list-item-title class="info--text">
                      <p class="font-weight-bold pl-3">DeviceName：{{ dashboard.thingName }}</p>
                      <!-- <p class="font-weight-bold pl-3">Id：{{ dashboard.thingId }}</p> -->
                      <!-- <v-divider divider></v-divider> -->
                      <v-card
                          class="mx-auto"
                          color="grey lighten-4"
                          max-width="680"
                        >
                          <v-card-title>
                            <!-- <v-icon
                              :color="checking ? 'red lighten-2' : 'indigo'"
                              class="mr-12"
                              size="48"
                              @click="takePulse"
                            >
                             mdi-reload
                            </v-icon> -->
                            <v-row align="start">
                              <div>
                                <span
                                  class="text-h3 font-weight-black"
                                  v-text="avg || '—'"
                                ></span>
                                <strong v-if="avg">℉</strong>
                              </div>
                            </v-row>
                          </v-card-title>

                          <v-sheet color="transparent">
                            <v-sparkline
                              :key="String(avg)"
                              :smooth="20"
                              :gradient="['#f72047', '#ffd200', '#1feaea']"
                              :line-width="1.5"
                              :value="reloads"
                              auto-draw
                              stroke-linecap="round"
                            ></v-sparkline>
                          </v-sheet>
                        </v-card>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions class="d-flex justify-space-between">
                  <v-btn
                    :to="{name: 'DashboardEmbed', params: {thingId: dashboard.thingId, type: 'tiles' }}"
                    rounded
                    text
                    color='white'
                  >
                    <v-icon>dashboard</v-icon>
                  </v-btn>
                  
                  <v-btn
                    rounded
                    text
                    color='white'
                    @click='detailThermostat(dashboard.id)'
                  >
                    <v-icon>waves</v-icon>
                  </v-btn>
                  <v-btn
                    rounded
                    text
                    color='white'
                    @click='updateThermostat(dashboard.id)'
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  
                  <v-btn
                    rounded
                    text
                    color='#ec5257'
                    @click='deleteThermostat(dashboard.id)'
                  >
                    <v-icon id='delete-btn' right>delete_forever</v-icon>
                  </v-btn>
                  <!-- <add-thermostat-modal v-model='modalOpen'></add-thermostat-modal> -->
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AddThermostatModal from '@/components/dashboards/AddThermostatModal.vue';
import DetailThermostatForm from '@/components/dashboards/DetailThermostatForm.vue';

const exhale = ms =>
  new Promise(resolve => setTimeout(resolve, ms));
export default {
  name: 'ThermostatCollection',
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      modalOpen: false,
      checking: false,
      reloads: []
    };
  },
  created () {
    this.takePulse(false);
  },
  methods: {
    close () {
      this.$emit('input', !this.value);
    },
    showModal () {
      this.modalOpen = !this.modalOpen;
    },
    deleteThermostat: function (id) {
      this.$store.dispatch('deleteThermostat', id);
      this.$store.dispatch('setDashboards', id);
    },
    updateThermostat: function (id) {
      console.info('updateThermostat');
    },
    detailThermostat: function (id) {
      this.modalOpen = !this.modalOpen;
      this.$emit('input', !this.value);
      console.info('detailThermostat');
    },
    reload () {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    },
    async takePulse (inhale = true) {
      this.checking = true;

      inhale && await exhale(1000);

      this.reloads = Array.from({ length: 20 }, this.reload);

      this.checking = false;
    }
  },
  computed: {
    DetailThermostatForm: DetailThermostatForm,
    ...mapState({
      
      dashboards (state) {
        const dashboards = state.dashboards;
        return dashboards;
      }
      
    }),
    avg () {
      const sum = this.reloads.reduce((acc, cur) => acc + cur, 0);
      const length = this.reloads.length;

      if (!sum && !length) return 0;

      return Math.ceil(sum / length);
    }
  },
  components: { AddThermostatModal: AddThermostatModal }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#dashboard-card-container {
  min-width: 300px;
  max-width: 344px;

}

#delete-btn {
  color: #fab190;
  font-size: 26px
}

.add-thermostat-modal-button {
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
}
.v-application .primary {
    /* background-color: #22303e !important;
    border-color: #22303e !important; */
   
}
.v-application .grey.lighten-4 {
    background-color: #f5f5f514 !important;
    border-color: #ffffff !important;
}
/* .v-application .pl-3 {
    padding-left: 0px !important;
}
.v-application .font-weight-bold {
    font-weight: 10 !important;
} */
.v-application .primary {
    /* background-color: #22303e !important;*/
    border-color: rgb(159 202 255 / 10%) !important;
    background-color: #fff !important;
    -webkit-box-shadow: 0 1px 5px rgb(0 0 0 / 10%)  !important;
    -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, .1)  !important;
    box-shadow: 2px 2px 10px rgb(159 202 255 / 50%) !important;
    border-radius: 0.6rem  !important;
}
.v-application .info--text {
    color: #6f7174 !important;
    caret-color: #6f7174 !important;
}
.v-application .white--text {
    color: #c5c5c5 !important;
    caret-color: #c5c5c5 !important;
}
.v-application .text-h3 {
    font-size: 3rem !important;
    font-weight: 120 !important;
    line-height: 3.125rem;
    letter-spacing: normal !important;
    font-family: "Roboto", sans-serif !important;
    color: #6f7174 !important;
    caret-color: #6f7174 !important;
}
b, strong {
    font-weight: bolder;
    font-size: 2rem !important;
    font-weight: 100 !important;
    line-height: 3.125rem;
    letter-spacing: normal !important;
    font-family: "Roboto", sans-serif !important;
    color: #6f7174 !important;
    caret-color: #6f7174 !important;
}
.v-application .secondary {
    background-color: #fd9752 !important;
    border-color: #fd9752 !important;
}
.v-application .indigo--text {
    color: #c5c5c5 !important;
    caret-color: #f5f5f5 !important;
}
</style>
