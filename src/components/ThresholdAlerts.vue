<template>
  <div>
    <button @click="openModal" class="btn orange-btn">Threshold Alerts</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="modal-title">Enter Alert Information</h2>
        <p class="modal-description">Enter the threshold value for email alerts</p>
        <input type="number" v-model="alertInput" placeholder="KWt" min="0" />
        <button @click="submitAlert" class="btn">Submit</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p class="threshold">Current Threshold value: {{ threshold || 0 }} KWt</p>
       
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ThresholdAlerts',
  data() {
    return {
      showModal: false,
      alertInput: '',
      errorMessage: '',
      threshold:''
    }
  },
  methods: {
    async openModal() {
      this.showModal = true;
      try {
        const token = sessionStorage.getItem('authToken');
        console.log('Token:', token); // Log the token

        // Call the backend API to get the alerts
        const response = await axios.get(process.env.VUE_APP_ALERTS_API_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API response:', response.data.Threshold); // Log the API response
this.threshold = response.data.Threshold;
      
      } catch (error) {
        console.error('Error fetching alerts:', error);
        this.errorMessage = 'Failed to fetch alerts. Please try again.';
      }
    },
    async submitAlert() {
      if (String(this.alertInput).trim() && this.alertInput >= 0) {
        try {
          const token = sessionStorage.getItem('authToken');
          console.log('Token:', token); // Log the token

          // Call the backend API to submit the alert
          const response = await axios.post(process.env.VUE_APP_ALERTS_API_URL, {
            threshold: this.alertInput
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log('API response:', response); // Log the API response

          // // Ensure alerts is an array before pushing
          // if (Array.isArray(this.alerts)) {
          //   this.alerts.push(this.alertInput);
          // } else {
          //   console.error('alerts is not an array:', this.alerts);
          // }
          this.alertInput = '';
          this.errorMessage = '';
          this.showModal = false;
        } catch (error) {
          console.error('Error submitting alert:', error);
          this.errorMessage = 'Update failed. Please try again.';
        }
      } else {
        this.errorMessage = 'Please enter a valid non-negative number.';
      }
    },
    closeModal() {
      this.showModal = false;
      this.errorMessage = '';
    }
  }
}
</script>

<style scoped>
.btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}

.btn:hover {
  background-color: white;
  color: #42b983;
  border: 2px solid #42b983;
}

.orange-btn {
  background-color: orange;
}

.orange-btn:hover {
  background-color: white;
  color: orange;
  border: 2px solid orange;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
}

.modal-title, .modal-description, .threshold {
  color: black;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>