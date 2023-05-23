chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startSubtitling") {
      chrome.tabCapture.capture({ audio: true }, function(stream) {
        var audioContext = new AudioContext();
        var source = audioContext.createMediaStreamSource(stream);
        var scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
        var recognitionMap = {};
  
        scriptProcessor.onaudioprocess = function(event) {
          var audioData = event.inputBuffer.getChannelData(0);
          // Aquí puedes enviar los datos de audio para la transcripción de voz a texto
        };
  
        source.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
  
        var languages = ["es", "en-US", "pt-BR", "it-IT"]; // Idiomas admitidos
  
        // Inicializa los objetos de reconocimiento de voz para cada idioma
        languages.forEach(function(language) {
          var recognition = new webkitSpeechRecognition();
          recognition.lang = language;
          recognition.continuous = true;
          recognition.interimResults = true;
  
          recognition.onresult = function(event) {
            var transcript = "";
            for (var i = event.resultIndex; i < event.results.length; i++) {
              if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
              }
            }
  
            // Aquí puedes enviar el texto transrito para mostrar los subtítulos en la página web
          };
  
          recognition.onerror = function(event) {
            console.error("Error de reconocimiento de voz:", event.error);
          };
  
          recognition.onend = function() {
            console.log("Reconocimiento de voz finalizado");
          };
  
          recognitionMap[language] = recognition;
        });
  
        // Función para iniciar el reconocimiento de voz en un idioma específico
        function startRecognition(language) {
          var recognition = recognitionMap[language];
          if (recognition) {
            recognition.start();
          }
        }
  
        // Envía mensajes al script de contenido para iniciar el reconocimiento en diferentes idiomas
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          var activeTabId = tabs[0].id;
          languages.forEach(function(language) {
            chrome.tabs.sendMessage(activeTabId, { action: "startRecognition", language: language });
          });
        });
      });
    }
  });