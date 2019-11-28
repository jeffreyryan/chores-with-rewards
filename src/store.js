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
    chores : [],
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
    dbUserId : state => {
        var dbUserId = state.dbUserId;
        return dbUserId;
    },
    chores : state => {
        var chores = state.chores;
        return chores;
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
    populateChores: (state,payload) => {
        API.graphql(graphqlOperation(queries.listChores,{filter: {choreUserId:{eq: payload}}})).then(res => {
            state.chores = res.data.listChores.items;
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
     populateChores: (context,payload) => {
          context.commit('populateChores',payload);
     },
  }
});
