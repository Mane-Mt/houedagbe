"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var Entity = /** @class */ (function () {
    function Entity(tag, id) {
        if (tag === void 0) { tag = ""; }
        this.components = new Map();
        this.id = id !== null && id !== void 0 ? id : "";
        this.tag = tag;
    }
    /**
     * Adds a component to the entity
     * @param component
     * @throws Error if component already exists
     */
    Entity.prototype.addComponent = function (component) {
        if (this.components.has(component.name)) {
            throw new Error("Component ".concat(component.name, " already exists on entity ").concat(this.id));
        }
        this.components.set(component.name, component);
    };
    /**
     * Removes a component from the entity
     * @param componentName
     * @throws Error if component does not exist
     */
    Entity.prototype.removeComponent = function (componentName) {
        var component = this.getComponent(componentName);
        component.onDestroy();
        this.components.delete(componentName);
    };
    /**
     * Checks if the entity has a component
     * @param componentName
     */
    Entity.prototype.hasComponent = function (componentName) {
        return this.components.has(componentName);
    };
    /**
     * Returns the component from the entity
     * @param componentName
     * @throws Error if component does not exist
     */
    Entity.prototype.getComponent = function (componentName) {
        var component = this.components.get(componentName);
        if (!component) {
            throw new Error("Component ".concat(componentName, " does not exist on entity ").concat(this.id));
        }
        return component;
    };
    /**
     * Calls the onStart method of all components
     */
    Entity.prototype.startComponents = function () {
        this.components.forEach(function (component) {
            component.onStart();
        });
    };
    /**
     * Calls the onUpdate method of all components
     */
    Entity.prototype.updateComponents = function () {
        this.components.forEach(function (component) {
            component.onUpdate();
        });
    };
    Entity.prototype.fixedUpdateComponents = function () {
        this.components.forEach(function (component) {
            component.onFixedUpdate();
        });
    };
    /**
     * Calls the onDestroy method of all components
     */
    Entity.prototype.destroyComponents = function () {
        this.components.forEach(function (component) {
            component.onDestroy();
        });
    };
    return Entity;
}());
exports.Entity = Entity;
