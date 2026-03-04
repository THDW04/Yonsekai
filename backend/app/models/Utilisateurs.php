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
        $query = $this->db->prepare("INSERT INTO utilisateurs(nom, prenom, mail, mot_de_passe) VALUES (:nom, :prenom, :mail, :mot_de_passe)");
        $query->execute([
            ":nom" => $name,
            ":prenom" => $firstName,
            ":mail" => $mail,
            ":mot_de_passe" => $password
        ]);
    }

    //Trouve un utilisateur par son email
    public function findByMail($mail)
    {
        $query = $this->db->prepare("SELECT * FROM utilisateurs WHERE email = :email");
        $query->execute([':mail' => $mail]);

        return $query->fetch(PDO::FETCH_ASSOC);
    }
}
?>