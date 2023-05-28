// Escuchar mensajes del archivo popup.js y content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTranslation') {
    // Iniciar la traducción en tiempo real
    startTranslation(message.sourceLanguage, message.targetLanguage);
  } else if (message.action === 'stopTranslation') {
    // Detener la traducción en tiempo real
    stopTranslation();
  } else if (message.action === 'startTranscription') {
    // Iniciar la transcripción de la reunión
    startTranscription(message.email);
  } else if (message.action === 'stopTranscription') {
    // Detener la transcripción de la reunión
    stopTranscription();
  }
});

// Función para iniciar la traducción en tiempo real
function startTranslation(sourceLanguage, targetLanguage) {
  // Configurar el reconocimiento de voz
  const recognition = new webkitSpeechRecognition();
  recognition.lang = sourceLanguage;

  // Configurar el servicio de traducción
  const translator = new Translator();

  // Escuchar el audio de la videollamada y traducirlo en tiempo real
  recognition.onresult = function(event) {
    const speechResult = event.results[event.results.length - 1][0].transcript;
    const translatedText = translator.translate(speechResult, targetLanguage);

    // Mostrar los subtítulos en la interfaz de usuario
    // Implementa la lógica para mostrar los subtítulos en la interfaz de usuario
  };

  // Iniciar el reconocimiento de voz
  recognition.start();
}

// Función para detener la traducción en tiempo real
function stopTranslation() {
  // Detener el reconocimiento de voz
  recognition.stop();

  // Implementa la lógica necesaria para detener cualquier otro proceso relacionado con la traducción en tiempo real
}

// Función para iniciar la transcripción de la reunión
function startTranscription(email) {
  // Configurar el reconocimiento de voz
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';

  // Escuchar el audio de la videollamada y transcribirlo en tiempo real
  recognition.onresult = function(event) {
    const speechResult = event.results[event.results.length - 1][0].transcript;

    // Almacenar la transcripción
    // Implementa la lógica para almacenar la transcripción de la reunión
  };

  // Al finalizar la reunión, enviar la transcripción por correo electrónico
  recognition.onend = function() {
    const transcription = getTranscription(); // Implementa la lógica para obtener la transcripción
    sendEmail(email, transcription); // Implementa la lógica para enviar el correo electrónico
  };

  // Iniciar el reconocimiento de voz
  recognition.start();
}

// Función para detener la transcripción de la reunión
function stopTranscription() {
  // Detener el reconocimiento de voz
  recognition.stop();

  // Implementa la lógica necesaria para detener cualquier otro proceso relacionado con la transcripción de la reunión
}

// Función para enviar el correo electrónico con la transcripción
function sendEmail(email, transcription) {
  // Implementa la lógica necesaria para enviar el correo electrónico
  // Puedes utilizar bibliotecas como Nodemailer, SendGrid, etc.
}

// Clase para la traducción
class Translator {
  constructor() {
    // Configurar el servicio de traducción
    // Implementa la lógica necesaria para configurar el servicio de traducción
  }

  translate(text, targetLanguage) {
    // Implementa la lógica necesaria para traducir el texto al idioma objetivo
    // Puedes utilizar bibliotecas como Google Translate API, DeepL API, etc.
  }
}
