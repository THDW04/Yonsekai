<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../controllers/UtilisateursController.php';
//require_once '../controllers/ReservationController.php'; //Controleur pour les réservation

$db = PDOFactory::getMysqlConnexion();

$action = $_GET['action'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch ($action) {
    case 'login':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(["error" => "Method not allowed"]);
            exit;
        }

        $controller = new UtilisateursController($db);
        $controller->login($input);
        break;

    case 'register':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(["error" => "Method not allowed"]);
            exit;
        }

        $controller = new UtilisateursController($db);
        $controller->register($input);
        break;
        
    case 'utilisateurs':
        $users = new UtilisateursController($db);

        if ($method === 'GET') {
            $users->getAll();
        }
        break;

    case 'reservations':
        //code pour la réservation (Haya)
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
}
?>