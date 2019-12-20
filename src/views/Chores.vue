<template>
   <div class="chores">
       <h1>Chores</h1>
       <v-container class="my-5">
           <v-expansion-panels>
               <v-expansion-panel
                  v-for="cwr in myDbChores.items"
                    :key="cwr.title"
                 @click="panelExpanded(cwr.reward.name)"
               >
                  <v-expansion-panel-header>{{ cwr.title }}</v-expansion-panel-header>
                  <v-expansion-panel-content @click="panelExpanded(cwr.reward.name)" >
                      <v-card>
                          <v-card-text class="px-4 grey--text">
                              <div class="font-weight-bold">due by NEED DATES</div>
                              <div>info</div>
                              <div class="font-weight-bold">Reward : {{ cwr.reward && cwr.reward.name }}</div>
                              <!-- <UpdateChore :choreID="cwr.id"/> -->
                          </v-card-text>
                      </v-card>
                      <v-container class="d-flex flex-row-reverse"> 
                          <UpdateChore :choreID="cwr.id"/>
                          <v-btn @click="deleteChore(cwr.id)" color="error">Delete Chore</v-btn>
                      </v-container>
                   </v-expansion-panel-content>
               </v-expansion-panel> 
           </v-expansion-panels>
       </v-container>
       <AddChore :dbUser="this.dbUser" :dbUserID="this.dbUserID"/>
   </div>
</template>

<script>
import AddChore from '../components/AddChore';
import UpdateChore from '../components/UpdateChore';
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default {
  components: { AddChore,UpdateChore },
   data(){
       return {
          username:'',
       }
   },
   //created(){
     //username= this.$store.getters.dbUser;
     //console.log(username);
     //this.$store.dispatch('populatedbUser',dbUser);
     //this.$store.dispatch('populateRewards',dbUser);
   //},
   computed: {
      //myChores() {
      //   return this.choresWithRewards.filter(chore => {
      //      return chore.person === 'jayden'
      //   })
      //},
      myDbChores(){
          //console.log('computing myDbChores');
          return this.$store.getters.choresWithRewards;
      },
      dbUser(){
          return this.$store.getters.dbUser;
      },
      dbUserID(){
          return this.$store.getters.dbUserID;
      },
   },
   methods: {
      panelExpanded(value)
      { 
         console.log('Inside panelExpanded');
         console.log(value);
      },
      deleteChore(choreID)
      {
         const targetChore = {
            id: choreID
         };
         const deleteChor = API.graphql(
             graphqlOperation(mutations.deleteChore, {input: targetChore })
         )
             .then(res=> {
                  this.$store.dispatch('populatedbUser',this.dbUser);
              })
             .catch(err => (this.error = err.message));
      },
   },
};
</script>
