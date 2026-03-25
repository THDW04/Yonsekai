import { useEffect } from "react";

export const GameFire = () => {
  useEffect(() => {
    const scripts = [
      "/data/l_New_Layer_1.js",
      "/data/l_New_Layer_4.js",
      "/data/l_New_Layer_3.js",
      "/data/collisions.js",
      "/js/utils.js",
      "/classes/CollisionBlock.js",
      "/classes/Platform.js",
      "/classes/Player.js",
      "/js/index.js",
      "/js/eventListeners.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    });

    return () => {
      // cleanup si tu changes de page
      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) document.body.removeChild(script);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: 0;
        }

        body {
          background: black;
          margin: 0;
        }

        canvas {
          width: 1024px;
          height: 576px;
          image-rendering: pixelated;
        }
      `}</style>

      <canvas id="gameCanvas"></canvas>
    </>
  );
};