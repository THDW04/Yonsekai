<?php

use PHPMailer\PHPMailer\PHPMailer;
use Dompdf\Dompdf;
use Dompdf\Options;

class MailService
{
    private static function getTranslations(): array
    {
        return [
            'fr' => [
                'subject'   => "🎟️ Votre billet – Réservation pour l'exposition Yonsekai",
                'hello'     => "Bonjour",
                'confirmed' => "Votre réservation est confirmée ! Votre billet est disponible en pièce jointe.",
                'ref'       => "Réservation",
                'date'      => "📅 Date",
                'hour'      => "🕐 Heure",
                'adults'    => "👤 Adultes",
                'students'  => "🎓 Jeunes",
                'notice'    => "Présentez votre billet PDF à l'entrée. À très bientôt !",
                'footer'    => "© 2026 Yonsekai — Tous droits réservés",
                'altbody'   => "Bonjour %s, votre réservation #%s est confirmée. Date : %s à %s.",
            ],
            'en' => [
                'subject'   => "🎟️ Your ticket – Yonsekai Exhibition Booking",
                'hello'     => "Hello",
                'confirmed' => "Your booking is confirmed! Your ticket is available as an attachment.",
                'ref'       => "Booking",
                'date'      => "📅 Date",
                'hour'      => "🕐 Time",
                'adults'    => "👤 Adults",
                'students'  => "🎓 Youth",
                'notice'    => "Please present your PDF ticket at the entrance. See you soon!",
                'footer'    => "© 2026 Yonsekai — All rights reserved",
                'altbody'   => "Hello %s, your booking #%s is confirmed. Date: %s at %s.",
            ],
        ];
    }

    public static function sendTicket(array $reservation): bool
    {
        $translations = self::getTranslations();
        $lang = $reservation['lang'] ?? 'fr';
        $t = $translations[$lang] ?? $translations['fr'];

        $pdf = self::generatePDF($reservation, $t);
        error_log("Taille PDF généré : " . strlen($pdf) . " octets");

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'cc5af296784420';
        $mail->Password   = 'da4d37a03ae881';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom('noreply@yonsekai.com', 'Yonsekai');
        $mail->addAddress($reservation['email'], $reservation['nom']);

        $mail->isHTML(true);
        $mail->Subject = $t['subject'];

        $mail->Body = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0; padding:0; background:#f0f0f0; font-family: Montserrat, sans-serif;'>

  <table width='100%' cellpadding='0' cellspacing='0'>
    <tr>
      <td align='center' style='padding: 40px 20px;'>

        <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);'>

          <tr>
            <td style='background:#040412; padding:36px 30px; text-align:center;'>
              <h1 style='color:#ffffff; font-size:26px; margin:0; letter-spacing:3px; text-transform:uppercase;'>YONSEKAI</h1>
              <p style='color:#aaaaaa; font-size:13px; margin:8px 0 0; letter-spacing:1px;'>🎟 Confirmation de réservation</p>
            </td>
          </tr>

          <tr>
            <td style='padding:36px 30px;'>

              <p style='color:#333333; font-size:16px; margin:0 0 8px;'>
                {$t['hello']} <strong>{$reservation['nom']}</strong>,
              </p>
              <p style='color:#666666; font-size:14px; line-height:1.7; margin:0 0 24px;'>
                {$t['confirmed']}
              </p>

              <!-- Badge référence -->
              <table width='100%' cellpadding='0' cellspacing='0' style='margin-bottom:24px;'>
                <tr>
                  <td align='center'>
                    <span style='background:#e8f0ff; color:#040412; padding:8px 22px; border-radius:20px; font-weight:bold; font-size:14px; display:inline-block;'>
                      {$t['ref']} #{$reservation['id']}
                    </span>
                  </td>
                </tr>
              </table>

              <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:collapse; margin-bottom:24px;'>
                <tr style='border-bottom:1px solid #f0f0f0;'>
                  <td style='color:#999; font-size:13px; padding:12px 4px; width:45%;'>{$t['date']}</td>
                  <td style='color:#040412; font-weight:bold; font-size:14px; padding:12px 4px;'>{$reservation['date']}</td>
                </tr>
                <tr style='border-bottom:1px solid #f0f0f0;'>
                  <td style='color:#999; font-size:13px; padding:12px 4px;'>{$t['hour']}</td>
                  <td style='color:#040412; font-weight:bold; font-size:14px; padding:12px 4px;'>{$reservation['hour']}</td>
                </tr>
                <tr style='border-bottom:1px solid #f0f0f0;'>
                  <td style='color:#999; font-size:13px; padding:12px 4px;'>{$t['adults']}</td>
                  <td style='color:#040412; font-weight:bold; font-size:14px; padding:12px 4px;'>{$reservation['numberAdult']}</td>
                </tr>
                <tr>
                  <td style='color:#999; font-size:13px; padding:12px 4px;'>{$t['students']}</td>
                  <td style='color:#040412; font-weight:bold; font-size:14px; padding:12px 4px;'>{$reservation['numberStudent']}</td>
                </tr>
              </table>

              <table width='100%' cellpadding='0' cellspacing='0'>
                <tr>
                  <td style='border-left:3px solid #040412; padding:10px 16px; background:#f8f9ff; border-radius:0 6px 6px 0;'>
                    <p style='color:#555; font-size:13px; margin:0; line-height:1.6;'>{$t['notice']}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style='background:#040412; padding:20px; text-align:center;'>
              <p style='color:#aaaaaa; font-size:12px; margin:0;'>{$t['footer']}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
        ";

        $mail->AltBody = sprintf(
            $t['altbody'],
            $reservation['nom'],
            $reservation['id'],
            $reservation['date'],
            $reservation['hour']
        );

        if (!empty($pdf)) {
            $mail->addStringAttachment(
                $pdf,
                "billet-{$reservation['id']}.pdf",
                'base64',
                'application/pdf'
            );
        } else {
            error_log("PDF vide, pièce jointe non ajoutée pour la réservation #{$reservation['id']}");
        }

        return $mail->send();
    }

    private static function generatePDF(array $reservation, array $t): string
    {
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', false);
        $options->set('defaultFont', 'Montserrat');

        $dompdf = new Dompdf($options);

        $html = "
<html>
<head>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Montserrat, sans-serif; background: #f4f4f4; padding: 30px; }

    .ticket {
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        max-width: 600px;
        margin: auto;
    }

    .ticket-header {
        background: #040412;
        color: white;
        padding: 30px;
        text-align: center;
    }
    .ticket-header h1 { font-size: 26px; letter-spacing: 3px; }
    .ticket-header p  { font-size: 13px; color: #aaa; margin-top: 6px; }

    .ticket-body { padding: 30px; }

    .ref {
        display: inline-block;
        background: #e8f0ff;
        color: #040412;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .ticket-body h2 {
        font-size: 16px;
        color: #040412;
        margin-bottom: 16px;
        border-bottom: 2px solid #e0e0e0;
        padding-bottom: 10px;
    }

    .info-grid { display: table; width: 100%; margin-bottom: 20px; }
    .info-row  { display: table-row; }
    .info-label, .info-value {
        display: table-cell;
        padding: 8px 4px;
        font-size: 14px;
        border-bottom: 1px solid #f0f0f0;
    }
    .info-label { color: #888; width: 40%; }
    .info-value { color: #222; font-weight: bold; }

    .divider { border: none; border-top: 2px dashed #ddd; margin: 20px 0; }

    .badge-row { display: table; width: 100%; margin-bottom: 20px; }
    .badge {
        display: table-cell;
        text-align: center;
        background: #f0f4ff;
        border-radius: 8px;
        padding: 14px;
        width: 48%;
    }
    .badge-spacer  { display: table-cell; width: 4%; }
    .badge-count   { font-size: 28px; font-weight: bold; color: #040412; }
    .badge-label   { font-size: 12px; color: #666; margin-top: 4px; }

    .notice {
        border-left: 3px solid #040412;
        padding: 10px 14px;
        background: #f8f9ff;
        font-size: 13px;
        color: #555;
        margin-bottom: 20px;
    }

    .ticket-footer {
        background: #040412;
        color: #aaa;
        text-align: center;
        padding: 16px;
        font-size: 12px;
    }
</style>
</head>
<body>
<div class='ticket'>

    <div class='ticket-header'>
        <h1>YONSEKAI</h1>
        <p>🎟 {$t['ref']} #{$reservation['id']}</p>
    </div>

    <div class='ticket-body'>
        <div class='ref'>{$t['ref']} #{$reservation['id']}</div>

        <h2>Informations</h2>

        <div class='info-grid'>
            <div class='info-row'>
                <div class='info-label'>{$t['date']}</div>
                <div class='info-value'>{$reservation['date']}</div>
            </div>
            <div class='info-row'>
                <div class='info-label'>{$t['hour']}</div>
                <div class='info-value'>{$reservation['hour']}</div>
            </div>
            <div class='info-row'>
                <div class='info-label'>Nom</div>
                <div class='info-value'>{$reservation['nom']}</div>
            </div>
        </div>

        <hr class='divider'>

        <div class='badge-row'>
            <div class='badge'>
                <div class='badge-count'>{$reservation['numberAdult']}</div>
                <div class='badge-label'>{$t['adults']}</div>
            </div>
            <div class='badge-spacer'></div>
            <div class='badge'>
                <div class='badge-count'>{$reservation['numberStudent']}</div>
                <div class='badge-label'>{$t['students']}</div>
            </div>
        </div>

        <div class='notice'>{$t['notice']}</div>
    </div>

    <div class='ticket-footer'>{$t['footer']}</div>

</div>
</body>
</html>";

        $dompdf->loadHtml($html, 'UTF-8');
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        $output = $dompdf->output();
        error_log("Taille PDF générée : " . strlen($output) . " octets");

        return $output;
    }
}