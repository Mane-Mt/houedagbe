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
exports.SettingsScene = void 0;
var Scene_1 = require("../core/Scene");
var SettingsScene = /** @class */ (function (_super) {
    __extends(SettingsScene, _super);
    function SettingsScene() {
        return _super.call(this, "settings") || this;
    }
    SettingsScene.prototype.preload = function () {
        return new Promise(function (resolve) {
            console.log("ParametersScene: Preloading assets...");
            setTimeout(function () {
                console.log("ParametersScene: Assets preloaded.");
                resolve();
            }, 1000);
        });
    };
    SettingsScene.prototype.start = function () {
        this._settingsDiv = document.createElement("div");
        this._settingsDiv.className = "menu-background blur-background";
        this._settingsDiv.innerHTML = "\n            <div class=\"top-border\">\n               <p class=\"top-title left-title\">Param\u00E8tres</p>\n            </div>\n            <div class=\"bottom-border\"></div>\n        ";
        this.game.uiContainer.appendChild(this._settingsDiv);
        var elementsDiv = document.createElement("div");
        elementsDiv.id = "elements-div";
        this._settingsDiv.appendChild(elementsDiv);
        // button container
        var buttonContainer = document.createElement("div");
        buttonContainer.id = "button-container";
        elementsDiv.appendChild(buttonContainer);
        // button container styles
        this._createCharacterButton(buttonContainer);
        this._createHelpButton(buttonContainer);
        this._createBackButton();
    };
    SettingsScene.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.game.uiContainer.removeChild(this._settingsDiv);
        this._settingsDiv = null;
    };
    SettingsScene.prototype._createCharacterButton = function (buttonContainer) {
        var _this = this;
        // character button
        var characterBtn = document.createElement("button");
        characterBtn.innerHTML = "Personnage";
        characterBtn.className = "stone-button";
        buttonContainer.appendChild(characterBtn);
        // character image
        var characterImg = document.createElement("img");
        characterImg.src = "public/img/cavewoman.png";
        characterImg.id = "character-img";
        characterBtn.appendChild(characterImg);
        characterBtn.onclick = function () {
            // this.game.soundManager.playSound("click");
            _this.sceneManager.changeScene("character-customization");
        };
        characterBtn.onmouseenter = function () {
            // this.game.soundManager.playSound("select");
        };
    };
    SettingsScene.prototype._createHelpButton = function (buttonContainer) {
        var _this = this;
        var hostBtn = document.createElement("button");
        hostBtn.innerHTML = "Help";
        hostBtn.className = "stone-button";
        buttonContainer.appendChild(hostBtn);
        // host image
        var hostImg = document.createElement("img");
        hostImg.src = "public/img/help.png";
        hostImg.id = "help-img";
        hostBtn.appendChild(hostImg);
        hostBtn.onclick = function () {
            // this.game.soundManager.playSound("click");
            // this.game.networkInstance = new NetworkHost(this.game.peer, name);
            // this.game.networkInputManager = new NetworkInputManager();
            _this.game.fadeIn(_this.sceneManager.changeScene.bind(_this.sceneManager, "parameters"));
        };
        // hostBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    };
    SettingsScene.prototype._createBackButton = function () {
        var _this = this;
        // back button
        var backBtn = document.createElement("button");
        backBtn.className = "small-stone-button left-button";
        backBtn.onclick = function () {
            _this.game.fadeIn(_this.sceneManager.changeScene.bind(_this.sceneManager, "menu"));
        };
        this._settingsDiv.appendChild(backBtn);
        // back button image
        var backImg = document.createElement("img");
        backImg.src = "public/img/back.png";
        backImg.id = "back-img";
        backBtn.appendChild(backImg);
    };
    return SettingsScene;
}(Scene_1.Scene));
exports.SettingsScene = SettingsScene;
