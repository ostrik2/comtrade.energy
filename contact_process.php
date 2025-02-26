<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/autoload.php';

session_start();

if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
	header('HTTP/1.1 403 Forbidden');
	exit(json_encode(['status' => 'error', 'message' => 'Access forbidden']));
}

// Checking the last time
if (isset($_SESSION['last_submission_time']) && time() - $_SESSION['last_submission_time'] < 60) {
	header('HTTP/1.1 429 Too Many Requests');
	exit(json_encode(['status' => 'error', 'message' => 'Будь ласка, зачекайте хвилину перед повторною відправкою.']));
}

$to = "deucalionltd@deucalion.com.ua";
$from = "deucalio@deucalion.com.ua";

// Data validation
$name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$message = nl2br(trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));

if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	header('HTTP/1.1 400 Bad Request');
	exit(json_encode(['status' => 'error', 'message' => 'Перевірте коректність даних, що вводяться.']));
}

$subject = "У вас є повідомлення від deucalion.com.ua.";

$body = "<!DOCTYPE html><html lang='uk'><head><meta charset='UTF-8'><title>Повідомлення від deucalion.com.ua.</title></head><body>";
$body .= "<style type=\"text/css\">
.tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;width:100%;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-3gjt{border-color:#d6f3ff;text-align:center;vertical-align:top}
.tg .tg-5hce{background-color:#0772a1;border-color:#d6f3ff;color:#ffffff;text-align:center;vertical-align:top}
.tg .tg-1u62{border-color:#d6f3ff;font-weight:bold;text-align:left;vertical-align:top}
</style>
<table class=\"tg\">
<thead>
  <tr>
    <th class=\"tg-5hce\" colspan=\"2\">DEUCALION LTD</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class=\"tg-1u62\">Ім`я:</td>
    <td class=\"tg-3gjt\">{$name}</td>
  </tr>
  <tr>
    <td class=\"tg-1u62\">Email:</td>
    <td class=\"tg-3gjt\">{$email}</td>
  </tr>
  <tr>
    <td class=\"tg-3gjt\" colspan=\"2\"><pre>{$message}</pre></td>
  </tr>
</tbody>
</table>";
$body .= "</body></html>";

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
	//Server settings
	// $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host = 'localhost';                     //Set the SMTP server to send through
	// $mail->SMTPAuth = true;                                   //Enable SMTP authentication
	// $mail->Username = 'user@example.com';                     //SMTP username
	// $mail->Password = 'secret';                               //SMTP password
	// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	// $mail->Port = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

	//Recipients
	$mail->setFrom($from, 'Deucalion LTD');
	// $mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient
	$mail->addAddress($to);               //Name is optional
	$mail->addReplyTo($email, $name);

	// $mail->addReplyTo('info@example.com', 'Information');
	// $mail->addCC('cc@example.com');
	// $mail->addBCC('bcc@example.com');

	//Attachments
	// $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
	// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

	//Content
	$mail->CharSet = PHPMailer::CHARSET_UTF8;

	$mail->isHTML(true);                                  //Set email format to HTML
	$mail->Subject = $subject;
	$mail->Body = $body;
	// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	$mail->send();
	echo json_encode(['status' => 'success', 'message' => 'Повідомлення успішно надіслано.']);

	// Обновление времени последней отправки
	$_SESSION['last_submission_time'] = time();
} catch (Exception $e) {
	header('HTTP/1.1 500 Internal Server Error');
	// echo json_encode(['status' => 'error', 'message' => 'Помилка при відправці повідомлення: ' . $e->getMessage()]);
	echo json_encode(['status' => 'error', 'message' => 'Щось пішло не так, і ми не змогли надіслати ваше повідомлення. Будь ласка, спробуйте пізніше.']);
}
