<script setup lang="ts">

import initPixi from "./StageView/initPixi"
import greenFlagIcon from "@/icons/GreenFlag.svg"
import { ref, onMounted } from "vue"
// import gsap from "gsap"

const headerRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLDivElement | null>(null)
const pixiAppContainerRef = ref<HTMLDivElement | null>(null)

let isDroping = false
let lastDropingX = 0
let lastDropingY = 0
let viewX = window.innerWidth - 520
let viewY = 20


onMounted(()=>{
  if(!headerRef.value) return
  if(!stageRef.value) return
  if(!pixiAppContainerRef.value) return
  const header = headerRef.value
  const stage = stageRef.value
  const pixiAppContainer = pixiAppContainerRef.value
  initPixi(pixiAppContainer)


  updateViewPos(viewX,viewY)

  header.addEventListener("mousedown",(e)=>{
    isDroping = true
    lastDropingX = e.clientX
    lastDropingY = e.clientY
  })
  header.addEventListener("mouseup",()=>{
    isDroping = false
  })

  window.mouseMoveHandles.add((e)=>{
    if(!e) return
    if(!isDroping) return
    const offsetX: number = e.clientX - lastDropingX
    const offsetY: number = e.clientY - lastDropingY




    lastDropingX = e.clientX
    lastDropingY = e.clientY

    updateViewPos(viewX+offsetX,viewY+offsetY)
  })
  window.windowResizeHandles.add(()=>{
    if(
      window.innerWidth>=window.rythxResizeEvent.oldWidth&&
      window.innerHeight>=window.rythxResizeEvent.oldHeight
    ) return
    const bouding = stage.getBoundingClientRect()
    const xlim = bouding.left + bouding.width
    const ylim = bouding.top + bouding.height

    if(viewX<0 || viewY<0){
      if(viewX<0){
        updateViewPos(0)
      }
      if(viewY<0){
        updateViewPos(void 0,0)
      }
      return
    }

    if(xlim>window.innerWidth){
      updateViewPos(
        viewX + (window.innerWidth - window.rythxResizeEvent.oldWidth)
      )
    }
    if(ylim>window.innerHeight){
      updateViewPos(
        void 0,
        viewY + (window.innerHeight - window.rythxResizeEvent.oldHeight)
      )
    }
  })
  function updateViewPos(x?: number,y?: number){
    if(x)viewX = x
    if(y)viewY = y
    if(x)stage.style.left = `${viewX}px`
    if(y)stage.style.top = `${viewY}px`
  }
})


</script>
<template>
    <div ref="stageRef" id="stageContainer">
      <header ref="headerRef">

        <button>
          <img :src="greenFlagIcon" alt="Start">
        </button>

      </header>
      <div ref="pixiAppContainerRef"></div>
    </div>
</template>
<style>
#stageContainer{
  width: 500px;
  height: 330px;
  background-color: var(--editor-bg-color);
  box-shadow: 0 0 2px var(--stage-shadow);
  position: absolute;
  user-select: none;
  z-index: 99
}
#stageContainer header{
  width: 100%;
  height: 25pt;
  background-color: var(--stage-header-color);
  display: flex;
  gap: 5pt;
  justify-content: flex-start;
  align-items: center;
}
#stageContainer header button:first-child{
  margin-left: 10pt;
}
#stageContainer header button{
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
}
#stageContainer header button img{
  width: 12.5px;
}
</style>
