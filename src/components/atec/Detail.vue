<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-2">
        <atec-sidebar></atec-sidebar>
      </div>
      <div class="col-md-10">
        <div class="card bg-seashell">
          <template v-if="detail">
            <h3 class="mb-2">
              Detail Atec for {{detail.kidName}},
              <span>( {{yearMonth(detail.monthYear)}} )</span>
            </h3>
            <h4 class="mt-3 mb-5">Kemampuan total = {{detail.bicaraTotal + detail.sosialTotal + detail.sensorikTotal + detail.umumTotal }}</h4>
            <div class="row detail-form">
              <div class="col-lg-3 col-md-6 col-sm-12">
                <h5>Kemampuan bicara = {{detail.bicaraTotal}}</h5>
                <ul>
                  <li v-for="index in 14" :key="index">
                    <span>{{listQuestions[index-1]['theQuestion']}}</span>
                    <span>{{valueDetail('bicara', index)}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <h5>Kemampuan sosial = {{detail.sosialTotal}}</h5>
                <ul>
                  <li v-for="index in 20" :key="index">
                    <span>{{listQuestions[index+13]['theQuestion']}}</span>
                    <span>{{valueDetail('sosial', index)}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <h5>Kemampuan sensorik = {{detail.sensorikTotal}}</h5>
                <ul>
                  <li v-for="index in 18" :key="index">
                    <span>{{listQuestions[index+33]['theQuestion']}}</span>
                    <span>{{valueDetail('sensorik', index)}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <h5>Kemampuan umum = {{detail.umumTotal}}</h5>
                <ul>
                  <li v-for="index in 25" :key="index">
                    <span>{{listQuestions[index+51]['theQuestion']}}</span>
                    <span>{{valueDetail('umum', index)}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                <router-link to="/atec/report" class="btn btn-secondary">Back to atec report</router-link>
              </div>
            </div>
          </template>
          <h2 v-if="!detail" class="text-center mt-5">No data</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import axios from 'axios';
  import Sidebar from '../partials/Sidebar';

  export default {
    props: ['detail'],
    data() {
      return {
        listQuestions: this.$store.getters.getQuestion || [],
      }
    },
    components: {
      atecSidebar: Sidebar
    },
    methods: {
      yearMonth(val) {
        const year = val.slice(0,4);
        const monthNum = parseInt(val.substring(4));
        const monthNames = this.$store.getters.monthNames;
        return year + " - " + monthNames[monthNum-1];
      },
      valueDetail( section, idx){
        const param = section+idx;
        const valRes = this.detail[param];
        let text, valNum = '';
        if (section === 'bicara') {
          if (valRes === 'sb'){
            text = 'sangat benar';
            valNum = '0'
          } else if (valRes === 'ab'){
            text = 'agak benar';
            valNum = '1'
          } else {
            text = 'tidak benar';
            valNum = '2'
          }
        } else if (section === 'sosial') {
          if (valRes === 'sc'){
            text = 'sangat cocok';
            valNum = '2'
          } else if (valRes === 'ac'){
            text = 'agak cocok';
            valNum = '1'
          } else {
            text = 'tidak cocok';
            valNum = '0'
          }
        } else if (section === 'sensorik') {
          if (valRes === 'sc'){
            text = 'sangat cocok';
            valNum = '0'
          } else if (valRes === 'ac'){
            text = 'agak cocok';
            valNum = '1'
          } else {
            text = 'tidak cocok';
            valNum = '2'
          }          
        } else if (section === 'umum') {
          if (valRes === 'sb'){
            text = 'sedikit bermasalah';
            valNum = '1'
          } else if (valRes === 'cb'){
            text = 'cukup bermasalah';
            valNum = '2'
          } else if (valRes === 'vb'){
            text = 'sangat bermasalah';
            valNum = '3'
          } else {
            text = 'tidak bermasalah';
            valNum = '0'
          }          
        }
        return `${text} (${valNum})`;
      }
    }
    
  }
</script>
<style lang="scss" scoped>
  .card{
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
        }
      }
    }
  }
</style>