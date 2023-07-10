import { AvatarModifierArea, AvatarModifierType, engine, GltfContainer, InputAction, inputSystem, Material, MeshCollider, pointerEventsSystem, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'


import { bounceScalingSystem, circularSystem } from './systems'

import { setMenuVisible, setupUi } from './ui'
import { setui2 } from './ui2'
import { BounceScaling, Spinner } from './components'
import { createCube } from './factory'
import { movePlayerTo } from '~system/RestrictedActions'


export function main() {
  // draw UI
  setupUi()

  //Apartment Spawn
  let apartment = engine.addEntity()
  GltfContainer.create(apartment, {
    src: 'assets/apartment.glb',
  })
  Transform.create(apartment, {
    position: Vector3.create(0, 0, 0),
  })

  //Bed Spawn
  let apartmentBed = engine.addEntity()
  GltfContainer.create(apartmentBed, {
    src: 'assets/apartmentBed.glb',
  })
  Transform.create(apartmentBed, {
    position: Vector3.create(16, 10.6, 43.5),
  })
  //Bed Prepare Click Behaviour
  pointerEventsSystem.onPointerDown(
    {
      entity: apartmentBed,
      opts: { button: InputAction.IA_POINTER, hoverText: 'GO TO BED' },
    },
    function() {
      //Bed Colliders Spawn
      let apartmentBed = engine.addEntity()
      GltfContainer.create(apartmentBed, {
        src: 'assets/apartmentBedColliders.glb',
      })
      Transform.create(apartmentBed, {
        position: Vector3.create(16, 10.6, 43.5),
      })
      movePlayerTo({
        newRelativePosition: Vector3.create(15, 11, 44.5),
        cameraTarget: Vector3.create(0, 10.6, 44.5),
      })
      //Avatar Hiding System
      const entity1 = engine.addEntity()
      AvatarModifierArea.create(entity1, {
        area: Vector3.create(4, 3, 4),
        modifiers: [AvatarModifierType.AMT_HIDE_AVATARS],
        excludeIds: []
      })
      Transform.create(entity1, {
        position: Vector3.create(15, 11,  44.5),
      })

      setMenuVisible()
    }
  )


  let triggerArea = engine.addEntity()
  Transform.createOrReplace(triggerArea, {position: Vector3.create(1,1,1)})
  utils.triggers.addTrigger(triggerArea, 1, 1, [{ type: 'box', scale: Vector3.create(1.5, 3, 1.5) }], () => {
    //triggerMenuVisibility()
  })
}

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}