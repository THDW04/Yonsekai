import { HeroSection } from "../components/home/HeroSection/HeroSection";
import { MangaContainer } from "../components/home/MangaContainer/MangaContainer";
import { Teaser } from "../components/home/Teaser/Teaser";
import { Informations } from "../components/home/Informations/Informations";

export const Home = () =>{
    return(
      <main>
        <HeroSection/>
        <MangaContainer/>
        <Teaser/>
        <Informations />
      </main>
    )
}