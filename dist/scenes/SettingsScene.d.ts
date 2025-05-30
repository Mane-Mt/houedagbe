import { Scene } from "../core/Scene";
export declare class SettingsScene extends Scene {
    private _settingsDiv;
    constructor();
    preload(): Promise<void>;
    start(): void;
    destroy(): void;
    private _createCharacterButton;
    _createHelpButton(buttonContainer: HTMLDivElement): void;
    _createBackButton(): void;
}
