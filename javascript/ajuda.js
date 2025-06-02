// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

  // Função que verifica se o usuário está logado
  function estaLogado() {
    // Tenta obter do localStorage o item 'usuarioLogado'
    const usuario = localStorage.getItem("usuarioLogado");

    // Se não houver usuário logado, retorna false
    if (!usuario) return false;

    try {
      // Tenta converter o texto salvo em JSON para um objeto
      const usuarioObj = JSON.parse(usuario);

      // Verifica se o objeto possui email e nome válidos
      return usuarioObj && usuarioObj.email && usuarioObj.nome;
    } catch {
      // Se der erro ao fazer o parse, retorna false
      return false;
    }
  }

  // Função que exibe uma mensagem de aviso e redireciona o usuário
  function mostrarAvisoERedirecionar(mensagem, destino) {
    // Tenta obter o elemento com id 'avisoLogin' (para não criar múltiplos)
    let aviso = document.getElementById("avisoLogin");

    // Se o elemento não existir, cria dinamicamente
    if (!aviso) {
      aviso = document.createElement("div"); // Cria uma div
      aviso.id = "avisoLogin"; // Define o ID
      // Adiciona classes para estilo (ex: alerta Bootstrap)
      aviso.classList.add("alert", "alert-warning", "fixed-top", "text-center");

      // Ajusta alguns estilos diretamente
      aviso.style.zIndex = "1050"; // Garante que fique acima de outros elementos
      aviso.style.margin = "1rem auto"; // Margem superior/inferior
      aviso.style.width = "100%"; // Largura total
      aviso.style.maxWidth = "400px"; // Limita a largura máxima

      // Adiciona a div criada no topo do body
      document.body.prepend(aviso);
    }

    // Define o conteúdo do aviso
    aviso.textContent = mensagem;

    // Garante que o aviso fique visível
    aviso.classList.remove("d-none");

    // Aguarda 2.5 segundos e redireciona para a página de login
    setTimeout(() => {
      window.location.href = destino;
    }, 2500);
  }

  // Seleciona todos os links com a classe 'nav-link'
  const links = document.querySelectorAll("a.nav-link");

  // Para cada link do menu
  links.forEach((link) => {
    // Captura o texto visível do link e remove espaços em branco
    const texto = link.textContent.trim();

    // Se o link for "Dashboard"
    if (texto === "Dashboard") {
      // Adiciona evento de clique personalizado
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link

        // Se o usuário estiver logado, redireciona para o dashboard
        if (estaLogado()) {
          window.location.href = "dashboard.html";
        } else {
          // Senão, mostra aviso e redireciona para o login
          mostrarAvisoERedirecionar(
            "Você precisa estar logado para acessar o Dashboard. Redirecionando para login...",
            "entrar.html"
          );
        }
      });
    }

    // Se o link for "Métricas"
    if (texto === "Métricas") {
      // Adiciona evento de clique personalizado
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link

        // Se estiver logado, vai para métricas
        if (estaLogado()) {
          window.location.href = "metricas.html";
        } else {
          // Caso contrário, mostra aviso e redireciona para login
          mostrarAvisoERedirecionar(
            "Você precisa estar logado para acessar as Métricas. Redirecionando para login...",
            "entrar.html"
          );
        }
      });
    }
  });
});
