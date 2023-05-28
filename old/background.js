// Listener para recibir mensajes de content.js y popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "startRecognition") {
    // Envía un mensaje a content.js para iniciar el reconocimiento de voz con el idioma especificado
    chrome.tabs.sendMessage(sender.tab.id, { action: "startRecognition", language: request.language });
    
    // Envía una respuesta indicando que el reconocimiento se inició correctamente
    sendResponse({ success: true });
  } else if (request.action === "getStatus") {
    // Envía un mensaje a content.js para obtener el estado actual del reconocimiento de voz
    chrome.tabs.sendMessage(sender.tab.id, { action: "getStatus" }, function(response) {
      // Envía una respuesta con el estado actual del reconocimiento de voz
      sendResponse({ isRecognizing: response && response.isRecognizing });
    });
  } else if (request.action === "getSupportedLanguages") {
    // Define los idiomas admitidos por la extensión
    var supportedLanguages = ["es", "en", "pt", "it"];
    
    // Envía una respuesta con los idiomas admitidos
    sendResponse({ languages: supportedLanguages });
  }
  
  // Asegura que la conexión se mantenga abierta para enviar la respuesta asincrónicamente
  return true;
});