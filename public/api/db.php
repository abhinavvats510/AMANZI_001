<?php
/**
 * DB connection using PDO
 * Connects to cPanel MySQL database
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// DB configuration based on .env
define('DB_HOST', '68.178.145.69');
define('DB_USER', 'gns0s1y5yg0m');
define('DB_PASS', '$N6hu!56yFpFb4qg');
define('DB_NAME', 'amanzi_web');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // Initial setup if tables don't exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            job_title VARCHAR(255) NOT NULL,
            company_name VARCHAR(255) NOT NULL,
            job_description TEXT,
            location VARCHAR(255),
            job_type VARCHAR(50),
            experience_required VARCHAR(50),
            salary VARCHAR(50),
            skills_required TEXT,
            posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            application_deadline DATE
        )
    ");

    // Seed admin if not exists
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute(['admin@amanzigrp.com']);
    if (!$stmt->fetch()) {
        $stmt = $pdo->prepare("INSERT INTO admins (email, password) VALUES (?, ?)");
        $stmt->execute(['admin@amanzigrp.com', 'admin123']);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database connection failed", "details" => $e->getMessage()]);
    exit;
}
?>
