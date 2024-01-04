<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import Card from 'primevue/card';
import AppField from '@/components/AppField.vue';
import AppLoader from '@/components/AppLoader.vue';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

import CityService from '@/services/CityService/CityService';
import QueryService from '@/services/QueryService/QueryService';
import CalculatorCard from './CalculatorCard.vue';
import AppDescription from '@/components/AppDescription.vue';
import useToast from '@/composables/useToast';
import userStore from '@/stores/user.store';

import type { City } from '@/types/city';
import type { DeliveryType, QueryResponse } from '@/types/query';

export type CreateQueryFormValues = {
  senderCity: string;
  receiverCity: string;
  weight: number;
  width: number;
  height: number;
  length: number;
  accessedCost: number;
  deliveryType: DeliveryType;
};

const router = useRouter();
const route = useRoute();
const toast = useToast();

const isCitiesLoading = ref(false);
const isCreateLoading = ref(false);
const isGetLoading = ref(false);
const cities = ref<City[] | null>(null);
const queryResponses = ref<QueryResponse[] | null>(null);

const favoriteQueries = computed(() => userStore.user?.queries.filter(item => item.isFavorite) ?? []);

const sortedQueryResponses = computed<QueryResponse[]>(() => {
  if (!queryResponses.value) return [];
  return [...queryResponses.value].sort((a, b) => a.cost - b.cost) ?? [];
});

const deliveryTypes = [
  { id: 'WarehouseDoors', name: 'Склад-Двері' },
  { id: 'WarehouseWarehouse', name: 'Склад-Склад' },
  { id: 'DoorsWarehouse', name: 'Двері-Склад' },
  { id: 'DoorsDoors', name: 'Двері-Двері' },
];

const formValues = ref<Partial<CreateQueryFormValues>>({
  senderCity: '',
  receiverCity: '',
  weight: undefined,
  accessedCost: undefined,
  height: undefined,
  length: undefined,
  width: undefined,
  deliveryType: undefined,
});

const loadCities = (): void => {
  isCitiesLoading.value = true;

  CityService.getAllCities()
    .then(response => (cities.value = response))
    .catch(error => toast.error(error))
    .finally(() => (isCitiesLoading.value = false));
};

const loadQuery = (): void => {
  const queryId = String(route.query.queryId);

  isGetLoading.value = true;
  QueryService.getQuery(queryId)
    .then(response => {
      queryResponses.value = response;

      formValues.value = {
        senderCity: response[0].senderCity.id,
        receiverCity: response[0].receiverCity.id,
        weight: response[0].weight,
        accessedCost: response[0].accessedCost,
        height: response[0].height,
        length: response[0].length,
        width: response[0].width,
        deliveryType: response[0].deliveryType,
      };
    })
    .catch(error => toast.error(error))
    .finally(() => (isGetLoading.value = false));
};

const handleCreateQuery = (): void => {
  isCreateLoading.value = true;

  QueryService.createQuery(formValues.value)
    .then(response => router.push({ query: { queryId: response.id } }))
    .then(loadQuery)
    .catch(error => toast.error(error))
    .finally(() => (isCreateLoading.value = false));
};

const handleRedirect = (queryId: string): void => {
  router.push({ query: { queryId } }).then(loadQuery);
};

onBeforeMount(() => {
  loadCities();

  if (!route.query.queryId) return;
  loadQuery();
});
</script>

<template>
  <div class="wrapper">
    <AppLoader v-if="isGetLoading || isCitiesLoading" />

    <h1>Вартість Доставки</h1>

    <Card v-if="!isGetLoading && cities">
      <template #title>
        <h5>Введіть параметри посилки:</h5>
      </template>
      <template #content>
        <div class="container">
          <div class="city-wrapper">
            <AppField label="Звідки?">
              <Dropdown
                v-model="formValues.senderCity"
                :options="cities"
                optionLabel="name"
                optionValue="id"
                placeholder="Місто відправлення"
              />
            </AppField>

            <i class="arrow pi pi-arrow-right" />

            <AppField label="Куди?">
              <Dropdown
                v-model="formValues.receiverCity"
                :options="cities"
                optionLabel="name"
                optionValue="id"
                placeholder="Місто прибуття"
              />
            </AppField>
          </div>

          <AppField label="Як?">
            <Dropdown
              v-model="formValues.deliveryType"
              :options="deliveryTypes"
              optionLabel="name"
              optionValue="id"
              placeholder="Тип доставки"
            />
          </AppField>

          <div class="city-wrapper">
            <AppField label="Важке? (кг)">
              <InputNumber class="input" v-model="formValues.weight" placeholder="Вага" size="large" />
            </AppField>
            <AppField label="Дороге?">
              <InputNumber
                class="input"
                v-model="formValues.accessedCost"
                placeholder="Оціночна вартість"
                size="large"
              />
            </AppField>
          </div>

          <div class="city-wrapper">
            <AppField label="Широке? (см)">
              <InputNumber class="input" v-model="formValues.width" placeholder="Ширина" size="large" />
            </AppField>
            <AppField label="Високе? (см)">
              <InputNumber class="input" v-model="formValues.height" placeholder="Висота" size="large" />
            </AppField>
            <AppField label="Довге? (см)">
              <InputNumber class="input" v-model="formValues.length" placeholder="Довжина" size="large" />
            </AppField>
          </div>

          <Button size="large" label="Розрахувати" @click="handleCreateQuery" :loading="isCreateLoading" />

          <div class="favorite">
            <Button
              v-for="item in favoriteQueries"
              :key="item.id"
              :label="item.senderCity.name + ' -> ' + item.receiverCity.name"
              size="small"
              @click="handleRedirect(item.id)"
            />
          </div>
        </div>
      </template>
    </Card>

    <template v-if="sortedQueryResponses">
      <CalculatorCard
        v-for="queryResponse in sortedQueryResponses"
        :key="queryResponse.id"
        :queryResponse="queryResponse"
      />
    </template>

    <AppDescription />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: var(--primary-color);
  }
}

.city {
  flex: 1;

  &-wrapper {
    display: flex;
    align-items: flex-end;
    gap: 16px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.favorite {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.input {
  flex: 1;
}
</style>
