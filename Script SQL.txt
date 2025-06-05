CREATE DATABASE IF NOT EXISTS sistema_midia;
USE sistema_midia;

-- Tabela usuario
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL
);

-- Tabela clientes
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100) NOT NULL,
    descricao TEXT,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabela conteudo
CREATE TABLE conteudo (
    id_conteudo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo_midia VARCHAR(50),
    status VARCHAR(50),
    data_publicacao DATE,
    data_entrega DATE,
    id_usuario INT,
    id_cliente INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Tabela metrica
CREATE TABLE metrica (
    id_metrica INT AUTO_INCREMENT PRIMARY KEY,
    visualizacoes INT DEFAULT 0,
    curtidas INT DEFAULT 0,
    compartilhamentos INT DEFAULT 0,
    comentarios INT DEFAULT 0,
    id_conteudo INT,
    data_registro DATE,
    FOREIGN KEY (id_conteudo) REFERENCES conteudo(id_conteudo)
);

INSERT INTO usuario (nome, email, senha, data_criacao) VALUES
('Ana Souza', 'ana@email.com', 'senha123', '2025-01-01'),
('Carlos Lima', 'carlos@email.com', 'senha456', '2025-02-15');

INSERT INTO conteudo (
    titulo, descricao, tipo_midia, status, data_publicacao, data_entrega, id_usuario, id_cliente
) VALUES
('Campanha de Verão', 'Campanha publicitária para o verão.', 'imagem', 'ativo', '2025-03-01', '2025-03-15', 1, 1),
('Lançamento App', 'Vídeo de apresentação do novo app.', 'vídeo', 'concluído', '2025-04-10', '2025-04-25', 2, 2);

INSERT INTO metrica (
    visualizacoes, curtidas, compartilhamentos, comentarios, id_conteudo, data_registro
) VALUES
(1000, 200, 150, 20, 1, '2025-03-16'),
(2500, 500, 300, 50, 2, '2025-04-26');

-- Novos usuários
INSERT INTO usuario (nome, email, senha, data_criacao) VALUES
('Mariana Torres', 'mariana@email.com', 'mariana123', '2025-03-01'),
('Lucas Martins', 'lucas@email.com', 'lucas456', '2025-03-10'),
('Joana Prado', 'joana@email.com', 'joana789', '2025-04-01');

-- Novos clientes
INSERT INTO clientes (nome_cliente, descricao, id_usuario) VALUES
('Cliente C', 'Cliente de moda e vestuário', 3),
('Cliente D', 'Cliente do setor automotivo', 4),
('Cliente E', 'Cliente da área de saúde', 5);

INSERT INTO conteudo (
    titulo, descricao, tipo_midia, status, data_publicacao, data_entrega, id_usuario, id_cliente
) VALUES
('Coleção Outono', 'Divulgação da nova coleção de roupas.', 'imagem', 'ativo', '2025-05-01', '2025-05-10', 3, 3),
('Feira de Carros', 'Vídeo da feira de veículos.', 'vídeo', 'ativo', '2025-05-05', '2025-05-15', 4, 4),
('Campanha Vacinação', 'Animação sobre vacinação infantil.', 'animação', 'concluído', '2025-05-10', '2025-05-20', 5, 5);

INSERT INTO metrica (
    visualizacoes, curtidas, compartilhamentos, comentarios, id_conteudo, data_registro
) VALUES
(3200, 800, 600, 90, 3, '2025-05-11'),
(1500, 300, 250, 40, 4, '2025-05-16'),
(2800, 400, 310, 65, 5, '2025-05-21');

