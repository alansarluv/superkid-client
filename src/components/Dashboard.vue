<template>
  <div class="container-fluid p-0">
    <div class="container-75">
    </div>
    <div class="welcome-box">
      <h1 class="text-center">Selamat datang, orang tua hebat</h1>
      <p class="mt-5 welcome-desc">
        Superkid merupakan situs non-profit yang dibuat dengan tujuan untuk membantu para orang tua dari anak anak berkebutuhan khusus. 
        Agar para orang tua dapat melakukan assesment / evaluasi secara mandiri kepada ananda tercinta,
        menganalisa hasil laporan evaluasi tersebut dengan mudah dan terdokumentasi dengan baik,
        serta berbagi informasi mengenai perkembangan ananda tercinta dari hari ke hari.
      </p>
      <router-link to="/login" class="mt-5 btn btn-outline-warning btn-md px-5">Login</router-link>
    </div>
    <div class="container-100 section-2 pb-5">
      <div class="section-box pb-5">
        <h2 class="text-center mt-5">Evaluasi dan analisa perkembangan ananda</h2>
        <p class="text-center mb-5">Mulailah mengevaluasi perkembangan ananda secara rutin setiap akhir bulan, gunakan tools yang kami siapkan untuk mempermudah anda dalam mempelajari perkembangan ananda tercinta</p>
        <div class="row bg-white">
          <div class="col-md-4">
            <div class="p-5">
              <p>Form ATEC</p>
              <p>
                Online tools gratis yang dirancang oleh Autism Research Institute.
              </p>
              <router-link class="btn btn-outline-dark btn-md px-3" to="/atec-quick">Coba ATEC</router-link>
            </div>
          </div>
          <div class="col-md-8 pr-0 bg-section21">
            <div class="box-section21 p-2 px-3">
              <h4>Autism Treatment Evaluation Checklist</h4>
              <p>
                Atec adalah formulir satu halaman yang dirancang untuk diisi oleh orang tua, guru, atau pengasuh. 
                Atec terdiri dari 4 subyek: (Komunikasi / Bahasa, Sosialisasi, Sensorik / Kognitif, dan Perilaku umum).
              </p>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6 pl-0 box-section22">
            <img :src="require(`./../assets/general/chart.png`)" alt="chart compare">
            <h4 class="mt-4 mb-3 px-lg-0 px-3">Chart &amp; Compare</h4>
            <p class="pl-lg-0 pl-3">Gunakan fitur chart agar dengan mudah anda dapat menganalisa grafik kemampuan ananda dari waktu ke waktu. Serta fitur compare untuk membandingkan laporan atec bulan ini dengan bulan sebelumnya.</p>
          </div>
          <div class="col-md-6 pr-0 box-section22 pl-0 pl-lg-3">
            <img :src="require(`./../assets/general/docter_kid.jpg`)" alt="weekly notes">
            <h4 class="mt-4 mb-3 pl-lg-0 px-3">Weekly notes</h4>
            <p class="px-lg-0 px-3">Catat kemajuan / kemunduran ananda di weekly notes ( yang akan di rangkum setiap minggu ) agar dapat mempermudah anda untuk melihat progress ananda secara lebih rinci</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-50 section-3 bg-white">
      <div class="row mx-0">
        <div class="col-md-6 px-0">
          <div class="box-section31">
            <blockquote class="blockquote text-center">
              <p class="mb-0">It doesn't matter how slowly a child learns, as long as we are encouring them not to stop.</p>
              <footer class="blockquote-footer">Robert john meehan <cite title="Source Title">American educator, Poet and Author</cite></footer>
            </blockquote>              
          </div>
        </div>
        <div class="col-md-6 px-0">
          <div class="box-section32">
            <div class="bg-image"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-50 section-4 bg-white">
      <div class="row mx-0">
        <div class="col-md-12">
          <div class="box-section41">
            <blockquote class="blockquote text-center">
              <p class="mb-0">Autism doesn't come with a manual. It comes with a parents that never give up</p>
              <footer class="blockquote-footer">Cheers for all parents</footer>
            </blockquote>              
          </div>
        </div>
      </div>
    </div>
    <div class="footer d-flex justify-content-center align-items-center">
      <p>create with love by <a href="https://www.linkedin.com/in/ruslansarluf/">alan sarluv</a> &amp; <a href="https://www.linkedin.com/in/angger-dayu-47b8b065/">angger dayu</a></p>
    </div>
  </div>


</template>
<style lang="scss" scoped>
  .container-75 {
    position: relative;
    background-image: url('https://picsum.photos/2000/700');    
    width: 100%;
    height: 70vh;
    margin: 0 auto;
    padding-right: 15px;
    padding-left: 15px;    
  }

  .container-100 {
    position: relative;
    background-color: #efefef;    
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding-right: 15px;
    padding-left: 15px;  

    &.section-2 {
      padding-top: 50px;
      .section-box {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        width: 50%;
        max-width: 830px;
        border-radius: 3px;
        .bg-section21 {
          background-image: url('./../assets/general/desk.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-color: #fff;
          min-height: 260px;

          position: relative;
          &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: black;
            opacity: .5;
          }
        }
        .box-section21 {
          color: white;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
        .box-section22 {
          overflow: hidden;
          img {
            border-bottom: 8px solid #ffc40c;
            width: inherit;
          }
        }
      }
    }
  }

  .container-50 {
    &.section-3 {
      .box-section31 {
        background-color: #ffc40c;
        width: 100%;
        height: 50vh;
        .blockquote {
          position: relative;
          top: 50%;
          font-size: 22px;
          padding: 0 100px;
          transform: translateY(-50%);          
          -webkit-transform: translateY(-50%);          
          -moz-transform: translateY(-50%);          
        }
      }
      .box-section32 {
        background-image: url('./../assets/general/superparent.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-color: #ffc40d;
        width: 100%;
        height: 50vh;
      }
    }
    &.section-4 {
      .box-section41 {
        background-color: #fff;
        width: 100%;
        height: 50vh;
        .blockquote {
          position: relative;
          top: 50%;
          left: 50%;
          font-size: 22px;
          padding: 0 100px;
          transform: translate(-50%, -50%);          
          -webkit-transform: translate(-50%, -50%);          
          -moz-transform: translate(-50%, -50%);          
        }
      }
    }
  }

  .welcome-box {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    width: 50%;
    max-width: 830px;
    background-color: white;
    border-radius: 3px;
    padding: 40px 30px;
    margin-top: -25vh;
    height: 50vh;

    .welcome-desc {
      letter-spacing: 0.1em;
      line-height: 28px;
      font-family: serif;
      font-size: 18px;      
    }
  }

  .footer {
    width: 100%;
    height: 100px;
    background-color: #efefef;
  }

  @media (max-width: 768px) {  
    .welcome-box {
      left: 0;
      width: 100%;
      transform: translateX(0);
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
    }
    .section-2 {
      .section-box {
        left: 0 !important;
        width: 100% !important;
        transform: translateX(0) !important;
        -webkit-transform: translateX(0) !important;
        -moz-transform: translateX(0) !important;
      }
    }
  }  
</style>