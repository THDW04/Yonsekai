import { DashboardStats } from "../components/DashboardStats";

export const Admin = () => {
    return (
        <section>
            <h1>Administration</h1>
            <p>Vous pouvez consulter ici les statistiques de fréquentation.</p>
            <DashboardStats />
        </section>
    )
}