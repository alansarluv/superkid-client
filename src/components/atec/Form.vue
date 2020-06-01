<template>
  <div class="container-fluid container-content position-relative">
    <div v-if="!isMobileSidebar" @click="isMobileSidebar = true" class="mobile-menu btn"><i class="fas fa-bars"></i></div>
    <div v-if="callAlert.visible" class="alert alert-animation" :class="`alert-${callAlert.type}`" role="alert">
      {{callAlert.text}}
    </div>
    <atec-sidebar
      :isMobileSidebar='isMobileSidebar'
      @closeSidebar='isMobileSidebar = false'
    ></atec-sidebar>
    <div class="right-content">
      <div v-if="!kidLists.length" class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-12 mb-4">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="onSubmitKids">
                <div class="form-group">
                  <input type="text" class="form-control" id="child-name" v-model="kids.name" placeholder="Tulis nama anak" required>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="genderpria" v-model="kids.gender" value="pria" class="custom-control-input" required>
                    <label class="custom-control-label" for="genderpria">Laki laki</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="genderwanita" v-model="kids.gender" value="wanita" class="custom-control-input" required>
                    <label class="custom-control-label" for="genderwanita">Perempuan</label>
                  </div>
                </div>
                <div class="form-group">
                  <input type="date" class="form-control" v-model="kids.birthday" required>
                </div>
                <div class="form-group">
                  <p>Umur : <span>{{kidAge}}</span> tahun</p>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </div>
              </form>              
            </div>
          </div>          
        </div>
      </div>
      <form @submit.prevent="onSubmitAtec" v-if="kidLists.length">
        <div class="row justify-content-center sticky-100 mb-3">
          <div class="col-lg-6 col-md-8 col-sm-12">
            <div class="card header-atec-form">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <h5 class="mb-2">
                      Nama : 
                      <span v-if="kidLists.length === 1">
                        {{kidLists[0].name}} - {{kidLists[0].gender}} ({{getAge(kidLists[0].birthday)}} Tahun)
                      </span>
                    </h5>
                    <select v-if="kidLists.length > 1" v-model="atec.selectedKid" class="form-control">
                      <option disabled value="">Pilih satu</option>
                      <option 
                        v-for="kid in kidLists" 
                        :key="kid._id" 
                        :value="kid.name"
                      >
                        {{kid.name}} - {{kid.gender}} ({{getAge(kid.birthday)}} Tahun)
                      </option>
                    </select>
                    <h5 class="mb-2 mt-4">Pilih Bulan dan Tahun laporan ATEC</h5>
                    <div class="row">
                      <div class="col-md-12 col-lg-6 pb-2">
                        <select v-model="atec.month" class="form-control" :class="{'is-invalid': alreadyExistDate !== ''}">
                          <option disabled value="">Pilih satu</option>
                          <option value="01">Januari</option>
                          <option value="02">Februari</option>
                          <option value="03">Maret</option>
                          <option value="04">April</option>
                          <option value="05">Mei</option>
                          <option value="06">Juni</option>
                          <option value="07">Juli</option>
                          <option value="08">Agustus</option>
                          <option value="09">September</option>
                          <option value="10">Oktober</option>
                          <option value="11">November</option>
                          <option value="12">Desember</option>
                        </select>
                      </div>
                      <div class="col-md-12 col-lg-6">
                        <select v-model="atec.year" class="form-control" :class="{'is-invalid': alreadyExistDate !== ''}">
                          <option disabled value="">Pilih satu</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                        </select>
                      </div>
                      <small v-if="alreadyExistDate !== ''" class="invalid-feedback pl-3 d-block">{{ alreadyExistDate }}</small>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center sticky-100 mb-3">
          <div class="col-lg-6 col-md-8 col-sm-12">
            <div class="card">
              <div class="card-body">
                <a @click="selectAllFirst()">check all</a>
                <p 
                  class="header-question"
                  :class="{
                    active: (formActive === 1)
                  }"
                  @click="formActive = 1"
                >
                  <!-- class active only if formActive = 1 -->
                  Kemampuan Bicara/Berbahasa ( {{atec.bicaraTotalLength}} / 14) 
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
                  Kemampuan Bersosialisasi ( {{atec.sosialTotalLength}} / 20)
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
                  Kesadaran sensorik / kognitif ( {{atec.sensorikTotalLength}} / 18)
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
                  Kesehatan umum, fisik &amp; perilaku ( {{atec.umumTotalLength}} / 25)
                  <i v-if="atec.umumTotalLength === 25" class="fas fa-check"></i>
                </p>
                <button 
                  v-show="submitBtn" 
                  type="submit" 
                  class="form-control btn btn-info" 
                  :class="{'disabled': loadingSubmit || alreadyExistDate !== ''}"
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
        <div class="row justify-content-center sticky-100">
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
      </form>
    </div>
  </div>
</template>
<script>
  import Question from './Question'
  import axios from 'axios';
  import Sidebar from '../partials/Sidebar';
  import { getAgeMixin, spinnerMixin } from '../../mixins/general';

  export default {
    data() {
      return {
        formQuestion: this.$store.getters.getQuestion || [],
        formActive: 1,
        submitBtn: false,
        kidLists: this.$store.getters.userKids || [],
        kids: {
          name: '',
          gender: [],
          birthday: Date
        },
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
        loadingSubmit: false,
        isMobileSidebar: false,
        existingMonthYear: [],
        callAlert: {
          text: '',
          type: '',
          visible: false
        }
      }
    },
    mixins: [spinnerMixin, getAgeMixin],
    computed: {
      activeQuestion: function() {
        const res = this.formQuestion.filter(el => el.formList === this.formActive);
        return res;
      },
      user() {
        return this.$store.getters.user
      },
      kidAge() {
        const currentAge = this.getAge(this.kids.birthday)
        return currentAge;
      },
      alreadyExistDate: function() {
        const selectedMonthYear = this.atec.year+this.atec.month;
        let returnText = '';
        this.existingMonthYear.filter(i => {
          if ( i === selectedMonthYear ) {
            returnText = "Laporan ATEC pada bulan dan tahun ini telah di isi, silahkan memilih bulan lain";
          }
        })
        return returnText;
      }
    },
    components: {
      questionList: Question,
      atecSidebar: Sidebar
    },
    methods: {
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
      selectAllFirst() {
        const allQuestion = document.querySelectorAll(".scrollable-box .single-question .wrapper-question");
        for (let el of allQuestion) {
            el.querySelector("input[type='radio']").click();
        }
      },
      onSubmitKids () {
        const configData = {
          data: {
            id_user: this.user._id,
            name: this.kids.name,
            gender: this.kids.gender,
            birthday: this.kids.birthday
          }
        }
        const configHeader = {
          headers: this.$store.getters.configHeader
        }
        axios
          .post('/add-kid', configData.data, configHeader)
          .then(res => {
            if (res.data.status && res.data.data.kids) {
              this.kidLists = res.data.data.kids;
              let existingUser = localStorage.getItem('user');
              existingUser = existingUser ? JSON.parse(existingUser) : {};
              existingUser['kids'] = res.data.data.kids;
              localStorage.setItem('user', JSON.stringify(existingUser));
            } else {
              this.callAlert.text = "Terdapat kesalahan sistem, mohon hubungi kami agar kami dapat membantu anda.";
              this.callAlert.type = "danger";
              this.callAlert.visible = true;
            }
          })
          .catch(error => console.log(error)) // eslint-disable-line no-console
      },
      onSubmitAtec () {
        this.loadingSubmit = true;
        const configData = {
          data: {
            userId: this.user._id,
            kidName: this.atec.selectedKid,
            atecYear: this.atec.year,
            atecMonth: this.atec.month,
            bicaraTotal: this.atec.totalBicara,
            sosialTotal: this.atec.totalSosial,
            sensorikTotal: this.atec.totalSensorik,
            umumTotal: this.atec.totalUmum,
            bicara1 : this.atec.bicara1,
            bicara2 : this.atec.bicara2,
            bicara3 : this.atec.bicara3,
            bicara4 : this.atec.bicara4,
            bicara5 : this.atec.bicara5,
            bicara6 : this.atec.bicara6,
            bicara7 : this.atec.bicara7,
            bicara8 : this.atec.bicara8,
            bicara9 : this.atec.bicara9,
            bicara10 : this.atec.bicara10,
            bicara11 : this.atec.bicara11,
            bicara12 : this.atec.bicara12,
            bicara13 : this.atec.bicara13,
            bicara14 : this.atec.bicara14,
            sosial1 : this.atec.sosial1,
            sosial2 : this.atec.sosial2,
            sosial3 : this.atec.sosial3,
            sosial4 : this.atec.sosial4,
            sosial5 : this.atec.sosial5,
            sosial6 : this.atec.sosial6,
            sosial7 : this.atec.sosial7,
            sosial8 : this.atec.sosial8,
            sosial9 : this.atec.sosial9,
            sosial10 : this.atec.sosial10,
            sosial11 : this.atec.sosial11,
            sosial12 : this.atec.sosial12,
            sosial13 : this.atec.sosial13,
            sosial14 : this.atec.sosial14,
            sosial15 : this.atec.sosial15,
            sosial16 : this.atec.sosial16,
            sosial17 : this.atec.sosial17,
            sosial18 : this.atec.sosial18,
            sosial19 : this.atec.sosial19,
            sosial20 : this.atec.sosial20,
            sensorik1 : this.atec.sensorik1,
            sensorik2 : this.atec.sensorik2,
            sensorik3 : this.atec.sensorik3,
            sensorik4 : this.atec.sensorik4,
            sensorik5 : this.atec.sensorik5,
            sensorik6 : this.atec.sensorik6,
            sensorik7 : this.atec.sensorik7,
            sensorik8 : this.atec.sensorik8,
            sensorik9 : this.atec.sensorik9,
            sensorik10 : this.atec.sensorik10,
            sensorik11 : this.atec.sensorik11,
            sensorik12 : this.atec.sensorik12,
            sensorik13 : this.atec.sensorik13,
            sensorik14 : this.atec.sensorik14,
            sensorik15 : this.atec.sensorik15,
            sensorik16 : this.atec.sensorik16,
            sensorik17 : this.atec.sensorik17,
            sensorik18 : this.atec.sensorik18,
            umum1 : this.atec.umum1,
            umum2 : this.atec.umum2,
            umum3 : this.atec.umum3,
            umum4 : this.atec.umum4,
            umum5 : this.atec.umum5,
            umum6 : this.atec.umum6,
            umum7 : this.atec.umum7,
            umum8 : this.atec.umum8,
            umum9 : this.atec.umum9,
            umum10 : this.atec.umum10,
            umum11 : this.atec.umum11,
            umum12 : this.atec.umum12,
            umum13 : this.atec.umum13,
            umum14 : this.atec.umum14,
            umum15 : this.atec.umum15,
            umum16 : this.atec.umum16,
            umum17 : this.atec.umum17,
            umum18 : this.atec.umum18,
            umum19 : this.atec.umum19,
            umum20 : this.atec.umum20,
            umum21 : this.atec.umum21,
            umum22 : this.atec.umum22,
            umum23 : this.atec.umum23,
            umum24 : this.atec.umum24,
            umum25 : this.atec.umum25
          }
        }
        const configHeader = {
          headers: this.$store.getters.configHeader
        }
        axios
          .post('/atec/create', configData.data, configHeader.headers)
          .then(res => {
            console.log('res :' ,res); // eslint-disable-line no-console
            const data = res.data.data;
            this.loadingSubmit = false;
            if (res.status === 200 && data._id) {
              this.$router.push({ 
                name: 'atec-flash',
                params: { response: data }
              });
            } else {
              this.callAlert.text = "Terdapat kesalahan sistem, mohon hubungi kami agar kami dapat membantu anda.";
              this.callAlert.type = "danger";
              this.callAlert.visible = true;
            }
          })
          .catch(error => console.log(error)) // eslint-disable-line no-console

      }
    },
    watch: {
      'callAlert.visible': function() {
        var _this = this;
        setTimeout(function() {
          _this.callAlert.visible = false;
        }, 3000)

      }
    },
    created() {
      const today = new Date();
      this.atec.year = today.getFullYear();
      let getMonth = today.getMonth() + 1;
      getMonth = getMonth.toString();
      if (getMonth.length < 2) {
        getMonth = "0"+getMonth;
      }
      this.atec.month = getMonth;

      if (this.kidLists.length === 1) {
        this.atec.selectedKid = this.kidLists[0].name;
      }

      if (this.kidLists.length > 0) {
        const user = this.$store.getters.user;
        const config = {
          headers: this.$store.getters.configHeader,
          params: {
            userId: user._id
          }
        }
        axios
          .get('/atec/report', config)
          .then(res => {
            const data = res.data.data;
            data.filter(d => {
              this.existingMonthYear.push(d.monthYear);
            })
          })  
          .catch(error => console.log("error: ", error)) // eslint-disable-line no-console
      }
    }
  }
</script>
<style lang="scss" scoped>
  .card { height: auto; }
  .sticky-100 { position: sticky; top: 0;}
  .scrollable-box {
    max-height: none;
    padding-bottom: 100px;
  }
  .btn.btn-info {
    background-color: #ffc40c;
    border-color: #ffc40c;
    color: #212121;
    transition: all .3s;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    &:hover {
      background-color: #212121;
      color: #ffbc41;
    }
    &.disabled {
      pointer-events: none;
    }
  }

  .header-question {
    cursor: pointer;
    color: green;
    &.disabled {
      color: darkgray;
      cursor: not-allowed;
      pointer-events: none;
    }
    &.active {
      cursor: pointer;
      color: mediumblue;
    }
  }

  .mobile-menu {
    display: none;    
  }

  @media only screen and (max-width: 768px) {
    .right-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
      .card {
        border: none;
        .card-body {
          padding-left: 0;
          padding-right: 0;
        }
        &.header-atec-form {
          .card-body {
            padding-top: 0 !important;
          }
          h5 {
            margin-top: 0 !important;
            font-size: 14px;
          }
        }
        p.header-question {
          font-size: 14px;
          margin-bottom: 8px !important;
        }
      }
      .scrollable-box {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .custom-button {
        &:hover {
          background-color: inherit;
          color: inherit;
        }
      }
    }
    .mobile-menu {
      position: absolute;
      display: block;
      top: -18px;
      right: -18px;
      z-index: 3;
    }
  }
</style>
