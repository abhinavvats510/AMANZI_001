<?php
/**
 * Handle job applications and send email notification with resume attachment
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

if (isset($_POST['name'], $_POST['email'], $_POST['jobTitle'])) {
    $name = strip_tags($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $jobTitle = strip_tags($_POST['jobTitle']);
    $message = isset($_POST['message']) ? strip_tags($_POST['message']) : 'No message provided.';

    $to = "contact@amanziconsulting.co.in";
    $subject = "New Job Application: $jobTitle - $name";
    
    $boundary = md5(time());
    $headers = "From: contact@amanziconsulting.co.in\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "New application received for: $jobTitle\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n\n";

    if (isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
        $file_name = $_FILES['resume']['name'];
        $file_size = $_FILES['resume']['size'];
        $file_tmp = $_FILES['resume']['tmp_name'];
        $file_type = $_FILES['resume']['type'];

        $handle = fopen($file_tmp, "r");
        $content = fread($handle, $file_size);
        fclose($handle);
        $encoded_content = chunk_split(base64_encode($content));

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= "$encoded_content\r\n";
    }

    $body .= "--$boundary--";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Application sent successfully"]);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(["status" => "error", "message" => "Failed to send application email"]);
    }
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
}
?>
