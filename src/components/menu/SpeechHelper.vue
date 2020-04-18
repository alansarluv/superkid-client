<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Speech text reader</h3>
        <div class="btn btn-primary">Click untuk tampilkan box</div>
      </div>
      <div class="col-sm-12">
        <div class="row mt-4 justify-content-center">
          <div v-for="(list, idx) in dataLIst" :key="idx" class="col-sm-3 mb-3">
            <div class="card c-pointer">
              <div class="card-body">
                <h5 class="card-title">{{list.text}}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
    data() {
      return {
        dataLIst: [
          {
            image: './img/haus.jpg',
            text: "Aku haus, aku mau minum"
          },
          {
            image: './img/makan.jpg',
            text: "Aku lapar, aku mau makan"
          },
          {
            image: './img/capek.jpg',
            text: "Aku capek"
          },
          {
            image: './img/hurt.jpg',
            text: "Aku sakisakitt"
          },
          {
            image: './img/senang.jpg',
            text: "Aku senang"
          },
          {
            image: './img/marah.jpg',
            text: "Aku marah"
          },
          {
            image: './img/sedih.jpg',
            text: "Aku sedih"
          },
          {
            image: './img/takut.jpg',
            text: "Aku takut"
          },
          {
            image: './img/jalanjalan.jpg',
            text: 'Aku mau jalan jalan'
          },
          {
            image: './img/pulang.jpg',
            text: 'Aku mau pulang'
          },
          {
            image: './img/sekolah.jpg',
            text: 'Aku mau ke sekolah'
          },
          {
            image: './img/bermain.jpg',
            text: 'Aku mau bermain'
          }
        ]
      }
    },  
  }
</script>
<style lang="scss" scoped>

</style>