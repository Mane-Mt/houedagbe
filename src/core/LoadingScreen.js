"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingScreen = void 0;
var Game_1 = require("./Game");
var LoadingScreen = /** @class */ (function () {
    function LoadingScreen() {
        this.loadingUIBackgroundColor = "#000000";
        this.loadingUIText = "Loading...";
        this._game = Game_1.Game.getInstance();
    }
    LoadingScreen.prototype.displayLoadingUI = function () {
        this._loadingDiv = document.createElement("div");
        this._loadingDiv.className = "menu-background blur-background";
        this._game.uiContainer.appendChild(this._loadingDiv);
        var loadingText = document.createElement("p");
        loadingText.id = "start-text";
        loadingText.textContent = this.loadingUIText;
        this._loadingDiv.appendChild(loadingText);
        var icon = document.createElement("img");
        icon.id = "big-icon";
        icon.src = "public/img/houedagbeLogo.png";
        this._loadingDiv.appendChild(icon);
        // loading spinner
        var spinner = document.createElement("div");
        spinner.className = "spinner";
        this._loadingDiv.appendChild(spinner);
    };
    LoadingScreen.prototype.hideLoadingUI = function () {
        this._game.uiContainer.removeChild(this._loadingDiv);
    };
    return LoadingScreen;
}());
exports.LoadingScreen = LoadingScreen;
