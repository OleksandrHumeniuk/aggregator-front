<script setup lang="ts">
import { ref } from 'vue';

import Card from 'primevue/card';
import Button from 'primevue/button';

import UserService from '@/services/UserService/UserService';
import useToast from '@/composables/useToast';
import userStore from '@/stores/user.store';

import type { UserTracking } from '@/types/user';

export type Props = {
  tracking: UserTracking;
};

const props = defineProps<Props>();

const toast = useToast();

const isLoading = ref(false);

const handleFavoriteTracking = (): void => {
  isLoading.value = true;

  UserService.favoriteTracking(props.tracking.id, !props.tracking.isFavorite)
    .then(userStore.loadUser)
    .catch(error => toast.error(error))
    .finally(() => (isLoading.value = false));
};
</script>

<template>
  <Card>
    <template #content>
      <div class="body">
        <div class="container">
          <h2 class="number">{{ props.tracking.trackingNumber }}</h2>
        </div>
        <Button
          :icon="`pi ${props.tracking.isFavorite ? 'pi-star-fill' : 'pi-star'}`"
          :disabled="isLoading"
          @click="handleFavoriteTracking"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.container {
  display: flex;
  align-items: center;
  gap: 32px;
}

.number {
  color: var(--primary-color);
}
</style>
