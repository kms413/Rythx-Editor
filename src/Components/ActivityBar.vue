<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import barItems from './ActivityBar/items'
import favicon from '@/icons/favicon.svg'
import gsap from 'gsap'

const activityBoxRef = ref<HTMLDivElement | null>(null)
const Rythx = window.Rythx
const gui = Rythx.gui
function setCurrent(id: number, width?: number) {
  gui.SideBarCurrent.value = id
  if (width) gui.sideBarWidth.value = width
}

function changeIconFilter(newValue: number, oldValue: number) {
  if (!activityBoxRef.value) return

  const children_ = Array.from(activityBoxRef.value.children).slice(2)
  const point = activityBoxRef.value.children[0]!


  gsap.set(children_[oldValue]!, {
    filter: '',
  })
  gsap.set(children_[newValue]!, {
    filter: 'brightness(1.4)',
  })

  const bounding = children_[newValue]!.getBoundingClientRect()

  gsap.to(point, {
    top: `${bounding.top}px`,
    height: `${bounding.height}px`,
    ease: "back.inOut",
    duration: .334
  })
}
watch(gui.SideBarCurrent, changeIconFilter)
onMounted(() => {
  changeIconFilter(0, -1)
})
</script>
<template>
  <div ref="activityBoxRef" id="activityBox">
    <div id="activityBarCurrentPoint"></div>
    <img :src="favicon" alt="" />
    <template v-for="item in barItems" :key="item.id">
      <img
        @click="
          () => {
            setCurrent(item.id, item.width)
          }
        "
        :src="item.dataURI"
        :title="item.tagName"
      />
    </template>
  </div>
</template>
<style scoped>
#activityBarCurrentPoint{
  position: absolute;
  padding: 0;
  margin: 0;
  width: 2px;
  height: 15px;
  border-radius: 2px;
  left: 4px;
  top: 0;
  background-color: var(--activity-bar-divider-color);
}
#activityBox {
  --gap-size: 15pt;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30pt;
  height: 100%;
  gap: var(--gap-size);
  box-shadow: 1px 0 10px var(--activity-bar-divider-color);
  background-color: rgba(255, 255, 255, 0.082);
  margin-right: 1px;
}
#activityBox > *:not(:first-child) {
  width: 15pt;
  user-select: none;
}
#activityBox > *:nth-child(2) {
  margin-top: 10pt;
}
#activityBox > *:not(:nth-child(2)):not(:first-child):hover {
  cursor: pointer;
  filter: brightness(1.2);
}
</style>
