<template>
  <div class="visualize-container">
    <h2>Visualize Energy Consumption Trends</h2>
    <div class="button-group">
      <button @click="fetchData('weekly')" class="btn">Weekly</button>
      <button @click="fetchData('monthly')" class="btn">Monthly</button>
      <button @click="fetchData('yearly')" class="btn">Yearly</button>
    </div>
    <div v-if="outputlength > 0" class="chart-container">
      <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'
 import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'VisualizeTrends',
  components: {
     'line-chart': Line
  },
  data() {
    return {
      data: {},
      errorMessage: '',
      outputlength: 0,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Energy Consumption (KWt)',
            backgroundColor: 'rgba(66, 185, 131, 0.2)',
            borderColor: '#42b983',
            pointBackgroundColor: '#42b983',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#42b983',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Energy Consumption (KWt)'
            }
          }
        }
      }
    }
  },
  methods: {
    async fetchData(period) {
      try {
        const token = sessionStorage.getItem('authToken');

        const response = await axios.get(process.env.VUE_APP_visualize_trends_URL + `?period=${period}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API response:', response.data); // Log the API response

        if (response.data && response.data.trends) {
          this.data = response.data.trends;
          this.updateChartData(period);
        } else {
          console.error('Unexpected data format:', response.data);
          this.errorMessage = 'Unexpected data format received from the server.';
          this.data = {}; // Ensure data is an object
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Failed to fetch data. Please try again.';
        this.data = {}; // Ensure data is an object
      }
    },
    updateChartData(period) {
      let trends = {};
      if (period === 'weekly') {
        trends = this.data.weeklyTrends;
      } else if (period === 'monthly') {
        trends = this.data.monthlyTrends;
      } else if (period === 'yearly') {
        trends = this.data.yearlyTrends;
      }
      if (trends && typeof trends === 'object') {
        this.chartData.labels = Object.keys(trends);
        this.chartData.datasets[0].data = Object.values(trends);
        this.outputlength = this.chartData.labels.length;
      } else {
        this.chartData.labels = [];
        this.chartData.datasets[0].data = [];
       
      }
    }
  }
}
</script>

<style scoped>
.visualize-container {
  margin-top: 20px;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}

.btn:hover {
  background-color: white;
  color: #42b983;
  border: 2px solid #42b983;
}

.chart-container {
  width: 100%;
  height: 400px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>