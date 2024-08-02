<template>
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center">
      <div class="mr-3 bg-blue-100 text-blue-600 rounded-full p-2">
        <svg v-if="icon" class="w-8 h-8 text-blue-500 left-3 top-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path :d="icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </div>
      <h1 class="text-3xl leading-tight">{{ title }}</h1>
    </div>
    <button class="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors">
      Star on GitHub
    </button>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  }
})
</script>