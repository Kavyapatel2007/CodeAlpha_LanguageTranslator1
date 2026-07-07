const sourceText = document.getElementById("sourceText");
const outputText = document.getElementById("outputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");
const charCount = document.getElementById("charCount");
const statusMsg = document.getElementById("statusMsg");

let lastTranslation = "";

// Live character counter
sourceText.addEventListener("input", () => {
  charCount.textContent = `${sourceText.value.length} / 2000`;
});

// Swap source/target languages
swapBtn.addEventListener("click", () => {
  if (sourceLang.value === "auto") return; // can't swap from "auto"
  const temp = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = temp;
});

// Translate button click
translateBtn.addEventListener("click", async () => {
  const text = sourceText.value.trim();
  statusMsg.textContent = "";

  if (!text) {
    statusMsg.textContent = "Please enter some text to translate.";
    return;
  }

  translateBtn.disabled = true;
  translateBtn.textContent = "Translating...";
  outputText.innerHTML = '<span class="placeholder">Translating...</span>';

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        source: sourceLang.value,
        target: targetLang.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      statusMsg.textContent = data.error || "Something went wrong.";
      outputText.innerHTML = '<span class="placeholder">Translation will appear here...</span>';
    } else {
      lastTranslation = data.translated_text;
      outputText.textContent = lastTranslation;
    }
  } catch (err) {
    statusMsg.textContent = "Network error. Please check your connection.";
    outputText.innerHTML = '<span class="placeholder">Translation will appear here...</span>';
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Translate";
  }
});

// Copy translated text to clipboard
copyBtn.addEventListener("click", async () => {
  if (!lastTranslation) return;
  try {
    await navigator.clipboard.writeText(lastTranslation);
    statusMsg.style.color = "#16a34a";
    statusMsg.textContent = "Copied to clipboard!";
    setTimeout(() => { statusMsg.textContent = ""; }, 2000);
  } catch (err) {
    statusMsg.style.color = "#e11d48";
    statusMsg.textContent = "Could not copy text.";
  }
});

// Text-to-speech for translated text
speakBtn.addEventListener("click", () => {
  if (!lastTranslation) return;
  const utterance = new SpeechSynthesisUtterance(lastTranslation);
  utterance.lang = targetLang.value;
  speechSynthesis.cancel(); // stop any ongoing speech
  speechSynthesis.speak(utterance);
});

// Allow Ctrl+Enter to translate quickly
sourceText.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    translateBtn.click();
  }
});
