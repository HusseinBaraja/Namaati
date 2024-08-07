<template>
  <div class="mb-6">
    <label class="block font-bold mb-2">{{ label }}</label>
    <slot></slot>
    <div v-if="help" class="text-xs text-gray-500 mt-1">{{ help }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  help: {
    type: String,
    default: ''
  }
})
</script>