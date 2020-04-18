<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Speech text reader</h3>
        <div 
          class="btn btn-primary" 
          data-toggle="collapse" 
          data-target="#collapseBox" 
          aria-expanded="false" 
          @click="getVoices()"
          aria-controls="collapseBox">
            Click untuk tampilkan box
          </div>
        <div id="collapseBox" class="card text-box collapse">
          <div id="close" class="close-box">&times;</div>
          <div class="text-left">
            <h3>Pilih bahasa</h3>
            <select 
              id="voices" 
              v-model="speech.selectedLang"
              @change="setVoice()">
              <option 
                v-for="(voice, idx) in voices" 
                :key="idx"
                :value="voice.name">
                {{voice.name}} - {{voice.lang}}
              </option>
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
            @click="readText()"
            id="read">
            Bunyikan
          </button>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="row mt-4 justify-content-center">
          <div v-for="(list, idx) in dataLIst" :key="idx" class="col-sm-3 mb-3">
            <div @click="speakText(list.text)" class="card c-pointer">
              <div class="card-body">
                <h5 class="card-title">{{list.text}}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
            image: './img/haus.jpg',
            text: "Aku haus, aku mau minum"
          },
          {
            image: './img/makan.jpg',
            text: "Aku lapar, aku mau makan"
          },
          {
            image: './img/capek.jpg',
            text: "Aku capek"
          },
          {
            image: './img/hurt.jpg',
            text: "Aku sakisakitt"
          },
          {
            image: './img/senang.jpg',
            text: "Aku senang"
          },
          {
            image: './img/marah.jpg',
            text: "Aku marah"
          },
          {
            image: './img/sedih.jpg',
            text: "Aku sedih"
          },
          {
            image: './img/takut.jpg',
            text: "Aku takut"
          },
          {
            image: './img/jalanjalan.jpg',
            text: 'Aku mau jalan jalan'
          },
          {
            image: './img/pulang.jpg',
            text: 'Aku mau pulang'
          },
          {
            image: './img/sekolah.jpg',
            text: 'Aku mau ke sekolah'
          },
          {
            image: './img/bermain.jpg',
            text: 'Aku mau bermain'
          }
        ],
        voices: [
          {
            val: 'Google Bahasa Indonesia',
            name: 'Bahasa Indonesia'
          },
          {
            val: 'Google US English',
            name: 'US English'
          },
          {
            val: 'Google UK English Female',
            name: 'UK English Female'
          },
          {
            val: 'Google UK English Male',
            name: 'UK English Male'
          }
        ],
        message: new SpeechSynthesisUtterance(),
        speech: {
          textarea: '',
          selectedLang: 'Google Bahasa Indonesia',
        }
      }
    },
    methods: {
      getVoices() {
        this.voices = speechSynthesis.getVoices();
        this.message.voice = this.voices.find(voice => voice.name === this.speech.selectedLang);
      },
      readText() {
        this.message.text = this.speech.textarea;
        speechSynthesis.speak(this.message);
      },
      speakText(text){
        this.message.text = text;
        speechSynthesis.speak(this.message);
      },
      setVoice() {
        this.message.voice = this.voices.find(voice => voice.name === this.speech.selectedLang);
      }
    },
    mounted() {
      this.getVoices();
    }
  }
</script>
<style lang="scss" scoped>
  .text-box {
    background-color: #5d5c5c;
    max-width: 680px;
    margin: 20px auto 0;
    padding: 12px 16px;
    height: 270px;
    color: white;
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
