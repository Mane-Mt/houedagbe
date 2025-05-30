"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraComponent = void 0;
var CameraComponent = /** @class */ (function () {
    function CameraComponent(entity, scene, props) {
        this.name = "Camera";
        this.entity = entity;
        this.scene = scene;
        this.camera = props.camera;
    }
    CameraComponent.prototype.onStart = function () { };
    CameraComponent.prototype.onUpdate = function () { };
    CameraComponent.prototype.onFixedUpdate = function () { };
    CameraComponent.prototype.onDestroy = function () {
        this.camera.dispose();
    };
    return CameraComponent;
}());
exports.CameraComponent = CameraComponent;
