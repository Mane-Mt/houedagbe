import { IComponent } from "./IComponent";
export declare class Entity {
    id: string;
    tag: string;
    private components;
    constructor(tag?: string, id?: string);
    /**
     * Adds a component to the entity
     * @param component
     * @throws Error if component already exists
     */
    addComponent(component: IComponent): void;
    /**
     * Removes a component from the entity
     * @param componentName
     * @throws Error if component does not exist
     */
    removeComponent(componentName: string): void;
    /**
     * Checks if the entity has a component
     * @param componentName
     */
    hasComponent(componentName: string): boolean;
    /**
     * Returns the component from the entity
     * @param componentName
     * @throws Error if component does not exist
     */
    getComponent(componentName: string): IComponent;
    /**
     * Calls the onStart method of all components
     */
    startComponents(): void;
    /**
     * Calls the onUpdate method of all components
     */
    updateComponents(): void;
    fixedUpdateComponents(): void;
    /**
     * Calls the onDestroy method of all components
     */
    destroyComponents(): void;
}
