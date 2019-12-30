<template>

  <div>
    <HelloWorld /> 

    <v-container class="my-5" v-if="signedIn">

          <v-layout row class="mb-3">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn small flat color="grey" @click="sortBy('chore')">
                      <v-icon left small>folder</v-icon>
                      <span class="caption text-lowercase">By chore name</span>
                  </v-btn>
                </template>
                <span>Sort by chore name</span>
              </v-tooltip>
              <v-tooltip bottom>
                  <v-btn small flat color="grey" @click="sortBy('nextDueDate')" slot="activator">
                      <v-icon left small>date-range</v-icon>
                      <span class="caption text-lowercase">By due date</span>
                  </v-btn>
                  <span>Sort by next due date</span>
              </v-tooltip>
              <v-btn small flat color="grey" @click="addUser">
                    <span class="caption text-lowercase">Add User</span>
              </v-btn>
          </v-layout>

          <v-card flat v-for="cwr in choresWithRewards" :key="cwr.chore">
              <v-layout row wrap :class="`pa-3 choresWithRewards ${cwr.status}`">
                 <v-flex xs12 md6>
                     <div class="caption grey--text">Chore</div>
                     <div>{{ cwr.chore }}</div>
                 </v-flex>
                 <v-flex xs6 sm4 md2>
                     <div class="caption grey--text">Reward</div>
                     <div>{{ cwr.reward }}</div>
                 </v-flex>
                 <v-flex xs6 sm4 md2>
                     <div class="caption grey--text">Due by</div>
                     <div>{{ cwr.nextDueDate }}</div> 
                 </v-flex>
                 <v-flex xs2 sm4 md2>
                     <div class="right">
                        <v-chip small :class="`${cwr.status} white--text caption my-2`">{{ cwr.status }}</v-chip>
                     </div>
                 </v-flex>
              </v-layout>
              <v-divider></v-divider>
          </v-card>
          <v-card flat v-for="cwr in myDbChores.items" :key="cwr.title">
              <v-layout row wrap :class="`pa-3 myDbChores Pending`">
                  <v-flex xs12 md6>
                     <div class="caption grey--text">Chore</div>
                     <div>{{ cwr.title }} </div>
                  </v-flex>
                  <v-flex xs6 sm4 md2>
                      <div class="caption grey--text">Reward</div>
                      <div>{{cwr.reward && cwr.reward.name}} </div>
                  </v-flex>
                  <v-flex xs8 sm4 md2>
                      <div class="caption grey--text">Due by</div> 
                      <div>{{ cwr.ChoreDates.items[0] && cwr.ChoreDates.items[0].targetDate }}</div>
                  </v-flex> 
              </v-layout>
          </v-card>
       </v-container>
    </div>

</template>

<script>
import HelloWorld from '../components/HelloWorld';
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default {
  components: {
    HelloWorld,
  },
  data(){
    return {
      choresWithRewards: [
         {chore: 'Take out the trash', reward: '$5', nextDueDate: '08/24/2019', status: 'Complete'},
         {chore: 'Clean Room', reward: 'Icecream', nextDueDate: '08/26/2019', status: 'RewardPending'},
         {chore: 'Give Dogs Bath', reward: '$2', nextDueDate: '08/30/2019', status: 'ChorePending'}
      ],
    }
  },
  computed: {
      signedIn(){
          return this.$store.getters.signedIn;
      },
      myDbChores(){
       const dbChores=this.$store.getters.choresWithRewards;
          if (dbChores.items) {
          //const numOfChores = dbChores.items.length;
          //console.log(numOfChores);
          for (var idx = 0; idx < dbChores.items.length; idx++) {
          //                       //console.log(this.dbDates.items[idx].targetDate);
          //                       //this.dates.push(this.dbDates.items[idx].targetDate);
          //                       //this.origDates.push(this.dbDates.items[idx].targetDate);
                                 console.log('-----');
                                 console.log(idx);
                                 if (dbChores.items[idx].ChoreDates.items[0]) {
                                     //const targetDate=dbChores.items[idx].ChoreDates.items[0].targetDate;
                                     for (var dateIdx=0; dateIdx < dbChores.items[idx].ChoreDates.items.length; dateIdx++) {
                                        dbChores.items[idx].status='Complete';
                                        //if (dbChores.items[idx].rewardDates.items[dateIdx].completeDate == null) {
                                         //   dbChores.items[idx].status='Reward Pending';
                                            if (dbChores.items[idx].ChoreDates.items[dateIdx].completeDate == null) {
                                                const targetDate=dbChores.items[idx].ChoreDates.items[dateIdx].targetDate;
                                                console.log(targetDate);
                                                dbChores.items[idx].NextTargetDate = targetDate;
                                                dbChores.items[idx].status='Chore Pending';
                                            }
                                        //}
                                     }
                                     //dbChores.items[idx].NextTargetDate = targetDate;
                                }
                             }
          }
          return dbChores;
          //return this.$store.getters.choresWithRewards;
      },
   },
   methods: {
     sortBy(prop){
         this.choresWithRewards.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
     },
     addUser(){
         alert('in addUser');
         const userDetails = {
               userName: 'Jeffy',
               email: 'jeff_a_ryan@yahoo.com'
         };
         const newUser = API.graphql(
               graphqlOperation(mutations.createUser, { input: userDetails })
             )
               .then(res => {
                    this.$router.push("/home");
                })
               .catch(err => (this.error = err.message));
    },
   },
};
</script>

<style>

.choresWithRewards.Complete {
  border-left: 4px solid green;
}

.choresWithRewards.RewardPending {
  border-left: 4px solid orange;
}
.choresWithRewards.ChorePending {
  border-left: 4px solid tomato;
}

.v-chip.Complete {
  background: green !important;
}

.v-chip.RewardPending {
  background: orange !important;
}
.v-chip.ChorePending {
  background: tomato !important;
}

</style>
