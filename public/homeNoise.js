var SimplexNoise;
import("simplex-noise").then((obj) => {
  SimplexNoise = obj;

  // Canvas setup
  const canvas = document.querySelector(".main-canvas");
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  const ctx = canvas.getContext("2d");

  // Play with these values
  const nbOfLines = 100;
  const nbOfColumns = 130;
  const yOffset = 8;
  const xOffset = 12;
  const graphWidth = canvas.width / 2;
  const graphHeight = canvas.height / 200;
  const noiseAmount = 40;

  console.log("before");

  // Simplex noise setup
  const simplexNoise = new SimplexNoise.SimplexNoise();

  console.log("after");

  // Normalize RAQ setup
  const fps = 60;
  const interval = 1000 / fps;
  let now, delta;
  let then = performance.now();

  // Loop setup
  let time = 100;
  let currentYOffset = 0;
  let currentXOffset = 0;

  // Get the sum of Y offsets to center graph properly
  const totalOffsetY = Array.apply(null, Array(nbOfLines + 1))
    .map((_, i) => (i / nbOfLines) * yOffset)
    .reduce((a, b) => a + b);

  // Graph drawing
  const update = () => {
    requestAnimationFrame(update);

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    now = performance.now();
    delta = now - then;

    if (delta < interval) return;

    then = now - (delta % interval);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(
      canvas.width / 2 - graphWidth / 2,
      canvas.height / 2 - graphHeight / 2 - totalOffsetY / 2
    );

    ctx.fillStyle = "#ffffff50";

    for (let line = 0; line <= nbOfLines; line++) {
      const yProgress = line / nbOfLines;
      currentYOffset += yOffset * yProgress;
      currentXOffset += xOffset * yProgress;
      const y = yProgress * graphHeight + currentYOffset;

      for (let column = 0; column <= nbOfColumns; column++) {
        const xProgress = column / nbOfColumns;
        const distanceToMiddle = column / (nbOfColumns / 2) - 1;
        const x = xProgress * graphWidth + currentXOffset * distanceToMiddle;

        const noise = simplexNoise.noise3D(
          xProgress * 3.5 + time,
          yProgress * 3.5 + time,
          time * 3
        );

        const opacity = (noise + 1) / 2 - 0.18;
        ctx.globalAlpha = opacity < 0 ? 0 : opacity;
        ctx.beginPath();
        ctx.arc(
          x,
          y + Math.sin(time) * 50 - noise * noiseAmount,
          1,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();
      }
    }

    ctx.restore();

    currentYOffset = 0;
    currentXOffset = 0;
    time += 0.004;
  };

  update();
});
