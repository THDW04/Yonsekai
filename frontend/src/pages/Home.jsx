import { Helmet } from 'react-helmet-async';

import { Intro } from "../components/home/Intro/Intro";
import { HeroSection } from "../components/home/HeroSection/HeroSection";
import { MangaContainer } from "../components/home/MangaContainer/MangaContainer";
import { Teaser } from "../components/home/Teaser/Teaser";
import { Informations } from "../components/home/Informations/Informations";
import {Footer} from '../components/footer/Footer'

const Home = () =>{
    return(
      <>
      <Helmet>
        <title>Accueil | Yonsekai</title>
        <meta name="description" content="Plongez dans Yonsekai, une expérience narrative immersive unique. Entre exploration visuelle, sensoriel et univers manga, découvrez notre odyssée." />
      </Helmet>
      <main>
        <Intro/>
        <HeroSection/>
        <MangaContainer/>
        <Teaser/>
        <Informations/>
      </main>
        <Footer />
      </>
    )
}

export default Home;