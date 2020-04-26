<template>
  <div class="container-fluid bgColorCustom" :style="{ backgroundColor: selectedColor }">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Sebut Warna</h3>
        <div
          @click="startGame"
          class="circle-time c-pointer btnTrigger"
        >
          <span>{{circleText}}</span>
        </div>
        <div
          class="layer-border"
          :style="{background: `conic-gradient( #000 0%, #000 ${tic}%, #55b7a4 0%, #4ca493 40%, #336d62 60%, #2a5b52 100% )` }"
        ></div>
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
        selectedColor: 'white',
        tic: 0
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
        // start speech recognition service, this will 
        this.recognition.start();
        this.hints = "Sebutkan warna apa saja";
        this.transcript = "";
        const _this = this;

        const timeInterval = setInterval(() => {
          _this.tic += 12.5
        }, 1000);

        setTimeout(function(){ 
          clearInterval(timeInterval);
          _this.tic = 0
        }, 8000);

        // onresult will fired once a successful result is received
        this.recognition.onresult = function(event) {
          _this.result(event);
          clearInterval(timeInterval);
          _this.tic = 0
        }

        // once a single word has been recognised and it has finished being spoken,
        // this handler is fired to stop the speech recognition service from running.
        this.recognition.onspeechend = function() {
          _this.hints = "";
          clearInterval(timeInterval);
          _this.tic = 0
          _this.recognition.stop();
        }
        // supposed to handle cases where speech was recognised an error occured
        // after 8s in silence, this function would be trigered
        this.recognition.onerror = function(event) {
          clearInterval(timeInterval);
          _this.tic = 0
          let errorText = event.error;
          if (event.error === "no-speech") errorText = "Tidak ada suara"
          _this.hints = 'Terjadi kesalahan : ' + errorText;
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
    computed: {
      circleText: function(){
        if (this.tic) {
          return ((100 - this.tic) / 12.5)
        } else {
          return "Klik disini untuk mulai"
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
  .circle-time {
    width: 250px;
    height: 250px;
    z-index: 2;
    border-radius: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: black;
    color: white;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    
    span {
      position: absolute;
      width: 100%;
      text-align: center;      
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
    }
  }
  .layer-border {
    width: 270px;
    height: 270px;
    border-radius: 50%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transition: all .4s;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;

  }  
</style>