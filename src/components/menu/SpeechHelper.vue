<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Speech Helper</h3>
        <div 
          class="btn btn-primary c-pointer" 
          data-toggle="collapse" 
          data-target="#collapseBox" 
          aria-expanded="false" 
          aria-controls="collapseBox">
            Klik untuk menulis sendiri
          </div>
      </div>
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-12">
            <div id="collapseBox" class="text-box collapse">
              <div id="close" class="close-box d-none">&times;</div>
              <div class="text-left">
                <h3>Pilih bahasa</h3>
                <select 
                  id="voices" 
                  v-model="speech.selectedLang"
                  @change="setVoice()">
                  <template v-for="(voice, idx) in voices">
                    <option 
                      :key="idx"
                      :value="voice.name">
                      {{voice.name}} - {{voice.lang}}
                    </option>
                  </template>
                </select>
              </div>
              <div class="form-group">
                <textarea 
                  id="text" 
                  v-model="speech.textarea"
                  class="form-control mt-3" 
                  placeholder="Tulis kalimat yang ingin disuarakan"
                  rows="3">
                </textarea>
              </div>
              <button 
                class="btn btn-block btn-warning" 
                @click="speakText(speech.textarea)"
                id="read">
                Bunyikan
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-4 justify-content-center">
          <div v-for="(list, idx) in dataLIst" :key="idx" class="col-sm-3 mb-3">
            <div @click="speakText(list.text)" class="card c-pointer">
              <div class="card-body">
                <h5 class="card-title">{{list.text}}</h5>
                <div class="box-img">
                  <img :src="require(`../../assets/speech-activity/${list.src}.jpg`)" :alt="list.text">
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dataLIst: [
          {
            src: 'minum',
            text: "Aku haus, aku mau minum"
          },
          {
            src: 'makan',
            text: "Aku lapar, aku mau makan"
          },
          {
            src: 'bermain',
            text: 'Aku mau bermain'
          },
          {
            src: 'tidur',
            text: 'Aku capek, aku mau bobok'
          },
          {
            src: 'senang',
            text: "Aku senang, aku tertawa"
          },
          {
            src: 'senyum',
            text: "Aku senang, aku senyum"
          },
          {
            src: 'marah',
            text: "Aku kesal, aku marah"
          },
          {
            src: 'sedih',
            text: "Aku sedih, aku menangis"
          },
          {
            src: 'berjalan',
            text: 'Aku bosan, aku mau jalan jalan'
          },
          {
            src: 'bersepeda',
            text: 'Aku mau naik sepeda'
          },
          {
            src: 'belajar',
            text: 'Aku mau belajar'
          },
          {
            src: 'menulis',
            text: 'Aku mau menulis'
          },
          {
            src: 'membaca',
            text: 'Aku mau baca buku'
          },
        ],
        voices: [],
        message: new SpeechSynthesisUtterance(),
        speech: {
          textarea: '',
          selectedLang: 'Google Bahasa Indonesia',
        }
      }
    },
    methods: {
      // get option language to speech
      getVoices() {
        const allVoices = speechSynthesis.getVoices();

        if (allVoices.length) {
          // sort option language for only 4 languages
          const _this = this;
          allVoices.map(x => {
            if (x.lang === 'en-US' || x.lang === 'id-ID' || x.lang === 'en-GB') {
              _this.voices.push(x);
            }
          })
        }
        this.message.voice = this.voices.find(voice => voice.name === this.speech.selectedLang);
      },
      // init default language as bahasa
      initDefaultVoices() {
        const runInterval = setInterval(() => {
          this.getVoices();
          if (this.voices.length) {
            // stop spinner loading option languages
            clearInterval(runInterval);
          }
        }, 3000);
      },
      // call this function to speak some text param
      speakText(text){
        this.message.text = text;
        speechSynthesis.speak(this.message);
      },
      // on change language options, run this function
      setVoice() {
        this.message.voice = this.voices.find(voice => voice.name === this.speech.selectedLang);
      },
      // to get dynamic image
      getImgUrl(pet) {
        const images = require.context('../../assets/', false, /\.jpg$/);
        return images('./' + pet + ".png");
      }      
    },
    mounted() {
      // run spinner loading while waiting on option languages
      this.initDefaultVoices();
    }
  }
</script>
<style lang="scss" scoped>
  .text-box {
    background-color: #5d5c5c;
    max-width: 680px;
    margin: 20px auto 0;
    padding: 12px 16px;
    color: white;
    border-radius: 4px;
    position: relative;
    .close-box {
      position: absolute;
      right: 10px;
      top: 5px;
      font-size: 24px;
      line-height: 26px;
      color: white;
      font-weight: 700;
      cursor: pointer;      
    }
  }
  .card {
    .card-body {
      border: 3px;
      transition: all .4s;
      -webkit-transition: all .4s;
      -moz-transition: all .4s;
      &:hover {
        background-color: black;
        color: white;
      }
    }
    .box-img {
      img {
        height: auto;
        width: 100%;
      }
    }
  }
</style>
