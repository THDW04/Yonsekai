<?php
class Utilisateurs
{
    private $db;

    // On passe la connexion PDO au constructeur
    public function __construct($database)
    {
        $this->db = $database;
    }

    //Créer un utilisateur
    public function createUser($name, $firstName, $mail, $password)
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $query = $this->db->prepare("INSERT INTO utilisateurs(role, nom, prenom, mail, mot_de_passe) VALUES (:role, :nom, :prenom, :mail, :mot_de_passe)");
        return $query->execute([
            "role" => 'client',
            ":nom" => $name,
            ":prenom" => $firstName,
            ":mail" => $mail,
            ":mot_de_passe" => $hashedPassword
        ]);
    }

    //Trouve un utilisateur par son mail
    public function findByMail($mail)
    {
        $query = $this->db->prepare("SELECT * FROM utilisateurs WHERE mail = :mail");
        $query->execute([':mail' => $mail]);

        return $query->fetch(PDO::FETCH_ASSOC);
    }

    //Récuperer tous les utilisateurs
    public function getAll() {
        $query = $this->db->query("SELECT * FROM utilisateurs");
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>