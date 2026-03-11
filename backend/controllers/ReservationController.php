<?php
require_once __DIR__ . '/../models/Reservation.php';

class ReservationController
{
    private $reservationModel;

    public function __construct($db)
    {
        $this->userModel = new Utilisateurs($db);
    }
}
?>