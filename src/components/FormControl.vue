<template>
  <div class="relative">
    <input
        v-if="type !== 'textarea' && type !== 'select'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :class="['py-2 w-full border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none', icon ? 'pl-10 pr-3' : 'pl-3 pr-3']"
        :placeholder="placeholder"
    />
    <textarea
        v-else-if="type === 'textarea'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="px-3 py-2 w-full h-24 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
        :placeholder="placeholder"
    ></textarea>
    <select
        v-if="type === 'select'"
        :value="modelValue.id"
        @change="$emit('update:modelValue', options.find(option => option.id === parseInt($event.target.value)))"
        class="px-3 py-2 w-full border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.label }}
      </option>
    </select>
    <svg v-if="icon" class="w-5 h-5 text-gray-500 absolute left-3 top-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path :d="icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Object],
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  }
});
defineEmits(['update:modelValue']);
</script>
