<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Uncomment Navbar if you want it -->
      <!-- <Navbar /> -->

      <!-- Main Content Area with RouterView -->
      <main class="flex-1 overflow-y-auto p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
