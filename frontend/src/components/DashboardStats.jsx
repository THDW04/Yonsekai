import { useState, useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
    ArcElement,
    Filler
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
    ArcElement,
    Filler
);

export const DashboardStats = () => {
    const [periode, setPeriode] = useState("7");
    const [statsHour, setStatsHour] = useState([]);
    const [statsDay, setStatsDay] = useState([]);
    const [statsTicket, setStatsTicket] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDatesFromPeriod = (days) => {
        const today = new Date();
        const start = new Date();

        start.setDate(today.getDate() - days);

        const formatDate = (d) => d.toISOString().split("T")[0];

        return {
            debut: formatDate(start),
            fin: formatDate(today)
        };
    };

    const fetchStats = async (periode) => {

        const { debut, fin } = getDatesFromPeriod(periode);

        const params = new URLSearchParams({
            action: "dashboard-stats",
            debut: debut,
            fin: fin
        });

        const token = localStorage.getItem("userToken");

        const response = await fetch(
            `http://localhost/yonsekai/backend/api/index.php?${params}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erreur API");
        }

        return response.json();
    };

    useEffect(() => {
        setLoading(true);

        fetchStats(periode)
            .then(data => {
                setStatsHour(data.byHour);
                setStatsDay(data.byDay);
                setStatsTicket(data.byTicket);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));

    }, [periode]);

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
                borderColor: '#4b9fc0',
                borderWidth: 2,
                borderRadius: 8,
                backgroundColor: (context) => {
                    const canvas = context.chart.ctx;
                    const gradient = canvas.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(75, 159, 201, 0.5)');
                    gradient.addColorStop(1, 'rgba(75, 159, 201, 0)');
                    return gradient;
                }
            }
        ]
    };

    const dayChartData = {
        labels: dayLabels,
        datasets: [
            {
                label: "Fréquentation par jour",
                data: dayData,
                fill: true,
                borderColor: '#4bc072',
                backgroundColor: (context) => {
                    const canvas = context.chart.ctx;
                    const gradient = canvas.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(75, 192, 114, 0.5)');
                    gradient.addColorStop(1, 'rgba(75, 192, 114, 0)');
                    return gradient;
                },
                tension: 0.45,
                pointRadius: 5,
                pointHoverRadius: 8,
            }
        ]
    };

    const ticketChartData = {
        labels: ticketLabels,
        datasets: [
            {
                label: "Nombre",
                data: ticketData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(255, 206, 86, 0.7)"
                ],
                borderWidth: 0,
                borderRadius: 20,
                spacing: 10,
                cutout: '80%',
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const centerTextPlugin = {
        id: 'centerText',
        afterDraw: (chart) => {
            const { width, height, ctx } = chart;
            ctx.save();

            // Calcul du total
            const total = ticketData.reduce((sum, val) => Number(sum) + Number(val), 0);

            ctx.font = "bold 5rem sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillText(total, width / 2, height / 2);

            ctx.font = "1rem sans-serif";
            ctx.fillStyle = "#000";
            ctx.fillText("tickets réservés", width / 2, height / 2 + 50);

            ctx.restore();
        }
    };

    return (
        <section className="stats-container">
            <form>
                <label htmlFor="periode">Choisissez une période :</label>
                <select
                    id="periode"
                    value={periode}
                    onChange={(e) => setPeriode(Number(e.target.value))}
                >
                    <option value={7}>Les 7 derniers jours</option>
                    <option value={30}>Les 30 derniers jours</option>
                    <option value={90}>Les 3 derniers mois</option>
                </select>
            </form>
            <div className="stats stats-hour" style={{ maxWidth: 700, margin: "2rem auto" }}>
                <Bar data={hourChartData} options={options} />
                <h2>Fréquentation par heure</h2>
            </div>

            <div className="stats stats-day" style={{ maxWidth: 700, margin: "2rem auto" }}>
                <Line data={dayChartData} options={options} />
                <h2>Fréquentation par jour</h2>
            </div>

            <div className="stats stats-ticket" style={{ maxWidth: 400, margin: "2rem auto" }}>
                <Doughnut data={ticketChartData} plugins={[centerTextPlugin]} />
                <h2>Répartition par type de ticket</h2>
            </div>
        </section>
    )
}