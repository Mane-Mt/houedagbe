
import { createScene } from './firstScene.js';

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const simulateLoading = async () => {
  const progressBar = document.getElementById("progressBar");

  for (let i = 1; i <= 100; i++) {
    await new Promise((resolve) => setTimeout(resolve, 30)); // vitesse
    progressBar.style.width = i + "%";

    if (i === 25)
      document.getElementById("statusText").textContent = "Planting grass...";
    if (i === 50)
      document.getElementById("statusText").textContent = "Spawning trees...";
    if (i === 75)
      document.getElementById("statusText").textContent = "Shaping world...";
  }
};


simulateLoading().then(() => {
  document.getElementById("loader").style.display = "none";
  canvas.style.display = "block";

  const scene = createScene(engine, canvas);
  engine.runRenderLoop(() => scene.render());
});

window.addEventListener("resize", () => engine.resize());
