import { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const DashboardStats = () => {
    const [statsHour, setStatsHour] = useState([]);
    const [statsDay, setStatsDay] = useState([]);
    const [statsTicket, setStatsTicket] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        /*
            if (!token) {
              window.location.href = "/connexion";
              return;
            }*/

        fetch("http://localhost/yonsekai/backend/api/index.php?action=dashboard-stats", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Erreur API");
                return res.json();
            })
            .then(data => {
                setStatsHour(data.byHour);
                setStatsDay(data.byDay);
                setStatsTicket(data.byTicket);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement des statistiques...</p>;
    if (error) return <p>Erreur : {error}</p>;

    // Préparer les données pour Chart.js
    const hourLabels = statsHour.map(item => item.horaire);
    const hourData = statsHour.map(item => item.total);

    const dayLabels = statsDay.map(item => item.jour);
    const dayData = statsDay.map(item => item.total);

    const ticketLabels = statsTicket.map(item => item.nom);
    const ticketData = statsTicket.map(item => item.total);

    const hourChartData = {
        labels: hourLabels,
        datasets: [
            {
                label: "Fréquentation par créneau horaire",
                data: hourData,
                backgroundColor: "rgba(75, 192, 192, 0.7)"
            }
        ]
    };

    const dayChartData = {
        labels: dayLabels,
        datasets: [
            {
                label: "Fréquentation par jour",
                data: dayData,
                fill: false,              
                borderColor: '#4bc072',    
                backgroundColor: '#4bc072', 
                tension: 0.1,              
                pointRadius: 5,            
                pointHoverRadius: 8,
            }
        ]
    };

    const ticketChartData = {
        labels: ticketLabels,
        datasets: [
            {
                label: "Répartition par type de billet",
                data: ticketData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(255, 206, 86, 0.7)"
                ]
            }
        ]
    };

    return (
        <section className="stats-container">
            <div className="stats stats-hour" style={{ maxWidth: 700, margin: "2rem auto" }}>
                <Bar data={hourChartData} />
                <h2>Fréquentation par heure</h2>
            </div>

            <div className="stats stats-day" style={{ maxWidth: 700, margin: "2rem auto" }}>
                <Line data={dayChartData} />
                <h2>Fréquentation par jour</h2>
            </div>

            <div className="stats stats-ticket" style={{ maxWidth: 400, margin: "2rem auto" }}>
                <Pie data={ticketChartData} />
                <h2>Répartition par type de ticket</h2>
            </div>
        </section>
    )
}