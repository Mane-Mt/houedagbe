import { Scene } from "../core/Scene.js";

export class GameOverScene extends Scene {
    constructor() {
        super("game_over");
        this._canClick = true;
    }

    preload() {
        return new Promise((resolve) => {
            console.log("GameOverScene: Preloading assets...");
            setTimeout(() => {
                console.log("GameOverScene: Assets preloaded.");
                resolve();
            }, 1000);
        });
    }

    start() {
        this._wrapperDiv = document.createElement("div");
        this._wrapperDiv.id = "wrapper";
        this._wrapperDiv.innerHTML = `
            // <button id="skip-btn">Skip</button>
            <div id="container" class="container hint text-center">
              
                    <img src="public/img/emojie-game-over.gif" height="180" alt="Personnage" />
        
                <div id="text-content">
                    <div id="text-container"></div>
                    <button id="next-btn" style="display:none;">Retour à l'accueil</button>
                </div>
            </div>
            <audio id="background-music" src="public/sounds/night.mp3" loop></audio>
        `;
        this.game.uiContainer.appendChild(this._wrapperDiv);

        // === Audio setup ===
        const audio = this._wrapperDiv.querySelector('#background-music');
        const startMusic = () => {
            audio.play().catch(err => console.log("Lecture audio bloquée :", err));
            document.removeEventListener('click', startMusic);
        };
        startMusic();
        // document.addEventListener('click', startMusic);

        // === Typing animation setup ===
        const container = this._wrapperDiv.querySelector('#text-container');
        const nextBtn = this._wrapperDiv.querySelector('#next-btn');
        // const skipBtn = this._wrapperDiv.querySelector('#skip-btn');

        const paragraphs = [
            "Partie terminée...\n\nMalheureusement, vous n'avez pas accompli votre mission à temps.\n\nLa ville reste ensevelie sous les ruines et le silence.\n\nSouhaitez-vous retenter votre chance ?"
        ];

        let currentParagraph = 0;
        let index = 0;
        let typingTimeout;

        function typeParagraph(text) {
            container.textContent = '';
            index = 0;
            nextBtn.style.display = 'none';

            function type() {
                if (index < text.length) {
                    container.textContent += text.charAt(index);
                    let delay = 30;
                    const char = text.charAt(index);
                    if (char === '.' || char === ',' || char === '\n') delay = 300;

                    index++;
                    typingTimeout = setTimeout(type, delay);
                } else {
                    nextBtn.style.display = 'block';
                }
            }

            type();
        }

        nextBtn.addEventListener('click', () => {
            currentParagraph++;
            if (currentParagraph < paragraphs.length) {
                typeParagraph(paragraphs[currentParagraph]);
            } else {
                // container.textContent += "\n\n➤ Fin de l’introduction.";
                // nextBtn.style.display = 'none';
                this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "menu"));
            }
        });

        // skipBtn.addEventListener('click', () => {
        //     this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "first_step_hint"));
        // });

        // Démarre avec le premier paragraphe
        typeParagraph(paragraphs[currentParagraph]);
    }

    destroy() {
        super.destroy();
        this.game.uiContainer.removeChild(this._wrapperDiv);
        this._wrapperDiv = null;
    }
}