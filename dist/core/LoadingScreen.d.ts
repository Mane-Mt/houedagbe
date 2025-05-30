import * as BABYLON from "@babylonjs/core";
export declare class LoadingScreen implements BABYLON.ILoadingScreen {
    loadingUIBackgroundColor: string;
    loadingUIText: string;
    private _loadingDiv;
    private _game;
    displayLoadingUI(): void;
    hideLoadingUI(): void;
}
