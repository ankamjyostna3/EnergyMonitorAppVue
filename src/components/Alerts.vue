<template>
    <div>
      <button @click="toggleAlertInput" class="alert-button">Alerts for notification</button>
      <div v-if="showInput" class="alert-input-container">
        <input type="text" v-model="alert" placeholder="energy threshold" />
        <button @click="addAlert">Add Alert</button>
      </div>
      <ul>
        <li v-for="(alert, index) in alerts" :key="index">{{ alert }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AlertService',
    data() {
      return {
        showInput: false,
        alert: '',
        alerts: []
      };
    },
    methods: {
      toggleAlertInput() {
        this.showInput = !this.showInput;
      },
      addAlert() {
        if (this.alert.trim()) {
          this.alerts.push(this.alert);
          this.alert = '';
          this.showInput = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .alert-button {
    padding: 10px 20px;
    background-color: #f0ad4e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .alert-button:hover {
    background-color: #ec971f;
  }
  
  .alert-input-container {
    margin-top: 10px;
  }
  
  input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-right: 10px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369f6e;
  }
  
  ul {
    margin-top: 20px;
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background: #f5f5f5;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
  }
  </style>