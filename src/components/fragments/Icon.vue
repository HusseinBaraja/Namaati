<template>
  <svg
    class="text-gray-500 w-full h-full"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path :d="icon" />
  </svg>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>
