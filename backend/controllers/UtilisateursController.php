<?php
require_once __DIR__ . '/../models/Utilisateurs.php';
require_once __DIR__ . '/../models/Reservation.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;

class UtilisateursController
{
    private $userModel;
    private $reservationModel;

    public function __construct($db)
    {
        $this->userModel = new Utilisateurs($db);
        $this->reservationModel = new Reservation($db);
    }

    //Liste des utilisateurs
    public function getAll()
    {
        $users = $this->userModel->getAll();
        echo json_encode($users);
    }

    //  Informations et réservation d'un client
    public function getProfileWithReservations($id)
    {
        //récuperer un utilisateur
        $user = $this->userModel->getOneUser($id);

        //réservations de cet utilisateur
        $reservations = $this->reservationModel->getReservationByUser($user['id']);

        // fusionner dans un seul tableau
        $result = [
            "user" => [
                "id" => $user["id"],
                "nom" => $user["nom"],
                "prenom" => $user["prenom"],
                "mail" => $user["mail"]
            ],
            "reservations" => $reservations
        ];

        echo json_encode($result);
    }

    //Inscription
    public function register($data)
    {
        //récupérer les données
        $name = $data['name'];
        $firstName = $data['firstName'];
        $email = $data['mail'] ?? null;
        $password = $data['password'] ?? null;

        $existingUser = $this->userModel->findByMail($email);

        if ($existingUser) {
            http_response_code(409);
            echo json_encode([
                "message" => "Cet email est déjà utilisé"
            ]);
            return;
        }

        //créer l'utilisateur
        $success = $this->userModel->createUser($name, $firstName, $email, $password);

        if (!$success) {
            http_response_code(500);
            echo json_encode([
                "message" => "Erreur lors de la création"
            ]);
            return;
        }

        //réponse succès
        http_response_code(201);
        echo json_encode([
            "message" => "Compte créé avec succès"
        ]);
    }

    //Connexion
    public function login($data)
    {
        $email = $data['mail'] ?? null;
        $password = $data['password'] ?? null;

        $user = $this->userModel->findByMail($email);

        if ($user && password_verify($password, $user['mot_de_passe'])) {

            $key = "une_cle_tres_longue_et_securisee_pour_ma_sae_2026_yonsekai_equipe_dev";

            $payload = [
                "user_id" => $user["id"],
                "role" => $user["role"],
                "exp" => time() + 3600
            ];

            $token = JWT::encode($payload, $key, "HS256");

            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Connexion réussie",
                "token" => $token
            ]);
        } else {

            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Identifiant ou mot de passe incorrect"
            ]);
        }
    }
}