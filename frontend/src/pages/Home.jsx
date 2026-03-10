import { Link } from 'react-router-dom';

export const Home = () =>{
    return(
      <section className="home-page">
      <div className="container">
        <p>Vous êtes sur la page d'accueil</p>
        <Link to="/inscription">S'inscrire</Link> <br />
        <Link to="/connexion">Se connecter</Link> <br />
        <Link to="/profil">Accéder à mon profil</Link>
      </div>
    </section>
    )
}