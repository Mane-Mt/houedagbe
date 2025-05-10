import { Game } from "./Game.js";
window.onload = () => {
    console.log("Bonjour, bienvenue dans le jeu !");
    Game.getInstance().start();
};
