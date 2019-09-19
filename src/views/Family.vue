<template>
   <div class="family">
       <h1 class="subheading grey--text">Family</h1>
       <v-container class="my-5">
           <v-layout row wrap>
             <v-flex xs12 sm6 md4 lg3 v-for="sibling in family" :key="sibling.name">
                <v-card flat class="text-xs-center ma-3">
                  <v-responsive class="pt-4">
                     <v-avatar size="100" class="grey lighten-2">
                         <img :src="sibling.avatar">
                     </v-avatar>
                  </v-responsive>
                  <v-card-text>
                    <div class="subheading">{{ sibling.name }}</div>
                    <div class="grey--text">{{ sibling.username }}</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn flat color="grey">
                       <v-icon small left>message</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card> 
             </v-flex>
           </v-layout>
       </v-container>
       <SignUp />
   </div>
</template>

<script>
import SignUp from '../components/Signup';

export default {
    components: {
        SignUp
    },
    data(){
      return {
        family: [
           {name: 'Jayden',username: 'jayden9636',avatar: '/avatar-1.png'},
           {name: 'Jay',username: 'djquay',avatar: '/avatar-2.png'}
        ]
      }
    }
};
</script>
