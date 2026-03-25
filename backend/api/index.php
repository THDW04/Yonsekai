<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST,PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../controllers/UtilisateursController.php';
require_once '../controllers/ReservationController.php';
require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

$db = PDOFactory::getMysqlConnexion();

$action = $_GET['action'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

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
        return [
            "id" => $decoded->user_id,
            "role" => $decoded->role
        ];

    } catch (Exception $e) {

        http_response_code(401);
        echo json_encode(["error" => "Token invalide"]);
        exit;

    }
}

function requireAdmin()
{
    $user = verifyToken();

    if ($user["role"] !== "admin") {
        http_response_code(403);
        echo json_encode(["error" => "Accès réservé aux administrateurs"]);
        exit;
    }

    return $user;
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
        requireAdmin();
        $users = new UtilisateursController($db);
        $users->getAll();
        break;

    case 'user':
        $idUser = verifyToken();
        $user = new UtilisateursController($db);
        $user->getProfileWithReservations($idUser['id']);
        break;

    case 'reservations':
        requireAdmin();
        $controller = new ReservationController($db);
        $controller->allReservation();
        break;

    case 'create-reservation':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(["error" => "Méthode POST requise"]);
            exit;
        }
        
        $user = verifyToken();
        $input['id_user'] = $user['id'];
        $controller = new ReservationController($db);
        $controller->reserveADate($input);
        break;

    case 'update-user':
        if ($method !== 'PUT') {
            http_response_code(405);
            echo json_encode(["error" => "Méthode PUT requise"]);
            exit;
        }

        requireAdmin();
        $user = new UtilisateursController($db);
        $user->modifyUser($input);
        break;

    case 'delete-user':
        $id = isset($_GET['id']) ? $_GET['id'] : null;

        if ($method !== 'DELETE') {
            http_response_code(405);
            echo json_encode(["error" => "Méthode DELETE requise"]);
            exit;
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID manquant dans l'URL"]);
            exit;
        }

        verifyToken();

        $controller = new UtilisateursController($db);
        $controller->deleteUser($id);
        break;

    case 'dashboard-stats':
        requireAdmin();
        $controller = new ReservationController($db);
        $debut = $_GET['debut'] ?? date('Y-m-d');
        $fin = $_GET['fin'] ?? date('Y-m-d');
        $controller->getDashboardStats($debut, $fin);
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
}