<?php
require 'db.php';

$stmt = $pdo->query("SELECT id, nome, email FROM usuarios");
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($usuarios);
?>
