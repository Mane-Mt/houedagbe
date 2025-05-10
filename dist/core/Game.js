import { LoadingScreen } from "./LoadingScreen.js";
import { SceneManager } from "./SceneManager.js";
export class Game {
    constructor() {
        this.uiContainer = document.querySelector("#ui");
    }
    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    // Initialize the game engine and canvas
    start() {
        console.log("Game started");
        this.canvas = this.createCanvas();
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.engine.loadingScreen = new LoadingScreen();
        this._resize(this.engine);
        // scenes
        const sceneManager = SceneManager.getInstance();
        sceneManager.initializeScenes();
        // game loop
        this.engine.runRenderLoop(() => {
            sceneManager.updateCurrentScene();
        });
    }
    createCanvas() {
        const canvas = document.createElement("canvas");
        canvas.id = "renderCanvas";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    }
    _resize(engine) {
        window.addEventListener("resize", () => {
            engine.resize();
        });
    }
    /**
     * Fade in and fade out effect
     * @param callback - Function to call after the fade out effect
     */
    fadeIn(callback) {
        const fadeDiv = document.createElement("div");
        fadeDiv.className = "fade";
        document.body.appendChild(fadeDiv);
        // to trigger the fade-in transition
        setTimeout(() => {
            fadeDiv.style.opacity = "1";
        }, 100);
        // to trigger the fade-out transition
        setTimeout(() => {
            fadeDiv.style.opacity = "0";
            if (callback)
                callback();
        }, 1000);
        setTimeout(() => {
            fadeDiv.remove();
        }, 1700);
    }
}
