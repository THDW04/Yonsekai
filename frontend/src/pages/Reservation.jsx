import { ReservationForm } from "../components/reservation/ReservationForm/ReservationForm";

const Reservation = () => {
    
    return (
        <main>
            <h1 style={{textAlign:"center", fontSize:"3rem", margin:"20px 0 50px"}}>Reserver vos places</h1>
            <ReservationForm/>
        </main>
    );

}

export default Reservation;