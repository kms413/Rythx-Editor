import type { Application, Container, Graphics } from 'pixi.js'
import type { Component, Reactive, Ref } from 'vue'

declare global {
  type ThemeVars = {
    EditorBgColor: string
    ActivityBarDividerColor: string
    ActivityBarIconsFilter: string
    StageHeaderColor: string
    StageShadow: string
    HeadingColor: string
    PargraphColor: string
    ButtonTextColor: string
    ButtonHoverBgColor: string
    ButtonActiveBgColor: string
    HoverBgColor: string
    [key: string]: string
  }

  interface RythxGroup {
    name: string
    container: Container
  }

  interface ActivityBarItem {
    dataURI: string
    tagName: string
    id: number
    SideBarComponent: Component
    width?: number
  }

  interface Rythx {
    vm: {
      engine: {
        app: Application
        stage: Application['stage']
      }
      runtime: {
        groups: Reactive<RythxGroup[]>
      }
    }
    gui: {
      SideBarCurrent: Ref<number>
      sideBarWidth: Ref<number>
    }
  }

  interface Window {
    mouseMoveHandles: Set<(e: MouseEvent) => void>
    windowResizeHandles: Set<(e: Event) => void>
    rythxResizeEvent: {
      oldWidth: number
      oldHeight: number
    }
    Rythx: Rythx
  }
}
