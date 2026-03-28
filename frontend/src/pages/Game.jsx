import { GameAir } from "../components/Game/GameAir";
import { GameFire } from "../components/game/GameFire";
import { GameEarth } from "../components/game/GameEarth";
import Hearts from '../components/game/Heart.jsx'


export const Game = () => {
  return (      
    <div>
      <Hearts />
      <GameFire />  
    </div>
  );
};

