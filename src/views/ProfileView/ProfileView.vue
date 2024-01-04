<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import AuthService from '@/services/AuthService/AuthService';
import ProfileTrackingCard from './ProfileTrackingCard.vue';
import ProfileQueryCard from './ProfileQueryCard.vue';
import AppDescription from '@/components/AppDescription.vue';
import userStore from '@/stores/user.store';

const router = useRouter();

const handleLogout = (): void => {
  AuthService.logout();
  router.push('/tracking');
};

onBeforeMount(() => {
  userStore.loadUser();
});
</script>

<template>
  <div class="wrapper">
    <div v-if="userStore.user" class="container">
      <h1>Вітаємо, {{ userStore.user?.name }}</h1>
      <Button label="Вийти" size="large" severity="danger" @click="handleLogout" />
    </div>

    <TabView v-if="userStore.user" title="Історія">
      <TabPanel header="Трекінг">
        <div class="list">
          <ProfileTrackingCard v-for="item in userStore.user.trackings" :key="item.id" :tracking="item" />
        </div>
      </TabPanel>
      <TabPanel header="Розрахунок Вартості">
        <div class="list">
          <ProfileQueryCard v-for="item in userStore.user.queries" :key="item.id" :query="item" />
        </div>
      </TabPanel>
    </TabView>

    <AppDescription />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;

  :deep(.p-card-content) {
    padding: 0;
  }
}
</style>
