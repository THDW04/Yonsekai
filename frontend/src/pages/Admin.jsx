import { DashboardStats } from "../components/DashboardStats";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const Admin = () => {
    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            window.location.href = "/connexion";
            return;
        }

        try {
            const decoded = jwtDecode(token);
            if (decoded.role !== "admin") {
                window.location.href = "/profil";
            }
        } catch (error) {
            console.error("Token invalide");
            window.location.href = "/connexion";
        }
    }, []);

    return (
        <section>
            <h1>Administration</h1>
            <p>Vous pouvez consulter ici les statistiques de fréquentation.</p>
            <DashboardStats />
        </section>
    )
}