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
            Compare Atec for {{compare.kidName}},
            <span class="float-right">
              <router-link to="/atec/report" class="btn btn-secondary mt-3 mt-lg-0">Back to atec report</router-link>
            </span>
          </h3>
          <h4 class="mt-3 mb-2">Kemampuan total = xxx</h4>
          <div class="row detail-form">
            <div class="col-lg-3 col-md-6 col-sm-12 mt-5">
              <h5>Kemampuan bicara = </h5>
              <ul>
                <li v-for="index in 14" :key="index">
                  <span>dummy</span>
                </li>
              </ul>
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

  export default {
    props: ['compare'],
    data() {
      return {
        isMobileSidebar: false,
      }
    },
    components: {
      atecSidebar: Sidebar
    },
    methods: {
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
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-content: stretch;
          align-items: center;
          font-size: 12px;
          border-bottom: 1px solid black;

          span:nth-child(2) {
            text-align: right;
            white-space: nowrap;
            padding-left: 10px;            
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