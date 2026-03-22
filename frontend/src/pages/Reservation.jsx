import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { TimeSlot } from "../components/reservation/TimeSlot";
import { PriceForm } from "../components/reservation/PriceForm";


export const Reservation = () => {
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
                'http://localhost/yonsekai/backend/api/apiController.php?action=create-reservation',
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
            console.error(err);
            setError(err.message);
        }
    };

    if (success) {
        return (
            <main>
                <div className="success-card">
                    <h1>🎉 Réservation confirmée !</h1>
                    <p>Merci pour votre commande. Vous pouvez retrouver vos billets dans votre espace personnel.</p>
                    <button onClick={() => setSuccess(false)}>Faire une autre réservation</button>
                </div>
            </main>
        );
    }

    return (
        <main>
            <h1>Réservez vos places</h1>
            {error && (
                <div style={{ color: 'white', background: '#e74c3c', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}>
                    <strong>Erreur :</strong> {error}
                </div>
            )}
            <form onSubmit={handleSubmit} >
                <Calendar
                    onChange={setDate}
                    value={date}
                    maxDetail='month'
                    minDetail='year'
                    minDate={new Date()}
                    locale="fr-FR"
                />

                {date && (
                    <TimeSlot
                        date={date}
                        hour={hour}
                        setHour={setHour}
                    />
                )}

                <PriceForm
                    label="Adultes"
                    value={numberAdult}
                    setValue={setNumberAdult}
                    total={total}
                />

                <PriceForm
                    label="Moins de 25 ans"
                    value={numberStudent}
                    setValue={setNumberStudent}
                    total={total}
                />

                <button disabled={!date || !hour}>Valider</button>
            </form>
        </main>
    );

}