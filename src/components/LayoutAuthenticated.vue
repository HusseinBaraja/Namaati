<script setup>
import Sidebar from "@/components/Sidebar.vue";
import FooterBar from "@/components/FooterBar.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation Bar Here-->

      <!-- Main Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <slot />
      </main>

      <!-- Footer -->
      <FooterBar>
        Namaati. All rights reserved
        <!--        <a target="_blank" class="text-blue-600">-->
        <!--          test</a-->
      </FooterBar>
    </div>
  </div>
</template>
