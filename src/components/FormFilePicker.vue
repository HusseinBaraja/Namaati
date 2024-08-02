<template>
  <div class="mb-6">
    <label class="block font-bold mb-2">{{ label }}</label>
    <div class="flex items-center">
      <label class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors">
        <span>Choose file</span>
        <input type="file" class="hidden" @change="handleFileUpload" />
      </label>
      <span v-if="modelValue" class="ml-3">{{ modelValue.name }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: File,
    default: null
  },
  label: {
    type: String,
    default: 'Upload'
  }
})

const emit = defineEmits(['update:modelValue'])

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  emit('update:modelValue', file)
}
</script>