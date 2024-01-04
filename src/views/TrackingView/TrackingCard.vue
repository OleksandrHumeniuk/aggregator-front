<script setup lang="ts">
import Card from 'primevue/card';
import Divider from 'primevue/divider';

import formatDate from '@/utils/formatDate';

import type { TrackingResponse } from '@/types/tracking';

export type Props = {
  trackingResponse: TrackingResponse;
};

const props = defineProps<Props>();

const handleFormatMessage = (message: string): string => {
  if (message.includes('.')) return message.split('.')[1];

  return message;
};
</script>

<template>
  <div>
    <Card v-if="props.trackingResponse.checkpoints.length">
      <template v-if="props.trackingResponse.senderCountry && props.trackingResponse.receiverCountry" #title>
        {{ props.trackingResponse.senderCountry }} -> {{ props.trackingResponse.receiverCountry }}
      </template>

      <template #content>
        <div v-for="item in trackingResponse.checkpoints" :key="item.message">
          <p>
            <span class="date">{{ formatDate(item.checkpointTime) }} </span>
            {{ item.location }}:
            {{ handleFormatMessage(item.message) }}
          </p>
          <Divider />
        </div>
      </template>
    </Card>

    <Card v-else class="placeholder">
      <template #content>
        <img width="300" src="/src/assets/not-found.png" />
        <h2>Інформація про посилку відсутня!</h2>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
}

h2 {
  margin-top: 32px;
  color: var(--blue-400);
}

.date {
  font-weight: 600;
  color: var(--primary-color);
}
</style>
