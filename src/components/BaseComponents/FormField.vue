<script setup>
import { computed, useSlots } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  help: {
    type: String,
    default: null,
  },
  columns: {
    type: Number,
    default: 1,
  },
});

const slots = useSlots();

const wrapperClass = computed(() => {
  const base = ["grid gap-3"];
  const slotsLength = slots.default().length;

  if (slotsLength > 1) {
    base.push(`grid-cols-1 md:grid-cols-${props.columns}`);
  }

  return base;
});
</script>

<template>
  <div class="mb-6 last:mb-0">
    <label v-if="label" class="block font-bold mb-2">{{ label }}</label>
    <div :class="wrapperClass">
      <slot />
    </div>
    <div v-if="help" class="text-xs text-gray-500 dark:text-slate-400 mt-1">
      {{ help }}
    </div>
  </div>
</template>
