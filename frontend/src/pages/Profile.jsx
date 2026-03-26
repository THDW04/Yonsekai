import { useEffect, useState } from "react"
import { ProfileInformation } from "../components/profile/ProfileInformation/ProfileInformation"
import { ProfileReservations } from "../components/profile/ProfileReservation/ProfileReservations"
import { LogoutBtn } from "../components/auth/LogoutBtn"
import { DeleteAccount } from "../components/profile/DeleteAccount/DeleteAccount"
import '../assets/css/profile.css'

export const Profile = () => {

  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("userToken");

    if (!token) {
      window.location.href = "/connexion";
      return;
    }

    fetch("http://localhost/yonsekai/backend/api/index.php?action=user", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {

        if (response.status === 401) {
          localStorage.removeItem("userToken");
          window.location.href = "/connexion";
          return;
        }

        return response.json();
      })
      .then(data => {

        if (!data) return;

        setUser(data.user);
        setReservations(data.reservations);

      })
      .catch(error => {
        console.error(error);
        window.location.href = "/connexion";
      });

  }, []);

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <main className="profil-container">
      <LogoutBtn /> 
      <h1>Bienvenue sur votre espace !</h1>
      <p>Vous trouverez ici vos informations et vos réservations.</p>

      <section className="client-infos">
        <ProfileInformation
          nom={user.nom}
          prenom={user.prenom}
          mail={user.mail}
        />
        
        <ProfileReservations reservations={reservations} />
      </section>

      <DeleteAccount />
    </main>
  );
};