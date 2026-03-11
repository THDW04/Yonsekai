import { useState } from 'react';

export const RegisterForm = () => {
    //Récupère les valeurs des champs
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    //Affiche le mdp en clair
    const [showPassword, setShowPassword] = useState(false);

    //Feedback form
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
        <form onSubmit={handleSubmit}>
            <p>{message}</p>
            <div>
                <label htmlFor="name">Nom</label> <br />
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="firstName">Prénom</label><br />
                <input type="text" name="firstName" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
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
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Cacher" : "Afficher"}
                </button>
            </div>
            <input type="submit" value="S'inscrire" />
        </form>
    )
}