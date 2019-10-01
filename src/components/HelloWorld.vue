<template>
  <v-container>
    <!-- <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img> -->
     <v-card v-if="!signedIn">
        <v-card-title>
           <h2>Login</h2>
        </v-card-title>
        <v-card-text>
            <v-form class="px-3" ref="choreForm">
                 <input v-model="login" type="text" name="" placeholder="Login"><br>
                 <input v-model="password" type="password" name="" placeholder="Password"><br>
                 <button block class="success mx-0 mt-3" @click="signIn">Sign In</button>
            </v-form>
        </v-card-text>
     </v-card>
     <div v-if="signedIn">
        <v-btn @click="signOut">Sign Out</v-btn>
        <!-- <v-btn @click="addUser">Add User</v-btn> -->
        <!--  <v-btn @click="populateChoresWithRewards">Get Chores with Rewards</v-btn> -->
     </div>
     <div>{{ signedIn }}</div>
     <router-link to="/SignUp">Sign Up</router-link>
  </v-container>
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
    addUser() {
        alert('in addUser');
        //const userDetails = {
        //          userName: 'jerry',
        //          email: 'jeff_a_ryan@yahoo.com'
        //      };
      //  const newUser = API.graphql(
      //            graphqlOperation(mutations.createUser, { input: userDetails })
      //        )
      //            .then(res => {
      //                this.$router.push("/");
      //            })
      //            .catch(err => (this.error = err.message));

    },
    // populateChoresWithRewards() {
    //    this.$store.dispatch('populateChoresWithRewards');
    //},
    signIn(){
        Auth.signIn(this.login, this.password)
          .then(user =>{
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
