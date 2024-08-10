<script setup>
import BaseLevel from "@/components/BaseComponents/BaseLevel.vue";
import NamaatiLogo from "@/components/Images/NamaatiLogo.vue";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6 xl:max-w-6xl xl:mx-auto">
    <BaseLevel>
      <div class="text-center md:text-left">
        &copy;{{ year }},
        <slot />
      </div>
      <div class="md:py-2">
        <a href="">
          <NamaatiLogo class="w-auto h-8 md:h-6" />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
