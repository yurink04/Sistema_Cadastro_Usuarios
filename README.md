# Sistema_Cadastro_Usuarios
 
# Sobre

Este projeto é um sistema simples para gerenciamento de usuários, incluindo cadastro, listagem, edição e exclusão. Ele utiliza HTML, CSS e JavaScript no frontend, PHP no backend e MySQL como banco de dados.

---

## Estrutura do Projeto

```
Sistema de Cadastro_projeto/
├── login.html           # Tela inicial para login
├── dashboard.html       # Página principal após login
├── cadastro.html        # Página de cadastro de usuários
├── usuarios.html        # Página de listagem de usuários
├── styles.css           # Arquivo de estilos CSS
├── scripts.js           # Script JavaScript para funcionalidades do frontend
├── back/                # Pasta contendo os arquivos PHP
│   ├── db.php           # Conexão com o banco de dados
│   ├── cadastrar.php    # Cadastro de novos usuários
│   ├── editar.php       # Edição de usuários existentes
│   ├── excluir.php      # Exclusão de usuários
│   ├── listar.php       # Listagem de usuários em JSON
└── db/                  # Pasta contendo o arquivo SQL
    └── database.sql     # Script SQL para criação da tabela `usuarios`
```

---

## Pré-requisitos

- **Servidor local**: Recomendado usar [XAMPP](https://www.apachefriends.org/index.html), [WAMP](https://www.wampserver.com/) ou [Laragon](https://laragon.org/).
- **PHP**: Versão 7.4 ou superior.
- **MySQL**: Configurado no servidor local.
- **Navegador Web**: Para acessar o sistema.

---

## Configuração do Ambiente

1. Instale um servidor local (XAMPP, WAMP ou Laragon).
2. Inicie o servidor Apache e o MySQL no painel do servidor.
3. Copie a pasta do projeto para o diretório raiz do servidor local (por exemplo, `htdocs` no XAMPP):
   ```
   /xampp/htdocs/Sistema de Cadastro_projeto/
   ```
4. Crie um banco de dados no MySQL (use phpMyAdmin ou linha de comando):
   ```sql
   CREATE DATABASE sistema_usuarios;
   ```
5. Importe o arquivo `database.sql` para criar a tabela:
   ```bash
   mysql -u seu_usuario -p sistema_usuarios < db/database.sql
   ```
6. Configure as credenciais do banco de dados no arquivo `back/db.php`:
   ```php
   <?php
   $host = 'localhost';
   $dbname = 'sistema_usuarios';
   $username = 'admin';
   $password = 'admin';

   try {
       $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
       $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   } catch (PDOException $e) {
       die("Erro de conexão: " . $e->getMessage());
   }
   ?>
   ```

---

## Ajustes Necessários nos Caminhos

### Para arquivos PHP (backend):
- Atualize os formulários HTML que fazem requisições para incluir o diretório `back/`:
  ```html
  <form id="form-cadastro" action="back/cadastrar.php" method="POST">
  ```
- Nos arquivos PHP, ajuste os `require` ou `include` para o caminho correto do `db.php`:
  ```php
  require '../db/db.php';
  ```

### Para JavaScript:
- Atualize os caminhos relativos nas requisições `fetch` para apontar para a pasta `back/`:
  ```javascript
  const response = await fetch("back/cadastrar.php", { method: "POST", body: formData });
  ```

### Para Banco de Dados:
- Certifique-se de apontar o comando de importação SQL para o diretório `db/`:
  ```bash
  mysql -u seu_usuario -p sistema_usuarios < db/database.sql
  ```

---

## Como Rodar o Projeto

1. Acesse o navegador e digite o seguinte endereço:
   ```
   http://localhost/Sistema de Cadastro_projeto/login.html
   ```
2. Faça login utilizando as credenciais de administrador:
   - **Usuário**: `admin`
   - **Senha**: `admin`
3. Após o login, você será redirecionado para o painel principal.
4. Navegue pelas funcionalidades:
   - Cadastro de novos usuários.
   - Visualização, edição e exclusão de usuários cadastrados.

---

## Funcionalidades

- **Login**: Acesso restrito com validação de credenciais.
- **Cadastro**: Registro de novos usuários com validação de dados.
- **Listagem**: Visualização de todos os usuários cadastrados em uma tabela.
- **Edição**: Atualização dos dados de um usuário existente.
- **Exclusão**: Remoção de um usuário da base de dados.

---

## Considerações Finais

- Certifique-se de que o servidor Apache e MySQL estão rodando antes de acessar o sistema.
- Caso encontre erros, revise as configurações do banco de dados no arquivo `back/db.php`.
- Para dúvidas ou melhorias, entre em contato pelo e-mail no rodapé do sistema.

