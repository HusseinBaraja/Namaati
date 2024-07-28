<template>
  <span :style="style">{{ displayedText }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  text: String,
  delay: {
    type: Number,
    default: 50,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  initialAnimation: {
    type: Boolean,
    default: false,
  },
});

const displayedText = ref("");
const style = ref({
  whiteSpace: "nowrap",
  overflow: "hidden",
  display: "inline-block",
});

const typeText = async (text) => {
  for (let i = 0; i <= text.length; i++) {
    displayedText.value = text.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, props.delay));
  }
};

const deleteText = async () => {
  const text = displayedText.value;
  for (let i = text.length; i >= 0; i--) {
    displayedText.value = text.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, props.delay));
  }
};

onMounted(() => {
  if (props.initialAnimation && props.isVisible) {
    typeText(props.text);
  } else {
    displayedText.value = props.text;
  }
});

watch(
  () => props.text,
  async (newText) => {
    if (props.isVisible) {
      await typeText(newText);
    } else {
      displayedText.value = newText;
    }
  }
);

watch(
  () => props.isVisible,
  async (isVisible) => {
    if (!isVisible) {
      await deleteText();
    } else {
      await typeText(props.text);
    }
  }
);
</script>
