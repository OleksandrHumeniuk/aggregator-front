<script setup lang="ts">
export type Props = {
  label: string;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="field">
    <label>{{ props.label }}</label>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: var(--primary-color);
  }
}
</style>
