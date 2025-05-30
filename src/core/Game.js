"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var BABYLON = require("@babylonjs/core");
var LoadingScreen_1 = require("./LoadingScreen");
var SceneManager_1 = require("./SceneManager");
var Game = /** @class */ (function () {
    function Game() {
        this.uiContainer = document.querySelector("#ui");
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    // Initialize the game engine and canvas
    Game.prototype.start = function () {
        console.log("Game started");
        this.canvas = this.createCanvas();
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.engine.loadingScreen = new LoadingScreen_1.LoadingScreen();
        this._resize(this.engine);
        // scenes
        var sceneManager = SceneManager_1.SceneManager.getInstance();
        sceneManager.initializeScenes();
        // game loop
        this.engine.runRenderLoop(function () {
            sceneManager.updateCurrentScene();
        });
    };
    Game.prototype.createCanvas = function () {
        var canvas = document.createElement("canvas");
        canvas.id = "renderCanvas";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    };
    Game.prototype._resize = function (engine) {
        window.addEventListener("resize", function () {
            engine.resize();
        });
    };
    /**
     * Fade in and fade out effect
     * @param callback - Function to call after the fade out effect
     */
    Game.prototype.fadeIn = function (callback) {
        var fadeDiv = document.createElement("div");
        fadeDiv.className = "fade";
        document.body.appendChild(fadeDiv);
        // to trigger the fade-in transition
        setTimeout(function () {
            fadeDiv.style.opacity = "1";
        }, 100);
        // to trigger the fade-out transition
        setTimeout(function () {
            fadeDiv.style.opacity = "0";
            if (callback)
                callback();
        }, 1000);
        setTimeout(function () {
            fadeDiv.remove();
        }, 1700);
    };
    return Game;
}());
exports.Game = Game;
