<template>
  <div class="home-container">
    <div class="header">
      <h1>Home Energy Monitoring App</h1>
    </div>
    <div class="signin-container">
      <SignIn />
      <div class="button-container">
        <button @click="goToSignUp" class="signup-button">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from './SignIn.vue'

export default {
  name: 'HomePage',
  components: {
    SignIn
  },
  methods: {
    goToSignUp() {
      this.$router.push('/signup');
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
  text-align: center;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  background-color: #f5f5f5;
  padding: 20px;
}

.signin-container {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.signup-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.signup-button:hover {
  background-color: #369f6e;
}
</style>