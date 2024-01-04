<script setup lang="ts">
import { ref } from 'vue';

import Card from 'primevue/card';
import Button from 'primevue/button';

import UserService from '@/services/UserService/UserService';
import useToast from '@/composables/useToast';
import userStore from '@/stores/user.store';

import type { UserQuery } from '@/types/user';

export type Props = {
  query: UserQuery;
};

const props = defineProps<Props>();

const toast = useToast();

const isLoading = ref(false);

const handleFavoriteTracking = (): void => {
  isLoading.value = true;

  UserService.favoriteQuery(props.query.id, !props.query.isFavorite)
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
          <h2 class="cost">
            {{ props.query.senderCity.name }}
            <i class="arrow pi pi-arrow-right" />
            {{ props.query.receiverCity.name }}
          </h2>
        </div>
        <Button
          :icon="`pi ${props.query.isFavorite ? 'pi-star-fill' : 'pi-star'}`"
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

.cost {
  color: var(--primary-color);
}
</style>
