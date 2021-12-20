import Vue from 'vue';
import Vuex from 'vuex';

import { API } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { ThingHistoryModel, ThingModel } from '../models/index';
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

// create
async function createThingHistory () {
  try {
    await DataStore.save(
      new ThingHistoryModel({
        region: 'Lorem ipsum dolor sit amet',
        thingName: 'Lorem ipsum dolor sit amet',
        thingId: 'Lorem ipsum dolor sit amet',
        command: 'Lorem ipsum dolor sit amet',
        createTime: 1020
      })
    );
  } catch (error) {
    console.log('Error retrieving ThingHistoryModel', error);
  }
}
// query
async function queryeThingHistory () {
  try {
    const queryeThingHistory = await DataStore.query(ThingHistoryModel);
    console.log(queryeThingHistory);
  } catch (error) {
    console.log('Error retrieving queryeThingHistory', error);
  }
}

// query
async function queryeThing () {
  try {
    const queryeThing = await DataStore.query(ThingModel);
    console.log('queryeThing:', queryeThing);
  } catch (error) {
    console.log('Error retrieving queryeThing', error);
  }
}

// create
async function createThing (thingModel) {
  try {
    await DataStore.save(
      new ThingModel(thingModel)
    );
    console.log('ThingModel saved successfully!');
  } catch (error) {
    console.log('Error saving ThingModel', error);
  }
}

// update
/* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */
//  await DataStore.save(ThingModel.copyOf(CURRENT_ITEM, item => {
//     // Update the values on {item} variable to update DataStore entry
// }));
// delete
async function deleteThing () {
  try {
    const modelToDelete = await DataStore.query(ThingModel, 123456789);
    DataStore.delete(modelToDelete);
    console.log('modelToDelete retrieved successfully!', JSON.stringify(modelToDelete, null, 2));
  } catch (error) {
    console.log('Error retrieving posts', error);
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

export {
  createThingHistory,
  queryeThingHistory,
  queryeThing,
  deleteThing,
  createThing
};
