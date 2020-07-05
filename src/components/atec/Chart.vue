<template>
  <div class="container-fluid container-content position-relative">
    <div v-if="!isMobileSidebar" @click="isMobileSidebar = true" class="mobile-menu btn"><i class="fas fa-bars"></i></div>
    <atec-sidebar
      :isMobileSidebar='isMobileSidebar'
      @closeSidebar='isMobileSidebar = false'
    ></atec-sidebar>
    <div class="right-content">
      <div class="row justify-content-center sticky-100">
        <div class="col-12">
          <h2 class="mb-4">Chart Atec (last 12 months)</h2>
          <div v-if="!dataReport.length">
            <h2 class="text-center">Belum ada laporan ATEC</h2>
          </div>
          <div v-else class="row">
            <div class="col-12">
              <div class="row mb-5 text-center justify-content-center">
                <div class="col-sm-3">
                  <h3 class="text-left mb-4">Total keseluruhan</h3>
                  <line-chart
                    :chart-data="chartData"
                    :options="options"
                    :styles="customStyles"
                  ></line-chart>
                </div>
              </div>
              <div class="row text-center">
                <div class="col-sm-3 mb-5">
                  <h3 class="text-left mb-4">Bicara</h3>
                  <line-chart
                    :chart-data="chartDataBicara"
                    :options="options"
                    :styles="customStyles"
                  ></line-chart>
                </div>
                <div class="col-sm-3 mb-5">
                  <h3 class="text-left mb-4">Sensorik</h3>
                  <line-chart
                    :chart-data="chartDataSensorik"
                    :options="options"
                    :styles="customStyles"
                  ></line-chart>
                </div>
                <div class="col-sm-3 mb-5">
                  <h3 class="text-left mb-4">Sosial</h3>
                  <line-chart
                    :chart-data="chartDataSosial"
                    :options="options"
                    :styles="customStyles"
                  ></line-chart>
                </div>
                <div class="col-sm-3 mb-5">
                  <h3 class="text-left mb-4">Umum</h3>
                  <line-chart
                    :chart-data="chartDataUmum"
                    :options="options"
                    :styles="customStyles"
                  ></line-chart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Sidebar from '../partials/Sidebar';
  import LineChart from './LineChart';
  import { monthYearMixin } from '../../mixins/general';
  
  export default {
    components: {
      atecSidebar: Sidebar,
      LineChart
    },
    data() {
      return {
        customStyles: {
          height: "auto",
          width: "auto",
          margin: "0 auto",
          position: "relative",
        },
        chartData: {},
        chartDataBicara: {},
        chartDataSensorik: {},
        chartDataSosial: {},
        chartDataUmum: {},
        dataReport: [],
        loadingChart: false,
        isMobileSidebar: false,
        options: {
          elements: {
            line: {
              tension: 0
            }
          },
          legend: {
            display: false,
            position: "bottom",
          },
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                lineWidth: 3,
              },
              ticks: {
                fontFamily: "Roboto,Oxygen,Ubuntu,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
                fontSize: 10
              }
            }],
            yAxes: [{
              gridLines: {
                drawBorder: false,
              },
              ticks: {
                fontFamily: "Roboto,Oxygen,Ubuntu,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
                fontSize: 10,
                padding: 15,
                min: 0,
                maxTicksLimit: 5,
              }
            }]
          },
        }
      }
    },
    mixins: [monthYearMixin],
    methods: {
      getChartData() {
        const user = this.$store.getters.user;
        const config = {
          headers: this.$store.getters.configHeader,
          params: {
            userId: user._id
          }
        }
        axios
          .get("/atec/report", config)
          .then( res => {
            this.loadingChart = false;
            if (res.status === 200) {
              this.dataReport = res.data.data;
              this.generateData(this.dataReport);
            }
          })
          .catch(error => {
            this.loadingChart = false;
            // alertToastDisplay("Error on fetch chart data", 'danger');
            console.log(error);             // eslint-disable-line no-console  
          });        
      },      
      generateData(val) {
        const listMonth = [];
        const listTotalVal = [];
        const listBicaraVal = [];
        const listSensorikVal = [];
        const listSosialVal = [];
        const listUmumVal = [];

        val.reverse().map( f => {
          listMonth.push(this.monthYear(f.monthYear));
          listBicaraVal.push(parseInt(f.bicaraTotal));
          listSensorikVal.push(parseInt(f.sensorikTotal));
          listSosialVal.push(parseInt(f.sosialTotal));
          listUmumVal.push(parseInt(f.umumTotal));
          listTotalVal.push(parseInt(f.bicaraTotal + f.sensorikTotal + f.sosialTotal + f.umumTotal));
        });


        const filteredListMonth = listMonth.map(el => el.split(" -")[0]);        
        this.chartData = {
          labels: filteredListMonth,
          datasets: [{
            label: 'Total score',
            data: listTotalVal,
            fill: false,
            backgroundColor: 'rgba(255, 255, 255, 1.0)',
            borderColor: '#0060BF',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 255, 255, 1.0)',
            pointBorderColor: '#0060BF',
            pointBorderWidth: 2,
          }]
        };

        this.chartDataBicara = {
          labels: filteredListMonth,
          datasets: [{
            label: 'Kemampuan bicara',
            data: listBicaraVal,
            fill: false,
            backgroundColor: 'rgba(255, 255, 255, 1.0)',
            borderColor: '#0060BF',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 255, 255, 1.0)',
            pointBorderColor: '#0060BF',
            pointBorderWidth: 2,
          }]
        };

        this.chartDataSensorik = {
          labels: filteredListMonth,
          datasets: [{
            label: 'Kemampuan sensorik',
            data: listSensorikVal,
            fill: false,
            backgroundColor: 'rgba(255, 255, 255, 1.0)',
            borderColor: '#0060BF',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 255, 255, 1.0)',
            pointBorderColor: '#0060BF',
            pointBorderWidth: 2,
          }]
        };

        this.chartDataSosial = {
          labels: filteredListMonth,
          datasets: [{
            label: 'Kemampuan sosial',
            data: listSosialVal,
            fill: false,
            backgroundColor: 'rgba(255, 255, 255, 1.0)',
            borderColor: '#0060BF',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 255, 255, 1.0)',
            pointBorderColor: '#0060BF',
            pointBorderWidth: 2,
          }]
        };

        this.chartDataUmum = {
          labels: filteredListMonth,
          datasets: [{
            label: 'Kemampuan umum',
            data: listUmumVal,
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
  .mobile-menu {
    display: none;    
  }

  @media only screen and (max-width: 768px) {
    .right-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
      padding-top: 0 !important;
      h2 {
        font-size: 16px;
      }
    }

    .mobile-menu {
      position: absolute;
      display: block;
      top: -18px;
      right: -18px;
      z-index: 3;
    }
  }  
</style>