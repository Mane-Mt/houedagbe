export class CameraAnimation {
    constructor(entity, scene) {
        this.name = "CameraAnimation";
        this.frameRate = 30;
        this.entity = entity;
        this.scene = scene;
    }
    onStart() {
        const cameraComponent = this.entity.getComponent("Camera");
        this.camera = cameraComponent.camera;
        this.scene.babylonScene.switchActiveCamera(this.camera);
        this.initCameraAnimation();
        // this.scene.eventManager.subscribe("onPresentationFinished", this.onBeginAnimation.bind(this));
    }
    onUpdate() { }
    onFixedUpdate() { }
    onDestroy() { }
    initCameraAnimation() {
        const positionXAnim = new BABYLON.Animation("cameraPositionAnimation", "position.x", this.frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        const positionAnimKeys = [];
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
    onBeginAnimation() {
        this.scene.babylonScene.beginAnimation(this.camera, 0, 6 * this.frameRate, false, 1);
        setTimeout(() => {
            this.scene.game.fadeIn(this.onEndAnimation.bind(this));
        }, 5000);
    }
    onEndAnimation() {
        // this.scene.eventManager.notify("onCameraAnimationFinished");
        this.scene.entityManager.removeEntity(this.entity);
    }
}
