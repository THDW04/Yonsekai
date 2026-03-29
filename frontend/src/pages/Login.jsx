import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components/auth/LoginForm';

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Connexion | Yonsekai</title>
                <meta name="description" content="Rejoignez l'aventure Yonsekai. Créez votre compte en quelques secondes pour réserver vos places et profiter d'une expérience immersive." />
            </Helmet>
            <main>
                <LoginForm />
            </main>
        </>
    )
}

export default Login;