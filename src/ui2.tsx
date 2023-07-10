import { Transform, engine } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from "@dcl/sdk/react-ecs"

const uiComponent = () => (
    <UiEntity
      uiTransform={{
        width: 400,
        height: 230,
        //  { top: 16, right: 0, bottom: 8 left: 270 },
        margin: '16px 0 8px 270px',
        // { top: 4, bottom: 4, left: 4, right: 4 },
        padding: 4
      }}
      uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        uiBackground={{ color: Color4.fromHexString('#70ac76ff') }}
      >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: 50,
            margin: '8px 0'
          }}
          uiBackground={{
            
          }}
          uiText={{ value: 'SDK7', fontSize: 18 }}
        />
        <Label
          onMouseDown={() => {
            console.log('Player Position clicked !')
          }}
          value={`Player: ${getPlayerPosition()}`}
          fontSize={18}
          uiTransform={{ width: '100%', height: 30 }}
        />
      </UiEntity>
    </UiEntity>
  )
  
  function getPlayerPosition() {
    const playerPosition = Transform.getOrNull(engine.PlayerEntity)
    if (!playerPosition) return ' no data yet'
    const { x, y, z } = playerPosition.position
    return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
  }
  
  export function setui2() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
  }