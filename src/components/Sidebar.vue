"
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import logoImage from "@/assets/img/logo.png";
import { icons } from "@/assets/icons.js";
import TypewriterEffect from "@/components/Animation/TypewriterEffect.vue";

const router = useRouter();

const t = (key) => key;

const items = [
  { type: "subheader", title: t("apps") },
  {
    title: t("Home"),
    props: {
      prependIcon: icons.home,
      link: true,
      to: "/",
      exact: true,
    },
    value: "/",
  },
  {
    title: t("Register"),
    props: {
      prependIcon: icons.register,
      link: true,
      to: "/register",
      exact: true,
    },
    value: "/register",
  },
  // ... (other menu items)
];

const drawerProps = reactive({
  rail: false,
  railWidth: 256,
  icon: icons.arrowLeft,
  isSettling: false,
});

const initialLoad = ref(true);

const subheaderProps = reactive({
  transitionDuration: 10,
  transitionDelay: 300,
  isSettling: false,
});

const menuItemProps = reactive({
  transitionDuration: 300,
  transitionDelay: 0,
  isSettling: false,
});

const handleDrawerWidth = () => {
  drawerProps.isSettling = true;
  subheaderProps.isSettling = true;
  menuItemProps.isSettling = true;

  drawerProps.rail = !drawerProps.rail;
  drawerProps.icon =
    drawerProps.railWidth === 256 ? icons.arrowRight : icons.arrowLeft;

  // Use setTimeout to change the railWidth after a short delay
  setTimeout(() => {
    drawerProps.railWidth = drawerProps.railWidth === 64 ? 256 : 64;
  }, 10);

  // Reset isSettling for menu items
  setTimeout(() => {
    menuItemProps.isSettling = false;
  }, menuItemProps.transitionDuration + menuItemProps.transitionDelay + 10);

  // Reset isSettling for subheader
  setTimeout(() => {
    subheaderProps.isSettling = false;
  }, subheaderProps.transitionDuration + subheaderProps.transitionDelay + 10);

  // Reset isSettling for drawer
  setTimeout(() => {
    drawerProps.isSettling = false;
  }, Math.max(menuItemProps.transitionDuration + menuItemProps.transitionDelay, subheaderProps.transitionDuration + subheaderProps.transitionDelay) + 20);
};

const menus = computed(() => items); // Always return all items

const isActiveLink = computed(() => {
  const currentPath = router.currentRoute.value.path;
  return (path) => currentPath === path;
});

onMounted(() => {
  setTimeout(() => {
    initialLoad.value = false;
  }, 1000);
});
</script>

<template>
  <nav
    :class="[
      'bg-gray-100 border-r border-gray-200 transition-all duration-300 ease-in-out h-screen relative',
      {
        'w-64': drawerProps.railWidth === 256,
        'w-28': drawerProps.railWidth === 64, // Changed from w-28 to w-16 for tighter layout
      },
    ]"
  >
    <div class="mx-auto px-2 sm:px-4 lg:px-6">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <!-- Logo -->
          <div class="flex flex-shrink-0 items-center">
            <img :src="logoImage" class="h-16 w-16" alt="Logo" />
            <TypewriterEffect
              v-if="
                drawerProps.railWidth === 256 || drawerProps.railWidth === 64
              "
              class="hidden sm:block text-gray-800 text-xl font-bold ml-2"
              :text="'Namaati'"
              :delay="30"
              :isVisible="drawerProps.railWidth === 256"
              :initialAnimation="initialLoad"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="px-2 sm:px-4 lg:px-6 mt-4">
      <div class="flex flex-col space-y-1">
        <template v-for="(item, index) in menus" :key="index">
          <div
            v-if="item.type === 'subheader'"
            class="px-3 py-2 text-xs font-medium text-gray-500 uppercase transition-all"
            :style="{
              transitionDuration: `${subheaderProps.transitionDuration}ms`,
              transitionDelay: `${subheaderProps.transitionDelay}ms`,
            }"
            :class="{
              'text-center':
                drawerProps.railWidth === 64 && !subheaderProps.isSettling,
              'text-left':
                drawerProps.railWidth === 256 || subheaderProps.isSettling,
            }"
          >
            <TypewriterEffect
              :text="item.title"
              :delay="50"
              :isVisible="true"
              :initialAnimation="initialLoad"
            />
          </div>
          <div
            v-else
            class="h-10 relative transition-all"
            :style="{
              transitionDuration: `${menuItemProps.transitionDuration}ms`,
              transitionDelay: `${menuItemProps.transitionDelay}ms`,
            }"
          >
            <RouterLink
              :to="item.props.to"
              class="absolute inset-0 flex items-center rounded-md transition-colors duration-300"
              :class="[
                isActiveLink(item.props.to)
                  ? 'bg-gray-300 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
              ]"
            >
              <div
                class="flex-shrink-0 w-6 h-6 transition-all duration-300 ease-in-out"
                :class="{
                  'absolute left-3':
                    drawerProps.railWidth === 256 || menuItemProps.isSettling,
                  'relative left-1/2 transform -translate-x-1/2':
                    drawerProps.railWidth === 64 && !menuItemProps.isSettling,
                }"
              >
                <svg
                  class="text-gray-500 w-full h-full"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path :d="item.props.prependIcon" />
                </svg>
              </div>
              <TypewriterEffect
                v-if="
                  drawerProps.railWidth === 256 || drawerProps.railWidth === 64
                "
                class="ml-9 transition-all duration-300 ease-in-out absolute left-2"
                :class="{ 'opacity-0': drawerProps.railWidth === 64 }"
                :text="item.title"
                :delay="50"
                :isVisible="drawerProps.railWidth === 256"
                :initialAnimation="initialLoad"
              />
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
    <button
      @click="handleDrawerWidth"
      class="absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full w-14 h-14 shadow-md hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
      :style="{
        right: drawerProps.railWidth === 256 ? '-29px' : '-29px',
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-500"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          :d="drawerProps.icon"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>
  </nav>
</template>
