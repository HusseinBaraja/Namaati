<template>
  <div :class="[color, 'p-4 mb-6 rounded-t-2xl -mx-6 -mt-6']">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    required: true
  }
})
</script>