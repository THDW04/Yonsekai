<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../app/controllers/UtilisateursController.php';

$db = PDOFactory::getMysqlConnexion();

// Récupérer l'action de l'URL
$action = $_GET['action'] ?? null;

// Lire le contenu JSON reçu
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$authController = new UtilisateursController($db);

if ($action === 'register') {
    $authController->register($data);
}

if ($action === 'login') {
    $authController->login($data);
}