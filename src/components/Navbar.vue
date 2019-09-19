<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      
        <v-app-bar-nav-icon @click="drawer = !drawer" v-if="signedIn"></v-app-bar-nav-icon>
        <v-navigation-drawer v-model="drawer" app color="deep-purple accent-4">
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
      <v-list>
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
        
        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
           <span>Awesome! You added a new chore.</span>
           <v-btn text color="white" @click="snackbar=false">Close</v-btn>
        </v-snackbar>
        <v-toolbar-title>Chores With Rewards</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
                  <!-- <v-btn iconi class="hidden-md-and-down">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
            
                  <v-btn icon class="hidden-md-and-down">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
  
                  <v-menu
                    left
                    bottom
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
            
                    <v-list>
                      <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu> -->
    </v-app-bar>
  </div>
</template>

<script>
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
         {icon:'add',text: 'Add', route:'/Add'},
         {icon:'history',text: 'About', route:'/About'},
         {icon:'people',text: 'Family', route:'/Family'},
      ]
    }
  },
  computed: {
      signedIn(){
          return this.$store.getters.signedIn;
      },
  },

}
</script>
