const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true); 
const createScene = function () {
  const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
        "camera1",
        Math.PI / 2,
        Math.PI / 2.5,
        3,
        BABYLON.Vector3.Zero(),
        scene
    );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  
  const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  return scene;
};
const scene = createScene(); 

engine.runRenderLoop(function () {
  scene.render();
});


// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
