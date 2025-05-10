import { Scene } from "./Scene";
import { StartScene } from "../scenes/StartScene";
import { MenuScene } from "../scenes/MenuScene";
import { SettingsScene } from "../scenes/SettingsScene";

export class SceneManager {
    private static instance: SceneManager;
    private _currentScene!: Scene| null;
    private scenes: Map<string, any> = new Map();

    private constructor() {}

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    /**
     * Import all scenes and initialize the current scene
     */
    public initializeScenes(): void {
        // start the first scene
        const scene: Scene = this._createScene("start");
        this._loadAndStartScene(scene);
    }
    private _loadAndStartScene(scene: Scene): void {
        scene.preload().then((): void => {
            this._currentScene = scene;
            this._currentScene.start();
        });
    }

    private _createScene(sceneName: string): Scene {
        switch (sceneName) {
            case "start":
                return new StartScene();
            case "menu":
                return new MenuScene();
            case "settings":
                return  new SettingsScene();
            default:
                throw new Error("Scene not found");
        }
    }


    /**
     * Update the current scene
     */
    public updateCurrentScene(): void {
        if (!this._currentScene) return;
        this._currentScene.update();
    }

    /**
     * Stop the current scene and start the new one
     * @param sceneName
     */
    public changeScene(sceneName: string): void {
        if (this._currentScene) {
            console.log(`SceneManager: Stopping scene ${this._currentScene.name}`);
            this._currentScene.destroy();
            this._currentScene = null;
        }

        const newScene: Scene = this._createScene(sceneName);
        this._loadAndStartScene(newScene);
    }

}