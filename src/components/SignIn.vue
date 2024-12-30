<template>
    <div>
      <h2>Sign In</h2>
      <form @submit.prevent="signIn">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Sign In</button>
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
        errorMessage: '',
      };
    },
    methods: {
      async signIn() {
        try {
          const response = await axios.post(process.env.VUE_APP_LOGIN_API_URL, {
            username: this.username,
            password: this.password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          console.log('Sign-in successful:', response.data.token);
          // Save the token in session storage
        sessionStorage.setItem('authToken', response.data.token);

          this.$router.push('/dashboard'); // Redirect on successful sign-in
        } catch (error) {
          console.error('Error signing in:', error);
          if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.errorMessage = 'Failed to sign in. Please check your credentials and try again.';
        } else if (error.request) {
          // The request was made but no response was received
          this.errorMessage = 'Server is down. Please try after some time.';
        } else {
          // Something happened in setting up the request that triggered an Error
          this.errorMessage = 'An error occurred. Please try again.';
        }
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