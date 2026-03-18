import { RegisterForm } from "../components/auth/RegisterForm";
import { Link } from 'react-router-dom';

export const Register = () =>{
    return(
      <section className="register-page">
      <div className="container">
        <h1>Rejoignez l'expérience</h1>
        <p>Inscrivez-vous pour réserver vos places pour l'exposition.</p>
        <RegisterForm />
        <Link to={"/"}>Retour à l'accueil</Link>
      </div>
    </section>
    )
}