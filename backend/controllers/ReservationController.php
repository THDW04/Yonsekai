<?php
require_once __DIR__ . '/../models/Reservation.php';

class ReservationController
{
    private $reservationModel;
    private $db; 

    public function __construct($db)
    {
        $this->db = $db;
        $this->reservationModel = new Reservation($db);
    }

    public function reserveADate($data)
    {
        header('Content-Type: application/json');

        if (empty($data['date']) || empty($data['hour']) || empty($data['id_user'])) {
            http_response_code(400);
            echo json_encode(["error" => "Données incomplètes"]);
            return;
        }

        $numberAdult = (int) ($data['numberAdult'] ?? 0);
        $numberStudent = (int) ($data['numberStudent'] ?? 0);

        if (($numberAdult + $numberStudent) <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Veuillez sélectionner au moins un billet"]);
            return;
        }

        try {
            $this->db->beginTransaction();

            $fk_reservation = $this->reservationModel->bookDate($data['date'], $data['hour'], $data['id_user']);

            $types = [
                "adulte" => $numberAdult,
                "jeune" => $numberStudent
            ];

            foreach ($types as $type => $quantity) {
                if ($quantity > 0) {
                    $fk_type = $this->reservationModel->findTypeTicket($type);

                    if (!$fk_type) {
                        throw new Exception("Type de billet '$type' introuvable en base.");
                    }

                    $this->reservationModel->bookTickets($fk_reservation, $fk_type, $quantity);
                }
            }

            $this->db->commit(); 

            http_response_code(201);
            echo json_encode([
                "message" => "Réservation confirmée",
                "id" => $fk_reservation
            ]);

        } catch (Exception $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }

            http_response_code(500);
            echo json_encode([
                "error" => "Erreur lors de la réservation"
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