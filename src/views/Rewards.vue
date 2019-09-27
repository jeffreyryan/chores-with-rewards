<template>
   <div class="Rewards">
       <h1>Rewards</h1>
       <v-container class="my-5">
           <v-expansion-panels>
               <v-expansion-panel
                   v-for="cwr in myRewards"
                   :key="reward"
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
           </v-expansion-panels>
       </v-container>
       <AddChore />
   </div>
</template>

<script>
import AddReward from '../components/AddReward';

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
   computed: {
      myRewards() {
         return this.choresWithRewards.filter(chore => {
            return chore.person === 'jayden'
         })
      }
   }
};
</script>
