//Premiere scène
export function goStart(engine, canvas) {
  var scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  // Targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // Attaches the camera to the canvas
  camera.attachControl(canvas, true);

  (async () => {
    const audioEngine = await BABYLON.CreateAudioEngineAsync();
    const narration = await BABYLON.CreateStreamingSoundAsync(
      "narration",
      "assets/sounds/copycat(revised).mp3"
    );
    // Wait for the audio engine to unlock
    await audioEngine.unlockAsync();
    narration.play();
  })();


  var guiMenu = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  let logo = new BABYLON.GUI.Image(
    "spacePirates",
    "assets/UI/houedagbeLogo.png"
  );

  logo.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  guiMenu.addControl(logo);
  return scene;
}
