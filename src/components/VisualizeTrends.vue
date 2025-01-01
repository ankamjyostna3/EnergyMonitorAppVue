<template>
  <div class="visualize-container">
    <h2>Visualize Energy Consumption Trends</h2>
    <div class="button-group">
      <button @click="fetchData('daily')" class="btn" name="daily">Daily</button>
      <button @click="fetchData('weekly')" class="btn" name="weekly">Weekly</button>
      <button @click="fetchData('monthly')" class="btn" name="monthly">Monthly</button>
     
    </div>
    <div ref="chart" class="chart-container"></div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import * as d3 from 'd3'

export default {
  name: 'VisualizeTrends',
  data() {
    return {
      data: {},
      errorMessage: '',
      chartData: [],
      label: [],
      chartOptions: {
        width: 800,
        height: 400,
        margin: { top: 20, right: 30, bottom: 30, left: 40 }
      }
    }
  },
  methods: {
    
    async fetchData(action) {
      console.log('action:', action);
      try {
        const token = sessionStorage.getItem('authToken');

        const response = await axios.get(process.env.VUE_APP_visualize_trends_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API response:', response.data); // Log the API response

        if (response.data && response.data.trends) {
          this.data = response.data.trends;
          this.updateChartData(action);
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
    updateChartData(action) {
      
      let trends = {};
      
      if (action === 'weekly') {
        trends = this.data.weeklyTrends;
      } else if (action === 'monthly') {
        trends = this.data.monthlyTrends;
      } else if (action === 'daily') {
        trends = this.data.dailyTrends;
      }

      if (trends && typeof trends === 'object') {
        this.label = Object.keys(trends);
        console.log('Labels:', this.label);
        this.chartData = Object.values(trends);
        console.log('chartData:', this.chartData); // Log the labels
       // this.chartData = Object.keys(trends).map(date => ({
        //  date: date,
         // energyUsage: trends[date]
       // }));
       
       // console.log('Chart Data:', this.chartData); // Log the chart data
        this.renderChart();
      } else {
        this.chartData = [];
      }
    },
    renderChart() {
      const { width, height, margin } = this.chartOptions;
      const data = this.chartData.map((d, i) => ({ label: this.label[i], value: d }))
      console.log('Data:', data); // Log the data

      // Clear any existing chart
      d3.select(this.$refs.chart).selectAll('*').remove();

      const svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // const x = d3.scaleBand()
      //   .domain(d3.extent(this.chartData, d => d.date))
      const x = d3.scaleBand()
          .domain(data.map(d => d.label))
        .range([0, width - margin.left - margin.right]);

        // const x = d3.scaleBand()
        //   .domain(data.map(d => d.label))
        //   .range([0, width])
        //   .padding(0.1)
  


      // 
      const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height - margin.top - margin.bottom, 0]);

        const line = d3.line()
          .x(d => x(d.label))
          .y(d => y(d.value))

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

      svg.append('g')
        .call(d3.axisLeft(y));

      svg.append('path')
        .datum(data  )
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5)
        .attr('d', line);
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