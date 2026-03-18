export const TimeSlot = ({ date, hour, setHour }) => {

    const hours = [
        "10:00","11:00","12:00",
        "13:00","14:00","15:00",
        "16:00","17:00","18:00"
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

            <p>
                Choissisez un horaire pour votre visite :
            </p>

            {hours.map((h) => (
                <div key={h}>
                    <input
                        type="radio"
                        name="hour"
                        value={h}
                        checked={hour === h}
                        onChange={(e) => setHour(e.target.value)}  
                        id={h} 
                    />

                    <label htmlFor={h}>{h}</label>
                </div>
            ))}

        </fieldset>
    );
};