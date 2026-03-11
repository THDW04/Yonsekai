<?php
class Reservation
{
    private $db;

    // On passe la connexion PDO au constructeur
    public function __construct($database)
    {
        $this->db = $database;
    }

    //Récupère la ou les réservation(s) d'un client
    public function getReservationByUser($id)
    {
        $query = "SELECT id, date, horaire FROM reservation WHERE fk_utilisateur = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
?>