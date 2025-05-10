import { Game } from "./Game.js";
export class LoadingScreen {
    constructor() {
        this.loadingUIBackgroundColor = "#000000";
        this.loadingUIText = "Loading...";
        this._game = Game.getInstance();
    }
    displayLoadingUI() {
        this._loadingDiv = document.createElement("div");
        this._loadingDiv.className = "menu-background blur-background";
        this._game.uiContainer.appendChild(this._loadingDiv);
        const loadingText = document.createElement("p");
        loadingText.id = "start-text";
        loadingText.textContent = this.loadingUIText;
        this._loadingDiv.appendChild(loadingText);
        const icon = document.createElement("img");
        icon.id = "big-icon";
        icon.src = "public/img/houedagbeLogo.png";
        this._loadingDiv.appendChild(icon);
        // loading spinner
        const spinner = document.createElement("div");
        spinner.className = "spinner";
        this._loadingDiv.appendChild(spinner);
    }
    hideLoadingUI() {
        this._game.uiContainer.removeChild(this._loadingDiv);
    }
}
