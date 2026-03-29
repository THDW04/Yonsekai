import { Helmet } from 'react-helmet-async';
import { ReservationForm } from "../components/reservation/ReservationForm/ReservationForm";
import styles from '../assets/css/reservation.module.css'

const Reservation = () => {
    
    return (
        <>
        <Helmet>
            <title>Réservation | Yonsekai</title>
            <meta name="description" content="Réservez vos places pour l'univers Yonsekai. Sélectionnez vos tickets en quelques clics et préparez-vous à une immersion totale dans notre monde." />
        </Helmet>
        <main className={styles.container}>
            <h1>Reserver vos places</h1>
            <div className={styles.infos}>
                <h2>Attention</h2>
                <div>
                    <img src="assets/img/attention.svg" alt="" />
                    <p>La dernière admission se fait 1h avant la fermeture. L'évacuation des salles commence 30 min avant la fermeture. <br />Consulter les salles ouvertes le jour de votre visite.</p>
                </div>
            </div>
            <ReservationForm/>
        </main>
        </>
    );

}

export default Reservation;