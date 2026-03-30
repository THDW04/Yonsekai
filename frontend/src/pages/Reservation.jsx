import { Helmet } from 'react-helmet-async';
import { ReservationForm } from "../components/reservation/ReservationForm/ReservationForm";
import styles from '../assets/css/reservation.module.css'
import {Footer} from '../components/footer/Footer'

import { useTranslation } from "react-i18next";
const Reservation = () => {
      const { t } = useTranslation();
    return (
        <>
        <Helmet>
            <title>Réservation | Yonsekai</title>
            <meta name="description" content="Réservez vos places pour l'univers Yonsekai. Sélectionnez vos tickets en quelques clics et préparez-vous à une immersion totale dans notre monde." />
        </Helmet>
        <main className={styles.container}>
            <h1>{t("titleReservation")}</h1>
            <div className={styles.infos}>
                <h2>{t("disclaimer")}</h2>
                <div>
                    <img src="assets/img/attention.svg" alt="" />
                    <p>{t("closedInformation")}</p>
                </div>
            </div>
            <ReservationForm/>
        </main>

        <Footer />


        </>
    );

}

export default Reservation;