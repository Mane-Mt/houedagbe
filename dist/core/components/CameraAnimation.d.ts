import { IComponent } from '../IComponent';
import { Entity } from '../Entity';
import { Scene } from '../Scene';
export declare class CameraAnimation implements IComponent {
    name: string;
    entity: Entity;
    scene: Scene;
    private camera;
    private frameRate;
    constructor(entity: Entity, scene: Scene);
    onStart(): void;
    onUpdate(): void;
    onFixedUpdate(): void;
    onDestroy(): void;
    private initCameraAnimation;
    private onBeginAnimation;
    private onEndAnimation;
}
