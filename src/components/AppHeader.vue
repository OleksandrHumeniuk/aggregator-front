<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import InputText from 'primevue/inputtext';

import AuthService from '@/services/AuthService/AuthService';
import AppField from '@/components/AppField.vue';
import useToast from '@/composables/useToast';
import userStore from '@/stores/user.store';

const route = useRoute();
const toast = useToast();

const items = ref([
  {
    label: 'Трекінг',
    icon: 'pi pi-box',
    route: '/tracking',
  },
  {
    label: 'Вартість доставки',
    icon: 'pi pi-calculator',
    route: '/calculate',
  },
  {
    label: 'Про нас',
    icon: 'pi pi-question',
    route: '/about',
  },
]);

const isLoading = ref(false);
const isAuthDrawerOpen = ref(false);
const isRegisterFormOpen = ref(false);

const email = ref('');
const password = ref('');
const name = ref('');

const handleOpenLoginForm = (): void => {
  isAuthDrawerOpen.value = true;
  isRegisterFormOpen.value = false;
};

const handleRegisterFormOpen = (): void => {
  isAuthDrawerOpen.value = true;
  isRegisterFormOpen.value = true;
};

const handleLogin = (): void => {
  isLoading.value = true;
  AuthService.login(email.value, password.value)
    .then(userStore.loadUser)
    .then(() => (isAuthDrawerOpen.value = false))
    .catch(error => toast.error(error))
    .finally(() => (isLoading.value = false));
};

const handleRegister = (): void => {
  isLoading.value = true;
  AuthService.register(name.value, email.value, password.value)
    .then(userStore.loadUser)
    .then(() => (isAuthDrawerOpen.value = false))
    .catch(error => toast.error(error))
    .finally(() => (isLoading.value = false));
};

watch([isAuthDrawerOpen, isRegisterFormOpen], () => {
  email.value = '';
  password.value = '';
  name.value = '';
});
</script>

<template>
  <Menubar class="wrapper" breakpoint="960px" :model="items">
    <template #start>
      <RouterLink to="/tracking">
        <img width="100" src="/src/assets/logo.png" />
      </RouterLink>
    </template>

    <template #item="{ item, props }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a
          :class="['link', { activeLink: route.fullPath.includes(item.route) }]"
          :href="href"
          v-bind="props.action"
          @click="navigate"
        >
          <span>{{ item.label }}</span>
          <i :class="item.icon" />
        </a>
      </RouterLink>
    </template>

    <template #end>
      <RouterLink v-if="userStore.user" to="/profile">
        <Button class="button" label="Профіль" />
      </RouterLink>
      <Button v-else class="button" label="Увійти" @click="handleOpenLoginForm" />
    </template>
  </Menubar>

  <Sidebar class="sidebar" v-model:visible="isAuthDrawerOpen" position="right">
    <template #header>
      <h3>Аґрегатор</h3>
    </template>

    <div class="container">
      <img width="300" src="/src/assets/logo.png" />

      <h2 v-if="isRegisterFormOpen">Зареєструватись</h2>
      <h2 v-else>Увійти</h2>

      <form v-if="isRegisterFormOpen" class="form">
        <AppField label="Хто?"><InputText v-model="name" placeholder="Імʼя" size="large" /></AppField>
        <AppField label="Контакти?">
          <InputText v-model="email" placeholder="Пошта" size="large" />
        </AppField>
        <AppField label="Пароль?">
          <InputText v-model="password" placeholder="Пароль" type="password" size="large" />
        </AppField>
        <Button :loading="isLoading" label="Зареєструватись" size="large" @click="handleRegister" />
      </form>

      <form v-else class="form">
        <AppField label="Контакти?"><InputText v-model="email" placeholder="Пошта" size="large" /></AppField>
        <AppField label="Пароль?">
          <InputText v-model="password" placeholder="Пароль" type="password" size="large" />
        </AppField>
        <Button :loading="isLoading" label="Увійти" size="large" @click="handleLogin" />
      </form>

      <p v-if="isRegisterFormOpen" class="note">
        Вже є аккаунт? <button @click="handleOpenLoginForm">Зайдіть в нього звідси!</button>
      </p>
      <p v-else class="note">
        Немає аккаунту? <button @click="handleRegisterFormOpen">Створіть його прямо зараз!</button>
      </p>
    </div>
  </Sidebar>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  min-height: 80px;
  margin: auto;
  background-color: unset;
  border: 0;
}

.link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.activeLink {
  color: var(--primary-color);
  outline: 1px solid var(--primary-color);
  border-radius: 8px;
}

.button {
  width: 140px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 16px;
}

.note {
  font-size: 14px;
  color: var(--gray-400);

  button {
    padding: 0;
    color: var(--primary-color);
    font-weight: 600;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
}
</style>

<style>
.p-sidebar {
  width: 450px;
}

.p-menubar-end {
  margin: 0;
}

.p-menuitem {
  padding: 8px;
}
</style>
