<template>
  <div>
    <h2>View Historical Energy Consumption Trends</h2>
    <div class="input-container">
      <input type="date" v-model="startDate" class="input-field" />
      <input type="date" v-model="endDate" class="input-field" />
      <button @click="fetchData" class="btn">Fetch Data</button>
    </div>
    <table v-if="data.length" class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Energy Consumption (KWt)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in data" :key="entry.date">
          <td>{{ entry.Date }}</td>
          <td>{{ entry.Energy }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HistoricalData',
  data() {
    return {
      startDate: '',
      endDate: '',
      data: []
    }
  },
  methods: {
    async fetchData() {
      if (this.startDate && this.endDate) {
        try {
          const token = sessionStorage.getItem('authToken');

          const response = await axios.get(process.env.VUE_APP_ENERGY_HISTORY_API_URL, {
            params: {
              startDate: this.startDate,
              endDate: this.endDate
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = response.data;

          if (data && Array.isArray(data)) {
            this.data = data;
            console.log('Updated data:', this.data); // Log the updated data
          } else {
            console.error('Unexpected data format:', data);
          }
        } catch (error) {
          if (error.response) {
            console.error('Error response data:', error.response.data); // Log the error response data
            console.error('Error response status:', error.response.status); // Log the error response status
            console.error('Error response headers:', error.response.headers); // Log the error response headers
          } else {
            console.error('Error message:', error.message); // Log the error message
          }
        }
      } else {
        alert('Please select both start and end dates.');
      }
    }
  }
}
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

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

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th, .data-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.data-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tr:hover {
  background-color: #ddd;
}
</style>