import { Scene } from "../core/Scene.js";

export class ThirdGamePartScene extends Scene {
  constructor() {
    super("third_game_part");
    this._canClick = true;
  }

  async preload() {
    this.game.engine.displayLoadingUI();
    console.log("La 3è partie vient de commencer");
    this.game.engine.hideLoadingUI();
  }

  start() {
    const light = new BABYLON.HemisphericLight(
      "lighsa",
      new BABYLON.Vector3(0, 10, 0),
      this.babylonScene
    );
    this.mainCamera.attachControl();
    //Création de l'avatar
    this._createAvatar(this.babylonScene);

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
        root.scaling = new BABYLON.Vector3(0.0018, 0.0018, 0.0018);
        root.setEnabled(true);
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
    this._createCharacter();

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






    // 1. Création de la GUI pleine-canvas
    const advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI", // identifiant quelconque
        true, // True pour pointerActivable (enable pointer events)
        this.babylonScene // votre scène Babylon.js
      );

    // On crée un StackPanel vertical, aligné à gauche au milieu de l'écran
    const leftPanel = new BABYLON.GUI.StackPanel();
    leftPanel.width = "60px"; // largeur fixe pour le panel
    leftPanel.isVertical = true; // on empile verticalement
    leftPanel.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftPanel.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    leftPanel.paddingRight = "10px"; // marge à droite
    advancedTexture.addControl(leftPanel);

    function createIconButton(
      name, 
      iconUrl,
      widthPx,
      heightPx, 
      onClick 
    ) {
      const btn = BABYLON.GUI.Button.CreateImageOnlyButton(name, iconUrl);
      btn.width = widthPx;
      btn.height = heightPx;
      btn.paddingBottom = "10px"; // espacement entre les boutons
      btn.onPointerUpObservable.add(onClick); // action au clic
      return btn;
    }


    const compassBtn = createIconButton(
      "compassBtn",
      "public/icons/compass.png",
      "40px",
      "40px",
      () => {
        console.log("Vous avez cliqué sur le compas !");
        
      }
    );
    leftPanel.addControl(compassBtn);

    const view2DBtn = createIconButton(
      "view2DBtn",
      "public/icons/view2d.png",
      "40px",
      "40px",
      () => {
        console.log("Basculer en vue 2D");
      }
    );
    leftPanel.addControl(view2DBtn);

    const view3DBtn = createIconButton(
      "view3DBtn",
      "public/icons/view3d.png", 
      "40px",
      "40px",
      () => {
        console.log("Basculer en vue 3D");

      }
    );
    leftPanel.addControl(view3DBtn);

    // Par exemple, vous pouvez ajouter un effet au survol :
    [compassBtn, view2DBtn, view3DBtn].forEach((btn) => {
      btn.onPointerEnterObservable.add(
        () => (btn.background = "rgba(255,255,255,0.2)")
      );
      btn.onPointerOutObservable.add(() => (btn.background = "transparent"));
    });

    // Vous pouvez aussi arrêter l’interaction de Babylon GUI sur les clics si la scène doit
    // (par exemple) détecter des picking mesh simultanément. Dans ce cas, faites :
    advancedTexture.idealHeight = this.babylonScene.getEngine().getRenderHeight();
    advancedTexture.idealWidth = this.babylonScene.getEngine().getRenderWidth();
    advancedTexture.ignorePointerDownOnEmptySpace = true;
    advancedTexture.ignorePointerUpOnEmptySpace = true;
  }

  destroy() {}

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

  _createCharacter() {
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
