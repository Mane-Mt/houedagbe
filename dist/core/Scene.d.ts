import * as BABYLON from "@babylonjs/core";
import { Game } from "./Game";
import { SceneManager } from "./SceneManager";
import { EntityManager } from "./EntityManager";
export declare abstract class Scene {
    babylonScene: BABYLON.Scene;
    mainCamera: BABYLON.FreeCamera;
    game: Game;
    name: string;
    loadedAssets: {
        [name: string]: BABYLON.AssetContainer;
    };
    sceneManager: SceneManager;
    physicsPlugin: BABYLON.Nullable<BABYLON.HavokPlugin>;
    entityManager: EntityManager;
    protected constructor(name: string);
    preload(): Promise<void>;
    /**
     * Initialize all entities
     */
    abstract start(): void;
    /**
     * Render the scene and update entities
     */
    update(): void;
    /**
     * Destroy the scene and all entities
     */
    destroy(): void;
    enablePhysics(gravityVector?: BABYLON.Vector3): void;
}
