document.addEventListener("DOMContentLoaded", function() {
  var startButton = document.getElementById("startButton");
  var languageSelect = document.getElementById("languageSelect");
  var statusText = document.getElementById("statusText");

  startButton.addEventListener("click", function() {
    var selectedLanguage = languageSelect.value;
    startRecognition(selectedLanguage);
  });

  function startRecognition(language) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { action: "startRecognition", language: language }, function(response) {
        if (response && response.success) {
          statusText.textContent = "Reconocimiento iniciado";
        } else {
          statusText.textContent = "Error al iniciar el reconocimiento";
        }
      });
    });
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { action: "getStatus" }, function(response) {
      if (response && response.isRecognizing) {
        statusText.textContent = "Reconocimiento en curso";
      } else {
        statusText.textContent = "Desactivado";
      }
    });
  });
});