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
        this.game.engine.hideLoadingUI();
    }

    start(): void {
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
        const camaraContainer = BABYLON.MeshBuilder.CreateGround('ground', { width: .5, height : .5}, this.babylonScene)
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

    private _createGround(scene: BABYLON.Scene){
        const ground =  BABYLON.MeshBuilder.CreateGround('ground', { width: 50, height:50}, scene);
        const groundMat = new BABYLON.StandardMaterial("groundMat", scene)
        const diffuseTex = new BABYLON.Texture('../../public/textures/rocky_terrain_02_diff_4k.jpg', scene)
        groundMat.diffuseTexture =  diffuseTex;
        diffuseTex.uScale = 10;
        diffuseTex.vScale = 10;
        groundMat.specularColor = new BABYLON.Color3(0,0,0)
        ground.material = groundMat
    }
}