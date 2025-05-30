"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartScene = void 0;
var Scene_1 = require("../core/Scene");
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this, "start") || this;
        _this._canClick = true;
        return _this;
    }
    StartScene.prototype.start = function () {
        this._startDiv = document.createElement("div");
        this._startDiv.className = "menu-background";
        this.game.uiContainer.appendChild(this._startDiv);
        this._startText = document.createElement("p");
        this._startText.id = "start-text";
        this._startText.textContent = "Commencer";
        this._startDiv.appendChild(this._startText);
        var icon = document.createElement("img");
        icon.id = "big-icon";
        icon.src = "public/img/houedagbeLogo.png";
        this._startDiv.appendChild(icon);
    };
    StartScene.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        window.addEventListener("keydown", function (event) {
            if (event.code === "Space" && _this._canClick) {
                _this._canClick = false;
                _this._tryToConnectToServer();
            }
        });
    };
    StartScene.prototype._tryToConnectToServer = function () {
        this._startText.textContent = "connecting to server...";
        this._startText.style.color = "green";
        this.game.fadeIn(this._onConnectedToServer.bind(this));
        // loading spinner
        var spinner = document.createElement("div");
        spinner.className = "spinner";
        this._startDiv.appendChild(spinner);
    };
    StartScene.prototype._onConnectedToServer = function () {
        this.sceneManager.changeScene("menu");
    };
    StartScene.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.game.uiContainer.removeChild(this._startDiv);
    };
    return StartScene;
}(Scene_1.Scene));
exports.StartScene = StartScene;
