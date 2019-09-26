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
  },
  getters: {
    signedIn : state => {
        var signedIn = state.signedIn;
        return signedIn;
    },
  },
  mutations: {
    signIn: state => {
        state.signedIn = true;
    },
    signOut: state => {
        state.signedIn = false;
    },
  },
  actions: {
  signIn: context => {
         context.commit('signIn');
     },
     signOut: context => {
         context.commit('signOut');
     },
  }
});
