<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM jobs ORDER BY id DESC");
        $results = $stmt->fetchAll();
        $mappedResults = array_map(function($job) {
            return [
                "id" => (string)$job['id'],
                "title" => $job['job_title'],
                "company" => $job['company_name'],
                "description" => $job['job_description'] ?: '',
                "location" => $job['location'] ?: '',
                "mode" => $job['job_type'] ?: 'Remote',
                "date" => $job['posted_date'] ? date('m/d/Y', strtotime($job['posted_date'])) : date('m/d/Y')
            ];
        }, $results);
        echo json_encode($mappedResults);
        break;

    case 'POST':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (isset($data['title'], $data['company'], $data['description'], $data['location'], $data['mode'])) {
            $stmt = $pdo->prepare("INSERT INTO jobs (job_title, company_name, job_description, location, job_type) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$data['title'], $data['company'], $data['description'], $data['location'], $data['mode']]);
            echo json_encode(["status" => "success", "id" => $pdo->lastInsertId()]);
        } else {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(["status" => "error", "message" => "Required fields missing"]);
        }
        break;

    case 'DELETE':
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM jobs WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success"]);
        } else {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(["status" => "error", "message" => "ID missing"]);
        }
        break;
}
?>
