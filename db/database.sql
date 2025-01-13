CREATE DATABASE IF NOT EXISTS sistema_cadastro;

USE sistema_cadastro;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Inserir usuário padrão
INSERT INTO usuarios (nome, email, senha) VALUES
('Administrador', 'admin', '$2y$10$KqV0CmeFBqP1n6R9nBpROOEFFUNFZbrHh6BGEl/b93DQzE71qVwv6'); -- Senha: admin (hash BCRYPT)
