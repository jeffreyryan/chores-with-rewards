<template>

  <div>
    <!-- <HelloWorld /> -->
    <v-progress-linear v-if="apiRequest" :indeterminate="true" class="ma-0"></v-progress-linear>
    <v-container v-if="!myFilteredChores.items" >
         <v-card class="py-28">
                <v-card-title>
                        <h2>Welcome to Chores With Rewards!</h2>
                </v-card-title>
                <v-card-text class="py-16">To get started, Go to the Chores page or click the button below.</v-card-text>
         </v-card>
         <v-btn class="my-5" align="right" to="/Chores">Manage Chores</v-btn>
    </v-container>
    <v-container class="my-5" v-if="myFilteredChores.items">
          <v-layout row class="mb-3">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn small flat color="grey" @click="sortBy('title')">
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
          </v-layout>

           <v-card flat v-for="cwr in myFilteredChores.items" :key="cwr.title" >
              <v-layout row wrap :class="`pa-3 choresWithRewards ${cwr.status}`">
                  <v-flex xs12 md4>
                     <div class="caption grey--text">Chore</div>
                     <div>{{ cwr.title }} </div>
                  </v-flex>
                  <v-flex xs12 sm3 md2>
                      <div class="caption grey--text">Reward</div>
                      <div>{{cwr.reward && cwr.reward.name}} </div>
                  </v-flex>
                  <v-flex xs6 sm3 md2>
                      <div class="caption grey--text">Due by</div> 
                       <!-- <div>{{cwr.nextDueDate }}</div>  -->
                       <div v-if="cwr.ChoreDates.filteredItems[0]">{{cwr.ChoreDates.filteredItems[0].targetDate }}</div> 
                  </v-flex> 
                  <v-flex xs3 sm3 md2 >
                     <div class="right d-flex justify-end">
                        <v-chip small :class="`${cwr.status} white--text caption my-2`">{{ cwr.status }}
                        </v-chip>
                     </div>
                 </v-flex> 
                 <v-flex xs3 sm3 md2>
                     <div class="right">
                        <UpdateChoreDates :choreID="cwr.id" />
                     </div>
                 </v-flex> 
              </v-layout>
          </v-card> 
          <v-img
          :src="require('../assets/cwr_logo_2.svg')"
          class="my-3"
          contain
          height="300"
        ></v-img>
       </v-container>
    </div>

</template>

<script>
import HelloWorld from '../components/HelloWorld';
import UpdateChoreDates from '../components/UpdateChoreDates';
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default {
  components: {
    HelloWorld,UpdateChoreDates
  },
  data(){
    return {
      apiRequest: false,
    haveChoreData : false,
    }
  },
  computed: {
      signedIn(){
          return this.$store.getters.signedIn;
      },
      myFilteredChores(){
      var todaysDate= new Date();
      var targetDate= new Date();
      console.log(todaysDate);
      const filteredChores=this.$store.getters.choresWithRewards;
          if (filteredChores.items) {
          for (var idx = 0; idx < filteredChores.items.length; idx++) {
                             //    filteredChores.items[idx].ChoreDates.items = 
                             //              filteredChores.items[idx].ChoreDates.items.filter(function (numbir) {
                             //                                                                  return numbir.rewardDate === null
                             //                                                                }).sort((a,b) => a.targetDate < b.targetDate ? -1 : 1);
 
              filteredChores.items[idx].ChoreDates.filteredItems = filteredChores.items[idx].ChoreDates.items.filter(item => item.rewardDate === null);
              filteredChores.items[idx].ChoreDates.sortedItems = filteredChores.items[idx].ChoreDates.filteredItems.sort((a,b) => a.targetDate < b.targetDate ? -1 : 1);
              //var targetDate= new Date(filteredChores.items[idx].ChoreDates.sortedItems[0].targetDate);
              //targetDate.setMinutes(targetDate.getMinutes()+5);
              //console.log(targetDate);
              //console.log(filteredChores.items[idx].ChoreDates.sortedItems[0].targetDate);
                   if (filteredChores.items[idx].ChoreDates.sortedItems[0]) { 
                           targetDate= new Date(filteredChores.items[idx].ChoreDates.sortedItems[0].targetDate);
                           if (targetDate > todaysDate) {
                                      filteredChores.items[idx].status='Complete';
                           } else if (filteredChores.items[idx].ChoreDates.sortedItems[0].completeDate == null) {
                                      filteredChores.items[idx].status='Chore-Pending';
                                    } else if (filteredChores.items[idx].ChoreDates.sortedItems[0].rewardDate == null) {
                                                 filteredChores.items[idx].status='Reward-Pending';
                                            }
                   } else {filteredChores.items[idx].status='No-Date'}
              }
          }
      return filteredChores;
      },
   },
   methods: {
     sortBy(prop){
         //this.choresWithRewards.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
         this.myDbChores.items.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
     },
   },
};
</script>

<style>

.choresWithRewards.No-Date {
  border-left: 4px solid orange;
}

.choresWithRewards.Complete {
  border-left: 4px solid green;
}

.choresWithRewards.Reward-Pending {
  border-left: 4px solid orange;
}
.choresWithRewards.Chore-Pending {
  border-left: 4px solid tomato;
}

.v-chip.No-Date {
  background: orange !important;
}

.v-chip.Complete {
  background: green !important;
}

.v-chip.Reward-Pending {
  background: orange !important;
}
.v-chip.Chore-Pending {
  background: tomato !important;
}

</style>
