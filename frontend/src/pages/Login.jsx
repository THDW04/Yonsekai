import { LoginForm } from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';

export const Login = () =>{
    return(
      <section className="login-page">
      <div className="container">
        <h1>Connectez-vous !</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        <LoginForm />
        <Link to={"/"}>Retour à l'accueil</Link>
      </div>
    </section>
    )
}