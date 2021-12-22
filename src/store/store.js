import Vue from 'vue';
import Vuex from 'vuex';

// import { API } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { ThingHistoryModel, ThingModel } from '../models/index';
import { createThingAndAttachCerts } from '../utils/iot';
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
    DataStore.query(ThingModel).then(result => {
      // console.info('ThingModel:', JSON.stringify(result));
      if (result) {
        const dashboards = result;
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
  addThermostat: ({ commit }, dash) => {
    console.info('dash', dash);
    if (!dash.thingName) {
      return new Error('Invalid Entry');
    }
    const data = createThingAndAttachCerts({ thingName: dash.thingName });
    data.then(result => {
      console.info(result);
      try {
        DataStore.save(
          new ThingModel({
            region: 'sh',
            thingName: dash.thingName,
            thingArn: result.thingRes.thingArn,
            thingId: result.thingRes.thingId,
            remark: dash.remark
          })
        );
        commit('ADD_DASHBOARD', result);
      } catch (error) {
        console.log('Error saving ThingModel', error);
        return error;
      }
    });
  },
  deleteThermostat: ({ commit }, id) => {
    if (!id) {
      return Promise.reject(new Error('Invalid ID'));
    }
    commit('REMOVE_DASHBOARD_BY_ID', id);
    return 'success';
    // console.info('modelToDelete retrieved successfully!', JSON.stringify(modelToDelete, null, 2));
    // const path = '/dashboards' + `/${dashId}`;

    // API.del('dashboardApi', path, {
    //   body: {
    //     dashId: dashId
    //   }
    // })
    //   .then(result => {
    //     commit('REMOVE_DASHBOARD_BY_ID', dashId);

    //     return 'success';
    //   }).catch(err => {
    //     return err;
    //   });
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
    console.info('dashboards:', dashboards);
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
  REMOVE_DASHBOARD_BY_ID: (state, id) => {
    if (!id) {
      return new Error('Invalid ID');
    }
    try {
      deleteThing(id);
    } catch (error) {
      console.error('Error retrieving posts', error);
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
    console.error('Error retrieving ThingHistoryModel', error);
  }
}
// query
async function queryeThingHistory () {
  try {
    const queryeThingHistory = await DataStore.query(ThingHistoryModel);
    console.info(queryeThingHistory);
  } catch (error) {
    console.error('Error retrieving queryeThingHistory', error);
  }
}

// query
// async function queryeThing () {
//   try {
//     const queryeThing = await DataStore.query(ThingModel);
//     console.info('queryeThing:', queryeThing);
//   } catch (error) {
//     console.error('Error retrieving queryeThing', error);
//   }
// }
// update
/* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */
//  await DataStore.save(ThingModel.copyOf(CURRENT_ITEM, item => {
//     // Update the values on {item} variable to update DataStore entry
// }));
// delete
async function deleteThing (id) {
  try {
    const modelToDelete = await DataStore.query(ThingModel, id);
    DataStore.delete(modelToDelete);
    console.info('modelToDelete retrieved successfully!', JSON.stringify(modelToDelete, null, id));
  } catch (error) {
    console.error('Error retrieving posts', error);
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
  deleteThing
};
