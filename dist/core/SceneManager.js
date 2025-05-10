import { StartScene } from "../scenes/StartScene.js";
import { MenuScene } from "../scenes/MenuScene.js";
import { SettingsScene } from "../scenes/SettingsScene.js";
export class SceneManager {
    constructor() {
        this.scenes = new Map();
    }
    static getInstance() {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }
    /**
     * Import all scenes and initialize the current scene
     */
    initializeScenes() {
        // start the first scene
        const scene = this._createScene("start");
        this._loadAndStartScene(scene);
    }
    _loadAndStartScene(scene) {
        scene.preload().then(() => {
            this._currentScene = scene;
            this._currentScene.start();
        });
    }
    _createScene(sceneName) {
        switch (sceneName) {
            case "start":
                return new StartScene();
            case "menu":
                return new MenuScene();
            case "settings":
                return new SettingsScene();
            default:
                throw new Error("Scene not found");
        }
    }
    /**
     * Update the current scene
     */
    updateCurrentScene() {
        if (!this._currentScene)
            return;
        this._currentScene.update();
    }
    /**
     * Stop the current scene and start the new one
     * @param sceneName
     */
    changeScene(sceneName) {
        if (this._currentScene) {
            console.log(`SceneManager: Stopping scene ${this._currentScene.name}`);
            this._currentScene.destroy();
            this._currentScene = null;
        }
        const newScene = this._createScene(sceneName);
        this._loadAndStartScene(newScene);
    }
}
