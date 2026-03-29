import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { useState, useEffect } from 'react';
import { TimeSlot } from "../TimeSlot/TimeSlot";
import { PriceForm } from "../PriceForm/PriceForm";
import styles from './ReservationForm.module.css'


export const ReservationForm = () => {
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState("");
    const [numberAdult, setNumberAdult] = useState(0);
    const [numberStudent, setNumberStudent] = useState(0);
    const total = numberAdult + numberStudent;

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            window.location.href = "/connexion";
            return;
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("userToken");

        if (!token) {
            setError("Session expirée, veuillez vous reconnecter.");
            return;
        }

        if (!date || !hour || (numberAdult + numberStudent === 0)) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        const reservationData = {
            date: formattedDate,
            hour,
            numberAdult,
            numberStudent
        };

        try {
            setError(null);
            setSuccess(false);

            const response = await fetch(
                'https://yonsekai.vilasse.projetsmmichamps.fr/yonsekai/api/index.php??action=create-reservation',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(reservationData),
                }
            );
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Une erreur est survenue");

            setSuccess(true);
            setHour("");
            setNumberAdult(0);
            setNumberStudent(0);

        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    if (success) {
        return (
            <main className={styles.mainSuccess}>
                <div className={styles.successCard}>
                    <h1>Réservation confirmée !</h1>
                    <p>Merci pour votre commande. Vous recevrez un mail avec vos billets sous peu.</p>
                    <p>Vous pouvez également retrouver vos billets dans votre <a href="/profil" class={styles.btnLink}>espace personnel</a>.
                    </p>
                    <button onClick={() => setSuccess(false)}>Faire une autre réservation</button>
                </div>
            </main>
        );
    }

    return (
        <section className={styles.reservationContainer}>
            {error && (
                <div className={styles.error}>
                    <strong>Erreur :</strong> {error}
                </div>
            )}
            <form onSubmit={handleSubmit} >
                <h2>Sélectionnez une date</h2>
                <div className={styles.bookDate}>
                    <div className={styles.calendarContainer}>
                        <Calendar
                            onChange={setDate}
                            value={date}
                            maxDetail='month'
                            minDetail='year'
                            minDate={new Date()}
                            locale="fr-FR"
                        />
                        <div className={styles.legend}>
                            <div className={styles.legendItem}>
                                <span className={`${styles.dot} ${styles.selected}`}></span>
                                <span>Sélectionné</span>
                            </div>
                            <div className={styles.legendItem}>
                                <span className={`${styles.dot} ${styles.today}`}></span>
                                <span>Aujourd'hui</span>
                            </div>
                            <div className={styles.legendItem}>
                                <span className={`${styles.dot} ${styles.available}`}></span>
                                <span>Disponible</span>
                            </div>
                            <div className={styles.legendItem}>
                                <span className={`${styles.dot} ${styles.unavailable}`}></span>
                                <span>Passé</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.timeContainer}>
                        {date && (
                            <TimeSlot
                                date={date}
                                hour={hour}
                                setHour={setHour}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.ticketSelection}>
                    <h2>Choix des participants</h2>
                    <div className={`${styles.infoBox} ${total === 10 ? styles.limitReached : ''}`}>
                        <img src="assets/img/attention.svg" alt="" />
                        <p>
                            {total >= 10
                                ? "Vous avez atteint la limite maximale de 10 billets."
                                : "Vous pouvez sélectionner jusqu'à 10 billets par commande."
                            }
                        </p>
                    </div>

                    <div className={styles.formFields}>
                        <PriceForm
                            label="Adultes"
                            description="Plein tarif. Valable pour les visiteurs de 26 à 64 ans."
                            value={numberAdult}
                            setValue={setNumberAdult}
                            total={total}
                        />
                        <PriceForm
                            label="Moins de 25 ans"
                            description="Tarif réduit. Valable pour les jeunes de 18 à 25 ans inclus (un justificatif d'âge pourra être demandé à l'entrée)."
                            value={numberStudent}
                            setValue={setNumberStudent}
                            total={total}
                        />
                    </div>
                </div>

                <button type="submit" disabled={!date || !hour}>Valider</button>
            </form>
        </section>
    );

}