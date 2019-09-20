<template>
  <v-app>
    <Navbar />
    <v-content class="mx-4 mb-4">
      <!-- <HelloWorld/> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,Navbar
  },
  data: () => ({
    //
  }),
};
</script>
