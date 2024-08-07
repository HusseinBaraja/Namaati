<template>
  <button
      :type="type"
      :class="[
      'px-4 py-2 rounded transition-colors',
      color === 'blue' ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
      color === 'white' && outline ? 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50' : ''
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  color: {
    type: String,
    default: 'blue'
  },
  outline: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  }
})
</script>