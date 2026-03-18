export const ProfileReservations = ({ reservations }) => {
    if (reservations.length === 0) {
        return <p>Aucune réservation</p>;
    }

    return (
        <div className="reservation">
            <h2>Vos réservations</h2>
            {reservations.map(reservation => (
                <div key={reservation.id}>
                    <p>Date : {reservation.date}</p>
                    <p>Horaire : {reservation.horaire}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}