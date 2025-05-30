export class EntityManager {
    constructor() {
        this.entities = new Map();
    }
    /**
     * Returns an entity given its id
     * @param id
     * @throws Error if entity is not found
     */
    getEntityById(id) {
        const entity = this.entities.get(id);
        if (!entity) {
            throw new Error(`Entity with id ${id} not found!`);
        }
        return entity;
    }
    /**
     * Returns all entities with a given tag
     * @param tag
     */
    getEntitiesByTag(tag) {
        const entitiesWithTag = [];
        this.entities.forEach((entity) => {
            if (entity.tag === tag) {
                entitiesWithTag.push(entity);
            }
        });
        return entitiesWithTag;
    }
    /**
     * Returns the first entity with a given tag or null if not found
     */
    getFirstEntityByTag(tag) {
        for (const entity of this.entities.values()) {
            if (entity.tag === tag) {
                return entity;
            }
        }
        return null;
    }
    /**
     * Adds an entity to scene and starts its components
     * @param entity
     */
    addEntity(entity) {
        this.entities.set(entity.id, entity);
        entity.startComponents();
    }
    /**
     * Updates all entities and their components
     */
    update() {
        this.entities.forEach((entity) => {
            entity.updateComponents();
        });
    }
    fixedUpdate() {
        this.entities.forEach((entity) => {
            entity.fixedUpdateComponents();
        });
    }
    /**
     * Destroys an entity and its components
     * @param entity
     */
    removeEntity(entity) {
        entity.destroyComponents();
        this.entities.delete(entity.id);
    }
    /**
     * Destroys all entities with a given tag
     * @param tag
     */
    removeEntitiesByTag(tag) {
        this.entities.forEach((entity) => {
            if (entity.tag === tag) {
                entity.destroyComponents();
                this.entities.delete(entity.id);
            }
        });
    }
    /**
     * Destroys all entities and their components
     */
    removeAllEntities() {
        this.entities.forEach((entity) => {
            entity.destroyComponents();
        });
        this.entities.clear();
    }
}
