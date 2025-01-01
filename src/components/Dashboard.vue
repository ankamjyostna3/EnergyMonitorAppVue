<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Welcome to the Dashboard -- User!</h1>
      <div class="header-buttons">
        <ThresholdAlerts />
        <SignOut />
      </div>
    </div>
    <div class="sections">
      <ManualInput />
      <CsvUpload />
    </div>
    <HistoricalData />
    <VisualizeTrends />
  </div>
</template>

<script>
import ManualInput from './ManualInput.vue'
import CsvUpload from './CsvUpload.vue'
import HistoricalData from './HistoricalData.vue'
import ThresholdAlerts from './ThresholdAlerts.vue'
import SignOut from './SignOut.vue'
import VisualizeTrends from './VisualizeTrends.vue'

export default {
  name: 'DashboardPage',
  components: {
    ManualInput,
    CsvUpload,
    HistoricalData,
    ThresholdAlerts,
    SignOut,
    VisualizeTrends
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #42b983;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}

.header-buttons {
  display: flex;
  align-items: center;
}

.header-buttons > * {
  margin-left: 10px;
}

.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.sections > * {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>