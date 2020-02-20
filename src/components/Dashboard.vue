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
    <div class="container-100 section-2">
      <h2 class="text-center mt-5">Header Text</h2>
      <p class="text-center mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing</p>
      <div class="section-box">
        <div class="row bg-white">
          <div class="col-md-4">
            <div class="p-5">
              <p>Lorem Ips</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eius.</p>
              <button type="button" class="btn btn-outline-dark btn-md px-5">Lorem</button>
            </div>
          </div>
          <div class="col-md-8 pr-0">
            <div class="box-section21 p-5">
              <h4 class="mt-5">Lorem ipsum dolor</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Sunt qui necessitatibus est harum repudiandae vitae eius dignissimos!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur laboriosam consequatur officiis..
              </p>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6 pl-0 box-section22">
            <img src="https://picsum.photos/500/250" alt="">
            <h4 class="mt-4 mb-3">Text sub header</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, magnam tempora. Expedita?</p>
          </div>
          <div class="col-md-6 pr-0 box-section22">
            <img src="https://picsum.photos/500/250" alt="">
            <h4 class="mt-4 mb-3">Text sub header</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, magnam tempora. Expedita?</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-50 section-3 bg-white">
      <div class="row">
        <div class="col-md-6 px-0">
          <div class="box-section31">
            <blockquote class="blockquote text-center">
              <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
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
    height: 100vh;
    margin: 0 auto;
    padding-right: 15px;
    padding-left: 15px;  

    &.section-2 {
      padding-top: 50px;
    }
    .section-box {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      width: 50%;
      max-width: 830px;
      border-radius: 3px;
    }
    .box-section21 {
      background-image: url('https://picsum.photos/1000/400');
    }
    .box-section22 {
      overflow: hidden;
      img {
        border-bottom: 8px solid #ffc40c;
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
        background-image: url('https://picsum.photos/1200/600');
        width: 100%;
        height: 50vh;
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
</style>