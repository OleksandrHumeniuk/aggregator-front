<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="background" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 16px 0;
  overflow: hidden;
}

.background {
  height: 48px;
  background-image: url('src/assets/logo.png');
  width: 3000px;
  animation: slide 60s linear infinite;
  background-repeat: space;
  background-size: 100px;
  background-position: center center;
}

@keyframes slide {
  0% {
    transform: translate3d(-1000px, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
