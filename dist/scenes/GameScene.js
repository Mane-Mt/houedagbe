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
    start() {
        const light = new BABYLON.HemisphericLight('lighsa', new BABYLON.Vector3(0, 10, 0), this.babylonScene);
                
        let originalTree = null;

        BABYLON.SceneLoader.ImportMesh("", "../../public/", "pine_tree.glb", this.babylonScene, (meshes) => {
            const root = new BABYLON.TransformNode("treeRoot", this.babylonScene);
            meshes.forEach(mesh => mesh.parent = root);

            root.position = new BABYLON.Vector3(3, 0, 0);
            root.scaling = new BABYLON.Vector3(2, 2, 2);
            root.setEnabled(false);

            originalTree = root; 
        });

        this._createGround(this.babylonScene);
        const camaraContainer = BABYLON.MeshBuilder.CreateGround('ground', { width: .5, height: .5 }, this.babylonScene);
        camaraContainer.position = new BABYLON.Vector3(0, 10, 0);
        this.mainCamera.parent = camaraContainer;
        this.mainCamera.setTarget(new BABYLON.Vector3(0, -10, 0));
        let camVertical = 0;
        let camHorizontal = 0;
        window.addEventListener("keydown", e => {
            const theKey = e.key.toLowerCase();
            if (theKey === "arrowup")
                camVertical = 1;
            if (theKey === "arrowdown")
                camVertical = -1;
            if (theKey === "arrowleft")
                camHorizontal = -1;
            if (theKey === "arrowright")
                camHorizontal = 1;
            camaraContainer.locallyTranslate(new BABYLON.Vector3(camHorizontal, 0, camVertical));
        });
        window.addEventListener("keyup", e => {
            const theKey = e.key.toLowerCase();
            if (theKey === "arrowup")
                camVertical = 0;
            if (theKey === "arrowdown")
                camVertical = 0;
            if (theKey === "arrowleft")
                camHorizontal = 0;
            if (theKey === "arrowright")
                camHorizontal = 0;
        });

        this._createAvatar(this.babylonScene);

       window.addEventListener('click', () => {
            const pickResult = this.babylonScene.pick(this.babylonScene.pointerX, this.babylonScene.pointerY);

            if (pickResult.hit && originalTree) {
                const point = pickResult.pickedPoint;

                // Cloner l'arbre
                const clone = originalTree.clone("treeClone_" + Date.now());
                if (clone) {
                    clone.position = point;
                    clone.setEnabled(true); // Afficher le clone
                    console.log("Arbre cloné à :", point);
                }
            }
        });

        // 1. Créer l'interface GUI
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // 2. Créer un conteneur vertical à droite
        const panel = new BABYLON.GUI.StackPanel();
        panel.width = "150px";
        panel.isVertical = true;
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(panel);
    
        // 4. Ajouter les boutons avec leurs actions
        panel.addControl(this._createButton("Arbre", () => {
            console.log("Arbre sélectionné");
        }));

        panel.addControl(this._createButton("Maison", () => {
            console.log("Maison sélectionnée");
        }));

        panel.addControl(this._createButton("Véranda", () => {
            console.log("Véranda sélectionnée");
        }));
    }
    destroy() {
        super.destroy();
    }
    
    _createGround(scene) {
        const ground = BABYLON.MeshBuilder.CreateGround('ground',  { width: 1000, height: 1000 }, scene);
        const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        const diffuseTex = new BABYLON.Texture('../../public/textures/rocky_terrain_02_diff_4k.jpg', scene);
        groundMat.diffuseTexture = diffuseTex;
        diffuseTex.uScale = 10;
        diffuseTex.vScale = 10;
        groundMat.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMat;
    }

    _createAvatar(scene){
         const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("avatarUI", true, scene);
        // Image carrée = cercle possible
        const avatarImage = new BABYLON.GUI.Image("avatar", "../../public/avatar.png");
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
        avatarImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
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
