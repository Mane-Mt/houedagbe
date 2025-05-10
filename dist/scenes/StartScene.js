import { Scene } from "../core/Scene.js";
export class StartScene extends Scene {
    constructor() {
        super("start");
        this._canClick = true;
    }
    start() {
        this._startDiv = document.createElement("div");
        this._startDiv.className = "menu-background";
        this.game.uiContainer.appendChild(this._startDiv);
        this._startText = document.createElement("p");
        this._startText.id = "start-text";
        this._startText.textContent = "Commencer";
        this._startDiv.appendChild(this._startText);
        const icon = document.createElement("img");
        icon.id = "big-icon";
        icon.src = "public/img/houedagbeLogo.png";
        this._startDiv.appendChild(icon);
    }
    update() {
        super.update();
        window.addEventListener("keydown", (event) => {
            if (event.code === "Space" && this._canClick) {
                this._canClick = false;
                this._tryToConnectToServer();
            }
        });
    }
    _tryToConnectToServer() {
        this._startText.textContent = "connecting to server...";
        this._startText.style.color = "green";
        this.game.fadeIn(this._onConnectedToServer.bind(this));
        // loading spinner
        const spinner = document.createElement("div");
        spinner.className = "spinner";
        this._startDiv.appendChild(spinner);
    }
    _onConnectedToServer() {
        this.sceneManager.changeScene("menu");
    }
    destroy() {
        super.destroy();
        this.game.uiContainer.removeChild(this._startDiv);
    }
}
