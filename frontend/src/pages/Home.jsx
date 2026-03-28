import { Intro } from "../components/home/Intro/Intro";
import { HeroSection } from "../components/home/HeroSection/HeroSection";
import { MangaContainer } from "../components/home/MangaContainer/MangaContainer";
import { Teaser } from "../components/home/Teaser/Teaser";
import { Informations } from "../components/home/Informations/Informations";

const Home = () =>{
    return(
      <main>
        <Intro/>
        <HeroSection/>
        <MangaContainer/>
        <Teaser/>
        <Informations/>
      </main>
    )
}

export default Home;