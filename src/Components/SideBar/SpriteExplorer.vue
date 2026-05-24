<script setup lang="ts">
import { onMounted, ref, onUnmounted, reactive } from 'vue'
import groupIcon from '@/icons/group.svg'
import gsap from 'gsap'
import inputDialog from './SpriteExplorer/inputDialog'
import * as PIXI from 'pixi.js'
import * as groupTools from '@/Components/StageView/group'

const Rythx = window.Rythx
const groups = ref<RythxGroup[]>([])
const explorerContainerRef = ref<HTMLDivElement | null>(null)
const ctxMenuRef = ref<HTMLDivElement | null>(null)

// 添加菜单显示状态
const isMenuVisible = ref(false)
const selectedGroups = ref<Set<number>>(new Set())
const lastSelectedIndex = ref<number>(-1)
const anchorIndex = ref<number>(-1)

function hideMenu() {
  if (!ctxMenuRef.value) return
  gsap.set(ctxMenuRef.value, {
    display: 'none',
  })
  isMenuVisible.value = false
}

function handleMenuItemClick(action: string) {
  console.log('执行操作:', action)

  switch (action) {
    case 'delete':
      const sortedIndices = Array.from(selectedGroups.value).sort((a, b) => b - a)
      sortedIndices.forEach((index) => {
        Rythx.vm.runtime.groups.splice(index, 1)
        groupTools.remove(index)
      })
      selectedGroups.value.clear()
      if (groups.value.length > 0) {
        lastSelectedIndex.value = Math.min(lastSelectedIndex.value, groups.value.length - 1)
        anchorIndex.value = lastSelectedIndex.value
      } else {
        lastSelectedIndex.value = -1
        anchorIndex.value = -1
      }
      break
    case 'create':
      inputDialog({
        title: '创建组',
        placeholder: '请输入组名',
        buttonText: '创建',
      })
        .then((name) => {
          const vm = window.Rythx.vm
          const runtime = vm.runtime

          const container = new PIXI.Container()
          const group = reactive<RythxGroup>({
            name,
            container,
          })
          runtime.groups.push(group)
          groupTools.add(group)

          const lastIndex = groups.value.length - 1
          selectedGroups.value.clear()
          selectedGroups.value.add(lastIndex)
          lastSelectedIndex.value = lastIndex
          anchorIndex.value = lastIndex
          isSelectedAnyGroup.value = true
        })
        .catch(() => {})
      break
    case 'controller':
      console.log('控制器')
      break
    case 'rename':
      if (selectedGroups.value.size === 1) {
        const index = Array.from(selectedGroups.value)[0] as number

        inputDialog({
          title: '重命名组',
          placeholder: '请输入新组名',
          buttonText: '确认',
        })
          .then((newName) => {
            groups.value[index]!.name = newName
          })
          .catch(() => {})
      }
      break
  }

  // 点击菜单项后隐藏菜单
  hideMenu()
}

// 点击其他地方隐藏菜单
function handleClickOutside(e: MouseEvent) {
  const ctxMenu = ctxMenuRef.value
  const explorerContainer = explorerContainerRef.value

  // 检查点击是否在菜单外部
  if (isMenuVisible.value && ctxMenu && !ctxMenu.contains(e.target as Node)) {
    hideMenu()
  }

  // 点击 explorerContainer 外部时取消选择
  if (explorerContainer && !explorerContainer.contains(e.target as Node)) {
    selectedGroups.value.clear()
    lastSelectedIndex.value = -1
  }

  // 点击 explorerContainer 内部但不在 group 上时取消选择
  if (explorerContainer && explorerContainer.contains(e.target as Node)) {
    const target = e.target as HTMLElement
    if (!target.closest('.group') && !target.closest('#explorerCtxMenu')) {
      selectedGroups.value.clear()
      lastSelectedIndex.value = -1
    }
  }
}

// 按 ESC 键隐藏菜单
function handleEscapeKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && isMenuVisible.value) {
    hideMenu()
  }
}

// 按 Delete 或 Backspace 键删除选中的组
function handleDeleteKey(e: KeyboardEvent) {
  if ((e.key === 'Delete' || e.key === 'Backspace') && selectedGroups.value.size > 0) {
    const sortedIndices = Array.from(selectedGroups.value).sort((a, b) => b - a)
    sortedIndices.forEach((index) => {
      Rythx.vm.runtime.groups.splice(index, 1)
      groupTools.remove(index)
    })
    selectedGroups.value.clear()
    lastSelectedIndex.value = -1
  }
}

// 处理上下键选择
function handleArrowKeys(e: KeyboardEvent) {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault()

    const groupCount = groups.value.length
    if (groupCount === 0) return

    let newIndex: number

    if (e.key === 'ArrowDown') {
      if (lastSelectedIndex.value < groupCount - 1) {
        newIndex = lastSelectedIndex.value + 1
      } else {
        inputDialog({
          title: '创建组',
          placeholder: '请输入组名',
          buttonText: '创建',
        })
          .then((name) => {
            const vm = window.Rythx.vm
            const runtime = vm.runtime

            const container = new PIXI.Container()
            const group = reactive<RythxGroup>({
              name,
              container,
            })
            runtime.groups.push(group)
            groupTools.add(group)

            const lastIndex = groups.value.length - 1
            selectedGroups.value.clear()
            selectedGroups.value.add(lastIndex)
            lastSelectedIndex.value = lastIndex
            anchorIndex.value = lastIndex
            isSelectedAnyGroup.value = true
          })
          .catch(() => {})
        return
      }
    } else {
      if (lastSelectedIndex.value > 0) {
        newIndex = lastSelectedIndex.value - 1
      } else if (lastSelectedIndex.value === -1) {
        newIndex = 0
      } else {
        return
      }
    }

    if (e.shiftKey) {
      if (anchorIndex.value === -1) {
        anchorIndex.value = lastSelectedIndex.value
      }
      const start = Math.min(anchorIndex.value, newIndex)
      const end = Math.max(anchorIndex.value, newIndex)
      selectedGroups.value.clear()
      for (let i = start; i <= end; i++) {
        selectedGroups.value.add(i)
      }
      lastSelectedIndex.value = newIndex
    } else {
      selectedGroups.value.clear()
      selectedGroups.value.add(newIndex)
      lastSelectedIndex.value = newIndex
      anchorIndex.value = newIndex
    }

    isSelectedAnyGroup.value = selectedGroups.value.size > 0
  }
}

// 窗口大小改变时隐藏菜单
function handleWindowResize() {
  if (isMenuVisible.value) {
    hideMenu()
  }
}

// 滚动时隐藏菜单（可选）
function handleScroll() {
  if (isMenuVisible.value) {
    hideMenu()
  }
}

const isSelectedAnyGroup = ref<boolean>(false)

function handleGroupClick(e: MouseEvent, index: number) {
  e.stopPropagation()

  if (e.ctrlKey || e.metaKey) {
    if (selectedGroups.value.has(index)) {
      selectedGroups.value.delete(index)
      if (selectedGroups.value.size === 0) {
        lastSelectedIndex.value = -1
        anchorIndex.value = -1
      }
    } else {
      selectedGroups.value.add(index)
      lastSelectedIndex.value = index
      anchorIndex.value = index
    }
  } else if (e.shiftKey && lastSelectedIndex.value !== -1) {
    if (anchorIndex.value === -1) {
      anchorIndex.value = lastSelectedIndex.value
    }
    const start = Math.min(anchorIndex.value, index)
    const end = Math.max(anchorIndex.value, index)
    selectedGroups.value.clear()
    for (let i = start; i <= end; i++) {
      selectedGroups.value.add(i)
    }
    lastSelectedIndex.value = index
  } else {
    selectedGroups.value.clear()
    selectedGroups.value.add(index)
    lastSelectedIndex.value = index
    anchorIndex.value = index
  }

  isSelectedAnyGroup.value = selectedGroups.value.size > 0
}

function handleGroupsContextMenu(e: MouseEvent, curent: number) {
  e.preventDefault()
  e.stopPropagation()

  if (!selectedGroups.value.has(curent)) {
    selectedGroups.value.clear()
    selectedGroups.value.add(curent)
    lastSelectedIndex.value = curent
    anchorIndex.value = curent
  }

  isSelectedAnyGroup.value = selectedGroups.value.size > 0
  handleContextMenu(e, true)
}
function handleContextMenu(e: MouseEvent, selectedGroup?: boolean) {
  e.preventDefault()
  if (!selectedGroup) isSelectedAnyGroup.value = false
  // 如果菜单已经显示，先隐藏再显示新位置（可选）
  if (isMenuVisible.value) {
    hideMenu()
  }

  const explorerContainer = explorerContainerRef.value!
  const ctxMenu = ctxMenuRef.value!
  const bounding = explorerContainer.getBoundingClientRect()
  const { clientX, clientY } = e
  const offsetX = clientX - bounding.left
  const offsetY = clientY - bounding.top

  gsap.set(ctxMenu, {
    display: 'flex',
    top: `${offsetY + 3}px`,
    left: `${offsetX + 3}px`,
  })

  isMenuVisible.value = true
}

onMounted(() => {
  if (!explorerContainerRef.value) return
  groups.value = Rythx.vm.runtime.groups

  // 添加全局事件监听
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('keydown', handleDeleteKey)
  document.addEventListener('keydown', handleArrowKeys)
  window.windowResizeHandles.add(handleWindowResize)
  window.addEventListener('scroll', handleScroll, true) // 捕获阶段监听
})

onUnmounted(() => {
  // 清理事件监听
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
  document.removeEventListener('keydown', handleDeleteKey)
  document.removeEventListener('keydown', handleArrowKeys)
  window.windowResizeHandles.delete(handleWindowResize)
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div id="explorerContainer" ref="explorerContainerRef" @contextmenu="handleContextMenu">
    <div id="explorerCtxMenu" ref="ctxMenuRef">
      <span
        @click="handleMenuItemClick('rename')"
        v-if="selectedGroups.size === 1"
        >重命名</span
      >
      <span @click="handleMenuItemClick('delete')" v-if="isSelectedAnyGroup"
        >删除组 (共{{ selectedGroups.size }}个)</span
      >
      <span @click="handleMenuItemClick('create')">创建组</span>
      <span @click="handleMenuItemClick('controller')">控制器</span>
    </div>
    <span id="explorer-title">资源管理器</span>

    <div id="groupBox">
      <template v-for="(v, i) in groups" :key="v.name">
        <span
          class="group"
          :class="{ selected: selectedGroups.has(i) }"
          @click="(e) => handleGroupClick(e, i)"
          @contextmenu="
            (e) => {
              handleGroupsContextMenu(e, i)
            }
          "
        >
          <img :src="groupIcon" draggable="false" />
          {{ v.name }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
#explorerCtxMenu {
  --hover-bg-color: color-mix(in srgb, var(--editor-bg-color), black 5%);
  position: absolute;
  min-width: 200pt;
  height: auto;
  display: none;
  flex-direction: column;
  background-color: var(--editor-bg-color);
  box-shadow: 0 0 1pt var(--activity-bar-divider-color);
  border-radius: 1pt;
  z-index: 9999; /* 提高 z-index 确保菜单在最上层 */
  overflow: hidden;
  gap: 0pt;
  user-select: none;
}

#explorerCtxMenu span {
  padding: 2pt 6pt; /* 改进可点击区域 */
  filter: brightness(0.8);
  font-size: small;
  text-align: left; /* 左对齐更符合习惯 */
}

#explorerCtxMenu span:hover {
  background-color: var(--hover-bg-color);
}

span {
  color: var(--pargraph-color);
}

#explorer-title {
  font-size: 10pt;
  opacity: 0.8;
}

.group {
  font-size: 10pt;
  user-select: none;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2pt;
}

.group:hover {
  background-color: var(--hover-bg-color);
}

.group.selected {
  background-color: color-mix(in srgb, var(--editor-bg-color), black 15%);
  border: 1px solid var(--activity-bar-divider-color);
  border-radius: 2pt;
}

.group img {
  width: 10pt;
}

#explorerContainer {
  width: 100%;
  height: 100%;
  padding: 5pt;
  padding-left: 10pt;
  padding-right: 10pt;
  z-index: 4;
}
</style>
