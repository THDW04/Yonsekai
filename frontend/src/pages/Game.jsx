import { GameAir } from "../components/Game/GameAir";
import { Helmet } from 'react-helmet-async';
import {Footer} from '../components/footer/Footer'

 const Game = () => {

    return( 

        <>
        <Helmet>
        <title>Game | Yonsekai</title>
        <meta name="description" content="Plongez dans l'univers de Nausicaa à travers un jeux immersif." />
      </Helmet>
        <GameAir />
        <Footer />

        </>
    )

}
export default Game;