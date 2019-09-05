import Vue from "vue";
import Vuex from "vuex";

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
