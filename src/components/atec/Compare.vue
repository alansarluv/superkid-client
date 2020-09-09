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
            <span class="date-time-atec">
              ( {{yearMonth(month1)}} ) vs ( {{yearMonth(month2)}} )
            </span>
            <span class="float-right">
              <router-link to="/atec/report" class="btn btn-secondary mt-3 mt-lg-0">Back to atec report</router-link>
            </span>
          </h3>
          <div class="row compare-form">
            <div class="col-12 mt-3">
              <h5>Kemajuan</h5>
              <div class="row detail-form">
                <div
                  v-for="(element, idx) in ability"
                  :key="idx"
                  class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemajuan {{element}}</p>
                  <ul>
                    <li
                      v-for="(elm, index) in listData.kemajuan[element]"
                      :key="index"
                    >
                      <p>{{listQuestions[elm.list -1]['theQuestion']}}</p>
                      <p>Sebelum : {{getQuestionAnswer(element, elm.before)}}</p>
                      <p>Sesudah : {{getQuestionAnswer(element, elm.after)}}</p>
                    </li>
                  </ul>
                  <p v-if="!listData.kemajuan[element].length">-</p>
                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              <h5>Kemunduran</h5>
              <div class="row detail-form">
                <div
                  v-for="(element, idx) in ability"
                  :key="idx"
                  class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemunduran {{element}}</p>
                  <ul>
                    <li
                      v-for="(elm, index) in listData.kemunduran[element]"
                      :key="index"
                    >
                      <p>{{listQuestions[elm.list -1]['theQuestion']}}</p>
                      <p>Sebelum : {{getQuestionAnswer(element, elm.before)}}</p>
                      <p>Sesudah : {{getQuestionAnswer(element, elm.after)}}</p>
                    </li>
                  </ul>
                  <p v-if="!listData.kemunduran[element].length">-</p>
                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              <h5>Tidak berubah</h5>
              <div class="row detail-form">
                <div
                  v-for="(element, idx) in ability"
                  :key="idx"
                  class="col-lg-3 col-md-6 col-sm-12 mt-2">
                  <p>Kemampuan {{element}}</p>
                  <ul>
                    <li
                      v-for="(elm, index) in listData.tetap[element]"
                      :key="index"
                    >
                      <p>{{listQuestions[elm.list -1]['theQuestion']}}</p>
                    </li>
                  </ul>
                  <p v-if="!listData.tetap[element].length">-</p>
                </div>
              </div>         
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
  import { atecDataMixin, monthYearMixin } from '../../mixins/general';

  export default {
    props: ['compare'],
    mixins: [atecDataMixin, monthYearMixin],
    data() {
      return {
        ability : ["bicara", "sosial", "sensorik", "umum"],
        indexQuestion : 0,
        listQuestions: this.$store.getters.getQuestion || [],
        isMobileSidebar: false,
        month1: "",
        month2: "",
        listData: {
          atec1: [],
          atec2: [],
          kemajuan: {},
          kemunduran: {},
          tetap: {},
        }
      }
    },
    components: {
      atecSidebar: Sidebar
    },
    methods: {
      compareVal(){
        // if bigger = bad = kemunduran 
        this.ability.forEach(element => {
          this.listData.kemajuan[element] = [];
          this.listData.kemunduran[element] = [];
          this.listData.tetap[element] = [];
          this.listData.atec1[element].forEach((elm, idx) => {
            this.indexQuestion += 1;
            const val1 = this.getPoint(element, elm);
            const val2 = this.getPoint(element, this.listData.atec2[element][idx]);
            let buffer = {};
            buffer.val = idx;
            buffer.list = this.indexQuestion;
            buffer.before = elm;
            buffer.after = this.listData.atec2[element][idx];
            if (val1 > val2) {
              this.listData.kemajuan[element].push(buffer);
            } else if (val2 > val1) {
              this.listData.kemunduran[element].push(buffer);
            } else {
              this.listData.tetap[element].push(buffer);              
            }
          });

        });
      },
    },
    created() {
      // split data from plain data to value only 
      if (this.compare[0]['data']['monthYear'] < this.compare[1]['data']['monthYear']) {
        this.month1 = this.compare[0]['data']['monthYear'];
        this.month2 = this.compare[1]['data']['monthYear'];
        this.listData.atec1 = this.splitData(this.compare[0]['data']);
        this.listData.atec2 = this.splitData(this.compare[1]['data']);
      } else {
        this.month1 = this.compare[1]['data']['monthYear'];
        this.month2 = this.compare[0]['data']['monthYear'];
        this.listData.atec1 = this.splitData(this.compare[1]['data']);
        this.listData.atec2 = this.splitData(this.compare[0]['data']);
      }
      // compare between 2 value (atec1 & atec2)
      this.compareVal();
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