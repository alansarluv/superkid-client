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
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <h5 class="mb-2">
                        Nama anak : 
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
                      <input type="hidden" name="kidName" value="<%= kids[0].name %>">
                      <h5 class="mb-2 mt-4">Pilih Bulan dan Tahun laporan ATEC</h5>
                      <div class="row">
                        <div class="col-md-12 col-lg-6">
                          <select v-model="atec.month" class="form-control">
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
                          <select v-model="atec.year" class="form-control">
                            <option disabled value="">Pilih satu</option>
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
                  <a @click="selectAllFirst()">check all</a>
                  <p 
                    class="header-question"
                    :class="{
                      active: (formActive === 1)
                    }"
                    @click="formActive = 1"
                  >
                    <!-- class active only if formActive = 1 -->
                    Form 1 - Kemampuan Bicara/Berbahasa ( {{atec.bicaraTotalLength}} / 14) 
                    <i class="fa fa-check-square-o" aria-hidden="true"></i>
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
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara1'
          },
          {
            formList: 1,
            numberList: 2,
            theQuestion: 'Merespon pada "tidak" atau "stop"',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara2'
          },
          {
            formList: 1,
            numberList: 3,
            theQuestion: 'Dapat mengikuti perintah"',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara3'
          },
          {
            formList: 1,
            numberList: 4,
            theQuestion: 'Dapat menggunakan 1 kata (Tidak!, makan, air, dll)',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara4'
          },
          {
            formList: 1,
            numberList: 5,
            theQuestion: 'Dapat menggunakan 2 kata sekaligus bersamaan (Tidak mau!, mau makan, minta itu, dll)',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara5'
          },
          {
            formList: 1,
            numberList: 6,
            theQuestion: 'Dapat menggunakan 3 kata sekaligus (Mau minum susu, dll)',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara6'
          },
          {
            formList: 1,
            numberList: 7,
            theQuestion: 'Mengetahui 10 kata atau lebih',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara7'
          },
          {
            formList: 1,
            numberList: 8,
            theQuestion: 'Dapat membuat kalimat yang berisi 4 kata atau lebih',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara8'
          },
          {
            formList: 1,
            numberList: 9,
            theQuestion: 'Mampu menjelaskan apa yang dia inginkan',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara9'
          },
          {
            formList: 1,
            numberList: 10,
            theQuestion: 'Mampu menanyakan pertanyaan yang bermakna',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara10'
          },
          {
            formList: 1,
            numberList: 11,
            theQuestion: 'Isi pembicaraan cenderung relevan atau bermakna',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara11'
          },
          {
            formList: 1,
            numberList: 12,
            theQuestion: 'Sering menggunakan kalimat kalimat yang berurutan',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara12'
          },
          {
            formList: 1,
            numberList: 13,
            theQuestion: 'Bisa mengikuti pembicaraan dengan cukup baik',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara13'
          },
          {
            formList: 1,
            numberList: 14,
            theQuestion: 'Memiliki kemampuan bicara / berbahasa yang sesuai dengan seusianya',
            option: ['Tidak benar', 'Agak benar', 'Sangat benar'],
            val: ['tb', 'ab', 'sb'],
            name: 'bicara14'
          },
          {
            formList: 2,
            numberList: 1,
            theQuestion: 'Terlihat seperti berada dalam tempurung (anda tdk dapat menjangkaunya)',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial1'
          },
          {
            formList: 2,
            numberList: 2,
            theQuestion: 'Mengabaikan orang lain',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial2'
          },
          {
            formList: 2,
            numberList: 3,
            theQuestion: 'Ketika dipanggil, hanya sedikit atau malah tidak memperhatikan',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial3'
          },
          {
            formList: 2,
            numberList: 4,
            theQuestion: 'Tidak kooperatif dan menolak',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial4'
          },
          {
            formList: 2,
            numberList: 5,
            theQuestion: 'Tidak ada kontak mata',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial5'
          },
          {
            formList: 2,
            numberList: 6,
            theQuestion: 'Lebih suka menyendiri',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial6'
          },
          {
            formList: 2,
            numberList: 7,
            theQuestion: 'Tidak menunjukan rasa kasih sayang',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial7'
          },
          {
            formList: 2,
            numberList: 8,
            theQuestion: 'Tidak mampu menyapa orang tua',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial8'
          },
          {
            formList: 2,
            numberList: 9,
            theQuestion: 'Menghindari kontak dengan orang lain',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial9'
          },
          {
            formList: 2,
            numberList: 10,
            theQuestion: 'Tidak mampu menirukan orang lain',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial10'
          },
          {
            formList: 2,
            numberList: 11,
            theQuestion: 'Tidak suka dipegang atau dipeluk',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial11'
          },
          {
            formList: 2,
            numberList: 12,
            theQuestion: 'Tidak mau berbagi atau menunjukan',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial12'
          },
          {
            formList: 2,
            numberList: 13,
            theQuestion: 'Tidak bisa melambaikan tangan (da... dah...)',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial13'
          },
          {
            formList: 2,
            numberList: 14,
            theQuestion: 'Sering tidak setuju / menolak',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial14'
          },
          {
            formList: 2,
            numberList: 15,
            theQuestion: 'Tantrum, marah marah',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial15'
          },
          {
            formList: 2,
            numberList: 16,
            theQuestion: 'Tidak mempunyai teman',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial16'
          },
          {
            formList: 2,
            numberList: 17,
            theQuestion: 'Jarang tersenyum',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial17'
          },
          {
            formList: 2,
            numberList: 18,
            theQuestion: 'Tidak peka terhadap perasaan orang lain',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial18'
          },
          {
            formList: 2,
            numberList: 19,
            theQuestion: 'Acuh tak acuh ketika disukai orang lain',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial19'
          },
          {
            formList: 2,
            numberList: 20,
            theQuestion: 'Acuh tak acuh ketika ditinggal pergi oleh orang tuanya',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sosial20'
          },
          {
            formList: 3,
            numberList: 1,
            theQuestion: 'Merespon saat dipanggil namanya',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik1'
          },
          {
            formList: 3,
            numberList: 2,
            theQuestion: 'Merespon saat dipuji',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik2'
          },
          {
            formList: 3,
            numberList: 3,
            theQuestion: 'Melihat pada orang dan binatang',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik3'
          },
          {
            formList: 3,
            numberList: 4,
            theQuestion: 'Melihat pada gambar (dan TV)',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik4'
          },
          {
            formList: 3,
            numberList: 5,
            theQuestion: 'Menggambar, mewarnai, dan melakukan kesenian',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik5'
          },
          {
            formList: 3,
            numberList: 6,
            theQuestion: 'Bermain dengan mainannya secara sesuai',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik6'
          },
          {
            formList: 3,
            numberList: 7,
            theQuestion: 'Menggunakan ekspresi wajah yang sesuai',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik7'
          },
          {
            formList: 3,
            numberList: 8,
            theQuestion: 'Memahami cerita yang ditayangkan di TV',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik8'
          },
          {
            formList: 3,
            numberList: 9,
            theQuestion: 'Memahami penjelasan',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik9'
          },
          {
            formList: 3,
            numberList: 10,
            theQuestion: 'Sadar akan lingkungannya',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik10'
          },
          {
            formList: 3,
            numberList: 11,
            theQuestion: 'Sadar akan bahaya',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik11'
          },
          {
            formList: 3,
            numberList: 12,
            theQuestion: 'Mampu berimajinasi',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik12'
          },
          {
            formList: 3,
            numberList: 13,
            theQuestion: 'Memulai aktivitas',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik13'
          },
          {
            formList: 3,
            numberList: 14,
            theQuestion: 'Mampu berpakaian sendiri',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik14'
          },
          {
            formList: 3,
            numberList: 15,
            theQuestion: 'Memiliki rasa penasaran dan ketertarikan',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik15'
          },
          {
            formList: 3,
            numberList: 16,
            theQuestion: 'Suka tantangan, senang mengeksplorasi',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik16'
          },
          {
            formList: 3,
            numberList: 17,
            theQuestion: 'Tampak selaras, tidak tampak kosong',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik17'
          },
          {
            formList: 3,
            numberList: 18,
            theQuestion: 'Mampu mengikuti pandangan ke arah semua orang memandang',
            option: ['Tidak cocok', 'Agak cocok', 'Sangat cocok'],
            val: ['tc', 'ac', 'sc'],
            name: 'sensorik18'
          },
          {
            formList: 4,
            numberList: 1,
            theQuestion: 'Mengompol saat tidur',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum1'
          },
          {
            formList: 4,
            numberList: 2,
            theQuestion: 'Mengompol di celana / popok',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum2'
          },
          {
            formList: 4,
            numberList: 3,
            theQuestion: 'Buang air besar di celana / popok',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum3'
          },
          {
            formList: 4,
            numberList: 4,
            theQuestion: 'Diare',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum4'
          },
          {
            formList: 4,
            numberList: 5,
            theQuestion: 'Konstipasi / sembelit',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum5'
          },
          {
            formList: 4,
            numberList: 6,
            theQuestion: 'Gangguan tidur',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum6'
          },
          {
            formList: 4,
            numberList: 7,
            theQuestion: 'Makan terlalu banyak / terlalu sedikit',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum7'
          },
          {
            formList: 4,
            numberList: 8,
            theQuestion: 'Pilihan makanan yang diinginkan sangat terbatas',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum8'
          },
          {
            formList: 4,
            numberList: 9,
            theQuestion: 'Hiperaktif',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum9'
          },
          {
            formList: 4,
            numberList: 10,
            theQuestion: 'Letargi, lemah lesu',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum10'
          },
          {
            formList: 4,
            numberList: 11,
            theQuestion: 'Memukul atau melukai diri sendiri',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum11'
          },
          {
            formList: 4,
            numberList: 12,
            theQuestion: 'Memukul atau melukai orang lain',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum12'
          },
          {
            formList: 4,
            numberList: 13,
            theQuestion: 'Destruktif',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum13'
          },
          {
            formList: 4,
            numberList: 14,
            theQuestion: 'Sensitif terhadap suara',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum14'
          },
          {
            formList: 4,
            numberList: 15,
            theQuestion: 'Cemas / penuh ketakutan',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum15'
          },
          {
            formList: 4,
            numberList: 16,
            theQuestion: 'Tidak senang / mudah rewel / menangis',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum16'
          },
          {
            formList: 4,
            numberList: 17,
            theQuestion: 'Kejang',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum17'
          },
          {
            formList: 4,
            numberList: 18,
            theQuestion: 'Bicara secara obsesif',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum18'
          },
          {
            formList: 4,
            numberList: 19,
            theQuestion: 'Kaku terhadap rutinitas',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum19'
          },
          {
            formList: 4,
            numberList: 20,
            theQuestion: 'Berteriak / menjerit-jerit',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum20'
          },
          {
            formList: 4,
            numberList: 21,
            theQuestion: 'Menuntut hal atau cara yang sama berulang-ulang',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum21'
          },
          {
            formList: 4,
            numberList: 22,
            theQuestion: 'Sering gelisah / agitasi',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum22'
          },
          {
            formList: 4,
            numberList: 23,
            theQuestion: 'Tidak peka terhadap nyeri',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum23'
          },
          {
            formList: 4,
            numberList: 24,
            theQuestion: 'Terfokus atau sulit dialihkan dari objek atau topik tertentu',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum24'
          },
          {
            formList: 4,
            numberList: 25,
            theQuestion: 'Gerakan repetitive (stimming, flapping, atau menggoyang-goyangkan bagian badan)',
            option: ['Tidak bermasalah', 'Sedikit bermasalah', 'Cukup bermasalah', 'Sangat bermasalah'],
            val: ['tb', 'sb', 'cb', 'vb'],
            name: 'umum25'
          },
        ],
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
        token: this.$store.getters.token
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
      onSubmitAtec () {
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
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        }
        axios
          .post('/atec/create', configData.data, configHeader)
          .then(res => {
            console.log('res :' ,res); // eslint-disable-line no-console
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
      pointer-events: none;
    }
    &.active {
      cursor: pointer;
      color: mediumblue;
    }
  }
</style>
