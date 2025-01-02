<template>
  <div>
    <h2>Input Energy Usage Data</h2>
    <div class="input-group">
      <label for="energy">Energy</label>
      <input v-model="energy" id="energy" type="number" placeholder="KWt" @input="validateEnergy" />
    </div>
    <div class="input-group">
      <label for="date">Date</label>
      <input v-model="date" id="date" type="date" />
    </div>
    <button @click="handleSubmit">Submit</button>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManualInput',
  data() {
    return {
      energy: '',
      date: new Date().toISOString().substr(0, 10),
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    validateEnergy(event) {
      if (event.target.value === '' || event.target.value < 0) {
        event.target.value = 0;
        this.energy = 0;
        this.errorMessage = 'Energy value cannot be negative or empty.';
      } else {
        this.errorMessage = ''; // Clear the error message if the value is valid
      }
    },
    async handleSubmit() {
      if (this.energy === '' || this.energy < 0) {
        this.errorMessage = 'Please enter a valid energy value.';
        return;
      }

      try {
        // Retrieve the token from session storage
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          this.errorMessage = 'Authentication token is missing. Please log in again.';
          return;
        }


        const response = await axios.post(process.env.VUE_APP_ROOT_API_URL+process.env.VUE_APP_ENERGY_INPUT_ENDPOINT, {
          energy: this.energy,
          date: this.date
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });
console.log('response:', response);

        if (response.status === 200 && response.data.success) {
          this.successMessage = 'Energy data saved successfully!';
          this.errorMessage = '';
        } else {
          this.successMessage = '';
          this.errorMessage = response.data.error || 'Failed to submit form. Please try again.';
          console.log('Error submitting form:', response.data);
        }

        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 5000); // Clear the message after 5 seconds
      } catch (error) {
        console.error('Error submitting form:', error);
        this.successMessage = '';
        this.errorMessage = error.response?.data?.error || 'Failed to submit form. Please try again.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000); // Clear the message after 5 seconds
      }
    }
  }
};
</script>

<style scoped>
h2 {
  color: #42b983;
}

.input-group {
  margin-bottom: 15px;
}

label {
  margin-right: 10px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

.success-message {
  color: green;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>