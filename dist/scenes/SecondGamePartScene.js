import { Scene } from "../core/Scene.js";

export class SecondGamePartScene extends Scene {
  constructor() {
    super("second_game_part");
    this._canClick = true;
  }

  async preload() {
    this.game.engine.displayLoadingUI();
    console.log("La deuxieme partie vient de commencer");
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
        root.setEnabled(false);
        originalTree = root;
      }
    );

    //Create  a home in the game
    let homeMesh = null;
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "public/",
      "tiny_home.glb",
      this.babylonScene
    ).then((result) => {
      result.meshes.forEach((mesh) => {
        mesh.metadata = { isHome: true };
        mesh.isVisible = false;
      });
      homeMesh = result.meshes[0];
      homeMesh.scaling = new BABYLON.Vector3(0.38, 0.8, 0.38);
      homeMesh.position = new BABYLON.Vector3(-6, 0, 0);
      homeMesh.rotate(
        BABYLON.Axis.Y,
        BABYLON.Tools.ToRadians(-95),
        BABYLON.Space.LOCAL
      );
    });

    window.addEventListener("click", () => {
      const pickResult = this.babylonScene.pick(
        this.babylonScene.pointerX,
        this.babylonScene.pointerY
      );
      if (pickResult.hit && homeMesh) {
        const point = pickResult.pickedPoint;
        // Cloner l'arbre
        const clone = homeMesh.clone("treeClone_" + Date.now());
        if (clone) {
          clone.isVisible = true; // Afficher le clone
          clone.position = point;
          clone.scaling = new BABYLON.Vector3(0.38, 0.8, 0.38);
          console.log("Arbre cloné à :", point);
        }
      }
    });

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

    const advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "UI",
        true,
        this.babylonScene
      );
    const leftPanel = new BABYLON.GUI.StackPanel();
    leftPanel.width = "60px";
    leftPanel.isVertical = true;
    leftPanel.color = "white";
    leftPanel.left = "10px";
    leftPanel.isVertical = true;
    leftPanel.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    leftPanel.paddingRight = "10px";
    advancedTexture.addControl(leftPanel);
    let isClick = false;
    let isPlacingHome = false;
    const optionBtns = ["home", "tree"].map((name, i) => {
      const btn = createIconButton(
        name,
        'public/icons/'+name+'.png',
        "40px",
        "40px",
        () => {
          if (name === "home") {
            this._showBabylonAlert(
              advancedTexture,
              "Cliquez sur la scène pour placer une maison.",
              (event) => {
                event.preventDefault();
                isPlacingHome = true;
                // Placer la maison
                
              }
            );
          }
        }
      );
      btn.top = "10px";
      btn.alpha = 0;
      btn.isVisible = false;
      btn.scaleX = 1;
      btn.scaleY = 1;
      leftPanel.addControl(btn);
      return btn;
    });

    // 3. crée compassBtn et toggle l’apparition des optionBtns
    let panelVisible = false;
    const compassBtn = createIconButton(
      "compassBtn",
      "public/icons/parametres.png",
      "40px",
      "40px",
      () => {
        panelVisible = !panelVisible;
        optionBtns.forEach((btn, i) => {
          btn.isVisible = true; // nécessaire pour animer
          // animation alpha et scale (in/out)
          const fromAlpha = panelVisible ? 0 : 1;
          const toAlpha = panelVisible ? 1 : 0;
          const fromScale = panelVisible ? 0.5 : 1;
          const toScale = panelVisible ? 1 : 0.5;

          const fade = new BABYLON.Animation(
            `fade_${btn.name}`,
            "alpha",
            60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
          );
          fade.setKeys([
            { frame: 0, value: fromAlpha },
            { frame: 15, value: toAlpha },
          ]);

          const scaleX = fade.clone();
          scaleX.targetProperty = "scaleX";
          scaleX.setKeys([
            { frame: 0, value: fromScale },
            { frame: 15, value: toScale },
          ]);
          const scaleY = fade.clone();
          scaleY.targetProperty = "scaleY";
          scaleY.setKeys(scaleX.getKeys());

          this.babylonScene.beginDirectAnimation(
            btn,
            [fade, scaleX, scaleY],
            0,
            15,
            false,
            1,
            () => {
              if (!panelVisible) btn.isVisible = false;
            }
          );
        });
      }
    );
    leftPanel.addControl(compassBtn);

    // 4. (optionnel) effets au survol
    [compassBtn, ...optionBtns].forEach((btn) => {
      btn.onPointerEnterObservable.add(
        () => (btn.background = "rgba(255,255,255,0.2)")
      );
      btn.onPointerOutObservable.add(() => (btn.background = "transparent"));
    });

    // Vous pouvez aussi arrêter l’interaction de Babylon GUI sur les clics si la scène doit
    // (par exemple) détecter des picking mesh simultanément. Dans ce cas, faites :
    advancedTexture.idealHeight = this.babylonScene
      .getEngine()
      .getRenderHeight();
    advancedTexture.idealWidth = this.babylonScene.getEngine().getRenderWidth();
    advancedTexture.ignorePointerDownOnEmptySpace = true;
    advancedTexture.ignorePointerUpOnEmptySpace = true;

    // Fonction pour créer un bouton
    function createIconButton(name, iconUrl, widthPx, heightPx, onClick) {
      const btn = BABYLON.GUI.Button.CreateImageOnlyButton(name, iconUrl);
      btn.width = widthPx; // ex. "40px"
      btn.height = heightPx; // ex. "40px"

      // coins arrondis et découpe de l'image pour un cercle parfait
      const w = parseInt(widthPx, 10);
      const h = parseInt(heightPx, 10);
      btn.cornerRadius = Math.min(w, h) / 2;
      btn.clipChildren = true;
      btn.thickness = 0; // pas de bordure
      btn.paddingBottom = "20px"; // espacement dans le panel
      btn.onPointerUpObservable.add((evt, state) => {
        evt.preventDefault?.();
        onClick(evt, state);
      });
      return btn;
    }

    window.addEventListener("click", () => {
      if (isPlacingHome && homeMesh) {
        const pickResult = this.babylonScene.pick(
          this.babylonScene.pointerX,
          this.babylonScene.pointerY
        );

        if (pickResult.hit && pickResult.pickedPoint) {
          const point = pickResult.pickedPoint;
          const clone = homeMesh.clone("homeClone_" + Date.now());
          if (clone) {
            clone.position = point;
            clone.scaling = new BABYLON.Vector3(0.38, 0.8, 0.38);
            clone.setEnabled(true);
            console.log("Maison placée à :", point);
          }
          isPlacingHome = false;
        }
      }
    });
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

  _showBabylonAlert(advancedTexture, message, onClose = (event) => {}) {
    // Overlay flouté
    const overlay = new BABYLON.GUI.Rectangle();
    overlay.width = 1;
    overlay.height = 1;
    overlay.background = "rgba(0,0,0,0.5)";
    overlay.thickness = 0;
    overlay.zIndex = 10;
    advancedTexture.addControl(overlay);

    // Fenêtre de dialogue
    const dialog = new BABYLON.GUI.Rectangle("alertBox");
    dialog.width = "300px";
    dialog.height = "160px";
    dialog.cornerRadius = 15;
    dialog.color = "#0078D4";
    dialog.thickness = 2;
    dialog.background = "white";
    dialog.zIndex = 11;
    overlay.addControl(dialog);

    // Message texte
    const msgText = new BABYLON.GUI.TextBlock();
    msgText.text = message;
    msgText.color = "black";
    msgText.fontSize = 18;
    msgText.textWrapping = true;
    msgText.textHorizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    msgText.textVerticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    msgText.paddingTop = "10px";
    msgText.height = "60%";
    dialog.addControl(msgText);

    // Bouton OK
    const okBtn = BABYLON.GUI.Button.CreateSimpleButton("okBtn", "OK");
    okBtn.width = "80px";
    okBtn.height = "30px";
    okBtn.color = "white";
    okBtn.background = "#0078D4";
    okBtn.cornerRadius = 10;
    okBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    okBtn.top = "-10px";

    okBtn.onPointerUpObservable.add(() => {
      overlay.dispose();

      onClose(event);
    });

    dialog.addControl(okBtn);

    // Bouton X (fermer)
    const closeBtn = BABYLON.GUI.Button.CreateSimpleButton("closeBtn", "✕");
    closeBtn.width = "30px";
    closeBtn.height = "30px";
    closeBtn.color = "white";
    closeBtn.background = "red";
    closeBtn.cornerRadius = 15;
    closeBtn.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    closeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    closeBtn.top = "5px";
    closeBtn.left = "-5px";

    closeBtn.onPointerUpObservable.add(() => {
      overlay.dispose();
      onClose();
    });

    dialog.addControl(closeBtn);
  }
}
