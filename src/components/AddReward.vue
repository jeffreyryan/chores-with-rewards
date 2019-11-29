<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text class="success" v-on="on" >Add new reward</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Add a New Reward</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="rewardForm">
                  <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                  <v-textarea label="Information" v-model="content" prepend-icon="edit"></v-textarea>
                  
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
                      </template>
                      <!-- <v-date-picker
                          v-model="due"
                          @change="menu1 = false"
                      ></v-date-picker> -->
                  </v-menu>
                  <v-spacer></v-spacer>

                  <v-btn flat class="success mx-0 mt-3" :loading="addingReward" @click="submit">Add Reward</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

    export default{
      data() {
        return {
          title: '',
          content: '',
          due: null,
          addingReward: false,
          dialog: false,
          inputRules: [
             v => v.length >= 1 || 'This field is required'
          ]
        }
      },
      methods: {
        submit() {
           if(this.$refs.rewardForm.validate()) {
              this.addingReward=true;
              const rewardDetails = {
                    name: this.title,
                    desc: this.content,
                    rewardUserId: '3a376292-8f27-49a0-9c30-be4095639d3f'
              };
              const newReward = API.graphql(
                    graphqlOperation(mutations.createReward, { input: rewardDetails })
              )
                .then (res => {
                  this.$store.dispatch('populateRewards','jryan');
                  this.$router.push("/Rewards");
                })
                .catch(err => (this.error = err.message));
           }
           this.addingReward=false;
           this.dialog=false;
           // this.$emit('choreAdded');
        }
      },
       //computed: {
        //  formattedDate(){
         //    return this.due ? format(this.due,'Do MMM YYYY') : '' 
          //}
       //}
    }
</script>
