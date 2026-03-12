<?php
require_once __DIR__ . '/../models/Reservation.php';

class ReservationController
{
    private $reservationModel;

    public function __construct($db)
    {
        $this->reservationModel = new Reservation($db);
    }

public function getDashboardStats($debut, $fin)
{
    $stats = [
        "period" => [
            "start" => $debut,
            "end" => $fin
        ],
        "byHour" => $this->reservationModel->getStatsByHour($debut, $fin),
        "byDay" => $this->reservationModel->getStatsByDay($debut, $fin),
        "byTicket" => $this->reservationModel->getStatsByTicketType($debut, $fin)
    ];

    http_response_code(200);
    echo json_encode($stats);
}
}
?>