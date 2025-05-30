import { CameraAnimation } from "../core/components/CameraAnimation.js";
import { CameraComponent } from "../core/components/CameraComponent.js";
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
        this.loadedAssets["caveman"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "caveman.glb", this.babylonScene);
        this.loadedAssets["cavewoman"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "cavewoman.glb", this.babylonScene);
        this.loadedAssets["footballPitch"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/", "ruins_of_hore_abbey.glb", this.babylonScene);
        this.loadedAssets["ball"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "ball.glb", this.babylonScene);
        this.game.engine.hideLoadingUI();
    }
    start() {
        // this.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
        // // camera
        // this.mainCamera.position = new BABYLON.Vector3(0, 11, -15);
        // // skybox
        // const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.babylonScene);
        // const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.babylonScene);
        // skyboxMaterial.backFaceCulling = false;
        // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("img/skybox", this.babylonScene);
        // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        // skybox.material = skyboxMaterial;
        // // start animation
        // const cameraEntity = new Entity();
        // const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-20, 3, -10), this.babylonScene);
        // cameraEntity.addComponent(new CameraComponent(cameraEntity, this, { camera: camera }));
        // cameraEntity.addComponent(new CameraAnimation(cameraEntity, this));
        // this.entityManager.addEntity(cameraEntity);
        // // light
        // const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.babylonScene);
        // light.intensity = 0.7;
        // this._createFootballPitch();
        // const mainCameraEntity = new Entity("camera");
        // mainCameraEntity.addComponent(new CameraComponent(mainCameraEntity, this, { camera: this.mainCamera }));
        // this.entityManager.addEntity(mainCameraEntity);
        // this._gameDiv = document.createElement("div");
        // this._gameDiv.id = "controls";
        // this._gameDiv.className = "";
        // this.game.uiContainer.appendChild(this._gameDiv);
        // const elementsDiv = document.createElement("div");
        // elementsDiv.id = "elements-div";


        const light = new BABYLON.HemisphericLight('lighsa', new BABYLON.Vector3(0,10,0), this.babylonScene)
        BABYLON.SceneLoader.ImportMesh(
            "",                           
            "../../public/",                 
            "pine_tree.glb",                 
            this.babylonScene,           
            (meshes) => {
                const tree = meshes[0];    
                tree.position = new BABYLON.Vector3(3, 0, 0); 
                tree.scaling = new BABYLON.Vector3(2, 2, 2); 
            }
        );
        this._createGround(this.babylonScene);
        const camaraContainer = new BABYLON.MeshBuilder.CreateGround('ground', { width: .5, height : .5}, this.babylonScene)
        camaraContainer.position = new BABYLON.Vector3(0,15,0)
        this.mainCamera.parent = camaraContainer;
        this.mainCamera.setTarget( new BABYLON.Vector3(0,-10,0));


        let camVertical = 0;
        let camHorizontal = 0;
        window.addEventListener("keydown", e => {
            const  theKey = e.key.toLowerCase();
            if(theKey === "arrowup") camVertical =1;
            if(theKey === "arrowdown") camVertical = -1;
            if(theKey === "arrowleft") camHorizontal = -1;
            if(theKey === "arrowright") camHorizontal = 1;
            camaraContainer.locallyTranslate(new BABYLON.Vector3(camHorizontal,0, camVertical));
        })
        window.addEventListener("keyup", e => {
            const  theKey = e.key.toLowerCase();
            if(theKey === "arrowup") camVertical =0;
            if(theKey === "arrowdown") camVertical = 0;
            if(theKey === "arrowleft") camHorizontal = 0;
            if(theKey === "arrowright") camHorizontal = 0;
        })
        
    }
    destroy() {
        super.destroy();
    }
    _createFootballPitch() {
        const groundEntity = new Entity("ground");
        const mapContainer = this.loadedAssets["footballPitch"];
        mapContainer.addAllToScene();
        const footballPitch = mapContainer.meshes[0];
        mapContainer.meshes.forEach((mesh) => {
            mesh.receiveShadows = true;
        });
        footballPitch.scaling.scaleInPlace(4);
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: PITCH_WIDTH + 5, height: PITCH_HEIGHT }, this.babylonScene);
        ground.metadata = { tag: groundEntity.tag };
        ground.isVisible = false;
        footballPitch.setParent(ground);
        footballPitch.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), Math.PI);
        footballPitch.position = new BABYLON.Vector3(0.928, 0.239, 0.082);
        this.entityManager.addEntity(groundEntity);
    }

    _createGround(scene){
        const ground = new BABYLON.MeshBuilder.CreateGround('ground', { width: 50, height:50}, scene)
        const groundMat = new BABYLON.StandardMaterial("groundMat", scene)
        const diffuseTex = new BABYLON.Texture('../../public/textures/rocky_terrain_02_diff_4k.jpg', scene)
        groundMat.diffuseTexture =  diffuseTex;
        diffuseTex.uScale = 10;
        diffuseTex.vScale = 10;
        groundMat.specularColor = new BABYLON.Color3(0,0,0)
        ground.material = groundMat
    }
}
