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
    dbUser : [],
  },
  getters: {
    signedIn : state => {
        var signedIn = state.signedIn;
        return signedIn;
    },
    dbUser : state => {
        var dbUser = state.user.dbUser;
        return dbUser;
    },
  },
  mutations: {
    signIn: state => {
        state.signedIn = true;
    },
    signOut: state => {
        state.signedIn = false;
    },
    populatedbUser: state => {
          API.graphql(graphqlOperation(queries.listUsers)).then(res => {
               state.dbUser = res.data.listUsers.items;
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
     populatedbUser: context => {
          context.commit('populatedbUser');
      },
  }
});
