export declare class SceneManager {
    private static instance;
    private _currentScene;
    private scenes;
    private constructor();
    static getInstance(): SceneManager;
    /**
     * Import all scenes and initialize the current scene
     */
    initializeScenes(): void;
    private _loadAndStartScene;
    private _createScene;
    /**
     * Update the current scene
     */
    updateCurrentScene(): void;
    /**
     * Stop the current scene and start the new one
     * @param sceneName
     */
    changeScene(sceneName: string): void;
}
