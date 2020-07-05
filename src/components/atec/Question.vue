<template>
  <div class="wrapper-question" v-show="isShow">
    <div class="row justify-content-center">
      <div 
        class="col-sm-12"
        :class="[ question.option.length > 3 ? 'col-md-12' : '', 'col-md-9' ]">
        <p>
          <span class="mr-2">{{question.formList}}.{{question.numberList}}</span>
          <span>{{question.theQuestion}}</span>
          <span class="ml-1">?</span>
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <label class="col-sm-12 col-md-3">
        <div class="custom-button" :class="{'active': (this.selectedRadio === question.val[0] )}">
          <input 
            type="radio" 
            :name="question.name" 
            @change="onChangeRadio($event)" 
            class="form-control" 
            :value="question.val[0]" 
            required>
          {{question.option[0]}}
        </div>
      </label>
      <label class="col-sm-12 col-md-3">
        <div class="custom-button" :class="{'active': (this.selectedRadio === question.val[1] )}">
          <input 
            type="radio" 
            :name="question.name" 
            @change="onChangeRadio($event)" 
            class="form-control" 
            :value="question.val[1]">
          {{question.option[1]}}
        </div>
      </label>
      <label class="col-sm-12 col-md-3">
        <div class="custom-button" :class="{'active': (this.selectedRadio === question.val[2] )}">
          <input 
            type="radio" 
            :name="question.name" 
            @change="onChangeRadio($event)" 
            class="form-control" 
            :value="question.val[2]">
          {{question.option[2]}}
        </div>
      </label>
      <label v-if="question.option.length > 3" class="col-sm-12 col-md-3">
        <div class="custom-button" :class="{'active': (this.selectedRadio === question.val[3] )}">
          <input 
            type="radio" 
            :name="question.name" 
            @change="onChangeRadio($event)" 
            class="form-control" 
            :value="question.val[3]">
          {{question.option[3]}}
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
        const name = event.target.name;
        this.selectedRadio = val;
        this.$emit('selectedRadio', val, name);
      }
    },
    computed: {
      isShow: function() {
        return (this.question.formList === this.formActive) ? true : false;
      }
    },
    watch: {
      formActive: function() {
        const elmRight = document.querySelector(".right-content")
        elmRight.scrollTo(0, 270);
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
</style>