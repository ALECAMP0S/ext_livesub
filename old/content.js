// Listener para recibir mensajes de background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "startRecognition") {
    startRecognition(request.language);
    sendResponse({ success: true });
  } else if (request.action === "getStatus") {
    var isRecognizing = checkRecognitionStatus();
    sendResponse({ isRecognizing: isRecognizing });
  }
});

function startRecognition(language) {
  // Lógica para iniciar el reconocimiento de voz en el idioma especificado
  console.log("Reconocimiento de voz iniciado en el idioma:", language);
}

function checkRecognitionStatus() {
  // Lógica para verificar el estado actual del reconocimiento de voz
  var isRecognizing = false; // Cambiar según la lógica de tu extensión
  return isRecognizing;
}
