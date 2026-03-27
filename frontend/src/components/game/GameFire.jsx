import { useEffect } from "react";

export const GameFire = () => {

 useEffect(() => {
  import("../../js/index.js");
}, []);

  return (
    <>
      <canvas id="gameCanvas"></canvas>
    </>
  );
};