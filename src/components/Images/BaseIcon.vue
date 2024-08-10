<script setup>
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  w: {
    type: String,
    default: "w-7",
  },
  h: {
    type: String,
    default: "h-7",
  },
  size: {
    type: [String, Number],
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
});

const spanClass = computed(
  () => `inline-flex justify-center items-center ${props.w} ${props.h}`,
);

const iconSize = computed(() => props.size ?? 16);

const iconColor = computed(() =>
  props.color ? `text-${props.color}-500` : "text-current",
);
</script>

<template>
  <span :class="spanClass">
    <svg
      viewBox="0 0 24 24"
      :width="iconSize"
      :height="iconSize"
      :class="[iconColor, 'inline-block']"
    >
      <path fill="currentColor" :d="path" />
    </svg>
    <slot />
  </span>
</template>
