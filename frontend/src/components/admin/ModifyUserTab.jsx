import { useState } from 'react';

export const ModifyUserTab = ({ user, onUserUpdated }) => {

    const [name, setName] = useState(user.nom);
    const [firstName, setFirstName] = useState(user.prenom);
    const [mail, setMail] = useState(user.mail);
    const id = useState(user.id);


    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            id: id,
            name: name,
            firstName: firstName,
            mail: mail,

        };

        //url provisoire
        fetch('http://localhost/yonsekai/backend/api/index.php?action=update-user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Erreur serveur');
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    onUserUpdated({
                        id_user: id,
                        nom: name,
                        prenom: firstName,
                        mail: mail
                    });
                    alert("Utilisateur mis à jour !");
                }
            })
            .catch(err => {
                console.error('Erreur de connexion:', err);
            });

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" value={id} />

            <div>
                <label htmlFor="name">Nom : </label>
                <br />
                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="fistname">Prénom : </label>
                <br />
                <input type="text" id="fistname" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="email">Mail :</label>
                <br />
                <input type="email" name="mail" id="mail" value={mail} onChange={e => setMail(e.target.value)} required />
            </div>

            <input type="submit" value="Modifier ces données" />

        </form>
    )

}