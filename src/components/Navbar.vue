<template>
  <div>
        <v-navigation-drawer v-model="drawer" absolute temporary color="deep-purple accent-4">
           <v-btn icon right class="red">
               <v-icon class="white--text" @click="drawer = !drawer">mdi-chevron-left</v-icon>
           </v-btn>
           <v-layout column align-center>
              <v-flex class="mt-5">
                  <v-avatar size="100">
                      <img src="/avatar-1.png" alt="">
                  </v-avatar>
                  <p class="white--text subheading mt-1">
                       Papa Joe
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

           <template v-slot:append>
             <div class="pa-2">
               <v-btn block>Logout</v-btn>
             </div>
           </template>

      </v-navigation-drawer>
    <v-toolbar
      color="deep-purple accent-4"
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
// import Popup from './Popup'

export default {
  name: "Navbar",
  components: { },
  data() {
    return {
      drawer: false,
      snackbar: false,
      links: [
         {icon:'dashboard',text: 'Dashboard', route: '/' },
         {icon:'folder',text: 'My Chores',route:'/Chores'},
         {icon:'folder',text: 'My Rewards',route:'/Rewards'},
        //  {icon:'add',text: 'Add', route:'/Add'},
         {icon:'history',text: 'About', route:'/About'},
        // {icon:'people',text: 'Family', route:'/Family'},
      ]
    }
  },
  computed: {
      signedIn(){
          return this.$store.getters.signedIn;
      },
  },
  methods: {
      signOut(){
        Auth.signOut()
          .then(data =>{
            this.$store.state.signedIn = !!data;
          } )
          .catch(err => console.log(err));
      },
  },

}
</script>
