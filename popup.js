// Manejador de eventos para el botón de iniciar traducción
document.getElementById('startTranslation').addEventListener('click', startTranslation);

function startTranslation() {
  // Obtener idiomas de origen y destino seleccionados
  const sourceLanguage = document.getElementById('sourceLanguage').value;
  const targetLanguage = document.getElementById('targetLanguage').value;

  // Enviar un mensaje al archivo de fondo para iniciar la traducción
  chrome.runtime.sendMessage({ action: 'startTranslation', sourceLanguage, targetLanguage });
}

// Manejador de eventos para el botón de detener traducción
document.getElementById('stopTranslation').addEventListener('click', stopTranslation);

function stopTranslation() {
  // Enviar un mensaje al archivo de fondo para detener la traducción
  chrome.runtime.sendMessage({ action: 'stopTranslation' });
}

// Manejador de eventos para el botón de iniciar transcripción
document.getElementById('startTranscription').addEventListener('click', startTranscription);

function startTranscription() {
  // Obtener el correo electrónico ingresado
  const email = document.getElementById('emailInput').value;

  // Enviar un mensaje al archivo de fondo para iniciar la transcripción
  chrome.runtime.sendMessage({ action: 'startTranscription', email });
}

// Manejador de eventos para el botón de detener transcripción
document.getElementById('stopTranscription').addEventListener('click', stopTranscription);

function stopTranscription() {
  // Enviar un mensaje al archivo de fondo para detener la transcripción
  chrome.runtime.sendMessage({ action: 'stopTranscription' });
}
