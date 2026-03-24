const url = "https://docs.google.com/spreadsheets/d/1mDXBTgqbxCKEq07Xub-8GR-0QoFO7k38sAoJOZM0ldY/export?format=csv";

function toggleChat() {
  const box = document.getElementById("chat-box");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = type === "user" ? "user-msg" : "bot-msg";
  msg.innerText = text;

  document.getElementById("chat-messages").appendChild(msg);
}

fetch(url)
  .then(res => res.text())
  .then(data => {
    const linhas = data.split("\n").slice(1);
    const optionsDiv = document.getElementById("chat-options");

    linhas.forEach(linha => {
      const partes = linha.split(",");
      const pergunta = partes[0];
      const resposta = partes.slice(1).join(",");

      const btn = document.createElement("button");
      btn.innerText = pergunta;

      btn.onclick = () => {
        addMessage(pergunta, "user");
        addMessage(resposta, "bot");
      };

      optionsDiv.appendChild(btn);
    });
  });