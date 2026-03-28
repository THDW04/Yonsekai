import { useEffect } from "react";

export const GameFire = () => {

 useEffect(() => {
  import("../../js/gameFire.js");
}, []);

  return (
    <>
      <canvas id="gameCanvas"></canvas>
    </>
  );
};