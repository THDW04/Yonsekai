import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { ControlUserTab } from "../components/admin/ControllUserTab/ControllUserTab";
import { ModifyUserTab } from "../components/admin/ModifyUserTab/ModifyUserTab";
import { DashboardStats } from "../components/admin/DashboardStats/DashboardStats";
import { LogoutBtn } from "../components/auth/LogoutBtn";
import { jwtDecode } from "jwt-decode";
import '../assets/css/admin.css'
import { useTranslation } from "react-i18next";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            window.location.href = "/";
            return;
        }

        try {
            const decoded = jwtDecode(token);
            if (decoded.role !== "admin") {
                window.location.href = "/profil";
            }
        } catch (error) {
            console.error("Token invalide");
            window.location.href = "/";
        }

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/yonsekai/backend/api/index.php?action=users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Erreur de récupération :", error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = (id) => {

        fetch("http://localhost/yonsekai/backend/api/index.php?action=delete-user", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            });

    };

    const handleUserUpdated = (updatedUser) => {
        setUsers(prevUsers =>
            prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
        );
        setSelectedUser(null);

    };
     const { t } = useTranslation();
    return (
        <>
        <Helmet>
            <title>Admin | Yonsekai</title>
            <meta name="description" content="Tableau de bord administrateur Yonsekai. Gestion sécurisée des contenus, des utilisateurs et du suivi des réservations pour l'équipe technique." />
        </Helmet>
        <main className="admin-main">
            <LogoutBtn />
            <h1>{t("titleAdmin")}</h1>
            <p>{t("stats")}.</p>

            <section className="admin-container">
                <DashboardStats />
                <div className="admin-user">
                    <ControlUserTab
                        users={users}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    {selectedUser && (
                        <ModifyUserTab
                            user={selectedUser}
                            onUserUpdated={handleUserUpdated}
                        />
                    )}
                </div>
            </section>
        </main>
        </>
    )
}

export default Admin;