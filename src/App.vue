<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <!--    <Sidebar />-->

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Main Content Area with RouterView -->
      <RouterView />
    </div>
  </div>
</template>
