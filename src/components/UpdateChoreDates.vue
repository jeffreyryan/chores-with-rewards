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
                               <v-card>
                                   <v-textarea label="Notes" v-model="cwr.notes" prepend-icon="edit"></v-textarea>
                                   <v-card-text class="px-4 grey--text">
                                       <div class="font-weight-bold">due by NEED DATES</div>
                                       <div>info</div>
                                       <div class="font-weight-bold">Reward : {{ cwr.completeDate && cwr.completeDate }}</div>
                                       <v-btn text class="success mx-0 mt-3" :loading="updatingChore" @click="submit">Save</v-btn>
                                   </v-card-text>
                               </v-card>
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
        }
      },
      methods: {
      },
      computed: {
      }
    }
</script>
