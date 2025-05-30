"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameScene = void 0;
var CameraAnimation_1 = require("../core/components/CameraAnimation");
var CameraComponent_1 = require("../core/components/CameraComponent");
var Entity_1 = require("../core/Entity");
var Scene_1 = require("../core/Scene");
var BABYLON = require("@babylonjs/core");
var PITCH_WIDTH = 40;
var PITCH_HEIGHT = 27;
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, "game") || this;
    }
    GameScene.prototype.preload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        this.game.engine.displayLoadingUI();
                        // load assets
                        _a = this.loadedAssets;
                        _b = "caveman";
                        return [4 /*yield*/, BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "caveman.glb", this.babylonScene)];
                    case 1:
                        // load assets
                        _a[_b] = _j.sent();
                        _c = this.loadedAssets;
                        _d = "cavewoman";
                        return [4 /*yield*/, BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "cavewoman.glb", this.babylonScene)];
                    case 2:
                        _c[_d] = _j.sent();
                        _e = this.loadedAssets;
                        _f = "footballPitch";
                        return [4 /*yield*/, BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/", "ruins_of_hore_abbey.glb", this.babylonScene)];
                    case 3:
                        _e[_f] = _j.sent();
                        _g = this.loadedAssets;
                        _h = "ball";
                        return [4 /*yield*/, BABYLON.SceneLoader.LoadAssetContainerAsync("public/meshes/models/", "ball.glb", this.babylonScene)];
                    case 4:
                        _g[_h] = _j.sent();
                        this.game.engine.hideLoadingUI();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameScene.prototype.start = function () {
        this.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
        // camera
        this.mainCamera.setTarget(BABYLON.Vector3.Zero());
        this.mainCamera.position = new BABYLON.Vector3(0, 11, -15);
        // skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.babylonScene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.babylonScene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("img/skybox", this.babylonScene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        // start animation
        var cameraEntity = new Entity_1.Entity();
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-20, 3, -10), this.babylonScene);
        cameraEntity.addComponent(new CameraComponent_1.CameraComponent(cameraEntity, this, { camera: camera }));
        cameraEntity.addComponent(new CameraAnimation_1.CameraAnimation(cameraEntity, this));
        this.entityManager.addEntity(cameraEntity);
        // light
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.babylonScene);
        light.intensity = 0.7;
        this._createFootballPitch();
        var mainCameraEntity = new Entity_1.Entity("camera");
        mainCameraEntity.addComponent(new CameraComponent_1.CameraComponent(mainCameraEntity, this, { camera: this.mainCamera }));
        this.entityManager.addEntity(mainCameraEntity);
        this._gameDiv = document.createElement("div");
        this._gameDiv.id = "controls";
        this._gameDiv.className = "";
        this.game.uiContainer.appendChild(this._gameDiv);
        var elementsDiv = document.createElement("div");
        elementsDiv.id = "elements-div";
    };
    GameScene.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    GameScene.prototype._createFootballPitch = function () {
        var groundEntity = new Entity_1.Entity("ground");
        var mapContainer = this.loadedAssets["footballPitch"];
        mapContainer.addAllToScene();
        var footballPitch = mapContainer.meshes[0];
        mapContainer.meshes.forEach(function (mesh) {
            mesh.receiveShadows = true;
        });
        footballPitch.scaling.scaleInPlace(4);
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: PITCH_WIDTH + 5, height: PITCH_HEIGHT }, this.babylonScene);
        ground.metadata = { tag: groundEntity.tag };
        ground.isVisible = false;
        footballPitch.setParent(ground);
        footballPitch.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), Math.PI);
        footballPitch.position = new BABYLON.Vector3(0.928, 0.239, 0.082);
        // groundEntity.addComponent(new MeshComponent(groundEntity, this, {mesh: ground}));
        // groundEntity.addComponent(new RigidBodyComponent(groundEntity, this, {
        //     physicsShape: B.PhysicsShapeType.BOX,
        //     physicsProps: {mass: 0}
        // }));
        this.entityManager.addEntity(groundEntity);
    };
    return GameScene;
}(Scene_1.Scene));
exports.GameScene = GameScene;
