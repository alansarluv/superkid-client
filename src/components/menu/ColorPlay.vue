<template>
  <div class="container-fluid bgColorCustom" :style="{ backgroundColor: selectedColor }">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Sebut Warna</h3>
        <div @click="startGame" class="btn btn-primary c-pointer btnTrigger">Click disini untuk mulai</div>
        <div class="mt-5">
          <p class="hints"></p>
        </div>
        <div class="mt-6">
          <p v-if="transcript.length">Kamu menyebutkan warna {{transcript}}</p>
        </div>
        <div class="mt-6">
          <p>{{hints}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;  // eslint-disable-line no-undef

  export default {
    data() {
      return {
        listWarna:
        [
          'merah', 'hijau', 'biru', 'kuning', 'orange', 'ungu', 'pink',
          'kelabu', 'coklat', 'abu-abu', 'putih', 'hitam', 'jingga'
        ],
        colorList:
        [
          'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink',
          'grey', 'chocolate', 'grey', 'white', 'black', 'orange'
        ],

        recognition: new SpeechRecognition(),
        hints: '',
        transcript: '',
        confidence: 0,
        selectedColor: 'white'
      }
    },
    methods: {
      configSetup(){
        this.recognition.continuous = false;
        this.recognition.lang = 'id-ID';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
      },
      startGame(){
        this.recognition.start();
        this.hints = "Sebutkan warna apa saja";
        this.transcript = "";

        const _this = this;
        this.recognition.onresult = function(event) {
          _this.result(event);
        }
        this.recognition.onspeechend = function() {
          _this.hints = "";
          _this.recognition.stop();
        }

        this.recognition.onerror = function(event) {
          this.hints = 'Error occurred in recognition: ' + event.error;
        }
      },
      result(event){
        const rec = event.results[0][0].transcript;
        this.confidence = event.results[0][0].confidence;

        this.transcript = rec.toLocaleLowerCase();
        console.log("you said : " + this.transcript);           // eslint-disable-line no-console
        console.log("convidence level : " + this.confidence);   // eslint-disable-line no-console

        if (this.listWarna.includes(this.transcript)){
          this.selectedColor = this.colorList[this.listWarna.indexOf(this.transcript)];
        } else {
          this.hints = `Kami belum punya warna ${this.transcript}`
        }
      }
    },
    mounted(){
      this.configSetup();
    }
  }
</script>
<style lang="scss">
  .bgColorCustom {
    min-height: 100vh;
  }
</style>