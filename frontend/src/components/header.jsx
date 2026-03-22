import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/inscription">S'inscrire</Link>
                    </li>
                    <li>
                        <Link to="/connexion">Se connecter</Link>
                    </li>
                    <li>
                        <Link to="/profil">Accéder à mon profil</Link>
                    </li>
                    <li>
                        <Link to="/administration">Accéder à l'administration</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}