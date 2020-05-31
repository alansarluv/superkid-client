<template>
  <div class="form-wrapper">
    <div class="text-center d-flex justify-content-center flex-column">
      <p class="form-title">Kemampuan bicara / berbahasa (Form {{formActive}} dari 4)</p>
      <div class="question-wrapper">
        <p class="question-info">
          <small>Pertanyaan 1 dari 14</small>
        </p>
        <h3 class="question-text mb-3">
          Mengetahui namanya sendiri?
        </h3>
        <div class="row justify-content-center">
          <label class="col-sm-12 col-md-3">
            <div class="custom-button">
              <input type="radio" class="form-control" required> Tidak benar
            </div>
          </label>
          <label class="col-sm-12 col-md-3">
            <div class="custom-button">
              <input type="radio" class="form-control" required> Agak benar
            </div>
          </label>
          <label class="col-sm-12 col-md-3">
            <div class="custom-button">
              <input type="radio" class="form-control" required> Sangat benar
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Question from '../atec/Question';
  export default {
    data() {
      return {
        formActive: 1,
      }
    },
    components: {
      // questionList: Question,
    },
  }
</script>

<style lang="scss" scoped>
  .form-wrapper {
    font-family: monospace, 'Courier New', Courier;
    .form-title {
      font-family: arial;
    }
    p {
      margin: 0;
    }
    .question-wrapper {
      padding-top: 10%;
      .custom-button {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
        font-size: 14px;        
        background-color: #776e6e;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: all .3s;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        &:hover {
          background-color: #ffc40c;
          color: #212121;
        }
        input {
          display: none;
        }
        &.active {
          background-color: #5b8bc5;
          &:hover {
            color: #fff;
          }
        }
      }      
    }
  }
</style>