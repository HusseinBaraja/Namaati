<template>
  <component
      :is="tag"
      :class="buttonClasses"
      :type="nativeType"
      v-bind="$attrs"
      @click="$emit('click', $event)"
  >
    <span><slot /></span>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  nativeType: { type: String, default: 'button', validator: (value) => ['button', 'submit', 'reset'].includes(value) },
  outline: { type: Boolean, default: true },
  size: { type: String, default: null, validator: (value) => [null, 'tiny', 'small', 'large', 'huge'].includes(value) },
  tag: { type: String, default: 'button', validator: (value) => ['button', 'a', 'input', 'router-link', 'nuxt-link', 'n-link', 'NuxtLink', 'NLink'].includes(value) },
  text: { type: Boolean, default: true },
  theme: { type: String, default: 'primary', validator: (value) => ['white', 'black', 'primary', 'secondary'].includes(value) },
});

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center font-medium rounded-md',
    props.size === 'tiny' ? 'text-xs py-1 px-2' : '',
    props.size === 'small' ? 'text-sm py-2 px-3' : '',
    props.size === 'large' ? 'text-lg py-3 px-4' : '',
    props.size === 'huge' ? 'text-xl py-4 px-5' : '',
    props.block ? 'w-full' : '',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
    props.loading ? 'relative pointer-events-none' : '',
    props.outline ? `border-2 border-${props.theme} text-${props.theme}` : '',
    props.text ? `bg-transparent text-${props.theme}` : '',
    !props.outline && !props.text ? `bg-${props.theme} text-white` : '',
  ];
});
</script>

<style scoped>
/* Additional loading spinner styles */
.loading-spinner {
  animation: spin 0.5s infinite linear;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-top-color: transparent;
  height: 1em;
  width: 1em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
