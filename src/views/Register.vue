<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <svg class="w-16 h-16 mx-auto mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path :d="icons.excavator" />
      </svg>
      <h1 class="text-2xl font-bold text-gray-800">Page under construction</h1>
      <p class="mt-2 text-gray-600">We're working hard to bring you this page soon. Stay tuned!</p>
    </div>
  </div>
</template>

<script>
import { icons } from '@/assets/icons';
import {defineComponent} from "vue";

export default defineComponent({
  computed: {
    icons() {
      return icons
    }
  }
})


</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
