<?php
/**
 * Handle business enquiries and send email notification
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['name'], $data['email'], $data['message'])) {
    $name = strip_tags($data['name']);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $company = isset($data['company']) ? strip_tags($data['company']) : 'N/A';
    $message = strip_tags($data['message']);

    $to = "contact@amanziconsulting.co.in";
    $subject = "New Business Enquiry: $name ($company)";
    
    $body = "New business enquiry received:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Company: $company\n\n";
    $body .= "Message:\n$message\n";

    $headers = "From: contact@amanziconsulting.co.in\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Enquiry sent successfully"]);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(["status" => "error", "message" => "Failed to send enquiry email"]);
    }
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
}
?>
