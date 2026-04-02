<?php
<<<<<<< HEAD
=======
/**
 * DB connection using PDO
 * Connects to cPanel MySQL database
 */
>>>>>>> 9101ef3f235708db7f43f7af8141c88620cd2a81

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

<<<<<<< HEAD
// Detect environment
$isLocal = ($_SERVER['SERVER_NAME'] == 'localhost');

if ($isLocal) {
    // 🟢 LOCAL (XAMPP)
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'amanzi_db');
} else {
    // 🔵 PRODUCTION (cPanel)
    define('DB_HOST', '68.178.145.69');
    define('DB_USER', 'gns0s1y5yg0m');
    define('DB_PASS', '$N6hu!56yFpFb4qg');
    define('DB_NAME', 'amanzi_web');
}
=======
// DB configuration based on .env
define('DB_HOST', '68.178.145.69');
define('DB_USER', 'gns0s1y5yg0m');
define('DB_PASS', '$N6hu!56yFpFb4qg');
define('DB_NAME', 'amanzi_web');
>>>>>>> 9101ef3f235708db7f43f7af8141c88620cd2a81

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
<<<<<<< HEAD
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Tables
=======
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // Initial setup if tables don't exist
>>>>>>> 9101ef3f235708db7f43f7af8141c88620cd2a81
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

<<<<<<< HEAD
    // Seed admin
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute(['admin@amanzigrp.com']);

=======
    // Seed admin if not exists
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute(['admin@amanzigrp.com']);
>>>>>>> 9101ef3f235708db7f43f7af8141c88620cd2a81
    if (!$stmt->fetch()) {
        $stmt = $pdo->prepare("INSERT INTO admins (email, password) VALUES (?, ?)");
        $stmt->execute(['admin@amanzigrp.com', 'admin123']);
    }

} catch (PDOException $e) {
<<<<<<< HEAD
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed",
        "details" => $e->getMessage()
    ]);
    exit;
}
?>
=======
    echo json_encode(["status" => "error", "message" => "Database connection failed", "details" => $e->getMessage()]);
    exit;
}
?>
>>>>>>> 9101ef3f235708db7f43f7af8141c88620cd2a81
