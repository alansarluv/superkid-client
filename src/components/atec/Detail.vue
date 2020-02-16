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
                  <li>
                    <span> Mengetahui namanya sendiri : </span>
                    <span>{{detail.bicara1}}</span>
                  </li>
                  <li>
                    <span>Merespon pada "tidak" atau "stop" : </span>
                    <span>{{detail.bicara2}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <h5>Kemampuan sosial = {{detail.sosialTotal}}</h5>
                <ul>
                  <li>
                    <span>Terlihat seperti berada dalam tempurung (anda tdk dapat menjangkaunya) : </span>
                    <span>{{detail.sosial1}}</span>
                  </li>
                  <li>
                    <span>Mengabaikan orang lain : </span>
                    <span>{{detail.sosial2}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <h5>Kemampuan sensorik = {{detail.sensorikTotal}}</h5>
                <ul>
                  <li>
                    <span>Merespon saat dipanggil namanya : </span>
                    <span>{{detail.sensorik1}}</span>
                  </li>
                  <li>
                    <span>Merespon saat dipuji : </span>
                    <span>{{detail.sensorik2}}</span>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <h5>Kemampuan umum = {{detail.umumTotal}}</h5>
                <ul>
                  <li>
                    <span>Mengompol saat tidur : </span>
                    <span>{{detail.umum1}}</span>
                  </li>
                  <li>
                    <span>Mengompol di celana / popok : </span>
                    <span>{{detail.umum2}}</span>
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
    components: {
      atecSidebar: Sidebar
    },
    methods: {
      yearMonth(val) {
        const year = val.slice(0,4);
        const monthNum = parseInt(val.substring(4));
        const monthNames = this.$store.getters.monthNames;
        return year + " - " + monthNames[monthNum-1];
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