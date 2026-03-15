<?php
class Reservation
{
    private $db;

    // On passe la connexion PDO au constructeur
    public function __construct($database)
    {
        $this->db = $database;
    }

    //Faire une réservation

        //Réserver un créneau
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

        //Trouver le type de billet qu'on veut
        public function findTypeTicket($nameTicket)
        {
            $query = $this->db->prepare("Select id INTO type_billet WHERE nom=:nameTicket");
            $query->execute([":nameTicket" => $nameTicket]);
            return $this->db->lastInsertId();
        }

        //Réserver les billets en fonction de la réservation

        public function bookTickets($fk_reservation, $fk_type, $quantity)
        {
            $query = $this->db->prepare("INSERT FROM reservation_type (fk_reservation, fk_type, quantite) VALUES (:fk_reservation, :fk_type, :quantity)");
            $query->execute([
                ":fk_reservation" => $fk_reservation,
                ":fk_type" => $fk_type,
                ":quantity" => $quantity
            ]);
        }

    //Afficher toutes les réservations
     public function getAllReservation()
    {
        $query = $this->db->prepare("SELECT * FROM reservation");
        return $query->fetchall(PDO::FETCH_ASSOC);
        $query->execute();
    }

}
?>