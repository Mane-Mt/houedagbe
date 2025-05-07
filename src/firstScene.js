// firstScene.js
export function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);

    // Camera
    const camera = new BABYLON.ArcRotateCamera("arcR", -Math.PI / 2, Math.PI / 2, 15, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // GUI 2D
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const startBtn = BABYLON.GUI.Button.CreateSimpleButton("start", "PLAY");
    startBtn.width = "150px";
    startBtn.height = "25px";
    startBtn.color = "white";
    startBtn.background = "green";
    startBtn.cornerRadius = 10;
    startBtn.thickness = 0;
    startBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    startBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

    advancedTexture.addControl(startBtn);

    startBtn.onPointerDownObservable.add(() => {
        console.log("Play button clicked!");
    });

    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    BABYLON.SceneLoader.ImportMeshAsync(
        null,           // meshNames : null pour tout importer
        "/models/",      // chemin vers le dossier
        "knight.glb",   // nom du fichier
        scene           // <--- tu dois passer une vraie instance de BABYLON.Scene ici
    ).then((result) => {
        const knight = result.meshes[0];
        knight.position.y = 2;
    });
    // BABYLON.SceneLoader.Append("/models/", "knight.glb", scene, function (scene) {
    //     // Positionner le premier mesh ou la racine
    //     const knight = scene.meshes[scene.meshes.length - 1];
    //     knight.position = new BABYLON.Vector3(0, 2, 0);
    // });

    return scene;
}
