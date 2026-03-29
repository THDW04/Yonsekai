import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import styles from './auth.module.css'
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const userDataLogin = { mail, password };

        try {
            const response = await fetch('https://yonsekai.vilasse.projetsmmichamps.fr/yonsekai/api/index.php??action=login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userDataLogin),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Erreur serveur : ${response.status}`);
            }

            localStorage.setItem('userToken', data.token);
            const decoded = jwtDecode(data.token);

            window.location.href = decoded.role === "admin" ? "/administration" : "/profil";

        } catch (err) {
            setError('Erreur de connexion');
            console.error('Erreur de connexion:', err);
        }
    };

    return (
        <section className={styles.authPage}>
            <div className={styles.visual}>
                <img src="assets/img/login-img.jpg" alt="" />
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} method='POST'>
                    <h1>Connectez-vous !</h1>
                    <p>Le vent se lève... Il est temps de rejoindre la Vallée.</p>
                    {error && <p className={styles.error}>{error}</p>}
                    <div>
                        <label htmlFor="mail">Mail</label><br />
                        <input
                            type="email"
                            id="mail"
                            value={mail}
                            onChange={e => setMail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label><br />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" id={styles.togglePassword} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Cacher" : "Afficher"}
                        </button>
                    </div>
                    <button type="submit">Se connecter</button>
                    <p className={styles.links}>Pas de compte ? <Link to="/inscription">Inscrivez-vous ici</Link></p>
                </form>
            </div>
        </section>
    );
}