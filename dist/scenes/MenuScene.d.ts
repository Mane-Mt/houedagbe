import { Scene } from "../core/Scene";
export declare class MenuScene extends Scene {
    private _menuDiv;
    constructor();
    preload(): Promise<void>;
    start(): void;
    private _createCharacterButton;
    private _createParametersButton;
    private _createPlayButton;
    destroy(): void;
}
