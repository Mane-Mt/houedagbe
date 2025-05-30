export class Entity {
    constructor(tag = "", id) {
        this.components = new Map();
        this.id = id ?? "";
        this.tag = tag;
    }
    /**
     * Adds a component to the entity
     * @param component
     * @throws Error if component already exists
     */
    addComponent(component) {
        if (this.components.has(component.name)) {
            throw new Error(`Component ${component.name} already exists on entity ${this.id}`);
        }
        this.components.set(component.name, component);
    }
    /**
     * Removes a component from the entity
     * @param componentName
     * @throws Error if component does not exist
     */
    removeComponent(componentName) {
        const component = this.getComponent(componentName);
        component.onDestroy();
        this.components.delete(componentName);
    }
    /**
     * Checks if the entity has a component
     * @param componentName
     */
    hasComponent(componentName) {
        return this.components.has(componentName);
    }
    /**
     * Returns the component from the entity
     * @param componentName
     * @throws Error if component does not exist
     */
    getComponent(componentName) {
        const component = this.components.get(componentName);
        if (!component) {
            throw new Error(`Component ${componentName} does not exist on entity ${this.id}`);
        }
        return component;
    }
    /**
     * Calls the onStart method of all components
     */
    startComponents() {
        this.components.forEach((component) => {
            component.onStart();
        });
    }
    /**
     * Calls the onUpdate method of all components
     */
    updateComponents() {
        this.components.forEach((component) => {
            component.onUpdate();
        });
    }
    fixedUpdateComponents() {
        this.components.forEach((component) => {
            component.onFixedUpdate();
        });
    }
    /**
     * Calls the onDestroy method of all components
     */
    destroyComponents() {
        this.components.forEach((component) => {
            component.onDestroy();
        });
    }
}
