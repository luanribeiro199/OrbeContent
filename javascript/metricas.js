// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um usuário logado no localStorage
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  
  // Se não houver, redireciona para a página de login
  if (!usuarioLogado) {
    window.location.href = "index.html";
    return;
  }

  // Define as chaves do localStorage para os dados do usuário logado
  const postsKey = `posts_${usuarioLogado}`;
  const metricasKey = `metricas_${usuarioLogado}`;

  // Recupera os posts e as métricas do localStorage (ou define como vazio)
  let posts = JSON.parse(localStorage.getItem(postsKey)) || [];
  let metricas = JSON.parse(localStorage.getItem(metricasKey)) || {};

  // Referência aos elementos HTML de interação e exibição
  const containerMetricas = document.getElementById("container-metricas");
  const filterTipo = document.getElementById("filter-tipo");
  const filterCliente = document.getElementById("filter-cliente"); // novo filtro de cliente
  const searchText = document.getElementById("search-text");
  const btnLimpar = document.getElementById("btn-limpar");

  // Popula dinamicamente o filtro de clientes com base nos posts existentes
  function popularFiltroClientes() {
    const clientes = Array.from(new Set(posts.map(p => p.cliente).filter(Boolean))).sort();
    filterCliente.innerHTML = ""; // limpa o filtro atual

    // Adiciona a opção "Todos"
    const optionTodos = document.createElement("option");
    optionTodos.value = "todos";
    optionTodos.textContent = "Todos";
    filterCliente.appendChild(optionTodos);

    // Adiciona os clientes únicos
    clientes.forEach(cliente => {
      const option = document.createElement("option");
      option.value = cliente.toLowerCase();
      option.textContent = cliente;
      filterCliente.appendChild(option);
    });
  }

  // Simula um pequeno crescimento aleatório nas métricas
  function incrementarValor(valor) {
    return valor + Math.floor(Math.random() * 10) + 1;
  }

  // Calcula uma nota de desempenho entre 0 e 10 com base nas métricas e pesos definidos
  function calcularNota(m) {
    const pesoCurtidas = 0.9;
    const pesoComentarios = 0.5;
    const pesoSalvamentos = 0.3;
    const pesoCompartilhamentos = 0.8;
    const maxEsperado = 1000;

    let nota =
      (m.curtidas / maxEsperado) * pesoCurtidas +
      (m.comentarios / maxEsperado) * pesoComentarios +
      (m.salvamentos / maxEsperado) * pesoSalvamentos +
      (m.compartilhamentos / maxEsperado) * pesoCompartilhamentos;

    nota = Math.min(nota * 10, 10); // Garante que a nota não ultrapasse 10
    return nota.toFixed(1); // Retorna com uma casa decimal
  }

  // Inicializa ou atualiza métricas de cada post
  posts.forEach((post) => {
    if (!metricas[post.id]) {
      // Se não existem métricas para o post, gera aleatórias
      metricas[post.id] = {
        curtidas: Math.floor(Math.random() * 100),
        comentarios: Math.floor(Math.random() * 50),
        salvamentos: Math.floor(Math.random() * 30),
        compartilhamentos: Math.floor(Math.random() * 20),
      };
    } else {
      // Se já existem, incrementa os valores simulando evolução
      metricas[post.id].curtidas = incrementarValor(metricas[post.id].curtidas);
      metricas[post.id].comentarios = incrementarValor(metricas[post.id].comentarios);
      metricas[post.id].salvamentos = incrementarValor(metricas[post.id].salvamentos);
      metricas[post.id].compartilhamentos = incrementarValor(metricas[post.id].compartilhamentos);
    }

    // Atualiza a nota do post
    metricas[post.id].nota = calcularNota(metricas[post.id]);
  });

  // Salva as métricas atualizadas no localStorage
  localStorage.setItem(metricasKey, JSON.stringify(metricas));

  // Cria elementos HTML com estrelas baseadas na nota de 0 a 10
  function criarEstrelas(nota) {
    const maxEstrelas = 10;
    const notaNum = parseFloat(nota);
    let starsHtml = "";

    for (let i = 1; i <= maxEstrelas; i++) {
      if (i <= Math.floor(notaNum)) {
        starsHtml += '<i class="fas fa-star text-warning"></i>';
      } else {
        const diff = i - notaNum;
        if (diff > 0 && diff < 1) {
          if (notaNum % 1 >= 0.25 && notaNum % 1 < 0.75) {
            starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
          } else {
            starsHtml += '<i class="far fa-star text-warning"></i>';
          }
        } else {
          starsHtml += '<i class="far fa-star text-warning"></i>';
        }
      }
    }

    return starsHtml;
  }

  // Renderiza os cards de métricas na tela
  function renderMetricas() {
    containerMetricas.innerHTML = ""; // Limpa a área de métricas

    const filtrados = posts.filter((post) => {
      const statusPublicado = (post.status || "").toLowerCase() === "publicado";
      const tipoPost = (post.tipo || "").toLowerCase();
      const filterTipoVal = filterTipo.value.toLowerCase();
      const tipoMatch = filterTipoVal === "todos" || tipoPost === filterTipoVal;

      const filterClienteVal = filterCliente.value.toLowerCase();
      const clienteMatch = filterClienteVal === "todos" || (post.cliente || "").toLowerCase() === filterClienteVal;

      const buscaMatch = !searchText.value.trim() || (post.titulo || "").toLowerCase().includes(searchText.value.trim().toLowerCase());

      return statusPublicado && tipoMatch && clienteMatch && buscaMatch;
    });

    if (filtrados.length === 0) {
      containerMetricas.innerHTML = `<p class="text-center text-muted">Nenhuma publicação encontrada.</p>`;
      return;
    }

    // Cria os cards para cada post filtrado
    filtrados.forEach((post) => {
      const m = metricas[post.id];
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      const tipoBadge = post.tipo ? `<span class="badge bg-info text-dark me-2">${post.tipo}</span>` : "";
      const clienteBadge = post.cliente ? `<span class="badge bg-secondary me-2">${post.cliente}</span>` : "";

      let midiaPreview = "";
      if (post.midias && post.midias.length > 0) {
        const midia = post.midias[0];
        if (midia.tipo.startsWith("image/")) {
          midiaPreview = `<img src="${midia.url}" class="card-img-top" alt="${post.titulo}" style="max-height: 200px; object-fit: cover;">`;
        } else if (midia.tipo.startsWith("video/")) {
          midiaPreview = `<video src="${midia.url}" class="card-img-top" controls style="max-height: 200px;"></video>`;
        }
      }

      const notaEstrelas = criarEstrelas(m.nota);

      // Estrutura do card
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          ${midiaPreview}
          <div class="card-body">
            <h5 class="card-title">${post.titulo}</h5>
            <p class="card-text">${tipoBadge} ${clienteBadge} <strong>Público:</strong> ${post.publico || "N/D"}</p>
            <p class="card-text">
              <strong>Curtidas:</strong> ${m.curtidas} |
              <strong>Comentários:</strong> ${m.comentarios} |
              <strong>Salvos:</strong> ${m.salvamentos} |
              <strong>Compart.:</strong> ${m.compartilhamentos}
            </p>
            <p class="card-text">Nota de desempenho: ${m.nota} ${notaEstrelas}</p>
            <button class="btn btn-primary btn-ver-grafico" data-id="${post.id}">Ver Gráfico</button>
          </div>
        </div>
      `;

      containerMetricas.appendChild(card);
    });

    // Evento para o botão "Ver Gráfico"
    document.querySelectorAll(".btn-ver-grafico").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.currentTarget.getAttribute("data-id"));
        abrirModalGrafico(id);
      });
    });
  }

  // Função para abrir modal com gráfico do post
  function abrirModalGrafico(postId) {
    const m = metricas[postId];
    if (!m) return;

    let modal = document.getElementById("modalGrafico");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modalGrafico";
      modal.className = "modal fade";
      modal.tabIndex = -1;
      modal.setAttribute("aria-labelledby", "modalGraficoLabel");
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalGraficoLabel">Gráfico de Métricas - ${posts.find(p => p.id === postId)?.titulo || ''}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <canvas id="graficoMetricas" width="400" height="300"></canvas>
            </div>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }

    const modalBootstrap = bootstrap.Modal.getOrCreateInstance(modal);
    modalBootstrap.show();

    setTimeout(() => {
      const canvasContainer = document.querySelector("#modalGrafico .modal-body");
      canvasContainer.innerHTML = '<canvas id="graficoMetricas" width="400" height="300"></canvas>';
      const ctx = document.getElementById("graficoMetricas").getContext("2d");

      // Destroi gráfico anterior se existir
      if (window.graficoAtual) {
        window.graficoAtual.destroy();
      }

      // Cria novo gráfico com dados do post
      window.graficoAtual = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Curtidas', 'Comentários', 'Salvamentos', 'Compartilhamentos'],
          datasets: [{
            label: 'Quantidade',
            data: [m.curtidas, m.comentarios, m.salvamentos, m.compartilhamentos],
            backgroundColor: ['#f39c12', '#3498db', '#2ecc71', '#e74c3c']
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
          }
        }
      });
    }, 300); // Tempo para garantir que o modal abriu
  }

  // Função para resetar métricas de todos os posts
  function resetarMetricas() {
    posts.forEach((post) => {
      metricas[post.id] = {
        curtidas: Math.floor(Math.random() * 100),
        comentarios: Math.floor(Math.random() * 50),
        salvamentos: Math.floor(Math.random() * 30),
        compartilhamentos: Math.floor(Math.random() * 20),
      };
      metricas[post.id].nota = calcularNota(metricas[post.id]);
    });
    localStorage.setItem(metricasKey, JSON.stringify(metricas));
    renderMetricas();
  }

  // Eventos dos filtros
  filterTipo.addEventListener("change", renderMetricas);
  filterCliente.addEventListener("change", renderMetricas);
  searchText.addEventListener("input", renderMetricas);

  // Evento do botão "Limpar filtros"
  btnLimpar.addEventListener("click", () => {
    filterTipo.value = "todos";
    filterCliente.value = "todos";
    searchText.value = "";
    renderMetricas();
  });

  // Acessibilidade: Foco automático ao abrir o modal
  const modal = document.getElementById('modalGrafico');
  modal?.addEventListener('shown.bs.modal', function () {
    document.getElementById('modalGraficoLabel').focus();
  });

  // Inicializações finais
  popularFiltroClientes(); // Preenche o filtro de clientes
  renderMetricas();        // Renderiza os cards de métricas
});
