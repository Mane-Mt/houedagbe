import { Scene } from "../core/Scene.js";

export class PreloadingScene extends Scene {
    constructor() {
        super("preloading");
        this._canClick = true;
    }

    preload() {
        return new Promise((resolve) => {
            console.log("PreloadingScene: Preloading assets...");
            setTimeout(() => {
                console.log("PreloadingScene: Assets preloaded.");
                resolve();
            }, 1000);
        });
    }

    start() {
        this._wrapperDiv = document.createElement("div");
        this._wrapperDiv.id = "wrapper";
        this._wrapperDiv.innerHTML = `
            <button id="skip-btn">Skip</button>
            <div id="container">
                <div id="character">
                    <img src="public/img/king.png" alt="Personnage" />
                </div>
                <div id="text-content">
                    <div id="text-container"></div>
                    <button id="next-btn" style="display:none;">Suivant</button>
                </div>
            </div>
            <audio id="background-music" src="musique.mp3" loop></audio>
        `;
        this.game.uiContainer.appendChild(this._wrapperDiv);

        // === Audio setup ===
        const audio = this._wrapperDiv.querySelector('#background-music');
        const startMusic = () => {
            audio.play().catch(err => console.log("Lecture audio bloquée :", err));
            document.removeEventListener('click', startMusic);
        };
        document.addEventListener('click', startMusic);

        // === Typing animation setup ===
        const container = this._wrapperDiv.querySelector('#text-container');
        const nextBtn = this._wrapperDiv.querySelector('#next-btn');
        const skipBtn = this._wrapperDiv.querySelector('#skip-btn');

        const paragraphs = [
            "Le souffle de la mort a tout ravagé.\nLes flammes ont dévoré chaque village, chaque arbre, chaque espoir.\nLe silence règne là où résonnaient autrefois les rires.",
            "Houedagbe, jadis un royaume florissant, n’est plus qu’un désert de cendres et de ruines.\nLes dieux, furieux et silencieux, détournent leurs regards.\nLeur colère pèse sur chaque pierre, chaque souffle.",
            "Toi, seul survivant d’une ancienne lignée, tu portes maintenant le fardeau insupportable :\nredonner vie à ce monde dévasté.",
            // "Mais la route sera longue.\nLe sang coulera.\nLes traîtres se cacheront dans l’ombre.\nLa nature elle-même sera contre toi.",
            // "Tu devras reconstruire, non seulement les villages,\nmais aussi les liens brisés entre les hommes et les dieux.",
            // "Chaque décision est une lame.\nChaque erreur, une condamnation.\nÉchoue, et le royaume sombrera à jamais dans les ténèbres.",
            "L’heure est venue.\nRelève-toi, Élu.\nPorte la lumière… ou péris dans les ombres."
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
                this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "game"));
            }
        });

        skipBtn.addEventListener('click', () => {
            this.game.fadeIn(this.sceneManager.changeScene.bind(this.sceneManager, "game"));
        });

        // Démarre avec le premier paragraphe
        typeParagraph(paragraphs[currentParagraph]);
    }

    destroy() {
        super.destroy();
        this.game.uiContainer.removeChild(this._wrapperDiv);
        this._wrapperDiv = null;
    }
}