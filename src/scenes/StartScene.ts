import { Game } from "../core/Game";
import * as BABYLON from "@babylonjs/core";
import { Scene } from "../core/Scene";
import { Peer } from "peerjs";
import { v4 as uuid } from "uuid";
import { SceneManager } from "../core/SceneManager";

export class StartScene extends Scene {
    private _startDiv!: HTMLDivElement;
    private _startText!: HTMLParagraphElement;
    private _canClick: boolean = true;

    constructor() {
        super("start");
    }

    public start(): void {
        this._startDiv = document.createElement("div");
        this._startDiv.className = "menu-background";
        this.game.uiContainer.appendChild(this._startDiv);

        this._startText = document.createElement("p");
        this._startText.id = "start-text";
        this._startText.textContent = "Commencer";
        this._startDiv.appendChild(this._startText);
        const icon: HTMLImageElement = document.createElement("img");
        icon.id = "big-icon";
        icon.src = "public/img/houedagbeLogo.png";
        this._startDiv.appendChild(icon);
    }

    public update(): void {
        super.update();

        window.addEventListener("keydown", (event) => {
            if (event.code === "Space" && this._canClick) {
                this._canClick = false;
                this._tryToConnectToServer();
            }
        });
    }

    private _tryToConnectToServer(): void {
        this._startText.textContent = "connecting to server...";
        this._startText.style.color = "green";
        this.game.fadeIn(this._onConnectedToServer.bind(this));


        // loading spinner
        const spinner: HTMLDivElement = document.createElement("div");
        spinner.className = "spinner";
        this._startDiv.appendChild(spinner);
    }

    private _onConnectedToServer(): void {
        this.sceneManager.changeScene("menu");
    }

    
    public destroy(): void {
        super.destroy();
        this.game.uiContainer.removeChild(this._startDiv);
    }
}