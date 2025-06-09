import { Entity } from "../core/Entity.js";
import { Scene } from "../core/Scene.js";
const PITCH_WIDTH = 40;
const PITCH_HEIGHT = 27;
export class FirstGamePartScene extends Scene {
  constructor() {
    super("first_game_part");
  }
  async preload() {
    this.game.engine.displayLoadingUI();
    // load assets
    this.game.engine.hideLoadingUI();
  }
  async start() {
    
    const light = new BABYLON.HemisphericLight(
      "lighsa",
      new BABYLON.Vector3(0, 10, 0),
      this.babylonScene
    );
    this.babylonScene.attachControl();
    //Création de l'avatar
    let time = this._createAvatar(this.babylonScene);

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
    this._createCharacter()

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

    // Mouvement du terrai de jeu
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

    let compteur = 9;
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
        new BABYLON.Vector3(2, 0, -4),
        new BABYLON.Vector3(-2, 0, -3),
        new BABYLON.Vector3(3, 0, -2),
        new BABYLON.Vector3(-3, 0, -6),
        new BABYLON.Vector3(1, 0, -1),
        new BABYLON.Vector3(-1, 0, -5),
        new BABYLON.Vector3(4, 0, -3),
        new BABYLON.Vector3(-4, 0, -2),
      ];

      // 🔁 Dupliquer 8 fois
      positions.forEach((pos, i) => {
        const clone = originalMesh.clone(`garbage_bag_${i}`);
        if (clone) {
          clone.position = pos.clone();
          clone.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);
          clone.rotation = originalMesh.rotation.clone();
          clone.metadata = { isGarbage: true };
        }
      });
    });

    this.game.engine
      .getRenderingCanvas()
      .addEventListener("pointerdown", (evt) => {
        const pickResult = this.babylonScene.pick(evt.clientX, evt.clientY);
        if (pickResult.hit && pickResult.pickedMesh?.metadata?.isGarbage) {
          pickResult.pickedMesh.dispose();
          compteur--;
          if (compteur === 0) {
            this.game.fadeIn(
              this.sceneManager.changeScene.bind(
                this.sceneManager,
                "first_step_completion"
              )
            );
          }
        }
      });

    this.babylonScene.registerAfterRender(() => {
      console.log(time);
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
    // Création de l'avatar
    const advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "avatarUI",
        true,
        scene
      );
    // === CONTAINER PRINCIPAL EN HAUT ===
    const mainContainer = new BABYLON.GUI.Rectangle();
    mainContainer.width = 1;
    mainContainer.height = "200px";
    mainContainer.thickness = 0;
    mainContainer.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    mainContainer.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    mainContainer.paddingTop = "10px";
    advancedTexture.addControl(mainContainer);

    // === CONTAINER GAUCHE : AVATAR + PROGRESSBAR ===
    const leftContainer = new BABYLON.GUI.StackPanel();
    leftContainer.width = "140px"; // Largeur fixe
    leftContainer.height = "200px";
    leftContainer.isVertical = true;
    leftContainer.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftContainer.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    leftContainer.paddingLeft = "10px";
    mainContainer.addControl(leftContainer);

    // === AVATAR ===
    const avatarImage = new BABYLON.GUI.Image("avatar", "public/avatar.png");
    avatarImage.width = "80px";
    avatarImage.height = "80px";
    avatarImage.cornerRadius = 40;
    avatarImage.clipChildren = true;
    avatarImage.paddingLeft = "20px";
    avatarImage.thickness = 2;
    avatarImage.color = "white";
    avatarImage.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    avatarImage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    leftContainer.addControl(avatarImage);

    // === PROGRESS BAR ===
    const progressBarContainer = new BABYLON.GUI.Rectangle();
    progressBarContainer.width = "100px";
    progressBarContainer.height = "20px";
    progressBarContainer.cornerRadius = 10;
    progressBarContainer.color = "white";
    progressBarContainer.thickness = 2;
    progressBarContainer.background = "gray";
    progressBarContainer.paddingTop = "5px";
    leftContainer.addControl(progressBarContainer);

    const progressBar = new BABYLON.GUI.Rectangle();
    progressBar.width = 1; // 100%
    progressBar.height = "20px";
    progressBar.cornerRadius = 10;
    progressBar.color = "green";
    progressBar.thickness = 0;
    progressBar.background = "green";
    progressBar.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    progressBarContainer.addControl(progressBar);

    // === TIMER A DROITE ===
    const timerText = new BABYLON.GUI.TextBlock();
    timerText.text = "02:00";
    timerText.color = "red";
    timerText.fontSize = 28;
    timerText.paddingRight = "20px";
    timerText.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    timerText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    mainContainer.addControl(timerText);

    // === LOGIQUE TIMER ===
    const totalTime = 2 * 60;
    let timeLeft = totalTime;

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }

    const intervalId = setInterval(() => {
      timeLeft--;

      if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(intervalId);
        timerText.text = "00:00";
        progressBar.width = 0;
        this.game.fadeIn( this.sceneManager.changeScene.bind(
                this.sceneManager,
                "game_over"
              ));
        return;
      }

      timerText.text = formatTime(timeLeft);
      const progress = timeLeft / totalTime;
      progressBar.width = progress;
    }, 1000);
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

  _createCharacter(){
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
  }
}
