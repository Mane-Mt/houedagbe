import * as BABYLON from "@babylonjs/core";
import { LoadingScreen } from "./LoadingScreen";
import { SceneManager } from "./SceneManager";


export class Game {
    private static instance: Game;
    public canvas!: HTMLCanvasElement;
    public engine!: BABYLON.Engine;
    public readonly uiContainer: Element = document.querySelector("#ui")!;


    public constructor() {
    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    // Initialize the game engine and canvas
    public start() {
        console.log("Game started");
        this.canvas = this.createCanvas();
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.engine.loadingScreen = new LoadingScreen();
        this._resize(this.engine);

         // scenes
         const sceneManager: SceneManager = SceneManager.getInstance();
         sceneManager.initializeScenes();

         // game loop
        this.engine.runRenderLoop((): void => {
            sceneManager.updateCurrentScene();
        });
    
    }

    public createCanvas() {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.id = "renderCanvas";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    }

    private _resize(engine: BABYLON.Engine): void {
        window.addEventListener("resize", (): void => {
            engine.resize();
        });
    }

    /**
     * Fade in and fade out effect
     * @param callback - Function to call after the fade out effect
     */
    public fadeIn(callback?: (() => void)): void {
        const fadeDiv: HTMLDivElement = document.createElement("div");
        fadeDiv.className = "fade";
        document.body.appendChild(fadeDiv);

        // to trigger the fade-in transition
        setTimeout((): void => {
            fadeDiv.style.opacity = "1";
        }, 100);

        // to trigger the fade-out transition
        setTimeout((): void => {
            fadeDiv.style.opacity = "0";
            if (callback) callback();
        }, 1000);

        setTimeout((): void => {
            fadeDiv.remove();
        }, 1700);
    }

}