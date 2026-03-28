import { useEffect } from "react";

export const GameEarth = () => {

 useEffect(() => {
  import("../../js/gameEarth.js");
}, []);

  return (
    <>
      <canvas id="gameCanvas"></canvas>
    </>
  );
};