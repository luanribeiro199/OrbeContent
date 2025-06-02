// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

  // === Autenticação ===
  const usuarioLogado = localStorage.getItem("usuarioLogado"); // Busca o usuário logado no localStorage
  if (!usuarioLogado) { // Se não houver usuário logado
    window.location.href = "index.html"; // Redireciona para a página inicial (login)
    return; // Interrompe a execução do restante do código
  }

  // Define a chave de armazenamento para os posts do usuário atual
  const storageKey = `posts_${usuarioLogado}`;
  // Recupera os posts salvos ou inicia com array vazio
  let posts = JSON.parse(localStorage.getItem(storageKey)) || [];

  // === Elementos do DOM ===
  const formPost = document.getElementById("form-post"); // Formulário do post
  const modalPost = $("#modalPost"); // Modal de criação/edição de post (usando jQuery)
  const listaPosts = document.getElementById("lista-posts"); // Lista onde os posts serão exibidos
  const btnNovoPost = document.getElementById("btn-novo-post"); // Botão para abrir modal de novo post
  const filtroStatus = document.getElementById("filtro-status"); // Filtro por status
  const filtroCliente = document.getElementById("filtro-cliente"); // Filtro por cliente
  const filtroBusca = document.getElementById("filtro-busca"); // Campo de busca por texto
  const btnBuscar = document.getElementById("btn-buscar"); // Botão de busca
  const previewMidia = document.getElementById("preview-midia"); // Área de pré-visualização de mídia
  const btnLimparFiltros = document.getElementById("btn-limpar-filtros"); // Botão para limpar os filtros

  // Botão de sair (logout)
  const btnSair = document.getElementById("btn-sair");
  if (btnSair) {
    btnSair.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogado"); // Remove o login
      window.location.href = "index.html"; // Redireciona para a tela inicial
    });
  }

  // Evento para limpar todos os filtros
  btnLimparFiltros.addEventListener("click", () => {
    filtroStatus.value = "todos";
    filtroCliente.value = "todos";
    filtroBusca.value = "";
    renderPosts(); // Atualiza a exibição dos posts
  });

  let editarId = null; // Variável para armazenar ID do post sendo editado

  // === Abrir modal para novo post ===
  btnNovoPost.addEventListener("click", () => {
    editarId = null; // Define como novo post (sem ID)
    formPost.reset(); // Limpa o formulário
    previewMidia.innerHTML = ""; // Limpa pré-visualização
    modalPost.find(".modal-title").text("Novo Conteúdo"); // Altera título do modal
    modalPost.modal("show"); // Abre modal
    formPost.cliente.focus(); // Coloca o foco no campo "cliente"
  });

  // === Preview de mídia ===
  formPost.midia.addEventListener("change", () => {
    const files = Array.from(formPost.midia.files); // Pega os arquivos selecionados
    previewMidia.innerHTML = files.map(file => {
      const url = URL.createObjectURL(file); // Cria URL para visualização
      if (file.type.startsWith("image/")) {
        return `<img src="${url}" class="img-fluid mb-2" style="max-height: 150px;" alt="Pré-visualização de imagem selecionada"/>`;
      } else if (file.type.startsWith("video/")) {
        return `<video src="${url}" class="img-fluid mb-2" controls style="max-height: 150px;" aria-label="Pré-visualização de vídeo selecionado"></video>`;
      }
      return "";
    }).join(""); // Insere as prévias na tela
  });

  // === Envio do formulário (novo ou edição de post) ===
  formPost.addEventListener("submit", (e) => {
    e.preventDefault();
    const files = Array.from(formPost.midia.files);
    const midias = files.map(file => ({
      url: URL.createObjectURL(file),
      tipo: file.type
    }));

    if (editarId) {
      // Se for edição de post
      const index = posts.findIndex((p) => p.id === editarId);
      if (index > -1) {
        posts[index] = {
          ...posts[index], // Mantém dados antigos
          cliente: formPost.cliente.value,
          titulo: formPost.titulo.value,
          tipo: formPost["tipo-conteudo"].value,
          plataforma: formPost.plataforma.value,
          status: formPost.status.value,
          legenda: formPost.legenda.value,
          publico: formPost.publico.value,
          meta: formPost.meta.value,
          midias: midias.length > 0 ? midias : posts[index].midias, // Mantém mídia antiga se nenhuma nova
        };
      }
    } else {
      // Se for novo post
      const novoPost = {
        id: Date.now(), // ID único baseado no timestamp
        cliente: formPost.cliente.value,
        titulo: formPost.titulo.value,
        tipo: formPost["tipo-conteudo"].value,
        plataforma: formPost.plataforma.value,
        status: formPost.status.value,
        legenda: formPost.legenda.value,
        publico: formPost.publico.value,
        meta: formPost.meta.value,
        midias: midias,
      };
      posts.push(novoPost); // Adiciona ao array
    }

    localStorage.setItem(storageKey, JSON.stringify(posts)); // Salva no localStorage
    modalPost.modal("hide"); // Fecha o modal
    atualizarFiltroClientes(); // Atualiza filtro de clientes
    renderPosts(); // Reexibe os posts
  });

  // === Renderiza os cards dos posts ===
  function renderPosts() {
    listaPosts.innerHTML = ""; // Limpa lista

    const status = filtroStatus.value.toLowerCase();
    const cliente = filtroCliente.value.toLowerCase();
    const busca = filtroBusca.value.toLowerCase();

    // Filtra os posts com base nos filtros
    const filtrados = posts.filter((post) => {
      const statusOk = status === "todos" || post.status.toLowerCase() === status;
      const clienteOk = cliente === "todos" || post.cliente.toLowerCase() === cliente;
      const buscaOk = post.titulo.toLowerCase().includes(busca) || post.legenda.toLowerCase().includes(busca);
      return statusOk && clienteOk && buscaOk;
    });

    if (filtrados.length === 0) {
      listaPosts.innerHTML = `<div class="col-12"><p class="text-center text-muted" role="alert">Nenhum conteúdo encontrado.</p></div>`;
      return;
    }

    // Cria os cards para cada post
    filtrados.forEach((post) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      // Gera o HTML da mídia
      const midiaHtml = post.midias?.map(midia => {
        if (midia.tipo.startsWith("image/")) {
          return `<img src="${midia.url}" class="card-img-top mb-1" alt="Imagem do post ${post.titulo}" style="max-height: 200px; object-fit: cover;">`;
        } else if (midia.tipo.startsWith("video/")) {
          return `<video src="${midia.url}" class="card-img-top mb-1" controls aria-label="Vídeo do post ${post.titulo}" style="max-height: 200px;"></video>`;
        }
        return "";
      }).join("") || "";

      // Define o conteúdo HTML do card
      card.innerHTML = `
        <div class="card shadow-sm" role="region" aria-label="Post de ${post.cliente}">
          ${midiaHtml}
          <div class="card-body">
            <h5 class="card-title">${post.titulo}</h5>
            <p class="card-text"><strong>Cliente:</strong> ${post.cliente} | <strong>Status:</strong> ${post.status}</p>
            <p class="card-text"><strong>Legenda:</strong> ${post.legenda}</p>
            <p class="card-text"><strong>Público-alvo:</strong> ${post.publico}</p>
            <p class="card-text"><strong>Meta:</strong> ${post.meta}</p>
            <button class="btn btn-sm btn-outline-primary btn-editar" data-id="${post.id}" aria-label="Editar conteúdo ${post.titulo}"><i class="fas fa-edit" aria-hidden="true"></i> Editar</button>
            <button class="btn btn-sm btn-outline-danger btn-excluir" data-id="${post.id}" aria-label="Excluir conteúdo ${post.titulo}"><i class="fas fa-trash" aria-hidden="true"></i> Excluir</button>
          </div>
        </div>
      `;
      listaPosts.appendChild(card); // Adiciona o card à lista
    });

    // === Adiciona eventos aos botões de editar e excluir ===
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = Number(e.currentTarget.getAttribute("data-id"));
        editarPost(id);
      });
    });

    document.querySelectorAll(".btn-excluir").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = Number(e.currentTarget.getAttribute("data-id"));
        excluirPost(id);
      });
    });
  }

  // === Função para editar um post ===
  function editarPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    editarId = id;
    // Preenche o formulário com os dados do post
    formPost.cliente.value = post.cliente;
    formPost.titulo.value = post.titulo;
    formPost["tipo-conteudo"].value = post.tipo;
    formPost.plataforma.value = post.plataforma;
    formPost.status.value = post.status;
    formPost.legenda.value = post.legenda;
    formPost.publico.value = post.publico;
    formPost.meta.value = post.meta;

    previewMidia.innerHTML = post.midias?.map(midia => {
      if (midia.tipo.startsWith("image/")) {
        return `<img src="${midia.url}" class="img-fluid mb-2" alt="Imagem já carregada">`;
      } else if (midia.tipo.startsWith("video/")) {
        return `<video src="${midia.url}" class="img-fluid mb-2" controls aria-label="Vídeo já carregado"></video>`;
      }
      return "";
    }).join("") || "";

    modalPost.find(".modal-title").text("Editar Conteúdo");
    modalPost.modal("show");
    formPost.cliente.focus(); // Direciona foco
  }

  // === Modal de confirmação de exclusão ===
  let idParaExcluir = null;
  const modalConfirmacaoEl = document.getElementById('modalConfirmacao');
  const modalConfirmacao = new bootstrap.Modal(modalConfirmacaoEl);

  // Inicia exclusão
  function excluirPost(id) {
    idParaExcluir = id;
    modalConfirmacao.show(); // Mostra modal
    document.getElementById('btnConfirmarExcluir').focus();
  }

  // Confirma exclusão
  document.getElementById('btnConfirmarExcluir').addEventListener('click', () => {
    if (idParaExcluir !== null) {
      posts = posts.filter(p => p.id !== idParaExcluir); // Remove post
      localStorage.setItem(storageKey, JSON.stringify(posts)); // Atualiza localStorage
      renderPosts(); // Atualiza lista
      idParaExcluir = null;
      modalConfirmacao.hide();
    }
  });

  // Cancela exclusão
  document.getElementById('btnCancelarExcluir').addEventListener('click', () => {
    modalConfirmacao.hide();
    idParaExcluir = null;
  });

  // === Atualiza lista de clientes únicos no filtro ===
  function atualizarFiltroClientes() {
    const clientesUnicos = [...new Set(posts.map(p => p.cliente).filter(c => c.trim() !== ""))];
    filtroCliente.innerHTML = "";

    const optionTodos = document.createElement("option");
    optionTodos.value = "todos";
    optionTodos.textContent = "Todos";
    filtroCliente.appendChild(optionTodos);

    clientesUnicos.forEach(cliente => {
      const option = document.createElement("option");
      option.value = cliente;
      option.textContent = cliente;
      filtroCliente.appendChild(option);
    });
  }

  // === Eventos dos filtros ===
  btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    renderPosts();
  });

  filtroStatus.addEventListener("change", renderPosts);
  filtroCliente.addEventListener("change", renderPosts);

  atualizarFiltroClientes(); // Atualiza lista de clientes
  renderPosts(); // Exibe posts
});
