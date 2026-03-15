<?php
require_once __DIR__ . '/../models/Reservation.php';

use Firebase\JWT\JWT;

 class ReservationController
{
    private $reservationModel;

    public function __construct($db)
    {
        $this->reservationModel = new Reservation($db);
    }

    //Faire une réservation
    public function reserveADate($data)
    {
        //récupérer les données
        $date = $data['date'];
        $hour = $data['hour'];
        $numberAdult = $data['numberAdult'];
        $numberStudent= $data['numberStudent'];
        $fk_user = 


        $fk_reservation = bookDate($date, $hour, $fk_user);

        if ( $numberAdult > 0 ){
        $nameTicket = "adult";
        $quantity = $numberAdult;

        $fk_type = findTypeTicket($nameTicket);
        bookTickets($fk_reservation, $fk_type, $quantity);

        }

        if ($numberStudent > 0){

        $nameTicket = "jeune";
        $quantity = $numberStudent;

        $fk_type = findTypeTicket($nameTicket);
        bookTickets($fk_reservation, $fk_type, $quantity);
        }


    }
        
    public function allReservation () 
    {
        $allReservation = getAllReservation();

    }
}