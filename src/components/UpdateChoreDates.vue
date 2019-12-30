<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text class="success" v-on="on" >Update Chore Dates</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Update Dates</h2>
                <v-container class="my-5">
                    <v-expansion-panels>
                        <v-expansion-panel
                           v-for="cwr in dbChoreDates.items"
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
                                             label="Picker without buttons"
                                             prepend-icon="event"
                                             readonly
                                             v-on="on"
                                           ></v-text-field>
                                       </template>
                                       <v-date-picker v-model="cwr.completeDate" @input="menu = false">
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
      props: ['choreID'],
      created: function() {
          //API.graphql(graphqlOperation(queries.listChore,{filter: {choreDateChoreId: {eq: this.choreID}}}))
          API.graphql(graphqlOperation(queries.listChores,{filter: {id: {eq: this.choreID}}}))
              .then(res => { this.dbChoreDates=res.data.listChores.items[0].ChoreDates;
                             //this.selectRewardID=res.data.listChores.items[0].reward.id;
               })
      },
      data() {
        return {
          dbChoreDates: '',
          menu : false,
        }
      },
      methods: {
         updateChoreDate(ChoreDateID) {
            //console.log(ChoreDateID);
            const index = this.dbChoreDates.items.map(e => e.id).indexOf(ChoreDateID);
            const choreDateDetails = {
                id:this.dbChoreDates.items[index].id,
                notes: this.dbChoreDates.items[index].notes,
                completeDate : this.dbChoreDates.items[index].completeDate
            }
            const updateChoreDt = API.graphql(
                  graphqlOperation(mutations.updateChoreDate, {input: choreDateDetails })
            )
               .then (res => {
                      console.log('success');
               })
               .catch(err => (this.error = err.message));
         },
      },
      computed: {
      }
    }
</script>
