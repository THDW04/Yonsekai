import { useNavigate } from "react-router-dom"
import { resetGame, startTimer, setGameCallbacks } from '../js/gameState.js'
import { useTranslation } from "react-i18next";
import '../assets/css/error.css'

const Victory = () => {
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
          <h1>{t("victoryTitle")}</h1>
          <p>{t("victoryText")}</p>

            <a href="/reservation" className="error-btn secondary">
            {t("titleReservation")}
          </a>
        
        <button onClick={restart} className="error-btn">{t("again")}</button>
         </div>
      </div>

  <div className="error-image">
        <img src="/assets/img/victoryImg.jpg" alt="" />
      </div>

</section>


  )
}

export default Victory;