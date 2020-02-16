<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="row justify-content-center sticky-100">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
              <div class="card-body">
                <h4 class="mb-4">Hasil atec {{response.kidName}}, ({{yearMonth(response.monthYear)}})</h4>
                <p>Kemampuan bicara = {{response.bicaraTotal}}</p>
                <p>Kemampuan sosial = {{response.sosialTotal}}</p>
                <p>Kemampuan sensorik = {{response.sensorikTotal}}</p>
                <p>Kemampuan umum = {{response.umumTotal}}</p>
                <p>Kemampuan total = {{response.bicaraTotal + response.sosialTotal + response.sensorikTotal + response.umumTotal }}</p>
                <div class="mt-5 mb-3 text-center">
                  <router-link to="/atec" class="btn btn-secondary">Kembali ke dashboard atec</router-link>
                  <router-link to="/atec/report" class="btn btn-primary ml-5">Lihat laporan Atec</router-link>
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
  export default {
    props: ['response'],
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