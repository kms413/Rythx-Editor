<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  title: string
  placeholder: string
  buttonText: string
}>()

const emit = defineEmits(['close'])

const inputValue = ref<string>('')
const containerRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

function submit() {
  const trimmedValue = inputValue.value.trim()
  if (trimmedValue === '') {
    emit('close', false)
    return
  }
  emit('close', true, trimmedValue)
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close', false)
  }
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    if (inputValue.value.trim() === '') {
      emit('close', false)
    }
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    inputRef.value?.focus()
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div id="inputDialogContainer" ref="containerRef">
    <h2>{{ title }}</h2>
    <div>
      <span>名称</span>
      <input
        type="text"
        :placeholder="placeholder"
        v-model="inputValue"
        @keyup.enter="submit"
        ref="inputRef"
      />
    </div>
    <button @click="submit">
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
#inputDialogContainer {
  width: 300px;
  height: 160px;
  background: var(--editor-bg-color);
  box-shadow: 0 0 1px var(--activity-bar-divider-color);
  padding: 15pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15pt;
}
#inputDialogContainer div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5pt;
}
button {
  width: 80pt;
}
</style>
