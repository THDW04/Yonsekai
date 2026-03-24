import { useState, useEffect } from "react";
import { ControlUserTab } from "../components/admin/ControlUserTab";
import { ModifyUserTab } from "../components/admin/ModifyUserTab";
import { DashboardStats } from "../components/admin/DashboardStats";
import { LogoutBtn } from "../components/auth/LogoutBtn";
import { jwtDecode } from "jwt-decode";

export const Admin = () => {
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
                const response = await fetch('http://localhost/yonsekai/backend/api/apiController.php?action=users', {
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

    return (
        <section>
            <LogoutBtn />
            <h1>Administration</h1>
            <p>Vous pouvez consulter ici les statistiques de fréquentation.</p>
            <DashboardStats />

            <div>
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
    )
}