import { useState} from 'react';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name: name,
            firstName: firstName,
            mail: mail,
            password: password
        };

        //url provisoire
        fetch('http://localhost/yonsekai/backend/api/apiController.php?action=register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData),
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

    }

    return (
        <form onSubmit={handleSubmit}>
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
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <input type="submit" value="S'inscrire" />
        </form>
    )
}