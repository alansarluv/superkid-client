<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Sebut Warna</h3>
        <div
          class="btn btn-primary c-pointer btnColor"
        >
          Warna putih
        </div>
        <div class="mt-5">
          <p class="hints"></p>
        </div>
        <div class="mt-6">
          <p class="output"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;  // eslint-disable-line no-undef

  var listWarna = ['merah', 'hijau', 'biru', 'kuning', 'orange', 'ungu', 'pink', 'kelabu', 'abu-abu', 'putih', 'hitam', 'jingga'];
  var colorList = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'grey', 'grey', 'white', 'black', 'orange'];

  var recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'id-ID';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  var diagnostic = document.querySelector('.output');
  var bg = document.querySelector('html');
  
  document.body.onclick = function() {
    recognition.start();
    console.log('Ready to receive a color command.'); // eslint-disable-line no-console
  }

  recognition.onresult = function(event) {
    var selectedColor = document.querySelector('.btnColor');
    var color = event.results[0][0].transcript;
    color = color.toLocaleLowerCase();
    
    selectedColor.innerText = "warna "+ color;
    var indexArr = 0;
    if (listWarna.includes(color)){
      indexArr = listWarna.indexOf(color);
    }

    bg.style.backgroundColor = colorList[indexArr];
    console.log('Confidence: ' + event.results[0][0].confidence); // eslint-disable-line no-console
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onnomatch = function(event) { // eslint-disable-line no-unused-vars
    diagnostic.textContent = "I didn't recognise that color.";
  }

  recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  }
</script>