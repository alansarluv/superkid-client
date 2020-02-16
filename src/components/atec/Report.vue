<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-2">
        <atec-sidebar></atec-sidebar>
      </div>
      <div class="col-md-10">
        <div class="row d-none d-md-flex">
          <div class="col-12 text-center mb-4">
            <div class="row">
              <div class="col-12 col-md-2 text-left">
                <p>Tahun dan Bulan</p>
              </div>
              <div class="col-12 col-md">
                <p>Kemampuan Bicara</p>
              </div>
              <div class="col-12 col-md">
                <p>Kemampuan Sosial</p>
              </div>
              <div class="col-12 col-md">
                <p>Kemampuan Sensorik</p>
              </div>
              <div class="col-12 col-md">
                <p>Kemampuan Umum</p>
              </div>
              <div class="col-12 col-md-1">
                <p>Total</p>
              </div>
              <div class="col-12 col-md-2">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <template v-if="reportData.length === 0">
          <h3 class="text-center">Belum ada laporan atec</h3>
        </template>
        <div v-for="list in reportData" :key='list.id' class="row mb-3">
          <div class="col-12 col-md-12 text-md-center">
            <div class="row">
              <div class="col-12 col-md-2 text-left mb-3 mb-md-0">
                <p class="mb-0 font-weight-bold">
                  <span>{{yearMonth(list.monthYear)}}</span>
                </p>
              </div>
              <div class="col-12 col-md">
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan bicara : </span>
                  {{list.bicaraTotal}}
                </p>
              </div>
              <div class="col-12 col-md">              
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan sosial : </span>
                  {{list.sosialTotal}}
                </p>
              </div>
              <div class="col-12 col-md">
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan sensorik : </span>
                  {{list.sensorikTotal}}
                </p>
              </div>
              <div class="col-12 col-md">
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan umum : </span>
                  {{list.umumTotal}}
                </p>
              </div>
              <div class="col-12 col-md-1">
                <p class="mb-0">
                  <span class="d-md-none font-weight-bold">Total skor: </span>
                  {{list.bicaraTotal + list.sosialTotal + list.sensorikTotal + list.umumTotal }}
                </p>
              </div>  
              <div class="col-12 col-md-2">
                <p class="action-button my-0 mr-md-5 text-left">
                  <button class="btn btn-primary btn-sm" type="button" @click="goto(list._id)">Detail</button>
                  <button class="btn btn-danger btn-sm ml-3" type="button" :data-id="list._id">Hapus</button>
                </p>
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

  export default {
    components: {
      atecSidebar: Sidebar
    },
    data() {
      return {
        reportData : [],
        kidLists: this.$store.getters.userKids || []
      }
    },
    methods: {
      yearMonth(val) {
        const year = val.slice(0,4);
        const monthNum = parseInt(val.substring(4));
        const monthNames = this.$store.getters.monthNames;
        return year + " - " + monthNames[monthNum-1];
      },
      goto(id){
        const config = {
          headers: this.$store.getters.configHeader
        };
        let data = null;
        axios
          .get('/atec/detail/'+id, config)
          .then(res => {
            console.log("kiw:", res) // eslint-disable-line no-console
            data = res.data.data;
            if (res.status === 200 && data._id) {
              this.$router.push({ 
                name: 'atec-detail',
                params: { detail: data }
              });
            }
          })
          .catch(error => console.log("error: ", error)) // eslint-disable-line no-console
      }
    },
    created() { 
      const user = this.$store.getters.user;
      const config = {
        headers: this.$store.getters.configHeader,
        params: {
          userId: user._id
        }
      }      
      axios
        .get('/atec/report', config)
        .then(res => {
          console.log("test:", res) // eslint-disable-line no-console
          const data = res.data;
          this.reportData = data.data;
        })  
        .catch(error => console.log("error: ", error)) // eslint-disable-line no-console
    }
  }
</script>
