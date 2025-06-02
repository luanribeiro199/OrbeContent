// Acessibilidade: permite controlar o carrossel usando as setas do teclado
document.addEventListener('keydown', function (e) {
  // Se a tecla pressionada for a seta para a esquerda
  if (e.key === 'ArrowLeft') {
    // Simula o clique no botão "anterior" do carrossel
    document.querySelector('.carousel-control-prev').click();
  }

  // Se a tecla pressionada for a seta para a direita
  if (e.key === 'ArrowRight') {
    // Simula o clique no botão "próximo" do carrossel
    document.querySelector('.carousel-control-next').click();
  }
});

// Seleciona todos os botões e links com classe .btn
const buttons = document.querySelectorAll('a.btn, button');

// Para cada botão ou link encontrado
buttons.forEach(btn => {

  // Adiciona uma classe de foco visual ao pressionar o botão com o mouse
  btn.addEventListener('mousedown', () => {
    btn.classList.add('btn-focus');
  });

  // Remove a classe de foco visual ao soltar o botão do mouse
  btn.addEventListener('mouseup', () => {
    btn.classList.remove('btn-focus');
  });
});

// Seleciona o link "pular para o conteúdo" (usado para acessibilidade)
const skipLink = document.querySelector('.sr-only-focusable');

// Verifica se o link existe na página
if (skipLink) {
  // Adiciona evento de clique no link de pular conteúdo
  skipLink.addEventListener('click', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do link

    // Seleciona o conteúdo principal da página
    const mainContent = document.getElementById('main-content');

    // Se o conteúdo principal existir
    if (mainContent) {
      // Define tabindex temporário para permitir foco programático
      mainContent.setAttribute('tabindex', '-1');

      // Move o foco para o conteúdo principal
      mainContent.focus();
    }
  });
}

// Seleciona os botões de controle do carrossel (anterior e próximo)
document.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(btn => {

  // Ao receber foco, aplica contorno visual para acessibilidade
  btn.addEventListener('focus', () => {
    btn.style.outline = '3px solid #6c63ff'; // Destaque visual
  });

  // Ao perder o foco, remove o contorno
  btn.addEventListener('blur', () => {
    btn.style.outline = 'none';
  });
});
