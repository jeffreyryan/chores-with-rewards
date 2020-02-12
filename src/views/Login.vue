<template>

  <div>
    <HelloWorld />
    <v-img
      :src="require('../assets/cwr_logo_2.svg')"
      class="my-3"
      contain
      height="300"
     ></v-img>
  </div>

</template>

<script>
import HelloWorld from '../components/HelloWorld';
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default {
  components: {
    HelloWorld
  },
  data(){
    return {
    haveChoreData : false,
    }
  },
  created: function() {
      if(this.signedIn) {
          this.$router.push("/Home");
          //window.location.reload();
      }
  },
  computed: {
      signedIn(){
          return this.$store.getters.signedIn;
      },
   },
};
</script>

