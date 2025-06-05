import { Entity } from "../core/Entity.js";
import { Scene } from "../core/Scene.js";
const PITCH_WIDTH = 40;
const PITCH_HEIGHT = 27;
export class GameScene extends Scene {
  constructor() {
    super("game");
  }
  async preload() {
    this.game.engine.displayLoadingUI();
    // load assets
    this.game.engine.hideLoadingUI();
  }
  async start() {
    let isMoving = false;
    let characterSpeed = 2;
    const light = new BABYLON.HemisphericLight(
      "lighsa",
      new BABYLON.Vector3(0, 10, 0),
      this.babylonScene
    );
    this.babylonScene.attachControl();

    // Create a tree in the game
    let originalTree = null;
    BABYLON.SceneLoader.ImportMesh(
      "",
      "public/",
      "pine_tree.glb",
      this.babylonScene,
      (meshes) => {
        const root = new BABYLON.TransformNode("treeRoot", this.babylonScene);
        meshes.forEach((mesh) => (mesh.parent = root));
        root.position = new BABYLON.Vector3(3, 0, 0);
        root.scaling = new BABYLON.Vector3(0.018, 0.08, 0.018);
        root.setEnabled(false);
        originalTree = root;
      }
    );
    // window.addEventListener("click", () => {
    //   const pickResult = this.babylonScene.pick(
    //     this.babylonScene.pointerX,
    //     this.babylonScene.pointerY
    //   );
    //   if (pickResult.hit && originalTree) {
    //     const point = pickResult.pickedPoint;
    //     // Cloner l'arbre
    //     const clone = originalTree.clone("treeClone_" + Date.now());
    //     if (clone) {
    //       clone.position = point;
    //       clone.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    //       clone.setEnabled(true); // Afficher le clone
    //       console.log("Arbre cloné à :", point);
    //     }
    //   }
    // });

    //Création d'un nouveau personnage
    const walk = function (turn, dist) {
      this.turn = turn;
      this.dist = dist;
    };

    const track = [];
    track.push(new walk(86, 7));
    track.push(new walk(-85, 14.8));
    track.push(new walk(-93, 16.5));
    track.push(new walk(48, 25.5));
    track.push(new walk(-112, 30.5));
    track.push(new walk(-72, 33.2));
    track.push(new walk(42, 37.5));
    track.push(new walk(-98, 45.2));
    track.push(new walk(0, 47));
    BABYLON.SceneLoader.ImportMeshAsync(
      "him",
      "public/",
      "Dude.babylon",
      this.babylonScene
    ).then((result) => {
      var dude = result.meshes[0];
      dude.scaling = new BABYLON.Vector3(0.018, 0.018, 0.018);
      dude.position = new BABYLON.Vector3(-6, 0, 0);
      dude.rotate(
        BABYLON.Axis.Y,
        BABYLON.Tools.ToRadians(-95),
        BABYLON.Space.LOCAL
      );
      const startRotation = dude.rotationQuaternion.clone();

      this.babylonScene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

      let distance = 0;
      let step = 0.015;
      let p = 0;

      this.babylonScene.onBeforeRenderObservable.add(() => {
        dude.movePOV(0, 0, step);
        distance += step;
        if (distance > track[p].dist) {
          dude.rotate(
            BABYLON.Axis.Y,
            BABYLON.Tools.ToRadians(track[p].turn),
            BABYLON.Space.LOCAL
          );
          p += 1;
          p %= track.length;
          if (p === 0) {
            distance = 0;
            dude.position = new BABYLON.Vector3(-6, 0, 0);
            dude.rotationQuaternion = startRotation.clone();
          }
        }
      });
    });

    //Création du terrain de jeu
    this._createGround(this.babylonScene);
    const camaraContainer = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 0.5, height: 0.5 },
      this.babylonScene
    );
    camaraContainer.position = new BABYLON.Vector3(0, 10, 0);
    this.mainCamera.parent = camaraContainer;
    this.mainCamera.setTarget(new BABYLON.Vector3(0, -10, 0));
    this._createAvatar(this.babylonScene);

    // Création de l'avatar
    this._createAvatar(this.babylonScene);

    //Mouvement du terrai de jeu
    // let camVertical = 0;
    // let camHorizontal = 0;
    // window.addEventListener("keydown", (e) => {
    //   const theKey = e.key.toLowerCase();
    //   if (theKey === "arrowup") camVertical = 1;
    //   if (theKey === "arrowdown") camVertical = -1;
    //   if (theKey === "arrowleft") camHorizontal = -1;
    //   if (theKey === "arrowright") camHorizontal = 1;
    //   camaraContainer.locallyTranslate(
    //     new BABYLON.Vector3(camHorizontal, 0, camVertical)
    //   );
    // });
    // window.addEventListener("keyup", (e) => {
    //   const theKey = e.key.toLowerCase();
    //   if (theKey === "arrowup") camVertical = 0;
    //   if (theKey === "arrowdown") camVertical = 0;
    //   if (theKey === "arrowleft") camHorizontal = 0;
    //   if (theKey === "arrowright") camHorizontal = 0;
    // });
    // let homeMesh = null;
    // BABYLON.SceneLoader.ImportMeshAsync(
    //   "",
    //   "public/",
    //   "tiny_home.glb",
    //   this.babylonScene
    // ).then((result) => {
    //   result.meshes.forEach((mesh) => {
    //     mesh.metadata = { isHome: true };
    //   });
    //   homeMesh = result.meshes[0];
    //   homeMesh.scaling = new BABYLON.Vector3(0.38, 0.8, 0.38);
    //   homeMesh.position = new BABYLON.Vector3(-6, 0, 0);
    //   homeMesh.rotate(
    //     BABYLON.Axis.Y,
    //     BABYLON.Tools.ToRadians(-95),
    //     BABYLON.Space.LOCAL
    //   );
    // });

    // // 👉 Gestion du clic sur le canvas
    // this.game.engine
    //   .getRenderingCanvas()
    //   .addEventListener("pointerdown", (evt) => {
    //     const pickResult = this.babylonScene.pick(evt.clientX, evt.clientY);
    //     if (pickResult.hit && pickResult.pickedMesh.metadata?.isHome) {
    //       console.log("Bonjour le monde");
    //       homeMesh.dispose(); // 💥 On supprime le mesh
    //       homeMesh = null; // On libère la variable
    //     }
    //   });

    //Portail de l'évernement
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "public/",
      "fence_and_gate_wood.glb",
      this.babylonScene
    ).then((result) => {
      let fenceMesh = result.meshes[0];
      fenceMesh.scaling = new BABYLON.Vector3(0.68, 0.68, 0.68);
      fenceMesh.position = new BABYLON.Vector3(0, 0, -6);
      fenceMesh.rotate(
        BABYLON.Axis.Y,
        BABYLON.Tools.ToRadians(-95),
        BABYLON.Space.LOCAL
      );
    });

    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "public/",
      "garbage_bag.glb",
      this.babylonScene
    ).then((result) => {
        result.meshes.forEach((mesh) => {
            mesh.metadata = { isGarbage: true };
        });
      const originalMesh = result.meshes[0];
      originalMesh.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);
      originalMesh.position = new BABYLON.Vector3(0, 0, 6);
      originalMesh.rotate(
        BABYLON.Axis.Y,
        BABYLON.Tools.ToRadians(-95),
        BABYLON.Space.LOCAL
      );

      // 👉 On stocke les positions où on veut les dupliquer
      const positions = [
        new BABYLON.Vector3(10, 0, -12),
        new BABYLON.Vector3(-12, 0, 8),
        new BABYLON.Vector3(14, 0, 5),
        new BABYLON.Vector3(-15, 0, -7),
        new BABYLON.Vector3(8, 0, 14),
        new BABYLON.Vector3(-9, 0, -14),
        new BABYLON.Vector3(12, 0, -3),
        new BABYLON.Vector3(-13, 0, 12),
      ];

      // 🔁 Dupliquer 8 fois
      positions.forEach((pos, i) => {
        const clone = originalMesh.clone(`garbage_bag_${i}`);
        if (clone) {
          clone.position = pos.clone();
          clone.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);
          clone.rotation = originalMesh.rotation.clone();
          clone.metadata = { isGarbage: true }
        }
      });
    });
    this.game.engine
      .getRenderingCanvas()
      .addEventListener("pointerdown", (evt) => {
        const pickResult = this.babylonScene.pick(evt.clientX, evt.clientY);
        console.log(pickResult.hit)
        console.log(pickResult.pickedMesh?.metadata?.isGarbage)
        if (pickResult.hit && pickResult.pickedMesh?.metadata?.isGarbage) {
          console.log("Suppression d’un déchet !");
          pickResult.pickedMesh.dispose();
        }
      });
  }
  destroy() {
    super.destroy();
  }

  _createGround(scene) {
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 500, height: 500 },
      scene
    );
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    const diffuseTex = new BABYLON.Texture(
      "public/textures/rocky_terrain_02_diff_4k.jpg",
      scene
    );
    groundMat.diffuseTexture = diffuseTex;
    diffuseTex.uScale = 10;
    diffuseTex.vScale = 10;
    groundMat.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMat;
  }
  _createAvatar(scene) {
    const advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "avatarUI",
        true,
        scene
      );
    // Image carrée = cercle possible
    const avatarImage = new BABYLON.GUI.Image("avatar", "public/avatar.png");
    avatarImage.width = "80px";
    avatarImage.height = "80px";

    // Cercle parfait
    avatarImage.cornerRadius = 40;
    avatarImage.clipChildren = true;

    // Apparence et position
    avatarImage.thickness = 2;
    avatarImage.color = "white";
    avatarImage.left = "10px";
    avatarImage.top = "10px";
    avatarImage.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    avatarImage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(avatarImage);
  }
  // 3. Fonction pour créer un bouton
  _createButton(label, onClick) {
    const button = BABYLON.GUI.Button.CreateSimpleButton(label, label);
    button.width = "120px";
    button.height = "40px";
    button.color = "white";
    button.cornerRadius = 10;
    button.background = "#444";
    button.paddingBottom = "10px";
    button.onPointerUpObservable.add(onClick);
    return button;
  }
}
