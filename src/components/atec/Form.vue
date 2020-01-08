<template>
  <div class="container-fluid mt-125">
    <form action="/atec/form-report" method="POST">
      <input type="hidden" name="_csrf" value="<%= csrfToken %>">
      <input type="hidden" name="kidName" value="<%= kids[0].name %>">

      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="scrollable-box">
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
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="scrollable-box">
            <p class="header-question active">Form 1 - Kemampuan Bicara/Berbahasa ( 0 / 14) <i class="fa fa-check-square-o" aria-hidden="true"></i></p>
            <p class="header-question">Form 2 - Kemampuan Bersosialisasi ( 0 / 20)</p>
            <p class="header-question">Form 3 - Kesadaran sensorik / kognitif ( 0 / 18)</p>
            <p class="header-question">Form 4 - Kesehatan umum, fisik dan perilaku ( 0 / 25)</p>
            <hr class="mb-1" />
            <button type="button" class="btn btn-link float-right">Kembali ke soal sebelumnya</button>
            <div class="single-question mt-5">
              <p>
                <span class="mr-2">{{numberList}}</span>
                <span>{{theQuestion}}</span>
                <span class="ml-1">?</span>
              </p>
              <div class="row">
                <label class="col-sm-12 col-md-4">
                  <div class="custom-button">
                    <input type="radio" name="bicara1" class="form-control" value="tb" required>
                    {{option1}}
                  </div>
                </label>
                <label class="col-sm-12 col-md-4">
                  <div class="custom-button">
                    <input type="radio" name="bicara1" class="form-control" value="ab">
                    {{option2}}
                  </div>
                </label>
                <label class="col-sm-12 col-md-4">
                  <div class="custom-button">
                    <input type="radio" name="bicara1" class="form-control" value="sb">
                    {{option3}}
                  </div>
                </label>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        numberList: '1.1',
        theQuestion: 'Mengetahui namanya sendiri',
        option1: 'Tidak benar',
        option2: 'Agak benar',
        option3: 'Sangat benar',
      }
    }
  }
</script>
<style lang="scss">
  .header-question {
    color: darkgray;

    &.active {
      cursor: pointer;
      color: mediumblue;
    }
  }
  .single-question {
    .custom-button {
      background-color: #776e6e;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      input {
        display: none;
      }
    }
  }
</style>