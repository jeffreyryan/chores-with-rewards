<template>
     <v-footer fixed light > 
       <v-layout column align-center justify-center>
           <v-row>
               <h4 class="px-4 mt-2">Need Help? Watch Jayden's How To Videos:</h4>
               <v-btn class="px-4">
                    <v-icon small>videocam</v-icon>
               </v-btn>
           </v-row>
           <v-row>
                Copyright © {{ new Date().getFullYear() }} JMR Cloud Apps
           </v-row>
       </v-layout>
       <!-- <v-jumbotron height=auto justify-center>
       <v-container align-center justify-center>
          <v-layout align-center justify-center>
               <h4 class="px-4">Need Help? Watch Jayden's How To Videos:</h4>
               <v-btn class="px-4">
                    <v-icon small>videocam</v-icon>
               </v-btn>
          </v-layout>
          <v-layout align-center justify-center>
                Copyright © {{ new Date().getFullYear() }} JMR Cloud Apps
          </v-layout>
       </v-container>
       </v-jumbotron> -->
     </v-footer> 
</template>

<script>
export default {
  name: "Footer",
  components: { },
  data() {
    return {
    }
  },
}
</script>
