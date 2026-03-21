function toggle(id) {
  const elemento = document.getElementById(id);

  if (elemento.style.display === "block") {
    elemento.style.display = "none";
  } else {
    elemento.style.display = "block";
  }
}
const url = "https://docs.google.com/spreadsheets/d/1mDXBTgqbxCKEq07Xub-8GR-0QoFO7k38sAoJOZM0ldY/export?format=csv";
function abrirBot() {
  const chat = document.getElementById("chat");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function abrirBot() {
  const chat = document.getElementById("chat");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

fetch(url)
  .then(res => res.text())
  .then(data => {
    const linhas = data.split("\n").slice(1);
    const perguntasDiv = document.getElementById("perguntas");

    linhas.forEach(linha => {
      const partes = linha.split(",");
      const pergunta = partes[0];
      const resposta = partes.slice(1).join(",");

      const botao = document.createElement("button");
      botao.innerText = pergunta;

      botao.onclick = () => {
        document.getElementById("resposta").innerText = resposta;
      };

      perguntasDiv.appendChild(botao);
    });
  });