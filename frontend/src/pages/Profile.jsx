import { useEffect, useState } from "react";
import { ProfileInformation } from "../components/ProfileInformation";
import { ProfileReservations } from "../components/ProfileReservations";
import { LogoutBtn } from "../components/LogoutBtn";

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
    <section>
      <h1>Bienvenue sur votre espace !</h1>
      <p>Vous trouverez ici vos informations et vos réservations.</p>

      <ProfileInformation
        nom={user.nom}
        prenom={user.prenom}
        mail={user.mail}
      />

      <ProfileReservations reservations={reservations} />

      <LogoutBtn />
    </section>
  );
};