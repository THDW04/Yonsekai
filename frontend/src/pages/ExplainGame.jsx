import '../assets/css/error.css'
import { useTranslation } from "react-i18next";
 const ExplainGame = () => {
  
  const { t } = useTranslation();
 

  return (

<section className="error-container">

 <div className="error-content">
        <div className="error-circle">
          <h1>{t("explainTitle")}</h1>
          <p>{t("explainText")}</p>

            <a href="/game" className="error-btn secondary">
            {t("play")}
          </a>
        
        
         </div>
      </div>

  <div className="error-image">
        <img src="/assets/img/endImg.jpg" alt="" />
      </div>

</section>
  )
}

export default ExplainGame;




