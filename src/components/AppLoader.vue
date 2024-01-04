<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
</script>

<template>
  <div class="loader-backdrop">
    <ProgressSpinner />
  </div>
</template>

<style scoped>
.loader-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-50);
  z-index: 9999;
}
</style>
