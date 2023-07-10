export type DceScene = {
    /**
     * The root entity of the scene. All entities in this scene are children of either this scene root entity, or of another entity in the scene
     */
    sceneRoot: DceEntity

    /**
     * Shows the scene with all its entities. Shortcut for `sceneRoot.show()`
     */
    show: () => void;

    /**
     * Hides the scene with all its entities. Shortcut for `sceneRoot.hide()`
     */
    hide: () => void
}

export type DceEntity = {
    /**
     * The Decentraland entity
     */
    entity: Entity

    /**
     * The Transform component of the entity. Although, it is not required by Decentraland, every DceEntity will have a Transform added
     */
    transform: Transform

    /**
     * Show this entity and all its children. This calls `engine.addEntity(entity)` internally.
     */
    show: () => void

    /**
     * Hide this entity and all its children. This calls `engine.removeEntity(entity)` internally.
     */
    hide: () => void
}

export type WithBoxShape = {
    boxShape: BoxShape
}

export type NewScene = DceScene & {
    exposed: {
    }
}
export type NewScene2 = DceScene & {
    exposed: {
    }
}

export class SceneFactory {
    /**
     * Creates a new instance of the scene NewScene
     * @param rootEntity specify a root entity for the newly created scene. If null, a new Entity will be generated as the root
     */
    static createNewScene(rootEntity: Entity | null = null): NewScene {
        if (rootEntity == null) {
            rootEntity = new Entity()
            const rootEntityTrans = new Transform()
            rootEntity.addComponent(rootEntityTrans)
        } else {
            if (!rootEntity.hasComponent(Transform)) {
                rootEntity.addComponent(new Transform)
            }
        }


        engine.addEntity(rootEntity)

        return {
            sceneRoot: {
                entity: rootEntity,
                transform: rootEntity.getComponent(Transform),
                show() { engine.addEntity(this.entity) },
                hide() { engine.removeEntity(this.entity) }
            },
            exposed: {
            },

            show() { this.sceneRoot.show() },
            hide() { this.sceneRoot.hide() }
        }
    }
    /**
     * Creates a new instance of the scene NewScene2
     * @param rootEntity specify a root entity for the newly created scene. If null, a new Entity will be generated as the root
     */
    static createNewScene2(rootEntity: Entity | null = null): NewScene2 {
        if (rootEntity == null) {
            rootEntity = new Entity()
            const rootEntityTrans = new Transform()
            rootEntity.addComponent(rootEntityTrans)
        } else {
            if (!rootEntity.hasComponent(Transform)) {
                rootEntity.addComponent(new Transform)
            }
        }

        const ent4_BoxEntity1 = new Entity("Box Entity")
        const ent4_BoxEntity1Transform = new Transform()
        ent4_BoxEntity1Transform.position = new Vector3(3, 3, 3)
        ent4_BoxEntity1Transform.rotation = new Quaternion(0, 0, 0, 1)
        ent4_BoxEntity1Transform.scale = new Vector3(1, 1, 1)
        if("init" in ent4_BoxEntity1Transform && typeof ent4_BoxEntity1Transform.init === "function")
        {
            ent4_BoxEntity1Transform.init(ent4_BoxEntity1)
        }
        ent4_BoxEntity1.addComponent(ent4_BoxEntity1Transform)
        const ent4_BoxEntity1BoxShape = new BoxShape()
        if("init" in ent4_BoxEntity1BoxShape && typeof ent4_BoxEntity1BoxShape.init === "function")
        {
            ent4_BoxEntity1BoxShape.init(ent4_BoxEntity1)
        }
        ent4_BoxEntity1.addComponent(ent4_BoxEntity1BoxShape)

        ent4_BoxEntity1.setParent(rootEntity)

        engine.addEntity(rootEntity)

        return {
            sceneRoot: {
                entity: rootEntity,
                transform: rootEntity.getComponent(Transform),
                show() { engine.addEntity(this.entity) },
                hide() { engine.removeEntity(this.entity) }
            },
            exposed: {
            },

            show() { this.sceneRoot.show() },
            hide() { this.sceneRoot.hide() }
        }
    }
}
