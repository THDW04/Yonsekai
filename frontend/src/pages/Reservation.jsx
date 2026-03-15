import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { TimeSlot } from "../components/TimeSlot";
import { PriceFormAdult, PriceFormStudent } from "../components/PriceForm";
import { CounterPrice } from "../components/CounterPrice";


export const Reservation = () => {

    const [value, setValue] = useState(new Date());
    
    const [numberAdult, setNumberAdult] = useState(0);
    const [numberStudent, setNumberStudent] = useState(0);



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

    
   <PriceFormAdult>
        <CounterPrice 
            value={numberAdult}
            setValue={setNumberAdult}
        />
    </PriceFormAdult>

    <PriceFormStudent>
        <CounterPrice 
            value={numberStudent}
            setValue={setNumberStudent}
    />
    </PriceFormStudent>


    <input type="submit" value="Valider votre réservation" />
    </form>

    </main>
    </>
);


}