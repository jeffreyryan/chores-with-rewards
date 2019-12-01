<template>
   <div class="Rewards">
       <h1>Rewards</h1>
       <v-container class="my-5">
           <v-expansion-panels>
               <!-- <v-expansion-panel
                   v-for="cwr in myRewards"
                   :key="reward"
               >
                   <v-expansion-panel-header>{{ cwr.reward }}</v-expansion-panel-header>
                   <v-expansion-panel-content>
                       <v-card>
                          <v-card-text class="px-4 grey--text">
                             <div class="font-weight-bold">due by {{ cwr.nextDueDate }}</div>
                             <div>info</div>
                          </v-card-text>
                       </v-card>
                   </v-expansion-panel-content>
               </v-expansion-panel> -->
               <v-expansion-panel
                  v-for="rwd in myDbRewards.items"
                    :key="rwd.name"
               >
                  <v-expansion-panel-header>{{ rwd.name }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                      <!-- <v-card>  -->
                          <v-btn @click="deleteReward(rwd.id)" color="error">Delete Reward</v-btn>
                      <!-- </v-card> -->
                  </v-expansion-panel-content>
               </v-expansion-panel>
           </v-expansion-panels>
       </v-container>
       <AddReward />
   </div>
</template>

<script>
import AddReward from '../components/AddReward';
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default {
  components: { AddReward },
  data(){
    return {
      choresWithRewards: [
         {reward: '$5', person:'jayden', reward: '$5', nextDueDate: '08/24/2019', status: 'Complete'},
         {reward: '$5', person:'jay',  reward: 'Icecream', nextDueDate: '08/26/2019', status: 'RewardPending'},
         {reward: 'Dad Dancing', person:'jayden', reward: '$2', nextDueDate: '08/30/2019', status: 'ChorePending'}
      ]
    }
  },
  created() {
      this.$store.dispatch('populateRewards','jryan');
  },
   computed: {
      myRewards() {
         return this.choresWithRewards.filter(chore => {
            return chore.person === 'jayden'
         })
      },
     myDbRewards() {
         //this.$store.dispatch('populateRewards','jryan');
         return this.$store.getters.rewards;
     },
   },
   methods: {
     deleteReward(rewardId) {
       console.log(rewardId);
       const targetReward = {
             id: rewardId
       };
       const deleteRWD = API.graphql(
           graphqlOperation(mutations.deleteReward, {input: targetReward })
       )
          .then(res => {
              this.$store.dispatch('populateRewards','jryan');
          })
          .catch(err => (this.error = err.message));
     }
   },
};
</script>
