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
            $query = $this->db->prepare("INSERT INTO reservation (date, heure, fk_utilisateur) VALUES (:date, :hour, :fk_user)");
            $query->execute([
                ":date" => $date,
                ":hour" => $hour,
                ":fk_user" => $fk_user
            ]);
        }

        //Choissir ses places
        public function bookPlaces($fk_reservation, $fk_type, $quantity)
        {
            $query = $this->db->prepare("INSERT INTO reservation_billet (fk_reservation, fk_type, quantité) VALUES (:fk_reservation, :fk_typr, :quantity)");
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
        return $query->fetch(PDO::FETCH_ASSOC);
    }

}
?>