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

    /*public function reserveADate($data)
    {
        $date = $data['date'];
        $hour = $data['hour'];
        $numberAdult = $data['numberAdult'];
        $numberStudent = $data['numberStudent'];
        $fk_user = $data['id_user'];


        $fk_reservation = $this->reservationModel->bookDate($date, $hour, $fk_user);

        if ($numberAdult > 0) {
            $nameTicket = "adult";
            $quantity = $numberAdult;

            $fk_type = $this->reservationModel->findTypeTicket($nameTicket);
            $this->reservationModel->bookTickets($fk_reservation, $fk_type, $quantity);

        }

        if ($numberStudent > 0) {

            $nameTicket = "jeune";
            $quantity = $numberStudent;

            $fk_type = $this->reservationModel->findTypeTicket($nameTicket);
            $this->reservationModel->bookTickets($fk_reservation, $fk_type, $quantity);
        }
    }*/

    public function reserveADate($data)
    {
        header('Content-Type: application/json');

        if (
            empty($data['date']) ||
            empty($data['hour']) ||
            empty($data['id_user'])
        ) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides"]);
            return;
        }

        $date = $data['date'];
        $hour = $data['hour'];
        $numberAdult = (int) ($data['numberAdult'] ?? 0);
        $numberStudent = (int) ($data['numberStudent'] ?? 0);
        $fk_user = (int) $data['id_user'];

        $total = $numberAdult + $numberStudent;

        if ($total <= 0 || $total > 10) {
            http_response_code(400);
            echo json_encode(["error" => "Nombre de billets invalide"]);
            return;
        }

        try {
            $fk_reservation = $this->reservationModel->bookDate($date, $hour, $fk_user);

            $types = [
                "adult" => $numberAdult,
                "jeune" => $numberStudent
            ];

            foreach ($types as $type => $quantity) {
                if ($quantity > 0) {
                    $fk_type = $this->reservationModel->findTypeTicket($type);
                    $this->reservationModel->bookTickets($fk_reservation, $fk_type, $quantity);
                }
            }

            http_response_code(201);
            echo json_encode([
                "message" => "Réservation confirmée",
                "id" => $fk_reservation
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "error" => "Erreur serveur"
            ]);
        }
    }
    public function allReservation()
    {
        $allReservation = $this->reservationModel->getAllReservation();
        http_response_code(200);
        echo json_encode($allReservation);
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