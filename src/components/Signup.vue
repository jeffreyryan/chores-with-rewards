<template>
   <div>
      <v-layout align-center justify-center>
          <v-flex v-if="!user" xs12 sm8 md4 class="pt-4" >
              <v-flex xs12>
                   <router-link> to="/"
                       <v-img :src="require('../assets/cwr_logo_2.svg')" class="my-3" contain height="65"></v-img>
                   </router-link>
              </v-flex>
              <v-card class="elevation-12 ">
                  <v-toolbar dark color="primary">
                      <v-toolbar-title>Sign Up</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                      <v-form>
                          <v-text-field v-model="login" prepend-icon="person" name="username" label="username" type="text"></v-text-field>
                          <v-text-field v-model="password" prepend-icon="lock" name="password" type="password" label="password"></v-text-field>
                          <v-text-field v-model="email" prepend-icon="email" name="email" type="email" label="email"></v-text-field>
                      </v-form>
                  </v-card-text>
          <!-- <input v-model="login" type="text" placeholder="Login"><br>
          <input v-model="password" type="password" placeholder="Password"><br>
          <input v-model="email" type="email" placeholder="Email"><br> -->
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click=submit>Submit</v-btn>
                  <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
          <p align="center" >Have an account? <a href="home">Login</a></p>
      </v-flex>
          <v-flex v-if="user" xs12 sm8 md4 class="pt-4" >
              <v-card class="elevation-12">
                  <v-toolbar dark color="primary">
                      <v-toolbar-title>Confirm Your Code</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                      <v-form>
                          <v-text-field v-model="code" name="confirmCode" label="Confirmation Code" type="text"></v-text-field>
                      </v-form>
                  </v-card-text>
                  <!-- <input v-model="code" type="text" placeholder="Confirmation Code"><br> -->
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click=confirm align>Submit</v-btn>
                      <v-spacer></v-spacer>
                  </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
      <!-- <v-layout align-center justify-center>
      <div v-if="user" p4>
          <h2>Confirm Sign Up</h2>
          <input v-model="code" type="text" placeholder="Confirmation Code"><br>
          <v-btn @click=confirm align-center>Submit</v-btn>
      </div>
      </v-layout> -->
   </div>
</template>

<script>
  import { Auth } from 'aws-amplify';
  import * as mutations from "./../graphql/mutations";
  import { API, graphqlOperation } from "aws-amplify";
  export default {
      data(){
        return {
           login: '',
           email: '',
           password: '',
           code: '',
           user: '',
           confirmedUser: '',
        }
      },
      methods: {
        confirm(){
        console.log(this.user.username);
        Auth.confirmSignUp(this.login,this.code, {
              forceAliasCreation: true
           }).then(data => {console.log(data);
                            console.log('got here');
                           this.$router.push("/");
                           }
                  )
            .catch(err => console.log(err));
        },
        submit(){
          Auth.signUp({
              username: this.login,
              password: this.password,
              attributes: {
                  email: this.email
              },
              validationData: [],
              })
              .then(data => this.user = data.user)
              .catch(err => console.log(err));
        }
      },
  
  }
</script>

<style>
  input {
     margin: 10px;
     padding: 16px;
}
