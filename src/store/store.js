import Vue from 'vue';
import Vuex from 'vuex';

import { API } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { ThingModel } from '../models/ThingModel';
Vue.use(Vuex);

const getInitialState = () => {
  return {
    dashKey: null,
    dashName: null,
    dashId: null,
    dashboards: [],
    user: null,
    signedIn: false,
    authState: null,
    status: 'empty',
    totalDashboards: 0
  };
};

const state = getInitialState();

const getters = {
  dashKey: state => {
    return state.dashKey;
  },
  dashName: state => {
    return state.dashName;
  },
  dashboards: state => {
    return state.dashboards;
  },
  user: state => {
    return state.user;
  },
  userPresent: state => {
    if (state.signedIn === true) {
      return true;
    }
  }
};

const actions = {
  setDashKey: ({ commit }, key) => {
    commit('SET_DASH_KEY', key);
  },
  setDashName: ({ commit }, name) => {
    commit('SET_DASH_NAME', name);
  },
  setDashboards: ({ commit }) => {
    API.get('dashboardApi', '/dashboards', {
      response: true
    }).then(result => {
      if (result.data) {
        const dashboards = result.data.data;
        commit('SET_DASHBOARDS', dashboards);
        return dashboards;
      }
    }).catch(err => {
      return err;
    });
  },
  setUser: ({ commit }, user) => {
    commit('SET_USER', user);
  },
  addDashboard: ({ commit }, dash) => {
    if (!dash) {
      return new Error('Invalid Entry');
    }

    API.post('dashboardApi', '/dashboards', {
      body: {
        key: dash.bucketId,
        name: dash.name
      }
    })
      .then(result => {
        commit('ADD_DASHBOARD', result.dashboard);

        return 'success';
      }).catch(err => {
        return err;
      });
  },
  deleteDashboard: ({ commit }, dashId) => {
    if (!dashId) {
      return Promise.reject(new Error('Invalid ID'));
    }

    const path = '/dashboards' + `/${dashId}`;

    API.del('dashboardApi', path, {
      body: {
        dashId: dashId
      }
    })
      .then(result => {
        commit('REMOVE_DASHBOARD_BY_ID', dashId);

        return 'success';
      }).catch(err => {
        return err;
      });
  },
  reset: ({ commit }) => {
    commit('RESET');
  }
};

const mutations = {
  SET_DASH_KEY: (state, key) => {
    state.dashKey = key;
  },
  SET_DASH_NAME: (state, name) => {
    state.dashName = name;
  },
  SET_DASHBOARDS: (state, dashboards) => {
    state.dashboards = dashboards;
  },
  SET_USER: (state, user) => {
    state.signedIn = true;
    state.user = user;
  },
  ADD_DASHBOARD: (state, dash) => {
    if (!dash) {
      return new Error('Invalid Entry');
    }
    state.dashboards.push(dash);
  },
  REMOVE_DASHBOARD_BY_ID: (state, dashId) => {
    if (!dashId) {
      return new Error('Invalid ID');
    }
    const idx = state.dashboards.findIndex(x => dashId !== null && x.dashId === dashId);

    if (idx >= 0) {
      state.dashboards.splice(idx, 1);
    }
  },
  RESET: (state) => {
    Object.assign(state, getInitialState());
  }
};

/* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */
// eslint-disable-next-line no-undef
await DataStore.save(ThingModel.copyOf(CURRENT_ITEM, item => {
  // Update the values on {item} variable to update DataStore entry
}));

const modelToDelete = await DataStore.query(ThingModel, 123456789);
DataStore.delete(modelToDelete);

const models = await DataStore.query(ThingModel);
console.log(models);

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
