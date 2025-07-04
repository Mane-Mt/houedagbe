import { Game } from "./Game.js";
import { SceneManager } from "./SceneManager.js";
import { EntityManager } from "./EntityManager.js";
export class Scene {
    constructor(name) {
        this.game = Game.getInstance();
        this.loadedAssets = {};
        this.sceneManager = SceneManager.getInstance();
        this.physicsPlugin = null;
        this.entityManager = new EntityManager();
        this.name = name;
        this.intervalId = null
        // initialize the scene with a main camera
        this.babylonScene = new BABYLON.Scene(this.game.engine);
        this.mainCamera = new BABYLON.FreeCamera("mainCamera",new BABYLON.Vector3(9.79, 4.96, -34.11),this.babylonScene);
        this.mainCamera.setTarget(new BABYLON.Vector3(0, 2, 0));
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
    enablePhysics(gravityVector) {
        // this.physicsPlugin = new BABYLON.HavokPlugin(false, this.game.havokInstance);
        // this.babylonScene.enablePhysics(gravityVector, this.physicsPlugin);
        // set physics to disabled to update it manually in fixedUpdate
        this.babylonScene.physicsEnabled = false;
    }
}
