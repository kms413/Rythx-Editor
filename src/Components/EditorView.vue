<script setup lang="ts">

import ActivityBar from './ActivityBar.vue';
import StageView from './StageView.vue';
import SideBar from './SideBar.vue';

</script>
<template>

  <main>
    <StageView />
    <ActivityBar />
    <SideBar />
  </main>

</template>

<style scoped>
  main{
    display: flex;
    width: 100%;
    height: 100%;
    background-color: var(--editor-bg-color);
    overflow: hidden;
  }
</style>
