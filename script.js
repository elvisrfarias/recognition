const botao = document.getElementById("botao");
const text = document.querySelector(".text");
const recognition = createRecognition();
let listening = false;

botao.addEventListener("click", (e) => {
  if (!recognition) return;

  listening ? recognition.stop() : recognition.start();

  botao.inerHTML = listening ? "Aperte para falar" : "Parar de escutar";
  botao.classList.toggle("bg-purple-200");
  botao.classList.toggle("text-red-500");
});

function createRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    text.innerHTML = "Speech Recognition is not found!";
    return false;
  }

  recognition.lang = "pt-br";
  recognition.onstart = () => (listening = true);
  recognition.onend = () => (listening = false);
  recognition.onerror = (e) => console.log("erro", e);
  recognition.onresult = (e) => (text.inerHTML = e.results[0][0].transcript);

  return recognition;
}
