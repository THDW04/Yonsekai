import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { TimeSlot } from "../components/reservation/TimeSlot";
import { PriceFormAdult, PriceFormStudent } from "../components/reservation/PriceForm";
//import { CounterPrice } from "../components/reservation/CounterPrice";


export const Reservation = () => {

    const [date, setDate] = useState(null);
    const [hour, setHour] = useState("");
    const [numberAdult, setNumberAdult] = useState(0);
    const [numberStudent, setNumberStudent] = useState(0);

        const handleSubmit = (e) => {
        e.preventDefault();

        const reservationData = {
            hour: hour,
            date: date,
            numberAdult: numberAdult,
            numberStudent: numberStudent
        };
    

        //url provisoire
        fetch('http://localhost/yonsekai/backend/api/apiController.php?action=register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Erreur serveur');
                return response.json();
            })
            .then(data => {
                console.log('Succès:', data);
            })
            .catch(err => {
                console.error('Erreur de connexion:', err);
            });

    }

return (

    <>
    <h1>Réservez vos places</h1>

    <main>
        
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
    ) }

    
   <PriceFormAdult>
        
    </PriceFormAdult>

    <PriceFormStudent>

    </PriceFormStudent>


    <input type="submit" value="Valider votre réservation" />
    </form>

    </main>
    </>
);

}