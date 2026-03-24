import styles from './ProfileReservations.module.css'
import Barcode from 'react-barcode'

export const ProfileReservations = ({ reservations }) => {
    if (reservations.length === 0) {
        return <p>Aucune réservation</p>;
    }

    return (
        <div className={styles.reservation}>
            <h2>Vos réservations</h2>
            <div className={styles.slider}>
                {reservations.map(reservation => {
                    const formattedDate = reservation.date
                        ? new Date(reservation.date)
                            .toLocaleDateString("fr-FR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })
                            .replace(/^./, (c) => c.toUpperCase())
                        : "";
                    return (
                        <div key={reservation.id} className={styles.ticketContainer}>
                            <div className={styles.ticket}>
                                <div className={styles.infosTicket}>
                                    <div>
                                        <p>{formattedDate}</p>
                                        <p>{reservation.horaire.slice(0, 5)}</p>
                                    </div>
                                    <div>
                                        <p className={styles.slogan}>Le musée des quatres éléments</p>
                                        <span>
                                            <img src="assets/img/logo.svg" alt="" />
                                            <h3>Yonsekai</h3>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.imgTicket}>
                                    <img src="assets/img/login-img.jpg" alt="" />
                                    {/*<p className={styles.title}>Nausicaä de la Vallée du Vent</p>*/}
                                </div>
                            </div>
                            <div className={styles.barCode}>
                                <Barcode
                                    value={reservation.date}
                                    height={50}
                                    fontSize={14}
                                    background="transparent"
                                    lineColor="#fff"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}