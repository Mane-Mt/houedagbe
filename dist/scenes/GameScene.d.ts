import { Scene } from "../core/Scene";
export declare class GameScene extends Scene {
    private _gameDiv;
    constructor();
    preload(): Promise<void>;
    start(): void;
    destroy(): void;
    private _createFootballPitch;
}
