export const ProfileInformation = ({nom, prenom, mail}) => {
    return (
        <section>
            <div className="Infos">
                <h2>Vos informations</h2>
                <div>
                    <p>Nom : {nom}</p>
                    <p>Prénom : {prenom}</p>
                    <p>Adresse mail : {mail}</p>
                </div>
            </div>
        </section>
    )
}