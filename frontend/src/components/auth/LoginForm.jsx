import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import styles from './auth.module.css'

export const LoginForm = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userDataLogin = {
            mail: mail,
            password: password
        };

        fetch('http://localhost/yonsekai/backend/api/index.php?action=login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userDataLogin),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (!data.success) {
                    setError(data.message);
                    return;
                }
                localStorage.setItem('userToken', data.token);
                const decoded = jwtDecode(data.token);

                if (decoded.role !== "admin") {
                    window.location.href = "/profil";
                } else {
                    window.location.href = "/administration";
                }
            })
            .catch(err => {
                console.error('Erreur de connexion:', err);
            });
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
                </form>
            </div>
        </section>
    );
}