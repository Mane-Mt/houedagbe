import * as BABYLON from "@babylonjs/core";
import { Game } from "./Game";
import { SceneManager } from "./SceneManager";

export abstract class Scene {
    public babylonScene: BABYLON.Scene;
    public mainCamera: BABYLON.FreeCamera;
    public game: Game = Game.getInstance();
    public name: string;
    public sceneManager: SceneManager = SceneManager.getInstance();

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
}
