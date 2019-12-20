<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text class="success" v-on="on" >Update Chore</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Update Your Chore</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="choreForm">
                  <v-text-field label="Title" v-model="dbChore.title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                  <v-textarea label="Information" v-model="dbChore.desc" prepend-icon="edit"></v-textarea>
                  
                  <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      full-width
                      max-width="290"
                  >
                      <template v-slot:activator="{ on }">
                          <v-text-field
                              :value="due"
                              clearable
                              label="Due Date"
                              readonly
                              v-on="on"
                          ></v-text-field>
                          <v-select
                              :items="myDbRewards.items"
                              v-model="selectRewardID"
                              label="Reward"
                              item-value="id"
                              item-text="name"
                              @change='updateReward'
                          ></v-select>
                      </template>
                      <v-date-picker
                          v-model="due"
                          @change="menu1 = false"
                      ></v-date-picker>
                  </v-menu>
                  </v-menu> 
                       <v-menu
                           ref="menu"
                           v-model="menu2"
                           :close-on-content-click="false"
                           :return-value.sync="dates"
                           transition="scale-transition"
                           offset-y
                           full-width
                           min-width="290px"
                       >
                           <template v-slot:activator="{ on }">
                                <v-combobox
                                   v-model="dates"
                                   multiple
                                   chips
                                   small-chips
                                   label="Chore Dates"
                                   prepend-icon="event"
                                   readonly
                                   v-on="on">
                                </v-combobox>
                           </template>
                           <v-date-picker v-model="dates" multiple no-title scrollable>
                               <v-spacer></v-spacer>
                               <v-btn text color="primary" @click="menu2= false">Cancel</v-btn>
                               <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                           </v-date-picker>
                      </v-menu>
                  <v-spacer></v-spacer>

                  <v-btn text class="success mx-0 mt-3" :loading="updatingChore" @click="submit">Save</v-btn>
                </v-form>
            </v-card-text>
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
          API.graphql(graphqlOperation(queries.listChores,{filter: {id: {eq: this.choreID}}}))
              .then(res => { this.dbChore=res.data.listChores.items[0];
                             this.selectRewardID=res.data.listChores.items[0].reward.id;
               })
      },
      data() {
        return {
          dbChore: '',
          menu1: false,
          menu2: false,
          dates:[],
          selectRewardID: '',
          due: null,
          updatingChore: false,
          dialog: false,
          inputRules: [
             v => v.length >= 1 || 'This field is required'
          ]
        }
      },
      methods: {
        submit() {
           if(this.$refs.choreForm.validate()) {
              this.updatingChore=true;
              const choreDetails = {
                 id:this.dbChore.id,
                 title: this.dbChore.title,
                 desc: this.dbChore.desc,
                 choreRewardId: this.selectRewardID
              };
              const newChore = API.graphql(
                  graphqlOperation(mutations.updateChore, { input: choreDetails })
              )
                .then (res => {
                  //this.$router.push("/Chores");
                  //window.location.reload();
                })
                .catch(err => (this.error = err.message));

              // ------ Add chore dates ------- //
              // ------- onlyhandling one date, and not considering existing dates!!!

              const choreDateDetails = {
                 targetDate : this.dates[0],
                 choreDateChoreId:this.ChoreID
              };
              const newChoreDate = API.graphql(
                  graphqlOperation(mutations.createChoreDate, {input: choreDateDetails })
              )
                .then (res => {
                       console.log('got here');
                       console.log(res.data.createChoreDate.id);
                 })
                .catch(err => (this.error = err.message));
           }
           this.updatingChore=false;
           this.dialog=false;
           // this.$emit('choreAdded');
        }
      },
      computed: {
         myDbRewards(){
             return this.$store.getters.rewards;
         },
      }
    }
</script>
