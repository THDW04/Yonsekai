import React, { useState } from 'react';
import styles from './DeleteAccount.module.css'

export const DeleteAccount = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        const check = window.confirm("ATTENTION : Cette action est irréversible. Toutes vos réservations seront annulées. Confirmer ?");
        if (!check) return;

        setIsLoading(true);

        try {
            const token = localStorage.getItem("userToken");
            
            const response = await fetch("http://localhost/yonsekai/backend/api/index.php?action=delete-account", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert("Votre compte a été supprimé avec succès.");
                localStorage.removeItem("userToken");
                window.location.href = "/"; 
            } else {
                alert(data.error || "Une erreur est survenue.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            alert("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.deleteContainer}>
            <h2>Zone de danger</h2>
            <p>
                En supprimant votre compte, vous perdrez l'accès à l'historique de vos réservations Yonsekai. 
                Conformément au RGPD, toutes vos données personnelles seront effacées de nos serveurs.
            </p>
            
            <button 
                onClick={handleDelete}
                disabled={isLoading}
            >
                {isLoading ? "Suppression en cours..." : "Supprimer mon compte définitivement"}
            </button>
        </div>
    );
};