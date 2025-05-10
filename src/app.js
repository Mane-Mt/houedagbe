


document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  function createScene() {
    const scene = new BABYLON.Scene(engine);
  
    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
  
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
  
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
  
    return scene;
  }
  
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
  
  //Premiere scène
  
  simulateLoading().then(() => {
    document.getElementById("loader").style.display = "none";
    canvas.style.display = "block";
  
    const scene = createScene();
    engine.runRenderLoop(() => scene.render());
  });
  
  window.addEventListener("resize", () => engine.resize());
});
