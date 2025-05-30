export class CameraComponent {
    constructor(entity, scene, props) {
        this.name = "Camera";
        this.entity = entity;
        this.scene = scene;
        this.camera = props.camera;
    }
    onStart() { }
    onUpdate() { }
    onFixedUpdate() { }
    onDestroy() {
        this.camera.dispose();
    }
}
