<?php
require 'db.php';

$id = $_POST['id'] ?? '';
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';

if (empty($id) || empty($nome) || empty($email)) {
    die("Preencha todos os campos!");
}

try {
    $stmt = $pdo->prepare("UPDATE usuarios SET nome = :nome, email = :email WHERE id = :id");
    $stmt->execute(['id' => $id, 'nome' => $nome, 'email' => $email]);
    echo "Usuário atualizado com sucesso!";
} catch (PDOException $e) {
    die("Erro ao editar: " . $e->getMessage());
}
?>
