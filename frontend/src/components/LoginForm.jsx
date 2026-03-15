import { useState } from 'react';
import { jwtDecode } from "jwt-decode";

export const LoginForm = () => {

    //Récupère les valeurs des champs
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    //Affiche le mdp en clair
    const [showPassword, setShowPassword] = useState(false);

    //Erreur dans le formulaire
    const [error, setError] = useState(null);

    //Fetch de connexion
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
        <form onSubmit={handleSubmit} method='POST'>
            <p>{error}</p>
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
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Cacher" : "Afficher"}
                </button>
            </div>

            <button type="submit">Se connecter</button>
        </form>
    );
}