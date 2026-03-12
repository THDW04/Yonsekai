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

    //Graphique : fréquentation par créneau horaire sur une semaine ou autre
    public function StatsByHour($debut, $fin)
    {
        $query = "SELECT horaire, SUM(quantite) AS total FROM reservation
                JOIN reservation_type ON reservation.id = reservation_type.fk_reservation
                WHERE reservation.date BETWEEN :debut AND :fin
                GROUP BY horaire
                ORDER BY horaire ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute(['debut' => $debut, 'fin' => $fin]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //Graphique : fréquentation par jour de la semaine
    public function StatsByDay($debut, $fin)
    {
        $query = "SELECT DAYNAME(reservation.date) AS jour, SUM(quantite) AS total
                FROM reservation
                JOIN reservation_type ON reservation.id = reservation_type.fk_reservation
                WHERE reservation.date BETWEEN :debut AND :fin
                GROUP BY date
                ORDER BY date ASC";

        $stmt = $this->db->prepare($query);
        $stmt->execute(['debut' => $debut, 'fin' => $fin]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //Graphique : répartition par type de billet
    public function StatsByTicketType($debut, $fin)
    {
        $query = "SELECT type_billet.nom, SUM(reservation_type.quantite) AS total
              FROM reservation
              JOIN reservation_type ON reservation.id = reservation_type.fk_reservation
              JOIN type_billet ON type_billet.id = reservation_type.fk_type
              WHERE reservation.date BETWEEN :debut AND :fin
              GROUP BY type_billet.nom";

        $stmt = $this->db->prepare($query);
        $stmt->execute(['debut' => $debut, 'fin' => $fin]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>