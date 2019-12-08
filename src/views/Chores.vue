<template>
   <div class="chores">
       <h1>Chores</h1>
       <v-container class="my-5">
           <v-expansion-panels>
               <v-expansion-panel
                  v-for="cwr in myDbChores.items"
                    :key="cwr.title"
                 @click="panelExpanded(cwr.reward.name)"
               >
                  <v-expansion-panel-header>{{ cwr.title }}</v-expansion-panel-header>
                  <v-expansion-panel-content @click="panelExpanded(cwr.reward.name)" >
                      <v-card>
                          <v-card-text class="px-4 grey--text">
                              <div class="font-weight-bold">due by NEED DATES</div>
                              <div>info</div>
                              <div class="font-weight-bold">Reward : {{ cwr.reward && cwr.reward.name }}</div>
                              <!-- <UpdateChore :choreID="cwr.id"/> -->
                          </v-card-text>
                      </v-card>
                      <v-container class="d-flex flex-row-reverse"> 
                          <UpdateChore :choreID="cwr.id"/>
                      </v-container>
                   </v-expansion-panel-content>
               </v-expansion-panel> 
           </v-expansion-panels>
       </v-container>
       <AddChore />
   </div>
</template>

<script>
import AddChore from '../components/AddChore';
import UpdateChore from '../components/UpdateChore';

export default {
  components: { AddChore,UpdateChore },
  data(){
    return {
      setLocale: null
    }
  },
   created(){
     this.$store.dispatch('populatedbUser','jryan');
     this.$store.dispatch('populateRewards','jryan');
   },
   computed: {
      //myChores() {
      //   return this.choresWithRewards.filter(chore => {
      //      return chore.person === 'jayden'
      //   })
      //},
      myDbChores(){
          console.log('computing myDbChores');
          return this.$store.getters.choresWithRewards;
      },
      myDbRewards(){
          return this.$store.getters.rewards;
      },
      dbUser(){
          //return 'jryan';
          return this.$store.getters.dbUser;
      }
   },
   methods: {
      panelExpanded(value)
      { 
         console.log('Inside panelExpanded');
         console.log(value);
      },
   },
};
</script>
