import { useState} from 'react';

export const ModifyUserTab = () => {

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
        <label htmlFor="name">Nom : </label>
        <br/>
        <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div>
        <label htmlFor="fistname">Prénom : </label>
        <br/>
        <input type="text" id="fistname" value={firstName} onChange={e => setFirstName(e.target.value)}/>
        </div>

        <div>
        <label htmlFor="email">Mail :</label>
        <br/>
        <input type="email" name="mail" id="mail" value={mail} onChange={e => setMail(e.target.value)} required />
        </div>

        <input type="submit" value="Modifier ces données" />

    </form>
)

}