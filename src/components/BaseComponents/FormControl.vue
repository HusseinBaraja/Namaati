<script setup>
import { computed } from "vue";
import FormControlIcon from "@/components/BaseComponents/FormControlIcon.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  required: Boolean,
  transparent: Boolean,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const inputElClass = computed(() => {
  const base = [
    "px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full",
    "dark:placeholder-gray-400",
    computedType.value === "textarea" ? "h-24" : "h-12",
    "border",
    props.transparent ? "bg-transparent" : "bg-white dark:bg-slate-800",
  ];

  if (props.icon) {
    base.push("pl-10");
  }

  if (props.disabled) {
    base.push("opacity-50 cursor-not-allowed");
  }

  return base;
});

const computedType = computed(() => (props.options ? "select" : props.type));

const controlIconH = computed(() =>
  props.type === "textarea" ? "h-full" : "h-12",
);

const handleInput = (event) => {
  const value = event.target.value;
  emit("update:modelValue", value);
};

const getOptionValue = (option) => {
  return typeof option === 'object' ? option.id : option;
};

const getOptionLabel = (option) => {
  return typeof option === 'object' ? option.label : option;
};
</script>

<template>
  <div class="relative">
    <select
      v-if="computedType === 'select'"
      :id="id"
      :name="name"
      :class="inputElClass"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @change="handleInput"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
    <textarea
      v-else-if="computedType === 'textarea'"
      :id="id"
      :class="inputElClass"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="handleInput"
    ></textarea>
    <input
      v-else
      :id="id"
      :name="name"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      :type="computedType"
      :class="inputElClass"
      :disabled="disabled"
      :value="modelValue"
      @input="handleInput"
    />
    <FormControlIcon v-if="icon" :icon="icon" :h="controlIconH" />
  </div>
</template>
