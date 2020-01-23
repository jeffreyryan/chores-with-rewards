<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <div v-on="on">
                <v-btn v-if="label" text class="success mx-1"  >
                      <span v-if="label" >Update Chore Dates</span>
                </v-btn>  
                <v-btn v-if="!label" text class="mx-1" icon small >
                      <v-icon small>edit</v-icon>
                </v-btn> 
            </div>
        </template>
        <v-card>
            <v-card-title>
                <h2>Update Dates</h2>
                <v-container class="my-5">
                    <v-expansion-panels v-if="dbChoreDates.items">
                        <v-expansion-panel
                           v-for="cwr in filteredChoreDates"
                             :key="cwr.id"
                          @click="panelExpanded(cwr.id)"
                        >
                           <v-expansion-panel-header>{{ cwr.targetDate }}</v-expansion-panel-header>
                           <v-expansion-panel-content @click="panelExpanded(cwr.id)" >
                                   <v-textarea label="Notes" v-model="cwr.notes" prepend-icon="edit"></v-textarea>
                                   <v-menu
                                       v-model="menu"
                                       :close-on-content-click="false"
                                       :nudge-right="40"
                                       transition="scale-transition"
                                       offset-y
                                       min-width="290px"
                                   >
                                       <template v-slot:activator="{ on }">
                                           <v-text-field
                                             v-model="cwr.completeDate"
                                             label="Completion Date"
                                             prepend-icon="event"
                                             readonly
                                             v-on="on"
                                           ></v-text-field>
                                       </template>
                                       <v-date-picker v-model="cwr.completeDate" @input="menu = false">
                                       </v-date-picker>
                                   </v-menu>
                                   <v-menu
                                       v-model="menu2"
                                       :close-on-content-click="false"
                                       :nudge-right="40"
                                       transition="scale-transition"
                                       offset-y
                                       min-width="290px"
                                   >
                                       <template v-slot:activator="{ on }">
                                           <v-text-field
                                             v-model="cwr.rewardDate"
                                             label="Reward Date"
                                             prepend-icon="event"
                                             readonly
                                             v-on="on"
                                           ></v-text-field>
                                       </template>
                                       <v-date-picker v-model="cwr.rewardDate" @input="menu2 = false">
                                       </v-date-picker>
                                   </v-menu>
                                   <v-btn text class="success mx-0 mt-3" :loading="updatingChore" @click="updateChoreDate(cwr.id)">Save</v-btn>
                            </v-expansion-panel-content> 
                        </v-expansion-panel> 
                    </v-expansion-panels> 

                </v-container>
            </v-card-title>
        </v-card>
    </v-dialog>
</template>

<script>
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

    export default{
      props: {
          choreID: {
              type: String,
          },
          label : {
              type: Boolean,
              default: false
          },
      },
      //props: ['choreID'],
      created: function() {
          //API.graphql(graphqlOperation(queries.listChore,{filter: {choreDateChoreId: {eq: this.choreID}}}))
          API.graphql(graphqlOperation(queries.listChores,{filter: {id: {eq: this.choreID}}}))
              .then(res => { this.dbChoreDates=res.data.listChores.items[0].ChoreDates;
                             //this.selectRewardID=res.data.listChores.items[0].reward.id;
               })
      },
      data() {
        return {
          dbChoreDates: 'hello',
          menu : false,
          menu2 : false,
          numbers : [1,2,3]
        }
      },
      methods: {
         updateChoreDate(ChoreDateID) {
            //console.log(ChoreDateID);
            const index = this.dbChoreDates.items.map(e => e.id).indexOf(ChoreDateID);
            const choreDateDetails = {
                id:this.dbChoreDates.items[index].id,
                notes: this.dbChoreDates.items[index].notes,
                completeDate : this.dbChoreDates.items[index].completeDate,
                rewardDate : this.dbChoreDates.items[index].rewardDate
            }
            const updateChoreDt = API.graphql(
                  graphqlOperation(mutations.updateChoreDate, {input: choreDateDetails })
            )
               .then (res => {
                      this.$router.push("/Home");
                      window.location.reload();
               })
               .catch(err => (this.error = err.message));
         },
      },
      computed: {
          filteredChoreDates() {
             //var filteredChoreDates = this.dbChoreDates.items;
             //for (var dateIdx=0; dateIdx < filteredChoreDates.length; dateIdx++) {
             //    if (filteredChoreDates[dateIdx].rewardDate == !null) {
             //       filteredChoreDates.splice(dateIdx);
             //    }
             //}
             //return filteredChoreDates.sort((a,b) => a.targetDate < b.targetDate ? -1 : 1)
             console.log('Why isnt dbChoreDates populated?');
             console.log(this.dbChoreDates);
             console.log(this.dbChoreDates.items[0].completeDate);
             var filteredChoreDates = this.dbChoreDates.items.filter(function (numbir) {
                  return !numbir.rewardDate
               }) 
             return filteredChoreDates.sort((a,b) => a.targetDate < b.targetDate ? -1 : 1)
          }
      }
    }
</script>
