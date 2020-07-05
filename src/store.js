import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: localStorage.getItem('access_token') || null,
    configHeader: {
      'Authorization': `Bearer ${localStorage.getItem('access_token') || null}`,
      // 'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
    },
    userId: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    monthNames : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    listQuestion : [
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
    isSubmit: false
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.user = userData.user
    },
    storeUser (state, user) {
      state.user = user
    },
    isSubmit (state, data) {
      state.isSubmit = data
    }
  },
  actions: {
    signup ({commit}, authData) {  // eslint-disable-line no-unused-vars
      axios
        .post('/register', {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          if (res.status) {
            window.location = '/login';
          }
        })
        .catch(error => console.log(error)) // eslint-disable-line no-console
    },
    login ({commit}, authData) {
      axios 
        .post('/login', {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          commit('authUser', {
            token: res.data.token,
            userId: res.data.user._id,
            user: res.data.user
          })
          commit('isSubmit', false)
          localStorage.setItem('access_token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          if (res.data.token !== null) {
            window.location = '/atec';
          }
        })
        .catch(error => {
          commit('isSubmit', false)
          console.log(error); // eslint-disable-line no-console
        }) 
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userKids (state) {
      if (state.user !== null) {        
        return state.user.kids;
      } else {
        return [];
      }
    },
    userEmail (state) {
      if (state.user !== null) {
        const userName = state.user.email.split('@');
        return userName[0];
      } else {
        return "";
      }
    },
    isAuth (state) {
      return state.user !== null ? true : false
    },
    token (state) {
      return state.idToken
    },
    monthNames (state) {
      return state.monthNames;
    },
    configHeader (state) {
      return state.configHeader;
    },
    getQuestion (state) {
      return state.listQuestion;
    },
    isSubmit (state) {
      return state.isSubmit;
    }
  }
})