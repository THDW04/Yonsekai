export const LogoutBtn = () => {
    const logout = () => {
        localStorage.removeItem("userToken");
        window.location.href = "/connexion";
    };

    return (
        <button onClick={logout}>Déconnexion</button>
    )
}