import { Scene } from "../core/Scene.js";
export class SettingsScene extends Scene {
    constructor() {
        super("settings");
    }
    preload() {
        return new Promise((resolve) => {
            console.log("ParametersScene: Preloading assets...");
            setTimeout(() => {
                console.log("ParametersScene: Assets preloaded.");
                resolve();
            }, 1000);
        });
    }
    start() {
        this._settingsDiv = document.createElement("div");
        this._settingsDiv.className = "menu-background blur-background";
        this._settingsDiv.innerHTML = `
            <div class="top-border">
               <p class="top-title left-title">Paramètres</p>
            </div>
            <div class="bottom-border"></div>
        `;
        this.game.uiContainer.appendChild(this._settingsDiv);
        const elementsDiv = document.createElement("div");
        elementsDiv.id = "elements-div";
        this._settingsDiv.appendChild(elementsDiv);
        // button container
        const buttonContainer = document.createElement("div");
        buttonContainer.id = "button-container";
        elementsDiv.appendChild(buttonContainer);
        // button container styles
        this._createCharacterButton(buttonContainer);
        this._createHelpButton(buttonContainer);
        this._createBackButton();
    }
    destroy() {
        super.destroy();
        this.game.uiContainer.removeChild(this._settingsDiv);
        this._settingsDiv = null;
    }
    _createCharacterButton(buttonContainer) {
        // character button
        const characterBtn = document.createElement("button");
        characterBtn.innerHTML = "Personnage";
        characterBtn.className = "stone-button";
        buttonContainer.appendChild(characterBtn);
        // character image
        const characterImg = document.createElement("img");
        characterImg.src = "public/img/cavewoman.png";
        characterImg.id = "character-img";
        characterBtn.appendChild(characterImg);
        characterBtn.onclick = () => {
            // this.game.soundManager.playSound("click");
            this.sceneManager.changeScene("character-customization");
        };
        characterBtn.onmouseenter = () => {
            // this.game.soundManager.playSound("select");
        };
    }
    _createHelpButton(buttonContainer) {
        const hostBtn = document.createElement("button");
        hostBtn.innerHTML = "Help";
        hostBtn.className = "stone-button";
        buttonContainer.appendChild(hostBtn);
        // host image
        const hostImg = document.createElement("img");
        hostImg.src = "public/img/help.png";
        hostImg.id = "help-img";
        hostBtn.appendChild(hostImg);
        hostBtn.onclick = () => {
            // this.game.soundManager.playSound("click");
            // this.game.networkInstance = new NetworkHost(this.game.peer, name);
            // this.game.networkInputManager = new NetworkInputManager();
            this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "parameters"));
        };
        // hostBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    }
    _createBackButton() {
        // back button
        const backBtn = document.createElement("button");
        backBtn.className = "small-stone-button left-button";
        backBtn.onclick = () => {
            this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "menu"));
        };
        this._settingsDiv.appendChild(backBtn);
        // back button image
        const backImg = document.createElement("img");
        backImg.src = "public/img/back.png";
        backImg.id = "back-img";
        backBtn.appendChild(backImg);
    }
}
