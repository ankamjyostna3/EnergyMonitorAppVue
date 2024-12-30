<template>
    <div class="dashboard-container">
      <div class="header">
        <h1>Welcome to the Dashboard -- User!</h1>
        <SignOut />
      </div>
      <div class="sections">
        <ManualInput />
        <CsvUpload />
        <HistoricalData />
        <Alerts />
      </div>
    </div>
  </template>
  
  <script>
  import ManualInput from './ManualInput.vue'
  import CsvUpload from './CsvUpload.vue'
  import HistoricalData from './HistoricalData.vue'
  import Alerts from './Alerts.vue'
  import SignOut from './SignOut.vue'
  
  export default {
    name: 'DashboardPage',
    components: {
      ManualInput,
      CsvUpload,
      HistoricalData,
      Alerts,
      SignOut
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  h1 {
    color: #42b983;
    text-align: center;
    flex-grow: 1;
  }
  
  .sections {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
  }
  
  .sections > * {
    flex: 1;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>