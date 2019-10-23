<template>
   <div>
      <v-layout align-center justify-center>
          <v-flex v-if="!user" xs12 sm8 md4 >
              <v-flex xs12>
                   <router-link> to="/"
                       <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="65"></v-img>
                   </router-link>
              </v-flex>
              <v-card class="elevation-12">
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
      </v-flex>
      </v-layout>
      <div v-if="user">
          <h2>Confirm Sign Up</h2>
          <input v-model="code" type="text" placeholder="Confirmation Code"><br>
          <v-btn @click=confirm>Submit</v-btn>
          <v-btn @click=insertUser>add db user</v-btn>
      </div>
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
           }).then(data => console.log(data))
            .catch(err => console.log(err));
        },
         insertUser() {           // cant get this to work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
             console.log(this.login);
             alert('got here');
              const userDetails = {
                  userName: this.login,
                  email: this.email
              };
              const newUser = API.graphql(
                  graphqlOperation(mutations.createUser, { input: userDetails })
              )
                  .then(res => {
                      this.$router.push("/");
                  })
                  // .catch(err => (this.error = err.message));
                  .catch(err => consol.log(err));
             alert('got here also');
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
