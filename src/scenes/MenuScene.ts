
import { Scene } from "../core/Scene";

export class MenuScene extends Scene {
    private _menuDiv!: HTMLDivElement;

    constructor() {
       super("menu");
    }
    preload(): Promise<void> {
        return new Promise((resolve) => {
            console.log("MenuScene: Preloading assets...");
            setTimeout(() => {
                console.log("MenuScene: Assets preloaded.");
                resolve();
            }, 1000);
        });
    }

    start(): void {
        this._menuDiv = document.createElement("div");
        this._menuDiv.className = "menu-background blur-background";
        this._menuDiv.innerHTML = `
            <div class="top-border">
               <p class="top-title left-title">Menu principal</p>
            </div>
            <div class="bottom-border"></div>
        `;
        this.game.uiContainer.appendChild(this._menuDiv);

        const elementsDiv: HTMLDivElement = document.createElement("div");
        elementsDiv.id = "elements-div";
        this._menuDiv.appendChild(elementsDiv);

        // button container
        const buttonContainer: HTMLDivElement = document.createElement("div");
        buttonContainer.id = "button-container";
        elementsDiv.appendChild(buttonContainer);

        this._createParametersButton(buttonContainer);
        this._createPlayButton(buttonContainer);
        // this._createCharacterButton(buttonContainer);
    }


    private _createCharacterButton(buttonContainer: HTMLDivElement): void {
        // character button
        const characterBtn: HTMLButtonElement = document.createElement("button");
        characterBtn.innerHTML = "Personnage";
        characterBtn.className = "stone-button";
        buttonContainer.appendChild(characterBtn);

        // character image
        const characterImg: HTMLImageElement = document.createElement("img");
        characterImg.src = "public/img/cavewoman.png";
        characterImg.id = "character-img";
        characterBtn.appendChild(characterImg);

        characterBtn.onclick = (): void => {
            // this.game.soundManager.playSound("click");
            this.sceneManager.changeScene("character-customization");
        }

        characterBtn.onmouseenter = (): void => {
            // this.game.soundManager.playSound("select");
        }
    }

    private _createParametersButton(buttonContainer: HTMLDivElement): void {
        // host button
        const hostBtn: HTMLButtonElement = document.createElement("button");
        hostBtn.innerHTML = "Paramètres";
        hostBtn.className = "stone-button";
        buttonContainer.appendChild(hostBtn);

        // host image
        const hostImg: HTMLImageElement = document.createElement("img");
        hostImg.src = "public/img/cave.png";
        hostImg.id = "host-img";
        hostBtn.appendChild(hostImg);

        hostBtn.onclick = (): void => {
            // this.game.soundManager.playSound("click");
            // this.game.networkInstance = new NetworkHost(this.game.peer, name);
            // this.game.networkInputManager = new NetworkInputManager();
            this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "settings"));
        }

        // hostBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    }

    private _createPlayButton(buttonContainer: HTMLDivElement): void {
        // join button
        const joinBtn: HTMLButtonElement = document.createElement("button");
        joinBtn.innerHTML = "Commencer";
        joinBtn.className = "stone-button";
        buttonContainer.appendChild(joinBtn);

        // join image
        const joinImg: HTMLImageElement = document.createElement("img");
        joinImg.src = "public/img/cavemen-drawing.png";
        joinImg.id = "join-img";
        joinBtn.appendChild(joinImg);

        joinBtn.onclick = (): void => {
            // this.game.soundManager.playSound("click");
            // if (!this._checkName()) return;
            // this.game.networkInstance = new NetworkClient(this.game.peer, name);
            // this.game.networkInputManager = new NetworkInputManager();
           
        }

        // joinBtn.onmouseenter = (): void => {
        //     this.game.soundManager.playSound("select");
        // }
    }

    public destroy(): void {
        super.destroy();
        this.game.uiContainer.removeChild(this._menuDiv);
    }
}