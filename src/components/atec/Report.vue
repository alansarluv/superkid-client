<template>
  <div class="container-fluid mt-100">
    <div class="scrollable-box">
      <div class="row mb-4">
        <div class="col-12">
          <a href="/atec" class="btn btn-secondary">Kembali ke dashboard</a>
        </div>
      </div>
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
        <div class="row mb-3">
          <div class="col-12 col-md-12 text-md-center">
            <div class="row">
              <div class="col-12 col-md-2 text-left mb-3 mb-md-0">
                <p class="mb-0 font-weight-bold">
                  <span>2019</span> - 
                  <span class="jc-convert-month">November</span>
                </p>
              </div>
              <div class="col-12 col-md">
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan bicara : </span>
                  25
                </p>
              </div>
              <div class="col-12 col-md">              
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan sosial : </span>
                  20
                </p>
              </div>
              <div class="col-12 col-md">
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan sensorik : </span>
                  18
                </p>
              </div>
              <div class="col-12 col-md">
                <p class="mb-0">
                  <span class="d-md-none">Kemampuan umum : </span>
                  24
                </p>
              </div>
              <div class="col-12 col-md-1">
                <p class="mb-0">
                  <span class="d-md-none font-weight-bold">Total skor: </span>
                  77
                </p>
              </div>  
              <div class="col-12 col-md-2">
                <p class="action-button my-0 mr-md-5 float-right">
                  <a class="btn btn-primary btn-sm" href="/atec/report/id">Detail</a>
                  <button class="btn btn-danger btn-sm jc-delete-atecrow" type="button" data-csrf="<%= csrfToken %>" data-id="el._id" data-todelete='el.monthYear'>Hapus</button>
                </p>
              </div>  
            </div>
          </div>
        </div>
    </div>
  </div>
</template>