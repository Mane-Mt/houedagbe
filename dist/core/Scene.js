import { Game } from "./Game.js";
import { SceneManager } from "./SceneManager.js";
export class Scene {
    constructor(name) {
        this.game = Game.getInstance();
        this.sceneManager = SceneManager.getInstance();
        this.name = name;
        // initialize the scene with a main camera
        this.babylonScene = new BABYLON.Scene(this.game.engine);
        this.mainCamera = new BABYLON.FreeCamera("mainCamera", new BABYLON.Vector3(0, 5, -10), this.babylonScene);
    }
    async preload() { }
    ;
    /**
     * Render the scene and update entities
     */
    update() {
        this.babylonScene.render();
    }
    /**
     * Destroy the scene and all entities
     */
    destroy() {
        this.mainCamera.dispose();
        this.babylonScene.dispose();
    }
}
