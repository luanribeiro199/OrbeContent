# 📊 OrbeContent – Sistema de Gestão de Conteúdo para Social Media

O **OrbeContent** é um sistema web desenvolvido como projeto do Desafio Integrador da faculdade, 
com foco na organização de conteúdos para redes sociais de forma simples, visual e acessível.  
Ideal para social medias e agências que precisam planejar, acompanhar métricas e manter a gestão de conteúdo sempre em dia.

---

## 🧩 Funcionalidades

- 👥 Cadastro e login de usuários
- 🗂️ Dashboard para gerenciar conteúdos
- 📌 Informações completas para cada conteúdo: cliente, tipo, legenda, plataforma, metas, público-alvo e mídia
- ✏️ Edição em pop-up com salvar/cancelar
- 📊 Página de métricas para gerenciar análise de curtidas, comentários, salvos, compartilhamentos e alcance
- 🧠 Nota de desempenho automatizada (de 0 a 10)
- ♿ Acessibilidade total (WCAG 2.1 AA + navegação por teclado)
- ☁️ Armazenamento em `localStorage` para simular banco de dados (Somente a mídia não é salva, e deve ser carregada {feito upload} novamente, 
pois o localStorage não ocnsegue armazenar arquivos muito grande como mídias)
- 📱 Design responsivo, moderno e funcional

---

## ⚙️ Tecnologias Utilizadas

- HTML5
- CSS3 (com foco em acessibilidade e responsividade)
- JavaScript Vanilla
- Git e GitHub (versionamento)
- Netlify (para hospedagem gratuita)

---

## 🚀 Como rodar localmente

1. Clone o repositório:
git clone https://github.com/luanribeiro199/OrbeContent

2. Acesse a pasta do projeto:
cd orbecontent

3. Abra o arquivo index.html no seu navegador
ou utilize a extensão Live Server (VS Code).

---

🌐 Aplicação Hospedada

🔗 Acesse a aplicação online:
https://orbecontent.netlify.app/

---

🎥 Demonstração em vídeo

🔗 Assista ao vídeo explicando o sistema e seu funcionamento: 
https://youtu.be/ljuYxEHY-Yw

---

## Banco de Dados

O banco de dados físico utilizado no sistema está disponível no repositório com o nome `BancoDeDados_DI.sql`.

> Observação: O sistema não está conectado ao banco diretamente, mas os dados estão presentes para fins de avaliação.

---

📁 Estrutura do Projeto

orbecontent/
│
│── BancoDeDados_DI.sql  # Banco de dados físico do Sistema
├── index.html           # Página inicial
├── entrar.html          # Tela de login
├── inscrever.html       # Tela de cadastro
├── dashboard.html       # Gerenciamento de conteúdos
├── metricas.html        # Página de métricas e relatórios
├── ajuda.html           # Dúvidas frequentes
│
├── css/
│   └── estilo.css        # Estilos gerais (acessibilidade e layout)
│   └── entrar.css        # Estilos da página de login
│   └── inscrever.css     # Estilos da págnia de cadastro
│   └── dashboard.css     # Estilos da página dashboard
│   └── metricas.css      # Estilos da página métricas
│   └── ajuda.css         # Estilos da págnia ajuda
│
├── js/
│   └── index.js          # Scripts JS com lógica e localStorage da página principal
│   └── entrar.js         # Scripts JS com lógica e localStorage da página de login
│   └── inscrever.js      # Scripts JS com lógica e localStorage da página de cadastro
│   └── dashboard.js      # Scripts JS com lógica e localStorage da página de dashboard
│   └── metricas.js       # Scripts JS com lógica e localStorage da págnia de métricas
│   └── ajuda.js          # Scripts JS com lógica e localStorage da página de ajuda


📄 Licença

Projeto acadêmico desenvolvido por Luan Ribeiro e Matheus Grochovski - Engs 3ºB
para o Desafio Integrador de Engenharia de Software do Centro Universitário Campo Real (2025).
Todos os direitos reservados.