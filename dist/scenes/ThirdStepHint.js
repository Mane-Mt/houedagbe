import { Scene } from "../core/Scene.js";

export class ThirdStepHint extends Scene {
    constructor() {
        super("third_step_hint");
        this._canClick = true;
    }

    preload() {
        return new Promise((resolve) => {
            console.log("FirstStephint: Preloading assets...");
            setTimeout(() => {
                console.log("FirstStephint: Assets preloaded.");
                resolve();
            }, 1000);
        });
    }

    start() {
        this._wrapperDiv = document.createElement("div");
        this._wrapperDiv.id = "wrapper";
        // this._wrapperDiv.className = "success-background";
        this._wrapperDiv.innerHTML = `
            <div id="container" class="hint">
                <h1 style="color: white" > Ma deuxième mission </h1>
                <img src="public/img/hint.png" alt="Personnage" height="150" />
                <div id="text-content">
                    <div id="text-container"></div>
                    <button id="next-btn" style="display:none;">Commencer</button>
                </div>
            </div>
            <audio id="background-music" src="public/sounds/tribal.mp3" loop></audio>
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
           "Après ton noble travail de nettoyage, une pluie d’espoir s’est enfin abattue sur la ville.\n\nUne nouvelle vie peut éclore.\n\nTa mission : reconstruire.\n\nÉriger un toit. Planter quelques arbres. Installer une poubelle publique.\n\nOffre aux survivants le strict nécessaire :\nun abri… un souffle vert… une place pour jeter le passé.\n\nC’est le premier pas vers la renaissance."
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
                this.game.fadeIn( this.sceneManager.changeScene.bind(
                this.sceneManager,
                "third_game_part"
              ));
            }
        });

        // skipBtn.addEventListener('click', () => {
        //     this.game.fadeIn( this.sceneManager.changeScene.bind(
        //         this.sceneManager,
        //         "second_game_part"
        //       ));
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