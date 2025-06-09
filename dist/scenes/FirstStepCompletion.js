import { Scene } from "../core/Scene.js";

export class FirstStepCompletion extends Scene {
    constructor() {
        super("first_step_completion");
        this._canClick = true;
    }

    preload() {
        return new Promise((resolve) => {
            console.log("FirstStepCompletion: Preloading assets...");
            setTimeout(() => {
                console.log("FirstStepCompletion: Assets preloaded.");
                resolve();
            }, 1000);
        });
    }

    start() {
        this._wrapperDiv = document.createElement("div");
        this._wrapperDiv.id = "wrapper";
        this._wrapperDiv.className = "success-background";
        this._wrapperDiv.innerHTML = `
            <div id="container" class="container hint text-center">
                <img src="public/img/emojie-smile.png" alt="Personnage" height="150" />
                <br/>
                <br/>
                <div id="text-content">
                    <div id="text-container"></div>
                    <button id="prev-btn" style="display:none;">Non, retour à l'acceuil</button>
                    <button id="next-btn" style="display:none;">Oui, bien bûr</button>
                </div>
            </div>
            <button id="next-btn" style="display:none;">Suivant</button>
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
         const prevBtn = this._wrapperDiv.querySelector('#prev-btn');
        // const skipBtn = this._wrapperDiv.querySelector('#skip-btn');

        const paragraphs = [
            " 🎉 ... Félicitation .... 🎊, \n vous avez terminé votre prémière mission avec succès 🥳.\n Héros êtes vous prêt pour la prochaine aventure ?",
            
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
                "second_step_hint"
              ));
            }
        });

         nextBtn.addEventListener('click', () => {
            currentParagraph++;
            if (currentParagraph < paragraphs.length) {
                typeParagraph(paragraphs[currentParagraph]);
            } else {
                // container.textContent += "\n\n➤ Fin de l’introduction.";
                // nextBtn.style.display = 'none';
                this.game.fadeIn( this.sceneManager.changeScene.bind(
                this.sceneManager,
                "second_game_part"
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