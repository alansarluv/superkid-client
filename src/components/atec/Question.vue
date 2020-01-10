<template>
  <div v-show="showQuestion" class="wrapper-question">
    <p>
      <span class="mr-2">{{question.numberList}}</span>
      <span>{{question.theQuestion}}</span>
      <span class="ml-1">?</span>
    </p>
    <div class="row">
      <label class="col-sm-12 col-md-4">
        <div class="custom-button">
          <input type="radio" :name="question.name" class="form-control" value="tb" required>
          {{question.option1}}
        </div>
      </label>
      <label class="col-sm-12 col-md-4">
        <div class="custom-button">
          <input type="radio" :name="question.name" class="form-control" value="ab">
          {{question.option2}}
        </div>
      </label>
      <label class="col-sm-12 col-md-4">
        <div class="custom-button">
          <input type="radio" :name="question.name" class="form-control" value="sb">
          {{question.option3}}
        </div>
      </label>
    </div> 
  </div>
</template>
<script>
  export default {
    props: ['question', 'currentQ'],
    computed: {
      showQuestion () {
        if (this.question.numberList === this.currentQ) {
          return true;
        } else {
          return false;
        }
      }
    }
    /* listen to radio changes
      berikan class active jika ada radio yang selected
      lalu emit ke parent untuk ubah currentQ agar lanjut ke soal berikutnya
      tambahkan listener pada next / continue
    */

  }
</script>
<style lang="scss" scoped>
  .wrapper-question {
    margin-bottom: 30px;
  }
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
</style>