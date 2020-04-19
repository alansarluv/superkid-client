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
                <img :src="list.src" :alt="list.text">
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
            src: '../../assets/speech-activity/minum.jpg',
            text: "Aku haus, aku mau minum"
          },
          {
            src: '../../assets/speech-activity/makan.jpg',
            text: "Aku lapar, aku mau makan"
          },
          {
            src: '../../assets/speech-activity/senang.jpg',
            text: "Aku capek"
          },
          {
            src: '../../assets/speech-activity/senang.jpg',
            text: "Aku sakit"
          },
          {
            src: '../../assets/speech-activity/senang.jpg',
            text: "Aku senang"
          },
          {
            src: '../../assets/speech-activity/marah.jpg',
            text: "Aku marah"
          },
          {
            src: '../../assets/speech-activity/sedih.jpg',
            text: "Aku sedih"
          },
          {
            src: '../../assets/speech-activity/takut.jpg',
            text: "Aku takut"
          },
          {
            src: '../../assets/speech-activity/berjalan.jpg',
            text: 'Aku mau jalan jalan'
          },
          {
            src: '../../assets/speech-activity/pulang.jpg',
            text: 'Aku mau pulang'
          },
          {
            src: '../../assets/speech-activity/sekolah.jpg',
            text: 'Aku mau ke sekolah'
          },
          {
            src: '../../assets/speech-activity/bermain.jpg',
            text: 'Aku mau bermain'
          }
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
</style>
