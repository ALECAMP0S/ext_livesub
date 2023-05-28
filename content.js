// Escuchar mensajes del archivo de fondo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'translateText') {
    // Realizar traducción del texto recibido
    const translatedText = translateText(message.text, message.sourceLanguage, message.targetLanguage);

    // Enviar la traducción al archivo de fondo
    sendResponse({ translatedText });
  }
});

// Función para realizar la traducción del texto
function translateText(text, sourceLanguage, targetLanguage) {
  // Utilizar la biblioteca o servicio de traducción que elijas para realizar la traducción
  // Implementa la lógica necesaria aquí

  // Ejemplo: Utilizando la API de Google Translate
  const apiKey = 'TU_API_KEY';
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  // Realizar la solicitud de traducción
  // Implementa la lógica necesaria aquí

  return translatedText;
}
