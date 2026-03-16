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


     //Afficher les utilisateurs
    public function getAllUser()
{
    $query = $this->db->prepare(
        "SELECT id, nom, prenom, mail FROM utilisateurs");
    $query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

     //Récupérerle les informations d'un utilisateur par son id
public function getUserById($id)
{
    $query = $this->db->prepare(
        "SELECT id, nom, prenom, mail FROM utilisateurs WHERE id = :id");
    $query->execute([":id" => $id]);
    return $query->fetch(PDO::FETCH_ASSOC);
}

public function updateUser($id, $name, $firstName, $email)
{
    $query = $this->db->prepare("UPDATE utilisateurs SET nom = :nom, prenom = :prenom, mail = :mail WHERE id = :id");

    return $query->execute([
        ":id" => $id,
        ":nom" => $name,
        ":prenom" => $firstName,
        ":mail" => $email
    ]);
}

    //Supprimer un utilisateur
   public function deleteUser($id)
{
    $query = $this->db->prepare("DELETE FROM utilisateurs WHERE id = :id");
    return $query->execute([
        ":id" => $id
    ]);
}
}
?>