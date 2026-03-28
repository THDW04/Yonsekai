import { useEffect } from "react";

export const GameWater = () => {

 useEffect(() => {
  import("../../js/gameWater.js");
}, []);

  return (
    <>
      <canvas id="gameCanvas"></canvas>
    </>
  );
};