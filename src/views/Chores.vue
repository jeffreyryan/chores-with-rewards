<template>
   <div class="chores">
       <h1>Chores</h1>
       <v-container class="my-5">
           <v-expansion-panels>
               <v-expansion-panel
                   v-for="cwr in myChores"
                   :key="cwr.chore"
               >
                   <v-expansion-panel-header>{{ cwr.chore }}</v-expansion-panel-header>
                   <v-expansion-panel-content>
                       <v-card>
                          <v-card-text class="px-4 grey--text">
                             <div class="font-weight-bold">due by {{ cwr.nextDueDate }}</div>
                             <div>info</div>
                          </v-card-text>
                       </v-card>
                   </v-expansion-panel-content>
               </v-expansion-panel>
               <v-expansion-panel
                  v-for="cwr in myDbChores.items"
                    :key="cwr.title"
                 @click="panelExpanded(cwr.reward.name)"
               >
                  <v-expansion-panel-header>{{ cwr.title }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                      <v-card>
                          <v-card-text class="px-4 grey--text">
                              <div class="font-weight-bold">due by NEED DATES</div>
                              <div>info</div>
                              <div class="font-weight-bold">{{ cwr.reward && cwr.reward.name }}</div>
                              <v-btn class="success" @click="consoleReward">Console Reward</v-btn>
                              <v-select
                                    :items="rewards"
                                    v-model="setLocale"
                                    label="Reward"
                                    item-value="name"
                                    @change='updateReward'
                              ></v-select>
                          </v-card-text>
                      </v-card>
                   </v-expansion-panel-content>
               </v-expansion-panel> 
           </v-expansion-panels>
           <v-select
               :items="dbRewards"
               v-model="setLocale"
               label="Reward"
               item-value="name"
               item-text="id"
               @change='updateReward'
           ></v-select>
       </v-container>
       <AddChore />
   </div>
</template>

<script>
import AddChore from '../components/AddChore';
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default {
  components: { AddChore },
  data(){
    return {
      choresWithRewards: [
         {chore: 'Take out the trash', person:'jayden', reward: '$5', nextDueDate: '08/24/2019', status: 'Complete'},
         {chore: 'Clean Room', person:'jay',  reward: 'Icecream', nextDueDate: '08/26/2019', status: 'RewardPending'},
         {chore: 'Give Dogs Bath', person:'jayden', reward: '$2', nextDueDate: '08/30/2019', status: 'ChorePending'}
      ],
      rewards: ['$5','$1','DQ Icecream'],
      dbRewards: [{id:'1',name:'$1'},{id:'2',name:'$5'}],
      initValue:'1',
      fetchedLocale: '',
      setLocale: null
    }
  },
   created(){
     setTimeout(() => {
       this.fetchedLocale = '$1';
       this.setLocale = this.fetchedLocale;
     }, 1000);
   },
   computed: {
      myChores() {
         return this.choresWithRewards.filter(chore => {
            return chore.person === 'jayden'
         })
      },
      myDbChores(){
          this.$store.dispatch('populatedbUser','jryan');
          return this.$store.getters.choresWithRewards;
      },
      dbUser(){
          //return 'jryan';
          return this.$store.getters.dbUser;
      }
   },
   methods: {
      panelExpanded(value)
      { 
         console.log('Inside panelExpanded');
         console.log(value);
         console.log(this.setLocale);
         setTimeout(() => {
            this.setLocale='$5';
         }, 1000);
         console.log(this.setLocale);
      },
      updateReward(value)
      {
         console.log('update choresWithRewards');
         const choreLinkage = {
             id:'5393245d-35ff-4ed0-a717-4f9050cbb1a0',
              choreRewardId:'3341286d-5f6e-4543-af95-8eaf8038da00'
             }
         const updateChore = API.graphql(
             graphqlOperation(mutations.updateChore, {input: choreLinkage })
         )
              .then (res => {
                 console.log('update worked');
               })
              .catch(err => {
                 console.log(err.message);
               })
         
      },
      consoleReward()
          {
           console.log('In consoleReward');
           console.log(this.myDbChores.items[1].title);
           console.log(this.myDbChores.items[1].reward.name);
          },
   },
};
</script>
