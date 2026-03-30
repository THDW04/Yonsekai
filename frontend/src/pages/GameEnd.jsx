import { useNavigate } from "react-router-dom"
import { resetGame, startTimer, setGameCallbacks } from '../js/gameState.js'
import '../assets/css/error.css'
import { useTranslation } from "react-i18next";
import '../assets/css/error.css'

 const GameEnd = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const restart = () => {
    resetGame()
    navigate('/game')
  }

  return (

<section className="error-container">

 <div className="error-content">
        <div className="error-circle">
          <h1>{t("endTitle")}</h1>
          <p>{t("endText")}</p>

            <a href="/reservation" className="error-btn secondary">
            {t("titleReservation")}
          </a>
        
        <button onClick={restart} className="error-btn">{t("again")}</button>
         </div>
      </div>

  <div className="error-image">
        <img src="/assets/img/explainImg.jpg" alt="" />
      </div>

</section>
  )
}

export default GameEnd;




