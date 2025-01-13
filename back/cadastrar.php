<?php
require 'db.php';

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

if (empty($nome) || empty($email) || empty($senha)) {
    die("Preencha todos os campos!");
}

if (strlen($senha) < 6) {
    die("A senha deve ter pelo menos 6 caracteres.");
}

$hashedPassword = password_hash($senha, PASSWORD_BCRYPT);

try {
    $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)");
    $stmt->execute(['nome' => $nome, 'email' => $email, 'senha' => $hashedPassword]);
    echo "Usuário cadastrado com sucesso!";
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        die("O e-mail já está em uso!");
    } else {
        die("Erro ao cadastrar: " . $e->getMessage());
    }
}
?>
