<script setup>
import { mdiCog } from "@mdi/js";
import { useSlots, computed } from "vue";
import BaseIcon from "@/components/Images/BaseIcon.vue";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import IconRounded from "@/components/fragments/IconRounded.vue";

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  main: Boolean,
  color: {
    type: String,
    default: null,
  },
  buttonIcon: {
    type: String,
    default: mdiCog,
  },
});

const hasSlot = computed(() => useSlots().default);
</script>

<template>
  <section
    :class="{ 'pt-6': !main }"
    class="mb-6 flex items-center justify-between"
  >
    <div class="flex items-center justify-start">
      <IconRounded
        v-if="icon && main"
        :icon="icon"
        :color="color || 'light'"
        class="mr-3"
        bg
      />
      <BaseIcon
        v-else-if="icon"
        :path="icon"
        class="mr-2"
        size="26"
        :color="color"
      />
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
    <BaseButton
      v-else
      :icon="buttonIcon"
      color="transparent"
      :outline="false"
    />
  </section>
</template>
