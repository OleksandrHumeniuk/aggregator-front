<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';

import '@/assets/scss/index.scss';
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Toast from 'primevue/toast';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import userStore from '@/stores/user.store';

onBeforeMount(userStore.loadUser);
</script>

<template>
  <Toast />

  <div class="wrapper">
    <div class="header">
      <AppHeader />
    </div>

    <div class="body">
      <main class="main">
        <RouterView />
      </main>
    </div>

    <div class="footer">
      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 0 32px;
  border-bottom: 1px solid var(--gray-100);
}

.footer {
  border-top: 1px solid var(--gray-100);
}

.body {
  position: relative;
  padding: 32px;
  background-color: var(--gray-50);
  min-height: calc(100vh - 81px - 81px);
}

.main {
  margin: auto;
  max-width: 1200px;
}
</style>
