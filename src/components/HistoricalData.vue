<template>
    <div>
      <h2>View Historical Energy Consumption Trends</h2>
      <!-- <line-chart :chart-data="datacollection" :options="options"></line-chart> -->
    </div>
  </template>
  
  <script>
//   import { Line } from 'vue-chartjs'
//   import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
  
//   ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
  
  export default {
    name: 'HistoricalData',
    // // components: {
    // //   LineChart: {
    // //     extends: Line,
    // //     props: ['chartData', 'options'],
    // //     mounted() {
    // //       this.renderChart(this.chartData, this.options)
    // //     }
    // //   }
    // // },
    // data() {
    //   return {
    //     datacollection: {
    //       labels: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    //       datasets: [
    //         {
    //           label: 'Energy Consumption (KWt)',
    //           backgroundColor: 'rgba(66, 185, 131, 0.2)',
    //           borderColor: '#42b983',
    //           pointBackgroundColor: '#42b983',
    //           pointBorderColor: '#fff',
    //           pointHoverBackgroundColor: '#fff',
    //           pointHoverBorderColor: '#42b983',
    //           data: [10, 20, 15, 25, 30]
    //         }
    //       ]
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       scales: {
    //         x: {
    //           type: 'time',
    //           time: {
    //             unit: 'day'
    //           },
    //           title: {
    //             display: true,
    //             text: 'Date'
    //           }
    //         },
    //         y: {
    //           title: {
    //             display: true,
    //             text: 'Energy (KWt)'
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
  </script>
  
  <style scoped>
  h2 {
    color: #42b983;
  }
  
  .line-chart {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>