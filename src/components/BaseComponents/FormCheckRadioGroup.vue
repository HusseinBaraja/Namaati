<template>
  <div class="mb-6">
    <label class="block font-bold mb-2">{{ label }}</label>
    <div class="flex flex-wrap -mb-3">
      <label v-for="(value, key) in options" :key="key" class="inline-flex items-center mr-6 mb-3">
        <input
            :type="type === 'switch' ? 'checkbox' : type"
            :checked="isChecked(key)"
            @change="updateValue(key)"
            :class="[
            'h-5 w-5',
            type === 'checkbox' || type === 'switch' ? 'form-checkbox' : 'form-radio',
            'text-blue-600'
          ]"
        />
        <span class="ml-2">{{ value }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Array, String],
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'checkbox'
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isChecked = (key) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(key)
  }
  return props.modelValue === key
}

const updateValue = (key) => {
  if (props.type === 'radio') {
    emit('update:modelValue', key)
  } else {
    const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = newValue.indexOf(key)
    if (index === -1) {
      newValue.push(key)
    } else {
      newValue.splice(index, 1)
    }
    emit('update:modelValue', newValue)
  }
}
</script>