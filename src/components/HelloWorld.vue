<template>
  <v-layout align-center justify-center>
  <v-flex xs12 sm8 md4 align-center justify-center>
     <v-img
          :src="require('../assets/cwr_logo_2.svg')"
          class="my-3"
          contain
          height="400"
        ></v-img> 
     <v-card v-if="!signedIn" class="mt-5">
        <v-toolbar>
           <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear v-if="apiRequest" :indeterminate="true" class="ma-0"></v-progress-linear>
        <v-card-text>
            <!-- <v-form class="px-3" ref="choreForm"> -->
                 <input v-model="login" type="text" name="" placeholder="Login"><br>
                 <input v-model="password" type="password" name="" placeholder="Password"><br>
                 <v-layout row class="mb-3">
                     <v-flex xs2 offset-xs0>
                       <v-btn block class="success mx-0 mt-3" @click="signIn">Sign In</v-btn>
                     </v-flex>
                     <v-flex xs2 offset-xs2>
                       <router-link to="/SignUp">Sign Up</router-link>
                     </v-flex>
                 </v-layout>
            <!-- </v-form> -->
        </v-card-text>
     </v-card>
     <!-- <div v-if="signedIn">
        <v-btn @click="signOut">Sign Out</v-btn>
         <v-btn @click="addUser">Add User</v-btn> 
         <v-btn @click="populateChoresWithRewards">Get Chores with Rewards</v-btn> 
     </div>
     <div>{{ signedIn }}</div> -->
  </v-flex>
  </v-layout>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'HelloWorld',
  data(){
    return {
      userInfo: '',
      login: '',
      password: '',
      apiRequest: false,
    }
  },
    computed: {
      signedIn(){
          return this.$store.getters.signedIn;
      },
      userName(){
          return this.$store.getters.username;
      },
      dbUser() {
          return this.$store.getters.dbUser;
      }
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on('authState', info => {
        if(info === "signedIn") {
          this.findUser();
          // this.$store.dispatch('signIn');
        } else {
           this.$store.dispatch('signOut');
        }
    });
  },
  methods: {
    // populateChoresWithRewards() {
    //    this.$store.dispatch('populateChoresWithRewards');
    //},
    signIn(){
        this.apiRequest=true;
        Auth.signIn(this.login, this.password)
          .then(user =>{
            this.apiRequest=false;
            this.$store.dispatch('signIn');
          //  this.$store.dispatch('loadUser',user);
          //  this.$store.dispatch('populatedbUser');
          })
          .catch(err => console.log(err));
    },
    signOut(){
        Auth.signOut()
          .then(data =>{
            this.$store.state.signedIn = !!data;
          } )
          .catch(err => console.log(err));
    },
    async findUser(){
      try {
        const user= await Auth.currentAuthenticatedUser();
        this.$store.dispatch('signIn');
        console.log(user);
      } catch (err){
          this.$store.dispatch('signOut');
        }
    }
  },
};
</script>
