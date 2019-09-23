<template>
   <div class="chores">
       <h1>Chores</h1>
       <v-container class="my-5">
           <v-expansion-panels>
               <v-expansion-panel
                   v-for="cwr in myChores"
                   :key="chore"
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
   </div>
</template>

<script>

export default {
  data(){
    return {
      choresWithRewards: [
         {chore: 'Take out the trash', person:'jayden', reward: '$5', nextDueDate: '08/24/2019', status: 'Complete'},
         {chore: 'Clean Room', person:'jay',  reward: 'Icecream', nextDueDate: '08/26/2019', status: 'RewardPending'},
         {chore: 'Give Dogs Bath', person:'jayden', reward: '$2', nextDueDate: '08/30/2019', status: 'ChorePending'}
      ]
    }
  },
   computed: {
      myChores() {
         return this.choresWithRewards.filter(chore => {
            return chore.person === 'jayden'
         })
      }
   }
};
</script>
