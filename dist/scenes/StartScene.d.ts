import { Scene } from "../core/Scene";
export declare class StartScene extends Scene {
    private _startDiv;
    private _startText;
    private _canClick;
    constructor();
    start(): void;
    update(): void;
    private _tryToConnectToServer;
    private _onConnectedToServer;
    destroy(): void;
}
