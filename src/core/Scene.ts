import * as BABYLON from "@babylonjs/core";
import { Game } from "./Game";
import { SceneManager } from "./SceneManager";
import { EntityManager } from "./EntityManager";

export abstract class Scene {
    public babylonScene: BABYLON.Scene;
    public mainCamera: BABYLON.FreeCamera;
    public game: Game = Game.getInstance();
    public name: string;
    public loadedAssets: { [name: string]: BABYLON.AssetContainer } = {};
    public sceneManager: SceneManager = SceneManager.getInstance();
    public physicsPlugin: BABYLON.Nullable<BABYLON.HavokPlugin> = null;
    public entityManager = new EntityManager();

    protected constructor(name: string) {
        this.name = name;

        // initialize the scene with a main camera
        this.babylonScene = new BABYLON.Scene(this.game.engine);
        this.mainCamera = new BABYLON.FreeCamera("mainCamera", new BABYLON.Vector3(0, 5, -10), this.babylonScene);
    }

    public async preload(): Promise<void> {};

    /**
     * Initialize all entities
     */
    public abstract start(): void;

    /**
     * Render the scene and update entities
     */
    public update(): void {
        this.babylonScene.render();
    }
    
    /**
     * Destroy the scene and all entities
     */
    public destroy(): void {
        this.mainCamera.dispose();
        this.babylonScene.dispose();
    }

    public enablePhysics(gravityVector?: BABYLON.Vector3): void {
        // this.physicsPlugin = new BABYLON.HavokPlugin(false, this.game.havokInstance);
        // this.babylonScene.enablePhysics(gravityVector, this.physicsPlugin);
        // set physics to disabled to update it manually in fixedUpdate
        this.babylonScene.physicsEnabled = false;
    }
}
