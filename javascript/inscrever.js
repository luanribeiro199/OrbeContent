// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

  // Seleciona o formulário de registro pela classe CSS
  const form = document.querySelector(".register-form");

  // Adiciona um ouvinte de evento para o envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário (recarregar a página)

    // Captura e remove espaços em branco dos valores dos campos
    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirm-email").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("name").value.trim();
    const day = document.getElementById("dob-day").value.trim();         // Dia do nascimento
    const month = document.getElementById("dob-month").value.trim();     // Mês do nascimento
    const year = document.getElementById("dob-year").value.trim();       // Ano do nascimento

    // Seleciona o valor do gênero (radio button marcado)
    const gender = document.querySelector("input[name='gender']:checked");

    // Verifica se o checkbox dos termos foi marcado
    const terms = document.getElementById("terms").checked;

    // Validação básica: se algum campo estiver vazio ou gênero/termos não selecionados
    if (!email || !confirmEmail || !password || !name || !day || !month || !year || !gender || !terms) {
      alert("Por favor, preencha todos os campos obrigatórios e aceite os termos.");
      return; // Encerra a execução
    }

    // Verifica se os dois e-mails são iguais
    if (email !== confirmEmail) {
      alert("Os e-mails não coincidem.");
      return;
    }

    // Recupera os usuários cadastrados no localStorage ou cria um array vazio
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se já existe algum usuário com o e-mail informado
    const emailJaExiste = usuarios.some((user) => user.email === email);
    if (emailJaExiste) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    // Cria um objeto com os dados do novo usuário
    const novoUsuario = {
      email,                                 // E-mail do usuário
      senha: password,                       // Senha (simples, sem hash — não recomendado em produção)
      nome: name,                            // Nome completo
      nascimento: `${day}/${month}/${year}`, // Data de nascimento formatada
      genero: gender.value                   // Gênero selecionado (M/F/Outro)
    };

    // Adiciona o novo usuário ao array de usuários
    usuarios.push(novoUsuario);

    // Atualiza o localStorage com o novo array de usuários
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Exibe uma mensagem de sucesso
    alert("Inscrição realizada com sucesso! Você será redirecionado para a página de login.");

    // Redireciona para a página de login após 2 segundos
    setTimeout(() => {
      window.location.href = "entrar.html";
    }, 2000);
  });
});
