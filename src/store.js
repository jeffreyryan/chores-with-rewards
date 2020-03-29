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
    //populatedbUser: (state,payload) => {
    //      //API.graphql(graphqlOperation(queries.listUsers,{filter: {userName:{eq: payload}}})).then(res => {
    //        API.graphql(graphqlOperation(queries.getUsersChoresAndRewards,{filter: {userName:{eq: payload}}}))
    //          .then(res => {
    //             state.dbUser = res.data.listUsers.items[0].userName;
    //             state.dbUserID = res.data.listUsers.items[0].id;
    //             state.choresWithRewards = res.data.listUsers.items[0].chores;
    //             //return state.dbUser;
    //           });
     // },
    populatedbUser: (state,res) => {
                 console.log('In MUTATION');
                 state.dbUser = res.data.listUsers.items[0].userName;
                 state.dbUserID = res.data.listUsers.items[0].id;
                 state.choresWithRewards = res.data.listUsers.items[0].chores;
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
     //populatedbUser: (context,payload) => {
     //     context.commit('populatedbUser',payload);
     //     console.log('IN POPULATEDBUSER ACTION');
     //     console.log(context.state.dbUser);
     //},
     populatedbUser2: (context,payload) => {
          console.log('IN POPULATEDBUSER ACTION');
          console.log(payload);
          API.graphql(graphqlOperation(queries.getUsersChoresAndRewards,{filter: {userName:{eq: payload}}}))
              .then(res => {
                             context.commit('populatedbUser',res);
                             console.log('IN POPULATEDBUSER ACTION');
                             console.log(context.state.dbUser);
                   });
          console.log('after calling query and such');
          console.log(context.state.dbUser);
     },
     async populatedbUser(context,payload) {
          try {
               const dbUser=await API.graphql(graphqlOperation(queries.getUsersChoresAndRewards,{filter: {userName:{eq: payload}}}));
               console.log(dbUser);
               console.log(dbUser.data.listUsers.items.length);
               if (dbUser.data.listUsers.items.length === 0 ) {
                     console.log('need to insert the user into the db');
                     const userDetails = {
                                          userName: payload,
                                          email: 'jeff_a_ryan@yahoo.com'
                                         };
                     const dbUser = await API.graphql(
                                                 graphqlOperation(mutations.createUser, { input: userDetails })
                                                 );
                     console.log('Lets see the new user!');
                     console.log(dbUser);
                 }
               context.commit('populatedbUser',await API.graphql(graphqlOperation(queries.getUsersChoresAndRewards,{filter: {userName:{eq: payload}}})) );
               console.log('IN POPULATEDBUSER ACTION');
               console.log(context.state.dbUser);
          }
          catch {err(console.log('error in action'))}
     },
     populateRewards: (context,payload) => {
          context.commit('populateRewards',payload);
     },
  }
});
