<template>
  <div class="wrapper-question" v-show="isShow">
    <p>
      <span class="mr-2">{{question.formList}}.{{question.numberList}}</span>
      <span>{{question.theQuestion}}</span>
      <span class="ml-1">?</span>
    </p>
    <div class="row">
      <label class="col-sm-12 col-md-4">
        <div class="custom-button" :class="{'active': (this.selectedRadio === 'tb')}">
          <input 
            type="radio" 
            :name="question.name" 
            @change="onChangeRadio($event)" 
            class="form-control" 
            value="tb" 
            required>
          {{question.option1}}
        </div>
      </label>
      <label class="col-sm-12 col-md-4">
        <div class="custom-button" :class="{'active': (this.selectedRadio === 'ab')}">
          <input 
            type="radio" 
            :name="question.name" 
            @change="onChangeRadio($event)" 
            class="form-control" 
            value="ab">
          {{question.option2}}
        </div>
      </label>
      <label class="col-sm-12 col-md-4">
        <div class="custom-button" :class="{'active': (this.selectedRadio === 'sb')}">
          <input 
            type="radio" 
            :name="question.name" 
            @change="onChangeRadio($event)" 
            class="form-control" 
            value="sb">
          {{question.option3}}
        </div>
      </label>
    </div> 
  </div>
</template>
<script>
  export default {
    props: ['question', 'formActive'],
    data() {
      return {
        selectedRadio: ''
      }
    },
    methods: {
      onChangeRadio(event) {
        const val = event.target.value;
        this.selectedRadio = val;
        this.$emit('selectedRadio', val);
      }
    },
    computed: {
      isShow: function() {
        return (this.question.formList === this.formActive) ? true : false;
      }
    }
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
    &.active {
      background-color: #5b8bc5;
    }
  }
</style>