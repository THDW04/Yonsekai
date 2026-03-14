import { DashboardStats } from "../components/DashboardStats";
import { useState, useEffect } from "react";


export const Admin = () => {
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        
        console.log(localStorage)
        /*if (!token || user.role !== "admin") {
            window.location.href = "/profil";
            return;
        }*/
    }, []);

    return (
        <section>
            <h1>Administration</h1>
            <p>Vous pouvez consulter ici les statistiques de fréquentation.</p>
            <DashboardStats />
        </section>
    )
}