import styles from './TimeSlot.module.css'

export const TimeSlot = ({ date, hour, setHour }) => {

    const hours = [
        "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00"
    ];

    const formattedDate = date
        ? date
            .toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })
            .replace(/^./, (c) => c.toUpperCase())
        : "";

    return (
        <fieldset>

            <legend>{formattedDate}</legend>

            <p className={styles.instruction}>Choissisez un horaire pour votre visite :</p>

            <div className={styles.hoursGrid}>
                {hours.map((h) => {
                    const uniqueId = `radio-${h}`;
                    return (
                        <div key={h} className={styles.radioOption}>
                            <input
                                type="radio"
                                name="hour"
                                value={h}
                                checked={hour === h}
                                onChange={(e) => setHour(e.target.value)}
                                id={uniqueId}
                                className={styles.realRadio}
                            />
                            <label htmlFor={uniqueId} className={styles.radioLabel}>{h}</label>
                        </div>
                    )
                })}
            </div>

        </fieldset>
    );
};