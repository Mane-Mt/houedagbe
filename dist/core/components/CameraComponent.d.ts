import { IComponent } from "../IComponent";
import { Entity } from "../Entity";
import { Scene } from "../Scene";
import * as BABYLON from "@babylonjs/core";
export declare class CameraComponent implements IComponent {
    name: string;
    entity: Entity;
    scene: Scene;
    camera: BABYLON.FreeCamera;
    constructor(entity: Entity, scene: Scene, props: {
        camera: BABYLON.FreeCamera;
    });
    onStart(): void;
    onUpdate(): void;
    onFixedUpdate(): void;
    onDestroy(): void;
}
