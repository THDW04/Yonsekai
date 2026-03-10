import { useState } from 'react';

export const LoginForm = () => {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userDataLogin = {
            mail: mail,
            password: password
        };

        fetch('http://localhost/yonsekai/backend/api/apiController.php?action=login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userDataLogin),
        })
        .then(response => {
            if (!response.ok) throw new Error('Erreur serveur');
            return response.json();
        })
        .then(data => {
            console.log('Succès:', data);
        })
        .catch(err => {
            console.error('Erreur de connexion:', err);
        });
    };

    return (
        <form onSubmit={handleSubmit} method='POST'>
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
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Se connecter</button>
        </form>
    );
}