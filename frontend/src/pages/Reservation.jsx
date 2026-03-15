import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { TimeSlot } from "../components/TimeSlot";
import { PriceFormAdult, PriceFormStudent } from "../components/PriceForm";


export const Reservation = () => {

     const [value, setValue] = useState(new Date());

return (

    <>
    <h1>Réservez vos places</h1>

    <main>
        
    <form action="/reservation" method="POST">

    <Calendar 
    onChange={setValue} 
    value={value}
    maxDetail='month'
    minDetail='year'
    minDate={new Date()}
    locale="fr-FR"
    /> 
    
    <TimeSlot /> 

    
    <PriceFormAdult />
    <PriceFormStudent />


    <input type="submit" value="Valider votre réservation" />
    </form>

    </main>
    </>
);


}