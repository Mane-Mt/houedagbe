"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
var EntityManager = /** @class */ (function () {
    function EntityManager() {
        this.entities = new Map();
    }
    /**
     * Returns an entity given its id
     * @param id
     * @throws Error if entity is not found
     */
    EntityManager.prototype.getEntityById = function (id) {
        var entity = this.entities.get(id);
        if (!entity) {
            throw new Error("Entity with id ".concat(id, " not found!"));
        }
        return entity;
    };
    /**
     * Returns all entities with a given tag
     * @param tag
     */
    EntityManager.prototype.getEntitiesByTag = function (tag) {
        var entitiesWithTag = [];
        this.entities.forEach(function (entity) {
            if (entity.tag === tag) {
                entitiesWithTag.push(entity);
            }
        });
        return entitiesWithTag;
    };
    /**
     * Returns the first entity with a given tag or null if not found
     */
    EntityManager.prototype.getFirstEntityByTag = function (tag) {
        for (var _i = 0, _a = this.entities.values(); _i < _a.length; _i++) {
            var entity = _a[_i];
            if (entity.tag === tag) {
                return entity;
            }
        }
        return null;
    };
    /**
     * Adds an entity to scene and starts its components
     * @param entity
     */
    EntityManager.prototype.addEntity = function (entity) {
        this.entities.set(entity.id, entity);
        entity.startComponents();
    };
    /**
     * Updates all entities and their components
     */
    EntityManager.prototype.update = function () {
        this.entities.forEach(function (entity) {
            entity.updateComponents();
        });
    };
    EntityManager.prototype.fixedUpdate = function () {
        this.entities.forEach(function (entity) {
            entity.fixedUpdateComponents();
        });
    };
    /**
     * Destroys an entity and its components
     * @param entity
     */
    EntityManager.prototype.removeEntity = function (entity) {
        entity.destroyComponents();
        this.entities.delete(entity.id);
    };
    /**
     * Destroys all entities with a given tag
     * @param tag
     */
    EntityManager.prototype.removeEntitiesByTag = function (tag) {
        var _this = this;
        this.entities.forEach(function (entity) {
            if (entity.tag === tag) {
                entity.destroyComponents();
                _this.entities.delete(entity.id);
            }
        });
    };
    /**
     * Destroys all entities and their components
     */
    EntityManager.prototype.removeAllEntities = function () {
        this.entities.forEach(function (entity) {
            entity.destroyComponents();
        });
        this.entities.clear();
    };
    return EntityManager;
}());
exports.EntityManager = EntityManager;
