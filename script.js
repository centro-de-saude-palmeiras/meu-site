const url = "https://docs.google.com/spreadsheets/d/1mDXBTgqbxCKEq07Xub-8GR-0QoFO7k38sAoJOZM0ldY/export?format=csv";

// --- FUNÇÕES DE INTERAÇÃO ---

/**
 * Abre e fecha a caixa principal do chat.
 */
function toggleChat() {
  const box = document.getElementById("chat-box");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

/**
 * Controla a lógica do Accordion (abre uma resposta e fecha as outras).
 * @param {HTMLElement} btnClicado - O botão da pergunta que foi clicado.
 */
function toggleAccordion(btnClicado) {
  // 1. Encontra o conteúdo de resposta associado a este botão
  const content = btnClicado.nextElementSibling;

  // 2. Seleciona TODOS os conteúdos de resposta que estão abertos (.active)
  const todosAbertos = document.querySelectorAll(".accordion-content.active");

  // 3. LAÇO DE REPETIÇÃO (O "Porquê"): Percorre todos os abertos e fecha-os,
  // EXCETO o que acabamos de clicar (se ele já estava aberto).
  todosAbertos.forEach(item => {
    if (item !== content) {
      item.classList.remove("active");
    }
  });

  // 4. Alterna a classe 'active' no conteúdo clicado (abre se fechado, fecha se aberto).
  content.classList.toggle("active");
}

// --- BUSCA DE DADOS (CSV) ---

fetch(url)
  .then(res => res.text())
  .then(data => {
    // Pula o cabeçalho do CSV
    const linhas = data.split("\n").slice(1);
    const chatBox = document.getElementById("chat-box");

    // Limpa o conteúdo inicial do chatBox
    chatBox.innerHTML = '';

    linhas.forEach(linha => {
      // Limpa espaços extras e divide a linha
      const partes = linha.trim().split(",");
      
      // Validação simples: ignora linhas vazias ou mal formatadas
      if (partes.length < 2) return;

      const pergunta = partes[0];
      // Reconstrói a resposta caso ela contenha vírgulas
      const resposta = partes.slice(1).join(",").replace(/"/g, ''); // Remove aspas extras se houver

      // --- CRIAÇÃO DOS ELEMENTOS (DOM) ---
      
      // 1. Cria o container do par pergunta/resposta
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";

      // 2. Cria o botão da pergunta
      const btnPergunta = document.createElement("button");
      btnPergunta.innerText = pergunta;
      // Define a ação do clique chamando a função do accordion
      btnPergunta.onclick = function() { toggleAccordion(this); };

      // 3. Cria a div da resposta
      const divResposta = document.createElement("div");
      divResposta.className = "accordion-content";
      divResposta.innerText = resposta;

      // 4. Monta a estrutura
      accordionItem.appendChild(btnPergunta);
      accordionItem.appendChild(divResposta);
      chatBox.appendChild(accordionItem);
    });
  })
  .catch(error => console.error("Erro ao carregar o chat:", error));