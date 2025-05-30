"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
var StartScene_1 = require("../scenes/StartScene");
var MenuScene_1 = require("../scenes/MenuScene");
var SettingsScene_1 = require("../scenes/SettingsScene");
var GameScene_1 = require("../scenes/GameScene");
var SceneManager = /** @class */ (function () {
    function SceneManager() {
        this.scenes = new Map();
    }
    SceneManager.getInstance = function () {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    };
    /**
     * Import all scenes and initialize the current scene
     */
    SceneManager.prototype.initializeScenes = function () {
        // start the first scene
        var scene = this._createScene("start");
        this._loadAndStartScene(scene);
    };
    SceneManager.prototype._loadAndStartScene = function (scene) {
        var _this = this;
        scene.preload().then(function () {
            _this._currentScene = scene;
            _this._currentScene.start();
        });
    };
    SceneManager.prototype._createScene = function (sceneName) {
        switch (sceneName) {
            case "start":
                return new StartScene_1.StartScene();
            case "menu":
                return new MenuScene_1.MenuScene();
            case "settings":
                return new SettingsScene_1.SettingsScene();
            case "game":
                return new GameScene_1.GameScene();
            default:
                throw new Error("Scene not found");
        }
    };
    /**
     * Update the current scene
     */
    SceneManager.prototype.updateCurrentScene = function () {
        if (!this._currentScene)
            return;
        this._currentScene.update();
    };
    /**
     * Stop the current scene and start the new one
     * @param sceneName
     */
    SceneManager.prototype.changeScene = function (sceneName) {
        if (this._currentScene) {
            console.log("SceneManager: Stopping scene ".concat(this._currentScene.name));
            this._currentScene.destroy();
            this._currentScene = null;
        }
        var newScene = this._createScene(sceneName);
        this._loadAndStartScene(newScene);
    };
    return SceneManager;
}());
exports.SceneManager = SceneManager;
