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
//require_once '../controllers/ReservationController.php';
require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

$db = PDOFactory::getMysqlConnexion();

$action = $_GET['action'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

//Vérifie la validité du token
function verifyToken()
{

    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token manquant"]);
        exit;
    }

    $key = "une_cle_tres_longue_et_securisee_pour_ma_sae_2026_yonsekai_equipe_dev";

    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {

        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $userId = $decoded->user_id;
        return $userId;

    } catch (Exception $e) {

        http_response_code(401);
        echo json_encode(["error" => "Token invalide"]);
        exit;

    }
}

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

    case 'users':
        verifyToken();
        $users = new UtilisateursController($db);
        $users->getAll();
        break;

    case 'user':
        $id = verifyToken();
        $user = new UtilisateursController($db);
        $user->getProfileWithReservations($id);
        break;

    case 'reservations':
        //code pour la réservation (Haya)
        //verifyToken();
        //$reservations = new UtilisateursController($db);
        //$reservations->getAllReservation();
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
}
?>