<?php
require_once 'db.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    try {
        $stmt = $pdo->prepare("INSERT INTO admins (email, password) VALUES (?, ?)");
        $stmt->execute([$email, $password]);
        echo json_encode(["status" => "success"]);
    } catch (PDOException $e) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(["status" => "error", "message" => "Email already exists or invalid data"]);
    }
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
}
?>
