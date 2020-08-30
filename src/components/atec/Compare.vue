<template>
  <div class="container-fluid container-content position-relative">
    <div v-if="!isMobileSidebar" @click="isMobileSidebar = true" class="mobile-menu btn"><i class="fas fa-bars"></i></div>
    <atec-sidebar
      :isMobileSidebar='isMobileSidebar'
      @closeSidebar='isMobileSidebar = false'
    ></atec-sidebar>
    <div class="right-content">
      <div class="card bg-seashell">
        <template v-if="compare">
          <h3 class="mb-2">
            Compare Atec for {{compare[0]['data']['kidName']}}.
            <span class="float-right">
              <router-link to="/atec/report" class="btn btn-secondary mt-3 mt-lg-0">Back to atec report</router-link>
            </span>
          </h3>
          <div class="row compare-form">
            <div class="col-12 mt-3">
              <h5>Kemajuan</h5>
              <div class="row detail-form">
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemajuan Bicara</p>
                  <ul>
                    <li>
                      <p>Mengetahui namanya sendiri</p>
                      <p>Sebelum :</p>
                      <p>Sesudah :</p>
                    </li>
                  </ul>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemajuan Sosial</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemajuan Sensorik</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemajuan Umum</p>

                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              <h5>Kemunduran</h5>
              <div class="row detail-form">
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemunduran Bicara</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemunduran Sosial</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemunduran Sensorik</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemunduran Umum</p>

                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              <h5>Tidak berubah</h5>
              <div class="row detail-form">
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemampuan Bicara</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemampuan Sosial</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemampuan Sensorik</p>

                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemampuan Umum</p>

                </div>     
              </div>         
            </div>
          </div>
          <div class="row detail-form">
            <div class="col-lg-3 col-md-6 col-sm-12 mt-5">
              <h5>Kemampuan bicara = </h5>
              <ul>
                <li v-for="index in 14" :key="index">
                  <span>dummy</span>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-5">
              {{compare[0]}}
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-5">
              {{compare[1]}}
            </div>
          </div>
        </template>
        <h2 v-if="!compare" class="text-center mt-5">No data</h2>
      </div>
    </div>
  </div>
</template>
<script>
  // import axios from 'axios';
  import Sidebar from '../partials/Sidebar';
  import { atecDataMixin } from '../../mixins/general';

  export default {
    props: ['compare'],
    mixins: [atecDataMixin],
    data() {
      return {
        isMobileSidebar: false,
        listData: {
          atec1: [],
          atec2: [],
          kemajuan: [],
          kemunduran: [],
          tidakBerubah: [],
        }
      }
    },
    components: {
      atecSidebar: Sidebar
    },
    methods: {
    },
    created() {
      this.listData.atec1 = this.splitData(this.compare[0]['data']);
      this.listData.atec2 = this.splitData(this.compare[1]['data']);
      // compare between 2 value (atec1 & atec2)
      // if bigger = bad = kemunduran
    }    
  }
</script>
<style lang="scss" scoped>
  .card{
    height: auto;
    &.bg-seashell {
      background-color: seashell;
      padding: 15px 20px;

      ul {
        padding: 0;
        margin: 0;
        li {
          list-style-type: none;
          margin-bottom: 5px;
          display: block;
          font-size: 12px;
          border-bottom: 1px solid black;

          p {
            margin-bottom: 4px;
          }
        }
      }

      h3 {
        span {
          a { font-size: 14px; }
        }
      }
    }
  }
  .mobile-menu {
    display: none;    
  }

  /* Medium devices (tablets, 768px and up) */
  @media (max-width: 768px) {  
    .right-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .card{
      &.bg-seashell {
        background-color: transparent;
        padding: 0 !important ;
        border: none !important;
        h3 {
          font-size: 18px;
          span.date-time-atec {
            display: block;
            font-size: 14px;            
          }
          span.float-right {
            float: left !important;
            a.mt-3 {
              margin-top: 8px !important;
            }
          }
        }
        h4, h5 {
          font-size: 16px;
        }
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

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) { 
  }
  /* Extra large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {  
  }  
</style>