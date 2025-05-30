"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraAnimation = void 0;
var BABYLON = require("@babylonjs/core");
var CameraAnimation = /** @class */ (function () {
    function CameraAnimation(entity, scene) {
        this.name = "CameraAnimation";
        this.frameRate = 30;
        this.entity = entity;
        this.scene = scene;
    }
    CameraAnimation.prototype.onStart = function () {
        var cameraComponent = this.entity.getComponent("Camera");
        this.camera = cameraComponent.camera;
        this.scene.babylonScene.switchActiveCamera(this.camera);
        this.initCameraAnimation();
        // this.scene.eventManager.subscribe("onPresentationFinished", this.onBeginAnimation.bind(this));
    };
    CameraAnimation.prototype.onUpdate = function () { };
    CameraAnimation.prototype.onFixedUpdate = function () { };
    CameraAnimation.prototype.onDestroy = function () { };
    CameraAnimation.prototype.initCameraAnimation = function () {
        var positionXAnim = new BABYLON.Animation("cameraPositionAnimation", "position.x", this.frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var positionAnimKeys = [];
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
    };
    CameraAnimation.prototype.onBeginAnimation = function () {
        var _this = this;
        this.scene.babylonScene.beginAnimation(this.camera, 0, 6 * this.frameRate, false, 1);
        setTimeout(function () {
            _this.scene.game.fadeIn(_this.onEndAnimation.bind(_this));
        }, 5000);
    };
    CameraAnimation.prototype.onEndAnimation = function () {
        // this.scene.eventManager.notify("onCameraAnimationFinished");
        this.scene.entityManager.removeEntity(this.entity);
    };
    return CameraAnimation;
}());
exports.CameraAnimation = CameraAnimation;
