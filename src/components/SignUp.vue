<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      errorMessage: '',
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post(process.env.VUE_APP_SIGNUP_API_URL, {
          username: this.username,
          password: this.password,
          email: this.email,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('Sign-up successful:', response.data);
        this.$router.push('/dashboard'); // Redirect to dashboard after successful sign-up
      } catch (error) {
        console.error('Error signing up:', error);
        this.errorMessage = 'Failed to sign up. Please check your details and try again.';
      }
    }
  }
};
  </script>
  
  <style scoped>
  h2 {
    color: #42b983;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  div {
    margin-bottom: 15px;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369f6e;
  }
  
  p {
    color: red;
  }
  </style>