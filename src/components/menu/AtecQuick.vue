<template>
  <div class="container-fluid container-content">
    <div class="right-content">
      
      <div v-if="false">
        <atec-form></atec-form>
      </div>
      
    <div v-if="true">
      <form @submit.prevent="onSubmitAtec">
        <div class="row justify-content-center sticky-100 mb-3">
          <div class="col-lg-6 col-md-8 col-sm-12">
            <div class="card">
              <div class="card-body">
                <!-- <a @click="selectAllFirst()">check all</a> -->
                <p 
                  class="header-question"
                  :class="{
                    active: (formActive === 1)
                  }"
                  @click="formActive = 1"
                >
                  <!-- class active only if formActive = 1 -->
                  Form 1 - Kemampuan Bicara/Berbahasa ( {{atec.bicaraTotalLength}} / 14) 
                  <i v-if="atec.bicaraTotalLength === 14" class="fas fa-check"></i>
                </p>
                <p 
                  class="header-question"
                  :class="{
                    active: (formActive === 2),
                    disabled: (atec.bicaraTotalLength < 14)
                  }"
                  @click="formActive = 2"
                >
                  Form 2 - Kemampuan Bersosialisasi ( {{atec.sosialTotalLength}} / 20)
                  <i v-if="atec.sosialTotalLength === 20" class="fas fa-check"></i>
                </p>
                <p 
                  class="header-question"
                  :class="{
                    active: (formActive === 3),
                    disabled: (atec.sosialTotalLength < 20)
                  }"
                  @click="formActive = 3"
                >
                  Form 3 - Kesadaran sensorik / kognitif ( {{atec.sensorikTotalLength}} / 18)
                  <i v-if="atec.sensorikTotalLength === 18" class="fas fa-check"></i>
                </p>
                <p 
                  class="header-question"
                  :class="{
                    active: (formActive === 4),
                    disabled: (atec.sensorikTotalLength < 18 )
                  }"
                  @click="formActive = 4"
                >
                  Form 4 - Kesehatan umum, fisik dan perilaku ( {{atec.umumTotalLength}} / 25)
                  <i v-if="atec.umumTotalLength === 25" class="fas fa-check"></i>
                </p>
                <button 
                  v-show="submitBtn" 
                  type="submit" 
                  class="form-control btn btn-info" 
                  :class="{'disabled': loadingSubmit}"
                >
                  <template v-if="loadingSubmit">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading ...
                  </template>
                  <span v-if="!loadingSubmit">  S  U  B  M  I  T</span>  
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!showResult" class="row justify-content-center sticky-100">
          <div class="col-lg-8 col-md-8 col-sm-12">
            <div class="scrollable-box bg-white">
              <div class="single-question question-form-1 mt-2">
                <question-list 
                  v-for="(question, idx) in formQuestion" 
                  :key="idx" 
                  :question='question'
                  :formActive='formActive'
                  @selectedRadio='valSelectedRadio'>
                </question-list>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showResult" class="row justify-content-center sticky-100">
          <div class="col-lg-6 col-md-8 col-sm-12">
            <div class="card">
              <div class="card-body">
                <p>Kemampuan bicara = {{dataRes.bicaraTotal}}</p>
                <p>Kemampuan sosial = {{dataRes.sosialTotal}}</p>
                <p>Kemampuan sensorik = {{dataRes.sensorikTotal}}</p>
                <p>Kemampuan umum = {{dataRes.umumTotal}}</p>
                <p>Kemampuan total = {{dataRes.bicaraTotal + dataRes.sosialTotal + dataRes.sensorikTotal + dataRes.umumTotal }}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>



    </div>
  </div>
</template>
<script>
  import Question from '../atec/Question';
  import atecForm from '../partials/AtecForm';
  import { spinnerMixin } from '../../mixins/general';

  export default {
    data() {
      return {
        formQuestion: this.$store.getters.getQuestion || [],
        formActive: 1,
        submitBtn: false,
        loadingSubmit: false,
        showResult: false,
        dataRes: {},
        atec: {
          selectedKid: '',
          month: '',
          year: '',
          bicaraTotal: [],
          sosialTotal: [],
          sensorikTotal: [],
          umumTotal: [],
          bicaraTotalLength: 0,
          sosialTotalLength: 0,
          sensorikTotalLength: 0,
          umumTotalLength: 0,
          bicara1 : '',
          bicara2 : '',
          bicara3 : '',
          bicara4 : '',
          bicara5 : '',
          bicara6 : '',
          bicara7 : '',
          bicara8 : '',
          bicara9 : '',
          bicara10 : '',
          bicara11 : '',
          bicara12 : '',
          bicara13 : '',
          bicara14 : '',
          sosial1 : '',
          sosial2 : '',
          sosial3 : '',
          sosial4 : '',
          sosial5 : '',
          sosial6 : '',
          sosial7 : '',
          sosial8 : '',
          sosial9 : '',
          sosial10 : '',
          sosial11 : '',
          sosial12 : '',
          sosial13 : '',
          sosial14 : '',
          sosial15 : '',
          sosial16 : '',
          sosial17 : '',
          sosial18 : '',
          sosial19 : '',
          sosial20 : '',
          sensorik1 : '',
          sensorik2 : '',
          sensorik3 : '',
          sensorik4 : '',
          sensorik5 : '',
          sensorik6 : '',
          sensorik7 : '',
          sensorik8 : '',
          sensorik9 : '',
          sensorik10 : '',
          sensorik11 : '',
          sensorik12 : '',
          sensorik13 : '',
          sensorik14 : '',
          sensorik15 : '',
          sensorik16 : '',
          sensorik17 : '',
          sensorik18 : '',
          umum1 : '',
          umum2 : '',
          umum3 : '',
          umum4 : '',
          umum5 : '',
          umum6 : '',
          umum7 : '',
          umum8 : '',
          umum9 : '',
          umum10 : '',
          umum11 : '',
          umum12 : '',
          umum13 : '',
          umum14 : '',
          umum15 : '',
          umum16 : '',
          umum17 : '',
          umum18 : '',
          umum19 : '',
          umum20 : '',
          umum21 : '',
          umum22 : '',
          umum23 : '',
          umum24 : '',
          umum25 : ''          
        },
      }
    },
    mixins: [spinnerMixin],
    computed: {
      activeQuestion: function() {
        const res = this.formQuestion.filter(el => el.formList === this.formActive);
        return res;
      },
    },    
    components: {
      questionList: Question,
      atecForm
    },
    methods: {
      selectAllFirst() {
        const allQuestion = document.querySelectorAll(".scrollable-box .single-question .wrapper-question");
        for (let el of allQuestion) {
            el.querySelector("input[type='radio']").click();
        }
      },
      valSelectedRadio(val, name) {
        this.atec[name] = val;
        name = name.match(/(\d+|[^\d]+)/g);
        const type = name[0];
        const pos = name[1];
        if (type === 'bicara') {
          this.atec.bicaraTotal[pos-1] = val;
          this.atec.bicaraTotalLength = this.atec.bicaraTotal.reduce((acc,cv)=>(cv)?acc+1:acc,0);
          if (this.atec.bicaraTotalLength === 14) {
            this.formActive = 2;
            this.scrollTo(0, 250);
            this.atec.totalBicara = this.atec.bicaraTotal.map(x => {
              if (x === 'ab'){
                x = 1;
              } else if (x === 'tb'){
                x = 2;
              } else {
                x = 0;
              }
              return x;
            })
            this.atec.totalBicara = this.totalValArray(this.atec.totalBicara);
          }
        } else if (type === 'sosial') {
          this.atec.sosialTotal[pos-1] = val;
          this.atec.sosialTotalLength = this.atec.sosialTotal.reduce((acc,cv)=>(cv)?acc+1:acc,0);
          if (this.atec.sosialTotalLength === 20) {
            this.formActive = 3;
            this.scrollTo(0, 250);
            this.atec.totalSosial = this.atec.sosialTotal.map(x => {
              if (x === 'ac'){
                x = 1;
              } else if (x === 'sc'){
                x = 2;
              } else {
                x = 0;
              }
              return x;
            })
            this.atec.totalSosial = this.totalValArray(this.atec.totalSosial);    
          }
        } else if (type === 'sensorik') {
          this.atec.sensorikTotal[pos-1] = val;
          this.atec.sensorikTotalLength = this.atec.sensorikTotal.reduce((acc,cv)=>(cv)?acc+1:acc,0);
          if (this.atec.sensorikTotalLength === 18) {
            this.formActive = 4;
            this.scrollTo(0, 250);
            this.atec.totalSensorik = this.atec.sensorikTotal.map(x => {
              if (x === 'ac'){
                x = 1;
              } else if (x === 'tc'){
                x = 2;
              } else {
                x = 0;
              }
              return x;
            })
            this.atec.totalSensorik = this.totalValArray(this.atec.totalSensorik); 
          }
        } else if (type === 'umum') {
          this.atec.umumTotal[pos-1] = val;
          this.atec.umumTotalLength = this.atec.umumTotal.reduce((acc,cv)=>(cv)?acc+1:acc,0);
          if (this.atec.umumTotalLength === 25) {
            this.formActive = 0;
            this.submitBtn = true;
            this.scrollTo(0, 250);
            this.atec.totalUmum = this.atec.umumTotal.map(x => {
              if (x === 'sb'){
                x = 1;
              } else if (x === 'cb'){
                x = 2;
              } else if (x === 'vb'){
                x = 3;
              } else {
                x = 0;
              }
              return x;
            })
            this.atec.totalUmum = this.totalValArray(this.atec.totalUmum); 
          }
        }
      },
      scrollTo(x, y) {
        window.scrollTo(x, y);
      },
      totalValArray(arr){
        return arr.reduce((a, b) => a + b, 0);
      },
      onSubmitAtec () {
        this.showResult = true;
        this.dataRes = {
          bicaraTotal: this.atec.totalBicara,
          sosialTotal: this.atec.totalSosial,
          sensorikTotal: this.atec.totalSensorik,
          umumTotal: this.atec.totalUmum,
        }
        console.log(this.dataRes);   // eslint-disable-line no-console
      }      
    }
  }
</script>