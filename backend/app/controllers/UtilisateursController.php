<?php
require_once __DIR__ . '/../models/Utilisateurs.php';

use Firebase\JWT\JWT;

class UtilisateursController
{
    private $userModel;

    public function __construct($db)
    {
        $this->userModel = new Utilisateurs($db);
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

            $key = "SUPER_SECRET_KEY";

            $payload = [
                "user_id" => $user["id"],
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

    public function controlUser ()
    {
        

    }

    public function getInformation ()
    {

    
    }
}