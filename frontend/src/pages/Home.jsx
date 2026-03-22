import { HeroSection } from "../components/home/HeroSection/HeroSection";
import { MangaContainer } from "../components/home/MangaContainer";
import { Teaser } from "../components/home/Teaser";

export const Home = () =>{
    return(
      <main>
        <HeroSection />
        <MangaContainer/>
        <Teaser />
      </main>
    )
}