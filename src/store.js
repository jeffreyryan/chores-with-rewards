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
    //dbUser : [],
    dbUser : ''
  },
  getters: {
    signedIn : state => {
        var signedIn = state.signedIn;
        return signedIn;
    },
    dbUser : state => {
        var dbUser = state.dbUser;
        // var dbUserName = state.dbUser[0].userName;
        //var dbUserName = dbUser[0].userName;
        //console.log('in dbUserName');
        //console.log(dbUser[0].userName);
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
    populatedbUser: (state,payload) => {
          API.graphql(graphqlOperation(queries.listUsers,{filter: {userName:{eq: payload}}})).then(res => {
               //state.dbUser = res.data.listUsers.items;
               //console.log(res.data.listUsers.items[0].userName);
               state.dbUser = res.data.listUsers.items[0].userName;
          });
      console.log('finished populatedbUser');
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
  }
});
