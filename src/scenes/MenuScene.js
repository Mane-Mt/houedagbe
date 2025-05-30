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
exports.MenuScene = void 0;
var Scene_1 = require("../core/Scene");
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        return _super.call(this, "menu") || this;
    }
    MenuScene.prototype.preload = function () {
        return new Promise(function (resolve) {
            console.log("MenuScene: Preloading assets...");
            setTimeout(function () {
                console.log("MenuScene: Assets preloaded.");
                resolve();
            }, 1000);
        });
    };
    MenuScene.prototype.start = function () {
        this._menuDiv = document.createElement("div");
        this._menuDiv.className = "menu-background blur-background";
        this._menuDiv.innerHTML = "\n            <div class=\"top-border\">\n               <p class=\"top-title left-title\">Menu principal</p>\n            </div>\n            <div class=\"bottom-border\"></div>\n        ";
        this.game.uiContainer.appendChild(this._menuDiv);
        var elementsDiv = document.createElement("div");
        elementsDiv.id = "elements-div";
        this._menuDiv.appendChild(elementsDiv);
        // button container
        var buttonContainer = document.createElement("div");
        buttonContainer.id = "button-container";
        elementsDiv.appendChild(buttonContainer);
        this._createParametersButton(buttonContainer);
        this._createPlayButton(buttonContainer);
        // this._createCharacterButton(buttonContainer);
    };
    MenuScene.prototype._createCharacterButton = function (buttonContainer) {
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
    MenuScene.prototype._createParametersButton = function (buttonContainer) {
        var _this = this;
        // host button
        var hostBtn = document.createElement("button");
        hostBtn.innerHTML = "Paramètres";
        hostBtn.className = "stone-button";
        buttonContainer.appendChild(hostBtn);
        // host image
        var hostImg = document.createElement("img");
        hostImg.src = "public/img/cave.png";
        hostImg.id = "host-img";
        hostBtn.appendChild(hostImg);
        hostBtn.onclick = function () {
            // this.game.soundManager.playSound("click");
            // this.game.networkInstance = new NetworkHost(this.game.peer, name);
            // this.game.networkInputManager = new NetworkInputManager();
            _this.game.fadeIn(_this.sceneManager.changeScene.bind(_this.sceneManager, "settings"));
        };
        // hostBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    };
    MenuScene.prototype._createPlayButton = function (buttonContainer) {
        var _this = this;
        // join button
        var joinBtn = document.createElement("button");
        joinBtn.innerHTML = "Commencer";
        joinBtn.className = "stone-button";
        buttonContainer.appendChild(joinBtn);
        // join image
        var joinImg = document.createElement("img");
        joinImg.src = "public/img/cavemen-drawing.png";
        joinImg.id = "join-img";
        joinBtn.appendChild(joinImg);
        joinBtn.onclick = function () {
            _this.game.fadeIn(_this.sceneManager.changeScene.bind(_this.sceneManager, "game"));
        };
        // joinBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    };
    MenuScene.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.game.uiContainer.removeChild(this._menuDiv);
    };
    return MenuScene;
}(Scene_1.Scene));
exports.MenuScene = MenuScene;
