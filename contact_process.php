<?php

$to = "comtrade.energy.llc@gmail.com";
$from = $_REQUEST['email'];
$name = $_REQUEST['name'];
$csubject = $_REQUEST['subject'];
$cmessage = $_REQUEST['message'];

$headers = "From: $from";
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$subject = "У вас є повідомлення від comtrade.energy.";

$logo = 'https://comtrade.energy/assets/img/logo/logo.png';
$link = 'https://comtrade.energy/';

$body = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Повідомлення від comtrade.energy.</title></head><body>";
$body .= "<table style='width: 100%;'>";
$body .= "<thead style='text-align: center;'><tr><td style='border:none;' colspan='2'>";
$body .= "<a href='{$link}'><img src='{$logo}' alt='logo'></a><br><br>";
$body .= "</td></tr></thead><tbody><tr>";
$body .= "<td style='border:none;'><strong>Ім`я: </strong>{$name}</td>";
$body .= "<td style='border:none;'><strong>Email: </strong>{$from}</td>";
$body .= "</tr>";
$body .= "<tr><td style='border:none;'><strong>Тема: </strong>{$csubject}</td></tr>";
$body .= "<tr><td></td></tr>";
$body .= "<tr><td colspan='2' style='border:none;'>{$cmessage}</td></tr>";
$body .= "</tbody></table>";
$body .= "</body></html>";

$send = mail($to, $subject, $body, $headers);
