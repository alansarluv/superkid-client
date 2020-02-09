<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-2">
        <atec-sidebar></atec-sidebar>
      </div>
      <div class="col-md-10">
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
                    <input type="hidden" name="_csrf" value="<%= csrfToken %>">
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                  </div>
                </form>              
              </div>
            </div>          
          </div>
        </div>
        <form action="/atec/form-report" v-if="kidLists.length" method="POST">
          <input type="hidden" name="_csrf" value="<%= csrfToken %>">
          <input type="hidden" name="kidName" value="<%= kids[0].name %>">
          <div class="row justify-content-center sticky-100 mb-3">
            <div class="col-lg-6 col-md-8 col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <h5 class="mb-2">Nama anak :</h5>
                      <select name="kids" class="form-control">
                        <option v-for="kid in kidLists" :key="kid._id" :value="kid._id">{{kid.name}} - {{kid.gender}} ({{getAge(kid.birthday)}} Tahun)</option>
                      </select>
                      <h5 class="mb-2 mt-4">Pilih Bulan dan Tahun laporan ATEC</h5>
                      <div class="row">
                        <div class="col-md-12 col-lg-6">
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
                        <div class="col-md-12 col-lg-6">
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
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center sticky-100 mb-3">
            <div class="col-lg-6 col-md-8 col-sm-12">
              <div class="card">
                <div class="card-body">
                  <p 
                    class="header-question"
                    :class="{
                      active: (formActive === 1)
                    }"
                    @click="formActive = 1"
                  >
                    <!-- class active only if formActive = 1 -->
                    Form 1 - Kemampuan Bicara/Berbahasa ( {{answeredQ1}} / 14) 
                    <i class="fa fa-check-square-o" aria-hidden="true"></i>
                  </p>
                  <p 
                    class="header-question"
                    :class="{
                      active: (formActive === 2),
                      disabled: (answeredQ2 !== 20)
                    }"
                    @click="formActive = 2"
                  >
                    Form 2 - Kemampuan Bersosialisasi ( {{answeredQ2}} / 20)
                  </p>
                  <p 
                    class="header-question"
                    :class="{
                      active: (formActive === 3),
                      disabled: (answeredQ3 !== 18)
                    }"
                    @click="formActive = 3"
                  >
                    Form 3 - Kesadaran sensorik / kognitif ( {{answeredQ3}} / 18)
                  </p>
                  <p 
                    class="header-question"
                    :class="{
                      active: (formActive === 4),
                      disabled: (answeredQ4 !== 25 )
                    }"
                    @click="formActive = 4"
                  >
                    Form 4 - Kesehatan umum, fisik dan perilaku ( {{answeredQ4}} / 25)
                  </p>
                  <button v-show="submitBtn" type="submit" class="form-control btn- btn-info">  S  U  B  M  I  T  </button>           
                </div>
              </div>
            </div>

          </div>
          <div class="row justify-content-center sticky-100">
            <div class="col-lg-8 col-md-8 col-sm-12">
              <div class="scrollable-box">
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
  </div>
</template>
<script>
  import Question from './Question'
  import axios from 'axios';
  import Sidebar from '../partials/Sidebar';

  export default {
    data() {
      return {
        formQuestion: [
          {
            formList: 1,
            numberList: 1,
            theQuestion: 'Mengetahui namanya sendiri',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara1'
          },
          {
            formList: 1,
            numberList: 2,
            theQuestion: 'Merespon pada "tidak" atau "stop"',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara2'
          },
          {
            formList: 1,
            numberList: 3,
            theQuestion: 'Dapat mengikuti perintah"',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara3'
          },
          {
            formList: 1,
            numberList: 4,
            theQuestion: 'Dapat menggunakan 1 kata (Tidak!, makan, air, dll)',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara4'
          },
          {
            formList: 1,
            numberList: 5,
            theQuestion: 'Dapat menggunakan 2 kata sekaligus bersamaan (Tidak mau!, mau makan, minta itu, dll)',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara5'
          },
          {
            formList: 1,
            numberList: 6,
            theQuestion: 'Dapat menggunakan 3 kata sekaligus (Mau minum susu, dll)',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara6'
          },
          {
            formList: 1,
            numberList: 7,
            theQuestion: 'Mengetahui 10 kata atau lebih',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara7'
          },
          {
            formList: 1,
            numberList: 8,
            theQuestion: 'Dapat membuat kalimat yang berisi 4 kata atau lebih',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara8'
          },
          {
            formList: 1,
            numberList: 9,
            theQuestion: 'Mampu menjelaskan apa yang dia inginkan',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara9'
          },
          {
            formList: 1,
            numberList: 10,
            theQuestion: 'Mampu menanyakan pertanyaan yang bermakna',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara10'
          },
          {
            formList: 1,
            numberList: 11,
            theQuestion: 'Isi pembicaraan cenderung relevan atau bermakna',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara11'
          },
          {
            formList: 1,
            numberList: 12,
            theQuestion: 'Sering menggunakan kalimat kalimat yang berurutan',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara12'
          },
          {
            formList: 1,
            numberList: 13,
            theQuestion: 'Bisa mengikuti pembicaraan dengan cukup baik',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara13'
          },
          {
            formList: 1,
            numberList: 14,
            theQuestion: 'Memiliki kemampuan bicara / berbahasa yang sesuai dengan seusianya',
            option1: 'Tidak benar',
            option2: 'Agak benar',
            option3: 'Sangat benar',
            name: 'bicara14'
          },
          {
            formList: 2,
            numberList: 1,
            theQuestion: 'Terlihat seperti berada dalam tempurung (anda tdk dapat menjangkaunya)',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial1'
          },
          {
            formList: 2,
            numberList: 2,
            theQuestion: 'Mengabaikan orang lain',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial2'
          },
          {
            formList: 2,
            numberList: 3,
            theQuestion: 'Ketika dipanggil, hanya sedikit atau malah tidak memperhatikan',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial3'
          },
          {
            formList: 2,
            numberList: 4,
            theQuestion: 'Tidak kooperatif dan menolak',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial4'
          },
          {
            formList: 2,
            numberList: 5,
            theQuestion: 'Tidak ada kontak mata',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial5'
          },
          {
            formList: 2,
            numberList: 6,
            theQuestion: 'Lebih suka menyendiri',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial6'
          },
          {
            formList: 2,
            numberList: 7,
            theQuestion: 'Tidak menunjukan rasa kasih sayang',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial7'
          },
          {
            formList: 2,
            numberList: 8,
            theQuestion: 'Tidak mampu menyapa orang tua',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial8'
          },
          {
            formList: 2,
            numberList: 9,
            theQuestion: 'Menghindari kontak dengan orang lain',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial9'
          },
          {
            formList: 2,
            numberList: 10,
            theQuestion: 'Tidak mampu menirukan orang lain',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial10'
          },
          {
            formList: 2,
            numberList: 11,
            theQuestion: 'Tidak suka dipegang atau dipeluk',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial11'
          },
          {
            formList: 2,
            numberList: 12,
            theQuestion: 'Tidak mau berbagi atau menunjukan',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial12'
          },
          {
            formList: 2,
            numberList: 13,
            theQuestion: 'Tidak bisa melambaikan tangan (da... dah...)',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial13'
          },
          {
            formList: 2,
            numberList: 14,
            theQuestion: 'Sering tidak setuju / menolak',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial14'
          },
          {
            formList: 2,
            numberList: 15,
            theQuestion: 'Tantrum, marah marah',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial15'
          },
          {
            formList: 2,
            numberList: 16,
            theQuestion: 'Tidak mempunyai teman',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial16'
          },
          {
            formList: 2,
            numberList: 17,
            theQuestion: 'Jarang tersenyum',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial17'
          },
          {
            formList: 2,
            numberList: 18,
            theQuestion: 'Tidak peka terhadap perasaan orang lain',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial18'
          },
          {
            formList: 2,
            numberList: 19,
            theQuestion: 'Acuh tak acuh ketika disukai orang lain',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial19'
          },
          {
            formList: 2,
            numberList: 20,
            theQuestion: 'Acuh tak acuh ketika ditinggal pergi oleh orang tuanya',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sosial20'
          },
          {
            formList: 3,
            numberList: 1,
            theQuestion: 'Merespon saat dipanggil namanya',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik1'
          },
          {
            formList: 3,
            numberList: 2,
            theQuestion: 'Merespon saat dipuji',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik2'
          },
          {
            formList: 3,
            numberList: 3,
            theQuestion: 'Melihat pada orang dan binatang',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik3'
          },
          {
            formList: 3,
            numberList: 4,
            theQuestion: 'Melihat pada gambar (dan TV)',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik4'
          },
          {
            formList: 3,
            numberList: 5,
            theQuestion: 'Menggambar, mewarnai, dan melakukan kesenian',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik5'
          },
          {
            formList: 3,
            numberList: 6,
            theQuestion: 'Bermain dengan mainannya secara sesuai',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik6'
          },
          {
            formList: 3,
            numberList: 7,
            theQuestion: 'Menggunakan ekspresi wajah yang sesuai',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik7'
          },
          {
            formList: 3,
            numberList: 8,
            theQuestion: 'Memahami cerita yang ditayangkan di TV',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik8'
          },
          {
            formList: 3,
            numberList: 9,
            theQuestion: 'Memahami penjelasan',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik9'
          },
          {
            formList: 3,
            numberList: 10,
            theQuestion: 'Sadar akan lingkungannya',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik10'
          },
          {
            formList: 3,
            numberList: 11,
            theQuestion: 'Sadar akan bahaya',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik11'
          },
          {
            formList: 3,
            numberList: 12,
            theQuestion: 'Mampu berimajinasi',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik12'
          },
          {
            formList: 3,
            numberList: 13,
            theQuestion: 'Memulai aktivitas',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik13'
          },
          {
            formList: 3,
            numberList: 14,
            theQuestion: 'Mampu berpakaian sendiri',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik14'
          },
          {
            formList: 3,
            numberList: 15,
            theQuestion: 'Memiliki rasa penasaran dan ketertarikan',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik15'
          },
          {
            formList: 3,
            numberList: 16,
            theQuestion: 'Suka tantangan, senang mengeksplorasi',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik16'
          },
          {
            formList: 3,
            numberList: 17,
            theQuestion: 'Tampak selaras, tidak tampak kosong',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik17'
          },
          {
            formList: 3,
            numberList: 18,
            theQuestion: 'Mampu mengikuti pandangan ke arah semua orang memandang',
            option1: 'Tidak cocok',
            option2: 'Agak cocok',
            option3: 'Sangat cocok',
            name: 'sensorik18'
          },
          {
            formList: 4,
            numberList: 1,
            theQuestion: 'Mengompol saat tidur',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum1'
          },
          {
            formList: 4,
            numberList: 2,
            theQuestion: 'Mengompol di celana / popok',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum2'
          },
          {
            formList: 4,
            numberList: 3,
            theQuestion: 'Buang air besar di celana / popok',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum3'
          },
          {
            formList: 4,
            numberList: 4,
            theQuestion: 'Diare',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum4'
          },
          {
            formList: 4,
            numberList: 5,
            theQuestion: 'Konstipasi / sembelit',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum5'
          },
          {
            formList: 4,
            numberList: 6,
            theQuestion: 'Gangguan tidur',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum6'
          },
          {
            formList: 4,
            numberList: 7,
            theQuestion: 'Makan terlalu banyak / terlalu sedikit',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum7'
          },
          {
            formList: 4,
            numberList: 8,
            theQuestion: 'Pilihan makanan yang diinginkan sangat terbatas',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum8'
          },
          {
            formList: 4,
            numberList: 9,
            theQuestion: 'Hiperaktif',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum9'
          },
          {
            formList: 4,
            numberList: 10,
            theQuestion: 'Letargi, lemah lesu',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum10'
          },
          {
            formList: 4,
            numberList: 11,
            theQuestion: 'Memukul atau melukai diri sendiri',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum11'
          },
          {
            formList: 4,
            numberList: 12,
            theQuestion: 'Memukul atau melukai orang lain',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum12'
          },
          {
            formList: 4,
            numberList: 13,
            theQuestion: 'Destruktif',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum13'
          },
          {
            formList: 4,
            numberList: 14,
            theQuestion: 'Sensitif terhadap suara',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum14'
          },
          {
            formList: 4,
            numberList: 15,
            theQuestion: 'Cemas / penuh ketakutan',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum15'
          },
          {
            formList: 4,
            numberList: 16,
            theQuestion: 'Tidak senang / mudah rewel / menangis',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum16'
          },
          {
            formList: 4,
            numberList: 17,
            theQuestion: 'Kejang',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum17'
          },
          {
            formList: 4,
            numberList: 18,
            theQuestion: 'Bicara secara obsesif',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum18'
          },
          {
            formList: 4,
            numberList: 19,
            theQuestion: 'Kaku terhadap rutinitas',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum19'
          },
          {
            formList: 4,
            numberList: 20,
            theQuestion: 'Berteriak / menjerit-jerit',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum20'
          },
          {
            formList: 4,
            numberList: 21,
            theQuestion: 'Menuntut hal atau cara yang sama berulang-ulang',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum21'
          },
          {
            formList: 4,
            numberList: 22,
            theQuestion: 'Sering gelisah / agitasi',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum22'
          },
          {
            formList: 4,
            numberList: 23,
            theQuestion: 'Tidak peka terhadap nyeri',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum23'
          },
          {
            formList: 4,
            numberList: 24,
            theQuestion: 'Terfokus atau sulit dialihkan dari objek atau topik tertentu',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum24'
          },
          {
            formList: 4,
            numberList: 25,
            theQuestion: 'Gerakan repetitive (stimming, flapping, atau menggoyang-goyangkan bagian badan)',
            option1: 'Tidak bermasalah',
            option2: 'sedikit bermasalah',
            option3: 'cukup bermasalah',
            option4: 'Sangat bermasalah',
            name: 'umum25'
          },
        ],
        answeredQ: 0,
        answeredQ1: 0,
        answeredQ2: 0,
        answeredQ3: 0,
        answeredQ4: 0,
        formActive: 1,
        submitBtn: false,
        kidLists: this.$store.getters.userKids || [],
        kids: {
          name: '',
          gender: [],
          birthday: Date
        }
      }
    },
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
      }
    },
    components: {
      questionList: Question,
      atecSidebar: Sidebar
    },
    methods: {
      valSelectedRadio(val) {
        console.log(val); // eslint-disable-line no-console
        this.answeredQ = document.querySelectorAll(".question-form-1 input[type='radio']:checked").length;
        if (this.answeredQ >= 52) {
          this.formActive = 4;
          this.answeredQ4 = this.answeredQ - 52;
          this.answeredQ3 = 18;
        } else if (this.answeredQ >= 34) {
          this.formActive = 3;
          this.answeredQ3 = this.answeredQ - 34;
          this.answeredQ2 = 20;
        } else if (this.answeredQ >= 14) {
          this.formActive = 2;
          this.answeredQ2 = this.answeredQ - 14;
          this.answeredQ1 = 14;
        } else {
          this.formActive = 1;
          this.answeredQ1 = this.answeredQ;
        }
      },
      onSubmitKids () {
        const token = this.$store.getters.token;
        const configData = {
          data: {
            id_user: this.user._id,
            name: this.kids.name,
            gender: this.kids.gender,
            birthday: this.kids.birthday
          }
        }
        const configHeader = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
        axios
          .post('/add-kid', configData.data, configHeader)
          .then(res => {
            if (res.data.status) {
              this.kidLists = res.data.data.kids;
              let existingUser = localStorage.getItem('user');
              existingUser = existingUser ? JSON.parse(existingUser) : {};
              existingUser['kids'] = res.data.data.kids;
              localStorage.setItem('user', JSON.stringify(existingUser));
            }
          })
          .catch(error => console.log(error)) // eslint-disable-line no-console
      },
      getAge (birthDate) {
        const today = new Date();
        birthDate = new Date(birthDate);
        let currentAge = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          currentAge--;
        }
        currentAge = currentAge > 0 ? currentAge : 0;
        return currentAge;
      }
    },
    watch: {
      answeredQ: function(val) {
        if (val >= this.formQuestion.length) {
          this.formActive = 0;
          this.submitBtn = true;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .card { height: auto; }
  .sticky-100 { position: sticky; top: 100px;}
  .scrollable-box {
    max-height: none;
    margin-bottom: 100px;
  }
  .header-question {
    cursor: pointer;
    color: green;
    &.disabled {
      color: darkgray;
      cursor: not-allowed;
    }
    &.active {
      cursor: pointer;
      color: mediumblue;
    }
  }
</style>
