<template>
  <div class="container-fluid container-content">
    <atec-sidebar></atec-sidebar>
    <div class="right-content">
      <div class="row justify-content-center sticky-100">
        <div class="col-12">
          <h2>Chart Atec</h2>
          <div class="h-500">
            <line-chart :chart-data="chartData" :options="options"></line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../partials/Sidebar';
  import LineChart from './LineChart';
  
  export default {
    components: {
      atecSidebar: Sidebar,
      LineChart
    },
    data() {
      return {
        chartData: {},
        options: {
          elements: {
            line: {
              tension: 0
            }
          },
          legend: {
            display: false
          },          
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                lineWidth: 3,
              },
              ticks: {
                fontFamily: "Roboto,Oxygen,Ubuntu,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif"
              }
            }],
            yAxes: [{
              ticks: {
                fontFamily: "Roboto,Oxygen,Ubuntu,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
                padding: 15
              }
            }]
          },
        }

      }
    },
    methods: {
      getChartData() {
        this.generateData();
      },      
      generateData() {
        this.chartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt'],
          datasets: [{
            label: 'Turnover',
            data: [5, 7, 7, 10, 10, 12, 14, 14, 16],
            fill: false,
            backgroundColor: 'rgba(255, 255, 255, 1.0)',
            borderColor: '#0060BF',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 255, 255, 1.0)',
            pointBorderColor: '#0060BF',
            pointBorderWidth: 2,
          }]
        };
      }
    },    
    created() {
      this.getChartData();
    }

  }
</script>
<style lang="scss" scoped>
  .h-500 {
    max-height: 500px;
    max-width: 500px;
  }
</style>