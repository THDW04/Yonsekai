<?php
class Utilisateurs
{
    private $db;

    public function __construct($database)
    {
        $this->db = $database;
    }

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

    public function findByMail($mail)
    {
        $query = $this->db->prepare("SELECT * FROM utilisateurs WHERE mail = :mail");
        $query->execute([':mail' => $mail]);

        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll()
    {
        $query = $this->db->prepare("SELECT * FROM utilisateurs");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOneUser($id)
    {
        $query = $this->db->prepare("SELECT id, nom, prenom, mail FROM utilisateurs WHERE id = :id");
        $query->bindValue(':id', $id, PDO::PARAM_STR);
        $query->execute();
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

    public function deleteFullAccount($userId)
    {
        try {
            $this->db->beginTransaction();

            $queries = [
                "DELETE FROM reservation_type 
             WHERE fk_reservation IN (
                 SELECT id FROM reservation WHERE fk_utilisateur = :id
             )",
                "DELETE FROM reservation WHERE fk_utilisateur = :id",
                "DELETE FROM utilisateurs WHERE id = :id"
            ];

            foreach ($queries as $sql) {
                $stmt = $this->db->prepare($sql);
                $stmt->execute(['id' => $userId]);
            }

            $this->db->commit();
            return true;

        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
?>