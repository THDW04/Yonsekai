<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
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

//Vérifie si l'utilisateur est admin
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
        verifyToken();
        $users = new UtilisateursController($db);
        $users->getAll();
        break;

    case 'user':
        $idUser = verifyToken();
        $user = new UtilisateursController($db);
        $user->getProfileWithReservations($idUser['id']);
        break;

    case 'reservations':
        //code pour la réservation (Haya)
        //verifyToken();
        //$reservations = new UtilisateursController($db);
        //$reservations->getAllReservation();
        break;

    case 'delete-account':
        if ($method !== 'DELETE') {
            http_response_code(405);
            echo json_encode(["error" => "Méthode non autorisée. Utilisez DELETE."]);
            exit;
        }

        $idUser = verifyToken(); 

        $controller = new UtilisateursController($db);
        $controller->deleteUser($idUser['id']);
        break;

    case 'dashboard-stats':
        requireAdmin();
        $controller = new ReservationController($db);
        $debut = $_GET['debut'] ?? date('Y-m-d', strtotime('-7 days'));
        $fin = $_GET['fin'] ?? date('Y-m-d');
        $controller->getDashboardStats($debut, $fin);
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
}