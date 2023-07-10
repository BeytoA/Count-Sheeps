import {
  engine,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

type GenesisPlazaContent = string

let dt = 0
const dreamRunningImage = 'assets/walking1.png'
const dreamBackground = 'assets/a736cbd973af4a9c80a3f5a046574be4.png'
let jumping = false
let jumpTimeInAir = 0 
let jumpHeightMax = 150
let jumpHeight = 0
let runTime = 0
let runDistance = 0
let sheepCount = 0

var isMenuVisible: boolean = false
var isDialog1Visible: boolean = true
var isDialog2Visible: boolean = false
var isDialog3Visible: boolean = false

engine.addSystem((t) => {
  dt += t

  if (isDialog2Visible)
  {
    runTime += t
    runDistance = runTime * 60
    if (jumping)
    {
      jumpTimeInAir += t
      if (jumpHeight < -100 || runDistance > 300) { jumping = false; jumpTimeInAir = 0}
    }
    jumpHeight = ((Math.sin(jumpTimeInAir * 2)) * jumpHeightMax) - 100
  
    //Jump Control
    if (160 > runDistance && runDistance > 150 && jumpHeight < -40)
    {
      runTime = 0
      runDistance = 0
      jumping = false
      jumpTimeInAir = 0
    }
    //Score up with 1
    if (runDistance > 300)
    {
      runTime = 0
      runDistance = 0
      sheepCount++
      if (sheepCount >= 6)
      {
        isDialog2Visible = false
        isDialog3Visible = true
      }
    }
  }
})

function CreateUImovingDream() {
  const tint = Color4.lerp(
    Color4.Black(),
    Color4.Red(),
    1 + Math.sin(dt*10) * 0.5 
  )

  return (
    <UiEntity>
      <UiEntity //Dialog 1
        uiTransform={{
          width: 500,
          height: 400,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          display: isDialog1Visible ? 'flex': 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: dreamBackground
          }
        }}
      >
        <Label 
          uiTransform={{
            width: '100%',
            height: '20%',
            margin: {top: '150px'}
          }}
          value='You can now count sheeps\n to fall asleep and\n be able to Lucid Dream'
          fontSize={22}
        />
        <UiEntity
          uiTransform={{
            width: '70%',
            height: '20%',
            alignSelf: 'center'
          }}
          uiBackground={{
            color: Color4.fromHexString("#fdf6e3")
          }}
          uiText={{
            value: 'Start with counting',
            color: Color4.Black(),
            fontSize: 24
          }}
          onMouseDown={() => { isDialog1Visible = false; isDialog2Visible = true} }
        />
      </UiEntity>
      <UiEntity //mainBackground
        uiTransform={{
          width: 500,
          height: 400,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          display: isDialog2Visible ? 'flex': 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: dreamBackground
          }
        }}
      >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '20%'
          }}
          uiBackground={{
            color: Color4.fromHexString("#f1e6d6")
          }}
          uiText={{
            value: 'Sheep Count:' + sheepCount.toString() + '/6',
            color: Color4.Black(),
            fontSize: 24
          }}
        />
        <UiEntity //mainCharacter
          uiTransform={{
            width: 100,
            height: 140,
            margin: { right: runDistance, bottom: jumpHeight }
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: dreamRunningImage
            }
          }}
          uiText={{
            value: jumpHeight.toFixed(2).toString(),
            color: Color4.Red(),
            fontSize: 1
          }}
        />
        <UiEntity
          uiTransform={{
            width: '70%',
            height: '20%',
            alignSelf: 'center'
          }}
          uiBackground={{
            color: Color4.fromHexString("#d4a7a5")
          }}
          uiText={{
            value: 'Click to Jump',
            color: tint,
            fontSize: 24
          }}
          onMouseDown={() => { jumping = true } }
        />
      </UiEntity>
      <UiEntity //Closing Dialog
        uiTransform={{
          width: 500,
          height: 400,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          display: isDialog3Visible ? 'flex': 'none'
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: dreamBackground
          }
        }}
      >
        <Label 
          uiTransform={{
            width: '100%',
            height: '20%',
            margin: {top: '150px'}
          }}
          value='This was my entry for the\n Decentraland Gamejam 2023\n Which I made in less than 48 hours\n(Source available in Github)\n\nBeyto A. (OnSr)'
          fontSize={22}
        />
        <UiEntity
          uiTransform={{
            width: '70%',
            height: '20%',
            alignSelf: 'center'
          }}
          uiBackground={{
            color: Color4.fromHexString("#fdf6e3")
          }}
          uiText={{
            value: 'Thanks for playing!',
            color: Color4.Black(),
            fontSize: 24
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}

export const ui = () => {
  const Renderer = CreateUImovingDream

  return (
    <UiEntity
      uiTransform={{
        display: isMenuVisible ? 'flex': 'none',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: { left: 0 }
      }}
      uiBackground={{ color: Color4.fromInts(255, 255, 255, 50) }}
    >
      <Renderer />
    </UiEntity>
  )
}

export function setMenuVisible(){
  isMenuVisible = true
}
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(ui)
}