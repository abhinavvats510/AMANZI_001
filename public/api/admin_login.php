<?php
require_once 'db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ? AND password = ?");
    $stmt->execute([$email, $password]);
    $admin = $stmt->fetch();

    if ($admin) {
        echo json_encode(["status" => "success", "user" => ["email" => $admin['email']]]);
    } else {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
}
?>
