<?php
require 'db.php';

$id = $_POST['id'] ?? '';

if (empty($id)) {
    die("ID do usuário não fornecido!");
}

try {
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = :id");
    $stmt->execute(['id' => $id]);
    echo "Usuário excluído com sucesso!";
} catch (PDOException $e) {
    die("Erro ao excluir: " . $e->getMessage());
}
?>
