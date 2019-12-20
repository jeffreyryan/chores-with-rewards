<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text class="success" v-on="on" >Add new chore</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Add a New Chore</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="choreForm">
                  <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                  <v-textarea label="Information" v-model="content" prepend-icon="edit"></v-textarea>
                  
                   <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      full-width
                      max-width="290"
                  >
                      <template v-slot:activator="{ on }">
                          <v-select
                              :items="myDbRewards.items"
                              v-model="selectRewardID"
                              label="Reward"
                              item-value="id"
                              item-text="name"
                          ></v-select>
                      </template>
                  </v-menu>  
                       <!--<v-menu
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
                      </v-menu> -->
                  <v-spacer></v-spacer>
                  <v-btn text class="success mx-0 mt-3" :loading="addingChore" @click="submit">Add Chore</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

    export default{
      props: ['dbUser','dbUserID'],
      data() {
        return {
          //rewards: ['$5','$1','DQ Icecream'],
          selectRewardID: '',
          title: '',
          content: '',
          dates:[],
          menu1: false,
          menu2: false,
          modal: false,
          addingChore: false,
          dialog: false,
          inputRules: [
             v => v.length >= 1 || 'This field is required'
          ]
        }
      },
      methods: {
        submit() {
           if(this.$refs.choreForm.validate()) {
              this.addingChore=true;
              //const choreDateDetails = {
              //   targetDate : this.dates[0],
              //   choreDateChoreId:'af4f8db0-54f2-457c-ab69-20f37acf2551'
              //};
              //const newChoreDate = API.graphql(
              //    graphqlOperation(mutations.createChoreDate, {input: choreDateDetails })
              //)
              //  .then (res => {
              //         console.log('got here');
              //         console.log(res.data.createChoreDate.id);
              //   })
              //  .catch(err => (this.error = err.message));
              const choreDetails = {
                 title: this.title,
                 desc: this.content,
                 choreUserId: this.dbUserID,
                 choreRewardId: this.selectRewardID
              };
              const newChore = API.graphql(
                  graphqlOperation(mutations.createChore, { input: choreDetails })
              )
                .then (res => {
                  this.$store.dispatch('populatedbUser',this.dbUser);
                  this.$router.push("/Chores");
                })
                .catch(err => (this.error = err.message));
              // setTimeout(function(){
              //   console.log(this.title , this.content);
              //},1)
            console.log(this.content);
           }
           this.addingChore=false;
           this.dialog=false;
           // this.$emit('choreAdded');
        },
      },
       computed: {
           myDbRewards(){
               return this.$store.getters.rewards;
           }
         // formattedDate(){
         //    return this.due ? format(this.due,'Do MMM YYYY') : '' 
          //}
       }
    }
</script>
