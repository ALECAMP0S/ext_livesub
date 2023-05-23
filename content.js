chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "startRecognition") {
    var language = request.language;
    startRecognition(language);
  }
});

function startRecognition(language) {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = language;
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = function(event) {
    var transcript = "";
    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcript += event.results[i][0].transcript;
      } else {
        // Envia el texto transitorio para mostrar los subtítulos en la página web
        sendSubtitle(event.results[i][0].transcript);
      }
    }
  };

  recognition.onerror = function(event) {
    console.error("Error de reconocimiento de voz:", event.error);
  };

  recognition.onend = function() {
    console.log("Reconocimiento de voz finalizado");
  };

  recognition.start();
}

function sendSubtitle(text) {
  // Crea un elemento <div> para mostrar el subtítulo
  var subtitleDiv = document.createElement("div");
  subtitleDiv.innerText = text;
  subtitleDiv.style.position = "fixed";
  subtitleDiv.style.bottom = "10px";
  subtitleDiv.style.left = "10px";
  subtitleDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  subtitleDiv.style.color = "white";
  subtitleDiv.style.padding = "5px";
  subtitleDiv.style.fontFamily = "Arial, sans-serif";
  subtitleDiv.style.fontSize = "14px";

  // Elimina el subtítulo después de 3 segundos
  setTimeout(function() {
    subtitleDiv.remove();
  }, 3000);

  // Agrega el subtítulo al cuerpo de la página web
  document.body.appendChild(subtitleDiv);
}