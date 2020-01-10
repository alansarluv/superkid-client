<template>
  <div class="container-fluid mt-125">
    <form action="/atec/form-report" method="POST">
      <input type="hidden" name="_csrf" value="<%= csrfToken %>">
      <input type="hidden" name="kidName" value="<%= kids[0].name %>">

      <div class="row justify-content-center mb-3">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="card mb-4">
            <div class="card-body">
              <p>Nama : Dummy name</p>
              <p>Jenis kelamin : Dummy Age</p>
              <p>Birth day : birthdayString</p>
              <input type="hidden" class="available-report-date" value="<%= listReportMonthYear %>">
            </div>
          </div>
          <h3 class="mb-3">Piih Bulan dan Tahun laporan ATEC</h3>
          <div class="row">
            <div class="col-md-12 col-lg-6 mb-3">
              <select name="atecMonth" class="form-control jc-auto-select jc-check-available-monthyear" data-type-auto="month">
                <option value="00">Januari</option>
                <option value="01">Februari</option>
                <option value="02">Maret</option>
                <option value="03">April</option>
                <option value="04">Mei</option>
                <option value="05">Juni</option>
                <option value="06">Juli</option>
                <option value="07">Agustus</option>
                <option value="08">September</option>
                <option value="09">Oktober</option>
                <option value="10">November</option>
                <option value="11">Desember</option>
              </select>
            </div>
            <div class="col-md-12 col-lg-6 mb-3">
              <select name="atecYear" class="form-control jc-auto-select jc-check-available-monthyear" data-type-auto="year">
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
              </select>
            </div>
          </div>          
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="scrollable-box">
            <p class="header-question active">Form 1 - Kemampuan Bicara/Berbahasa ( 0 / 14) <i class="fa fa-check-square-o" aria-hidden="true"></i></p>
            <p class="header-question">Form 2 - Kemampuan Bersosialisasi ( 0 / 20)</p>
            <p class="header-question">Form 3 - Kesadaran sensorik / kognitif ( 0 / 18)</p>
            <p class="header-question">Form 4 - Kesehatan umum, fisik dan perilaku ( 0 / 25)</p>
            <hr class="mb-1" />
            <button type="button" class="btn btn-link float-right">Kembali ke soal sebelumnya</button>
            <div class="single-question mt-5">
              <question-list v-for="(question, idx) in form1Question" :key="idx" :question='question' :currentQ='currentQ'></question-list>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import Question from './Question'
  export default {
    data() {
      return {
        form1Question: [
          {
            numberList: '1.1',
            theQuestion: 'Mengetahui namanya sendiri',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara1'
          },
          {
            numberList: '1.2',
            theQuestion: 'Merespon pada "tidak" atau "stop"',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara2'
          },
          {
            numberList: '1.3',
            theQuestion: 'Dapat mengikuti perintah"',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara3'
          },
          {
            numberList: '1.4',
            theQuestion: 'Dapat menggunakan 1 kata (Tidak!, makan, air, dll)',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara4'
          },
          {
            numberList: '1.5',
            theQuestion: 'Dapat menggunakan 2 kata sekaligus bersamaan (Tidak mau!, mau makan, minta itu, dll)',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara5'
          },
          {
            numberList: '1.6',
            theQuestion: 'Dapat menggunakan 3 kata sekaligus (Mau minum susu, dll)',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara6'
          },
          {
            numberList: '1.7',
            theQuestion: 'Mengetahui 10 kata atau lebih',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara7'
          },
          {
            numberList: '1.8',
            theQuestion: 'Dapat membuat kalimat yang berisi 4 kata atau lebih',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara8'
          },
          {
            numberList: '1.9',
            theQuestion: 'Mampu menjelaskan apa yang dia inginkan',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara9'
          },
          {
            numberList: '1.10',
            theQuestion: 'Mampu menanyakan pertanyaan yang bermakna',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara10'
          },
          {
            numberList: '1.11',
            theQuestion: 'Isi pembicaraan cenderung relevan atau bermakna',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara11'
          },
          {
            numberList: '1.12',
            theQuestion: 'Sering menggunakan kalimat kalimat yang berurutan',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara12'
          },
          {
            numberList: '1.13',
            theQuestion: 'Bisa mengikuti pembicaraan dengan cukup baik',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara13'
          },
          {
            numberList: '1.14',
            theQuestion: 'Memiliki kemampuan bicara / berbahasa yang sesuai dengan seusianya',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara14'
          }
        ],
        currentQ: '1.3'
      }
    },
    components: {
      questionList: Question
    }
  }
</script>
<style lang="scss" scoped>
  .card { height: auto; }
  .header-question {
    color: darkgray;
    &.active {
      cursor: pointer;
      color: mediumblue;
    }
  }
</style>