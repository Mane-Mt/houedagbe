import { Scene } from "../core/Scene.js";
export class MenuScene extends Scene {
    constructor() {
        super("menu");
    }
    preload() {
        return new Promise((resolve) => {
            console.log("MenuScene: Preloading assets...");
            setTimeout(() => {
                console.log("MenuScene: Assets preloaded.");
                resolve();
            }, 1000);
        });
    }
    start() {
        this._menuDiv = document.createElement("div");
        this._menuDiv.className = "menu-background blur-background";
        this._menuDiv.innerHTML = `
            <div class="top-border">
               <p class="top-title left-title">Menu principal</p>
            </div>
            <div class="bottom-border"></div>
        `;
        this.game.uiContainer.appendChild(this._menuDiv);
        const elementsDiv = document.createElement("div");
        elementsDiv.id = "elements-div";
        this._menuDiv.appendChild(elementsDiv);
        // button container
        const buttonContainer = document.createElement("div");
        buttonContainer.id = "button-container";
        elementsDiv.appendChild(buttonContainer);
        this._createParametersButton(buttonContainer);
        this._createPlayButton(buttonContainer);
        // this._createCharacterButton(buttonContainer);
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
    _createParametersButton(buttonContainer) {
        // host button
        const hostBtn = document.createElement("button");
        hostBtn.innerHTML = "Paramètres";
        hostBtn.className = "stone-button";
        buttonContainer.appendChild(hostBtn);
        // host image
        const hostImg = document.createElement("img");
        hostImg.src = "public/img/cave.png";
        hostImg.id = "host-img";
        hostBtn.appendChild(hostImg);
        hostBtn.onclick = () => {
            // this.game.soundManager.playSound("click");
            // this.game.networkInstance = new NetworkHost(this.game.peer, name);
            // this.game.networkInputManager = new NetworkInputManager();
            this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "settings"));
        };
        // hostBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    }
    _createPlayButton(buttonContainer) {
        // join button
        const joinBtn = document.createElement("button");
        joinBtn.innerHTML = "Commencer";
        joinBtn.className = "stone-button";
        buttonContainer.appendChild(joinBtn);
        // join image
        const joinImg = document.createElement("img");
        joinImg.src = "public/img/cavemen-drawing.png";
        joinImg.id = "join-img";
        joinBtn.appendChild(joinImg);
        joinBtn.onclick = () => {
            this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "game"));
        };
        // joinBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    }
    destroy() {
        super.destroy();
        this.game.uiContainer.removeChild(this._menuDiv);
    }
}
