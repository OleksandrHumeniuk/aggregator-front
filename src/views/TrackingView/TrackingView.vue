<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import TrackingService from '@/services/TrackingService/TrackingService';
import TrackingCard from './TrackingCard.vue';
import AppDescription from '@/components/AppDescription.vue';
import AppLoader from '@/components/AppLoader.vue';
import useToast from '@/composables/useToast';
import userStore from '@/stores/user.store';

import type { TrackingResponse } from '@/types/tracking';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const isGetLoading = ref(false);
const isCreateLoading = ref(false);
const trackingResponse = ref<TrackingResponse | null>(null);
const trackingNumber = ref((route.query.trackingNumber as string) || '');

const favoriteTrackings = computed(() => userStore.user?.trackings.filter(item => item.isFavorite) ?? []);

const loadTracking = (): void => {
  const trackingNumber = String(route.query.trackingNumber);

  isGetLoading.value = true;
  TrackingService.getTracking(trackingNumber)
    .then(response => (trackingResponse.value = response))
    .catch(error => toast.error(error))
    .finally(() => (isGetLoading.value = false));
};

const handleCreateTrack = (): void => {
  isCreateLoading.value = true;

  TrackingService.createTracking(trackingNumber.value)
    .then(() => router.push({ query: { trackingNumber: trackingNumber.value } }))
    .then(loadTracking)
    .catch(error => toast.error(error))
    .finally(() => (isCreateLoading.value = false));
};

const handleRedirect = (newTrackingNumber: string): void => {
  trackingNumber.value = newTrackingNumber;
  router.push({ query: { trackingNumber: newTrackingNumber } }).then(loadTracking);
};

onBeforeMount(() => {
  if (!route.query.trackingNumber) return;
  loadTracking();
});
</script>

<template>
  <div class="wrapper">
    <AppLoader v-if="isGetLoading" />

    <h1>Трекінг посилки {{ route.query.trackingNumber }}</h1>

    <Card>
      <template #title>
        <h5>Введіть номер посилки:</h5>
      </template>
      <template #content>
        <div class="container">
          <InputText class="input" v-model="trackingNumber" placeholder="Номер посилки" size="large" />
          <Button size="large" label="Відстежити" :loading="isCreateLoading" @click="handleCreateTrack" />
        </div>

        <div class="favorite">
          <Button
            v-for="item in favoriteTrackings"
            :key="item.id"
            :label="item.trackingNumber"
            size="small"
            @click="handleRedirect(item.trackingNumber)"
          />
        </div>
      </template>
    </Card>

    <TrackingCard v-if="trackingResponse" :trackingResponse="trackingResponse" />

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
  gap: 1rem;
}

.favorite {
  margin-top: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.input {
  flex: 1;
}
</style>
