import { CameraAnimation } from "../core/components/CameraAnimation";
import { CameraComponent } from "../core/components/CameraComponent";
import { Entity } from "../core/Entity";
import { Scene } from "../core/Scene";
import * as BABYLON from "@babylonjs/core";
const PITCH_WIDTH: number = 40;
const PITCH_HEIGHT: number = 27;

export class GameScene extends Scene{
    private _gameDiv!: HTMLDivElement;
    constructor() {
       super("game");
    }
    public async preload(): Promise<void> {
        this.game.engine.displayLoadingUI();
        
        // load assets
        this.loadedAssets["caveman"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "caveman.glb", this.babylonScene);
        this.loadedAssets["cavewoman"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "cavewoman.glb", this.babylonScene);
        this.loadedAssets["footballPitch"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/", "ruins_of_hore_abbey.glb", this.babylonScene);
        this.loadedAssets["ball"] = await BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "ball.glb", this.babylonScene);
        this.game.engine.hideLoadingUI();
    }

    start(): void {
        this.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
        
        // camera
        this.mainCamera.setTarget(BABYLON.Vector3.Zero());
        this.mainCamera.position = new BABYLON.Vector3(0, 11, -15);

        // skybox
        const skybox: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, this.babylonScene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.babylonScene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("img/skybox", this.babylonScene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

         // start animation
        const cameraEntity = new Entity();
        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-20, 3, -10), this.babylonScene);
        cameraEntity.addComponent(new CameraComponent(cameraEntity, this, {camera: camera}));
        cameraEntity.addComponent(new CameraAnimation(cameraEntity, this));
        this.entityManager.addEntity(cameraEntity);

        // light
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.babylonScene);
        light.intensity = 0.7;
        this._createFootballPitch();
        const mainCameraEntity = new Entity("camera");
        mainCameraEntity.addComponent(new CameraComponent(mainCameraEntity, this, {camera: this.mainCamera}));
        this.entityManager.addEntity(mainCameraEntity);


        this._gameDiv = document.createElement("div");
        this._gameDiv.id = "controls";
        
        this._gameDiv.className = "";
        this.game.uiContainer.appendChild(this._gameDiv);
        const elementsDiv = document.createElement("div");
        elementsDiv.id = "elements-div";
        
    }
    public destroy(): void {
        super.destroy();
    }

    private _createFootballPitch(): void {
        const groundEntity = new Entity("ground");

        const mapContainer: BABYLON.AssetContainer = this.loadedAssets["footballPitch"];
        mapContainer.addAllToScene();
        const footballPitch: BABYLON.Mesh = mapContainer.meshes[0] as BABYLON.Mesh;
        mapContainer.meshes.forEach((mesh: BABYLON.AbstractMesh): void => {
            mesh.receiveShadows = true;
        });
        footballPitch.scaling.scaleInPlace(4);

        const ground: BABYLON.GroundMesh = BABYLON.MeshBuilder.CreateGround("ground", {width: PITCH_WIDTH + 5, height: PITCH_HEIGHT}, this.babylonScene);
        ground.metadata = {tag: groundEntity.tag};
        ground.isVisible = false;
        footballPitch.setParent(ground);
        footballPitch.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), Math.PI);
        footballPitch.position = new BABYLON.Vector3(0.928, 0.239, 0.082);

        // groundEntity.addComponent(new MeshComponent(groundEntity, this, {mesh: ground}));
        // groundEntity.addComponent(new RigidBodyComponent(groundEntity, this, {
        //     physicsShape: B.PhysicsShapeType.BOX,
        //     physicsProps: {mass: 0}
        // }));
        this.entityManager.addEntity(groundEntity);
    }
}