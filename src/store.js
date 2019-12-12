import Vue from "vue";
import Vuex from "vuex";

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn : false,
    dbUser : '',
    dbUserID : '',
    rewards : [],
    choresWithRewards : [],
  },
  getters: {
    signedIn : state => {
        var signedIn = state.signedIn;
        return signedIn;
    },
    dbUser : state => {
        var dbUser = state.dbUser;
        return dbUser;
    },
    dbUserID : state => {
        var dbUserID = state.dbUserID;
        return dbUserID;
    },
    rewards : state => {
        var rewards = state.rewards;
        return rewards;
    },
    choresWithRewards : state => {
        var choresWithRewards = state.choresWithRewards;
        return choresWithRewards;
    },
  },
  mutations: {
    signIn: state => {
        state.signedIn = true;
    },
    signOut: state => {
        state.signedIn = false;
    },
    populatedbUser: (state,payload) => {
          //API.graphql(graphqlOperation(queries.listUsers,{filter: {userName:{eq: payload}}})).then(res => {
            API.graphql(graphqlOperation(queries.getUsersChoresAndRewards,{filter: {userName:{eq: payload}}})).then(res => {
               state.dbUser = res.data.listUsers.items[0].userName;
               state.dbUserID = res.data.listUsers.items[0].id;
               state.choresWithRewards = res.data.listUsers.items[0].chores;
          });
      },
    populateRewards: (state,payload) => {
        API.graphql(graphqlOperation(queries.getUsersRewards,{filter: {userName:{eq: payload}}})).then(res => {
            state.rewards = res.data.listUsers.items[0].reward;
        });
    },
  },
  actions: {
     signIn: context => {
         context.commit('signIn');
     },
     signOut: context => {
         context.commit('signOut');
     },
     populatedbUser: (context,payload) => {
          context.commit('populatedbUser',payload);
     },
     populateRewards: (context,payload) => {
          context.commit('populateRewards',payload);
     },
  }
});
