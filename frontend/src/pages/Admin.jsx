import { useState, useEffect } from "react";
import { ControlUserTab } from "../components/ControlUserTab";
import { ModifyUserTab } from "../components/ModifyUserTab";
import { DashboardStats } from "../components/profile_admin/DashboardStats";
import { LogoutBtn } from "../components/auth/LogoutBtn";
import { jwtDecode } from "jwt-decode";

export const Admin = () => {
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
    }, []);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = (id) => {

        fetch(`http://localhost/yonsekai/backend/api/apiController.php?action=deleteUser&id=${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            });

    };

    return (
        <section>
            <LogoutBtn />
            <h1>Administration</h1>
            <p>Vous pouvez consulter ici les statistiques de fréquentation.</p>
            <DashboardStats />
            <section>

                <ControlUserTab
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {selectedUser && (
                    <ModifyUserTab user={selectedUser} />
                )}

            </section>
        </section>
    )
}