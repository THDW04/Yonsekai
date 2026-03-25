<?php
class Reservation
{
    private $db;

    public function __construct($database)
    {
        $this->db = $database;
    }

    public function bookDate($date, $hour, $fk_user)
    {
        $query = $this->db->prepare("INSERT INTO reservation (date, horaire, fk_utilisateur) VALUES (:date, :hour, :fk_user)");
        $query->execute([
            ":date" => $date,
            ":hour" => $hour,
            ":fk_user" => $fk_user
        ]);
        return $this->db->lastInsertId();
    }

    public function findTypeTicket($nameTicket)
    {
        $query = $this->db->prepare("SELECT id FROM type_billet WHERE nom = :nameTicket");
        $query->execute([":nameTicket" => $nameTicket]);

        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['id'] : null;
    }


    public function bookTickets($fk_reservation, $fk_type, $quantity)
    {
        $query = $this->db->prepare("INSERT INTO reservation_type (fk_reservation, fk_type, quantite) VALUES (:fk_reservation, :fk_type, :quantity)");
        $query->execute([
            ":fk_reservation" => $fk_reservation,
            ":fk_type" => $fk_type,
            ":quantity" => $quantity
        ]);
    }

    public function getAllReservation()
    {
        $query = $this->db->prepare("SELECT * FROM reservation");
        return $query->fetchall(PDO::FETCH_ASSOC);
        $query->execute();
    }


    public function getReservationByUser($id)
    {
        $query = "SELECT id, date, horaire FROM reservation WHERE fk_utilisateur = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getStatsByHour($debut, $fin)
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

    public function getStatsByDay($debut, $fin)
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

    public function getStatsByTicketType($debut, $fin)
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