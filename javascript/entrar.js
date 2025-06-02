// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

  // Seleciona o formulário de login
  const loginForm = document.querySelector('.login-form');

  // Seleciona os campos de entrada de e-mail e senha
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Seleciona o elemento onde será exibida a mensagem de acessibilidade
  const msgAcessibilidade = document.getElementById('mensagem-acessibilidade');

  // Adiciona evento ao formulário para tratar o envio
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que a página recarregue

    // Obtém os valores digitados nos campos, removendo espaços extras
    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();

    // Recupera os usuários cadastrados no localStorage ou inicializa como array vazio
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se existe um usuário com o e-mail e senha fornecidos
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

    // Se o usuário for encontrado no localStorage
    if (usuarioEncontrado) {
      // Armazena o usuário logado no localStorage para manter a sessão
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

      // Exibe mensagem de sucesso com foco acessível
      exibirMensagemAcessivel(`Login realizado com sucesso. Bem-vindo(a), ${usuarioEncontrado.nome}!`, 'success');

      // Aguarda 1,5 segundos antes de redirecionar para o dashboard
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);

    } else {
      // Caso e-mail ou senha estejam incorretos, exibe mensagem de erro
      exibirMensagemAcessivel('E-mail ou senha incorretos. Tente novamente.', 'error');

      // Redireciona o foco de volta ao campo de e-mail para facilitar correção
      emailInput.focus();
    }
  });

  // Adiciona evento para pressionar Enter no campo de e-mail e ir para o campo de senha
  emailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();          // Evita o envio do formulário ao pressionar Enter
      passwordInput.focus();      // Move o foco automaticamente para o campo de senha
    }
  });

  // Função que exibe mensagem acessível visualmente e semanticamente
  function exibirMensagemAcessivel(texto, tipo) {
    msgAcessibilidade.textContent = texto;   // Define o texto da mensagem
    msgAcessibilidade.className = '';        // Remove classes anteriores (reseta)
    
    // Adiciona a classe apropriada conforme o tipo: sucesso ou erro
    msgAcessibilidade.classList.add(tipo === 'success' ? 'mensagem-sucesso' : 'mensagem-erro');

    // Coloca foco no elemento da mensagem para leitores de tela captarem
    msgAcessibilidade.setAttribute('tabindex', '-1'); // Permite foco programático
    msgAcessibilidade.focus(); // Move o foco para a mensagem
  }

});
