import { Helmet } from 'react-helmet-async';
import { ReservationForm } from "../components/reservation/ReservationForm/ReservationForm";

const Reservation = () => {
    
    return (
        <>
        <Helmet>
            <title>Réservation | Yonsekai</title>
            <meta name="description" content="Réservez vos places pour l'univers Yonsekai. Sélectionnez vos tickets en quelques clics et préparez-vous à une immersion totale dans notre monde." />
        </Helmet>
        <main>
            <h1 style={{textAlign:"center", fontSize:"3rem", margin:"20px 0 50px"}}>Reserver vos places</h1>
            <ReservationForm/>
        </main>
        </>
    );

}

export default Reservation;