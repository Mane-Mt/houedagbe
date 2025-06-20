import { StartScene } from "../scenes/StartScene.js";
import { MenuScene } from "../scenes/MenuScene.js";
import { SettingsScene } from "../scenes/SettingsScene.js";
import { FirstGamePartScene } from "../scenes/FirstGamePartScene.js";
import { SecondGamePartScene } from "../scenes/SecondGamePartScene.js";
import { PreloadingScene } from "../scenes/PreloadingScene.js";
import { FirstStepHint } from "../scenes/FirstStepHint.js";
import { FirstStepCompletion } from "../scenes/FirstStepCompletion.js";
import { SecondStepHint } from "../scenes/SecondStepHint.js";
import { GameOverScene } from "../scenes/GameOverScene.js";
import { SecondStepCompletion } from "../scenes/SecondStepCompletion.js";
import { ThirdGamePartScene } from "../scenes/ThirdGamePartScene.js";
import { ThirdStepCompletion } from "../scenes/ThirdStepCompletion.js";
import { ThirdStepHint } from "../scenes/ThirdStepHint.js";
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
            case "preloading":
                return new PreloadingScene();
            case "game_over":       
                return new GameOverScene();
            case "first_game_part":
                return new FirstGamePartScene();
            case "first_step_hint":
                return new FirstStepHint();
            case "first_step_completion":
                return new FirstStepCompletion();
            case "second_game_part":       
                return new SecondGamePartScene();
            case "second_step_completion":       
                return new SecondStepCompletion();
            case "second_step_hint":
            return new SecondStepHint();
                case "third_game_part":       
            return new ThirdGamePartScene();
            case "third_step_completion":       
                return new ThirdStepCompletion();
            case "third_step_hint":
                return new ThirdStepHint();
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
