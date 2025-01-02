<template>
  <div>
    <h2>View Historical Energy Consumption Trends</h2>
    <div class="input-container">
      <input type="date" v-model="startDate" class="input-field" />
      <input type="date" v-model="endDate" class="input-field" />
      <button @click="fetchData" class="btn">Fetch Data</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
    <button @click="downloadCSV" class="btn">Download CSV</button>
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
      data: [],
      errorMessage: ''
    }
  },
  methods: {
    async fetchData() {
      if (this.startDate && this.endDate) {
        if (new Date(this.startDate) > new Date(this.endDate)) {
          this.errorMessage = 'Start date must be less than or equal to end date.';
          this.data = []; // Clear the table data
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000); // Clear the error message after 3 seconds
          return;
        }

        try {
          const token = sessionStorage.getItem('authToken');

          const response = await axios.get(process.env.VUE_APP_ROOT_API_URL + process.env.VUE_APP_ENERGY_HISTORY_ENDPOINT, {
            params: {
              startDate: this.startDate,
              endDate: this.endDate
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = response.data;
          console.log('API response data:', data); // Log the response data

          if (data && Array.isArray(data)) {
            this.data = data;
            this.errorMessage = '';
          } else {
            console.error('Unexpected data format:', data);
            this.errorMessage = 'Unexpected data format received from the server.';
          }
        } catch (error) {
          if (error.response) {
            console.error('Error response data:', error.response.data); // Log the error response data
            console.error('Error response status:', error.response.status); // Log the error response status
            console.error('Error response headers:', error.response.headers); // Log the error response headers
            this.errorMessage = `Error: ${error.response.data.message || 'Failed to fetch data.'}`;
          } else {
            console.error('Error message:', error.message); // Log the error message
            this.errorMessage = 'Failed to fetch data. Please try again.';
          }
        }
      } else {
        this.errorMessage = 'Please select both start and end dates.';
      }
    },
    downloadCSV() {
      const csvContent = [
        ['Date', 'Energy Consumption (KWt)'],
        ...this.data.map(entry => [entry.Date, entry.Energy])
      ]
        .map(e => e.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'historical_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
.error-message {
  color: red;
  margin-left: 10px;
}
</style>