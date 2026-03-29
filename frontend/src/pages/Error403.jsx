import { useTranslation } from "react-i18next";
import '../assets/css/error.css'

const Error403  = () => {

const { t } = useTranslation();

return(




<section className="error-container">

    <div className="error-content">
        <div className="error-circle">
          <h1>{t("error403Title")}</h1>
          <p>{t("error403text")}</p>

          <a href="/" className="error-btn">
            {t("acceuil")}
          </a>
        </div>
      </div>


  <div className="error-image">
        <img src="/assets/img/img403.webp" alt="" />
      </div>

    </section>





)
}

export default Error403;