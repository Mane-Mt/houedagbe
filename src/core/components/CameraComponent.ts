import {IComponent} from "../IComponent";
import {Entity} from "../Entity";
import {Scene} from "../Scene";
import * as BABYLON from "@babylonjs/core";

export class CameraComponent implements IComponent {
    public name: string = "Camera";
    public entity: Entity;
    public scene: Scene;

    // component properties
    public camera!: BABYLON.FreeCamera;

    constructor(entity: Entity, scene: Scene, props: {camera: BABYLON.FreeCamera}) {
        this.entity = entity;
        this.scene = scene;
        this.camera = props.camera;
    }

    public onStart(): void {}

    public onUpdate(): void {}

    public onFixedUpdate(): void {}

    public onDestroy(): void {
        this.camera.dispose();
    }
}