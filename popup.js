// Accede al elemento del selector de idioma en el archivo popup.html
const languageSelect = document.getElementById('language-select');

// Listener para el evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function() {
  // Envía un mensaje a background.js para obtener los idiomas admitidos por la extensión
  chrome.runtime.sendMessage({ action: "getSupportedLanguages" }, function(response) {
    // Obtiene los idiomas admitidos de la respuesta
    const supportedLanguages = response.languages;
    
    // Recorre los idiomas admitidos y crea una opción para cada uno en el selector de idioma
    supportedLanguages.forEach(function(language) {
      const option = document.createElement('option');
      option.value = language;
      option.text = getLanguageName(language);
      languageSelect.appendChild(option);
    });
  });
  
  // Listener para el evento 'change' del selector de idioma
  languageSelect.addEventListener('change', function() {
    const selectedLanguage = languageSelect.value;
    
    // Envía un mensaje a background.js para iniciar el reconocimiento de voz con el idioma seleccionado
    chrome.runtime.sendMessage({ action: "startRecognition", language: selectedLanguage }, function(response) {
      if (response.success) {
        console.log("Reconocimiento de voz iniciado en el idioma:", selectedLanguage);
      }
    });
  });
  
  // Envía un mensaje a background.js para obtener el estado actual del reconocimiento de voz
  chrome.runtime.sendMessage({ action: "getStatus" }, function(response) {
    const isRecognizing = response.isRecognizing;
    
    // Actualiza el estado del botón en función del estado del reconocimiento de voz
    updateButtonState(isRecognizing);
  });
});

function updateButtonState(isRecognizing) {
  const startButton = document.getElementById('start-button');
  const stopButton = document.getElementById('stop-button');
  
  if (isRecognizing) {
    startButton.disabled = true;
    stopButton.disabled = false;
  } else {
    startButton.disabled = false;
    stopButton.disabled = true;
  }
}

function getLanguageName(language) {
  // Lógica para obtener el nombre legible del idioma basado en su código
  // Por ejemplo, para el código 'es', se puede devolver 'Español'
  // Implementa esta lógica según tus necesidades
  switch (language) {
    case 'es':
      return 'Español';
    case 'en':
      return 'English';
    case 'pt':
      return 'Português';
    case 'it':
      return 'Italiano';
    default:
      return '';
  }
}
