import * as BABYLON from "@babylonjs/core";
export declare class Game {
    private static instance;
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    readonly uiContainer: Element;
    constructor();
    static getInstance(): Game;
    start(): void;
    createCanvas(): HTMLCanvasElement;
    private _resize;
    /**
     * Fade in and fade out effect
     * @param callback - Function to call after the fade out effect
     */
    fadeIn(callback?: (() => void)): void;
}
