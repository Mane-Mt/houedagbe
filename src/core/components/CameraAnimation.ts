import { IComponent } from '../IComponent';
import { Entity } from '../Entity';
import { CameraComponent } from './CameraComponent';
import { Scene } from '../Scene';
import * as BABYLON from "@babylonjs/core";


export class CameraAnimation implements IComponent {
    public name: string = "CameraAnimation";
    public entity: Entity;
    public scene: Scene;

    // component properties
    private camera!: BABYLON.FreeCamera;
    private frameRate: number = 30;

    constructor(entity: Entity, scene: Scene) {
        this.entity = entity;
        this.scene = scene;
    }

    public onStart(): void {
        const cameraComponent = this.entity.getComponent("Camera") as CameraComponent;
        this.camera = cameraComponent.camera;

        this.scene.babylonScene.switchActiveCamera(this.camera);

        this.initCameraAnimation();

        // this.scene.eventManager.subscribe("onPresentationFinished", this.onBeginAnimation.bind(this));
    }

    public onUpdate(): void {}

    public onFixedUpdate(): void {}

    public onDestroy(): void {}

    private initCameraAnimation(): void {
        const positionXAnim = new BABYLON.Animation(
            "cameraPositionAnimation",
            "position.x",
            this.frameRate,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        const positionAnimKeys: {frame: number, value: number}[] = [];
        positionAnimKeys.push({
            frame: 0,
            value: this.camera.position.x
        });
        positionAnimKeys.push({
            frame: 6 * this.frameRate,
            value: this.camera.position.x + 20
        });
        positionXAnim.setKeys(positionAnimKeys);
        this.camera.animations.push(positionXAnim);
    }

    private onBeginAnimation(): void {
        this.scene.babylonScene.beginAnimation(
            this.camera,
            0,
            6 * this.frameRate,
            false,
            1
        );
        setTimeout((): void => {
            this.scene.game.fadeIn(this.onEndAnimation.bind(this));
        }, 5000);
    }

    private onEndAnimation(): void {
        // this.scene.eventManager.notify("onCameraAnimationFinished");
        this.scene.entityManager.removeEntity(this.entity);
    }
}