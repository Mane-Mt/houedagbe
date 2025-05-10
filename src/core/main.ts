import {Game} from "./Game";

window.onload = (): void => {
    console.log("Bonjour, bienvenue dans le jeu !");
    Game.getInstance().start();
}