<template>
    <button @click="signOut" class="signout-button">Sign Out</button>
  </template>
  
  <script>
  //import { Auth } from 'aws-amplify'
  
  export default {
    name: 'SignOut',
    methods: {
      async signOut() {
        try {
         // await Auth.signOut();
          this.$router.push('/');
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .signout-button {
    padding: 10px 20px;
    background-color: #ff4b5c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .signout-button:hover {
    background-color: #ff1f3a;
  }
  </style>