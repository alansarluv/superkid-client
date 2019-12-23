<template>
  <div class="container-fluid mt-100">
    <div class="scrollable-box">
      <form action="/atec/form-report" method="POST">
        <input type="hidden" name="_csrf" value="<%= csrfToken %>">
        <input type="hidden" name="kidName" value="<%= kids[0].name %>">
        <div class="row">
          <div class="col col-12 mb-4">
            <div class="row mb-4">
              <div class="col-md-12 col-lg-6 col-xl-4">
                <div class="card">
                  <div class="card-body">
                    <p>Nama : Dummy name</p>
                    <p>Jenis kelamin : Dummy Age</p>
                    <p>Birth day : birthdayString</p>
                    <input type="hidden" class="available-report-date" value="<%= listReportMonthYear %>">
                  </div>
                </div>
              </div>
            </div>
            <h3>Piih Bulan dan Tahun laporan ATEC</h3>
            <div class="row">
              <div class="col-md-12 col-lg-3 col-xl-2 mb-3">
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
              <div class="col-md-12 col-lg-3 col-xl-2 mb-3">
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
        <hr class="separator">
        <div class="row atec-form-style">
          <div class="col-sm-12 col-md-10 col-lg-8">
            <p>question here</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>