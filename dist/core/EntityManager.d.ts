import { Entity } from "./Entity";
export declare class EntityManager {
    private entities;
    constructor();
    /**
     * Returns an entity given its id
     * @param id
     * @throws Error if entity is not found
     */
    getEntityById(id: string): Entity;
    /**
     * Returns all entities with a given tag
     * @param tag
     */
    getEntitiesByTag(tag: string): Entity[];
    /**
     * Returns the first entity with a given tag or null if not found
     */
    getFirstEntityByTag(tag: string): Entity | null;
    /**
     * Adds an entity to scene and starts its components
     * @param entity
     */
    addEntity(entity: Entity): void;
    /**
     * Updates all entities and their components
     */
    update(): void;
    fixedUpdate(): void;
    /**
     * Destroys an entity and its components
     * @param entity
     */
    removeEntity(entity: Entity): void;
    /**
     * Destroys all entities with a given tag
     * @param tag
     */
    removeEntitiesByTag(tag: string): void;
    /**
     * Destroys all entities and their components
     */
    removeAllEntities(): void;
}
