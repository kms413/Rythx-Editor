<script setup lang="ts">

import Items from "@/Components/ActivityBar/items"
import { onMounted, ref, watch } from "vue"
import gsap from "gsap"

const Rythx = window.Rythx
const current = Rythx.gui.SideBarCurrent
const width = Rythx.gui.sideBarWidth
const sideBarRef = ref<HTMLDivElement | null>(null)


function changeSideBarWidth(){
  gsap.to(sideBarRef.value!, {
    width: `${width.value}px`,
    ease: "expo.out",
    duration: .125}
  )
}

onMounted(()=>{
  if(!sideBarRef.value) return
  changeSideBarWidth()
  watch(width, changeSideBarWidth)
})

</script>
<template>
  <div ref="sideBarRef" id="sideBar">
    <component :is="Items[current]?.SideBarComponent"></component>
  </div>
</template>
<style>
#sideBar{
  width: 200pt;
  height: 100%;
  background-color: var(--editor-bg-color);
  box-shadow: 1px 0 1px var(--activity-bar-divider-color);
}
</style>
