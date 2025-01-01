<template>
  <div>
    <button @click="signOut" class="signout-button">Sign Out</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignOut',
  methods: {
    async signOut() {
      try {
          // Retrieve the token from session storage
          const token = sessionStorage.getItem('authToken');
        if (!token) {
          this.errorMessage = 'Authentication token is missing. Please log in again.';
          return;
        }



        // Call the backend API to sign out
        await axios.post(process.env.VUE_APP_SIGNOUT_API_URL, {}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });


        // Clear the token from session storage
        sessionStorage.removeItem('authToken');

        // Redirect to the home page
        this.$router.push('/');
      } catch (error) {
        console.error('Error signing out:', error);
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
  transition-duration: 0.4s;
}

.signout-button:hover {
  background-color: white;
  color: #ff4b5c;
  border: 2px solid #ff4b5c;
}
</style>