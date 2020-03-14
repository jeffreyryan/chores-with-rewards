<template>
  <div>
        <v-navigation-drawer v-model="drawer" absolute temporary color="primary">
           <v-btn icon right class="red">
               <v-icon class="white--text" @click="drawer = !drawer">mdi-chevron-left</v-icon>
           </v-btn>
           <v-layout column align-center>
              <v-flex class="mt-5">
                  <!--<v-avatar size="100">
                      <img src="/avatar-1.png" alt=""> 
                  </v-avatar> -->
                  <v-icon size=100>mdi-account-circle</v-icon>
                  <p class="white--text subheading mt-1" align="center">
                       {{this.user.username}}
                  </p>
              </v-flex>
              <v-flex class="mt-4 mb-3">
                  <!-- <Popup @choreAdded="snackbar=true"/> -->
              </v-flex>
           </v-layout>
           <v-list nav dense>
               <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                  <v-list-item-action>
                      <v-icon class="white--text">{{ link.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
           </v-list>
           <!-- <template v-slot:append> -->
             <div class="pa-2">
               <v-btn block @click="signOut">Logout</v-btn>
             </div>
           <!-- </template> -->

      </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dense
      dark
    >
        <v-app-bar-nav-icon @click="drawer = !drawer" v-if="signedIn"></v-app-bar-nav-icon>
        <v-toolbar-title>Chores With Rewards</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue';
// import Popup from './Popup'

export default {
  name: "Navbar",
  components: { },
  data() {
    return {
      user:'',
      drawer: false,
      snackbar: false,
      links: [
         {icon:'dashboard',text: 'Dashboard', route: '/' },
         {icon:'folder',text: 'My Chores',route:'/Chores'},
         {icon:'done',text: 'My Rewards',route:'/Rewards'},
        //  {icon:'add',text: 'Add', route:'/Add'},
         {icon:'history',text: 'About', route:'/About'},
        // {icon:'people',text: 'Family', route:'/Family'},
      ]
    }
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on('authState',info => {
        if(info === "signedIn") {
            this.findUser();
        } else {
            this.$store.dispatch('signOut');
        }
    });
  },
  computed: {
      signedIn(){
          return this.$store.getters.signedIn;
      },
      dbUser(){
          return this.$store.getters.dbUser;
      },
      
  },
  methods: {
      signOut(){
        Auth.signOut()
          .then(data =>{
            this.$store.state.signedIn = !!data;
            /////// probably not working //////////////
            this.$store.state.dbUser = !!data;
            this.$store.state.rewards = !!data;
            this.$store.state.choresWithRewards = !!data;
            this.drawer = !this.drawer;
            //window.location.reload();
            this.$router.push("/");
          } )
          .catch(err => console.log(err));
      },
      async findUser(){
        try {
          console.log('IN FINDUSER');
          //const user = await Auth.currentAuthenticatedUser();
          this.user = await Auth.currentAuthenticatedUser();
          this.$store.dispatch('signIn');
          this.$store.dispatch('populatedbUser',this.user.username);
          this.$store.dispatch('populateRewards',this.user.username);
        } catch (err){
           this.$store.dispatch('signOut');
          }
     }
  },

}
</script>
