import { useState } from 'react';
import styles from './auth.module.css'

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name: name,
            firstName: firstName,
            mail: mail,
            password: password
        };

        //url provisoire
        fetch('http://localhost/yonsekai/backend/api/index.php?action=register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (!data.success) {
                    setMessage(data.message);
                    return;
                }
            })
            .catch(err => {
                console.error('Erreur de connexion:', err);
            });

    }

    return (
        <section className={styles.authPage}>
            <div className={styles.visual}>
                <img src="assets/img/register-img.jpg" alt="" />
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <h1>Rejoignez l'expérience</h1>
                    <p>Inscrivez-vous pour réserver vos places pour l'exposition.</p>
                    <p>{message}</p>
                    <div className={styles.inputNames}>
                        <div>
                            <label htmlFor="name">Nom</label> <br />
                            <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="firstName">Prénom</label><br />
                            <input type="text" name="firstName" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="mail">Votre Email</label><br />
                        <input type="email" name="mail" id="mail" value={mail} onChange={e => setMail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Choississez un mot de passe</label><br />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="button" id={styles.togglePassword} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Cacher" : "Afficher"}
                        </button>
                    </div>
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </section>
    )
}