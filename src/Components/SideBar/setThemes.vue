<script setup lang="ts">

import { Black,White } from '@/assets/defaultThemes';



</script>
<template>
  <div>
    <h1>设定主题</h1>
    <hr>
    <p>Rythx Editor为用户提供了两种可选的主题，分别是<span>浅色主题</span>和<span>深色主题</span>。</p>
    <button @click="()=>{White.use()}">应用浅色主题</button>
    <button @click="()=>{Black.use()}">应用深色主题</button>
  </div>

</template>
<style scoped>
  div{
    padding: 15pt;
    display: flex;
    flex-direction: column;
    gap: 5pt
  }
  span{
    background-color: rgba(133, 133, 133, 0.39);
    font-size: small;
    padding: 2pt;
    border-radius: 2pt;
    margin: 1pt;
    cursor: pointer;
  }
  p{
    text-indent: 2em;
  }
</style>
