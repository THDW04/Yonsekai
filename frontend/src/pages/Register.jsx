import { Helmet } from "react-helmet-async";
import { RegisterForm } from "../components/auth/RegisterForm";

const Register = () => {
    return (
        <>
            <Helmet>
                <title>Inscription | Yonsekai</title>
                <meta name="description" content="Rejoignez l'aventure Yonsekai. Créez votre compte en quelques secondes pour réserver vos places et profiter d'une expérience immersive." />
            </Helmet>
            <main>
                <RegisterForm />
            </main>
        </>
    )
}

export default Register;