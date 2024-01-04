<script setup lang="ts">
import { computed } from 'vue';
import Card from 'primevue/card';

import type { QueryResponse } from '@/types/query';

export type Props = {
  queryResponse: QueryResponse;
};

const props = defineProps<Props>();

const providerLogo = computed<string>(() => {
  switch (props.queryResponse.provider) {
    case 'NovaPoshta':
      return '/src/assets/nova-poshta.png';
    case 'UkrPoshta':
      return '/src/assets/ukr-poshta.png';
    case 'Delivery':
      return '/src/assets/delivery.png';
    default:
      return '';
  }
});

const providerUrl = computed<string>(() => {
  switch (props.queryResponse.provider) {
    case 'NovaPoshta':
      return 'https://novaposhta.ua/';
    case 'UkrPoshta':
      return 'https://ukrposhta.ua/';
    case 'Delivery':
      return 'https://delivery-auto.com/';
    default:
      return '';
  }
});
</script>

<template>
  <Card>
    <template #content>
      <div class="body">
        <div class="container">
          <img :src="providerLogo" alt="provider logo" width="100" />
          <h2 class="cost">{{ props.queryResponse.cost }}₴</h2>
        </div>
        <a class="p-button link" :href="providerUrl" target="_blank"> Перейти до сайту </a>
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

.link {
  text-decoration: none;
  font-weight: bold;
}
</style>
