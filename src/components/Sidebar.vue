<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import logoImage from "@/assets/img/logo.png";
import { icons } from "@/assets/icons.js";
import TypewriterEffect from "@/components/Animation/TypewriterEffect.vue";
import Icon from "@/components/fragments/Icon.vue";

const router = useRouter();
const { t, locale } = useI18n();

const items = computed(() => [
  { type: "subheader", title: t("sidebar.apps") },
  {
    title: t("sidebar.home"),
    props: {
      prependIcon: icons.home,
      link: true,
      to: "/",
      exact: true,
    },
    value: "/",
  },
  {
    title: t("sidebar.register"),
    props: {
      prependIcon: icons.register,
      link: true,
      to: "/register",
      exact: true,
    },
    value: "/register",
  },
  // ... (other menu items)
]);

const drawerProps = reactive({
  rail: false,
  railWidth: 256,
  icon: icons.arrowLeft,
  isSettling: false,
});

const initialLoad = ref(true);

const subheaderProps = reactive({
  transitionDuration: 10,
  transitionDelay: 0,
  isSettling: false,
});

const menuItemProps = reactive({
  transitionDuration: 100,
  transitionDelay: 0,
  isSettling: false,
});

const handleDrawerWidth = () => {
  drawerProps.isSettling = true;
  subheaderProps.isSettling = true;
  menuItemProps.isSettling = true;

  drawerProps.rail = !drawerProps.rail;
  drawerProps.icon =
    drawerProps.railWidth === 256
      ? isRTL.value
        ? icons.arrowLeft
        : icons.arrowRight
      : isRTL.value
        ? icons.arrowRight
        : icons.arrowLeft;

  // Use setTimeout to change the railWidth after a short delay
  setTimeout(() => {
    drawerProps.railWidth = drawerProps.railWidth === 64 ? 256 : 64;
  }, 10);

  // Reset isSettling for menu items
  setTimeout(
    () => {
      menuItemProps.isSettling = false;
    },
    menuItemProps.transitionDuration + menuItemProps.transitionDelay + 10,
  );

  // Reset isSettling for subheader
  setTimeout(
    () => {
      subheaderProps.isSettling = false;
    },
    subheaderProps.transitionDuration + subheaderProps.transitionDelay + 10,
  );

  // Reset isSettling for drawer
  setTimeout(
    () => {
      drawerProps.isSettling = false;
    },
    Math.max(
      menuItemProps.transitionDuration + menuItemProps.transitionDelay,
      subheaderProps.transitionDuration + subheaderProps.transitionDelay,
    ) + 20,
  );
};

const menus = computed(() => items.value); // Always return all items

const isActiveLink = computed(() => {
  const currentPath = router.currentRoute.value.path;
  return (path) => currentPath === path;
});

const isRTL = computed(() => locale.value === "ar");
const emit = defineEmits(["changeLanguage"]);

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "ar" : "en";
  document.documentElement.dir = isRTL.value ? "rtl" : "ltr";
  emit("changeLanguage", locale.value);
};

onMounted(() => {
  setTimeout(() => {
    initialLoad.value = false;
  }, 1000);
});

// LTR icon animation settings
const ltrIconSettings = reactive({
  expandedPosition: "left-3",
  collapsedPosition: "left-1/3",
  collapsedTransform: "-translate-x-1/2",
  transitionDuration: 300,
  transitionTimingFunction: "ease-in-out",
});

// RTL icon animation settings
const rtlIconSettings = reactive({
  expandedPosition: "right-3", // Starting position when sidebar is expanded
  collapsedPosition: "right-1/3", // Ending position when sidebar is collapsed
  collapsedTransform: "translate-x-1/2", // Transform for collapsed state
  transitionDuration: 300, // in milliseconds
  transitionTimingFunction: "ease-in-out",
});

// LTR subheader settings
const ltrSubheaderSettings = reactive({
  expandedPosition: "-40%",
  collapsedPosition: "0%",
  transitionDuration: 300,
  transitionTimingFunction: "ease-in-out",
});

// RTL subheader settings
const rtlSubheaderSettings = reactive({
  expandedPosition: "39%",
  collapsedPosition: "0%",
  transitionDuration: 300,
  transitionTimingFunction: "ease-in-out",
});
</script>

<template>
  <nav
    :class="[
      'bg-gray-100 border-gray-200 transition-all duration-300 ease-in-out h-screen relative flex flex-col',
      {
        'w-64': drawerProps.railWidth === 256,
        'w-24': drawerProps.railWidth === 64,
      },
      isRTL ? 'border-l' : 'border-r',
    ]"
    :dir="isRTL ? 'rtl' : 'ltr'"
  >
    <!-- Logo Section -->
    <div class="p-4">
      <div class="flex items-center">
        <img :src="logoImage" class="h-16 w-16" alt="Logo" />
        <TypewriterEffect
          v-if="drawerProps.railWidth === 256 || drawerProps.railWidth === 64"
          class="hidden sm:block text-gray-800 text-xl font-bold ms-2"
          :text="'Namaati'"
          :delay="30"
          :isVisible="drawerProps.railWidth === 256"
          :initialAnimation="initialLoad"
        />
      </div>
    </div>

    <!-- Menu Items -->
    <div class="flex-grow overflow-y-auto">
      <div class="px-2 py-4">
        <template v-for="(item, index) in menus" :key="index">
          <div
            v-if="item.type === 'subheader'"
            class="py-2 text-xs font-medium text-gray-500 uppercase relative h-6 overflow-hidden"
          >
            <div
              class="absolute w-full text-center transition-all whitespace-nowrap"
              :style="{
                transitionDuration: `${isRTL ? rtlSubheaderSettings.transitionDuration : ltrSubheaderSettings.transitionDuration}ms`,
                transitionTimingFunction: isRTL
                  ? rtlSubheaderSettings.transitionTimingFunction
                  : ltrSubheaderSettings.transitionTimingFunction,
                transform: `translateX(${
                  drawerProps.railWidth === 256 || subheaderProps.isSettling
                    ? isRTL
                      ? rtlSubheaderSettings.expandedPosition
                      : ltrSubheaderSettings.expandedPosition
                    : isRTL
                      ? rtlSubheaderSettings.collapsedPosition
                      : ltrSubheaderSettings.collapsedPosition
                })`,
                right: isRTL ? '0' : 'auto',
                left: isRTL ? 'auto' : '0',
              }"
            >
              <TypewriterEffect
                :text="item.title"
                :delay="50"
                :isVisible="true"
                :initialAnimation="initialLoad"
              />
            </div>
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
                isRTL ? 'flex-row-reverse' : '',
              ]"
            >
              <div
                class="flex-shrink-0 w-6 h-6"
                :class="{
                  absolute: true,
                  [isRTL
                    ? rtlIconSettings.expandedPosition
                    : ltrIconSettings.expandedPosition]:
                    drawerProps.railWidth === 256 || menuItemProps.isSettling,
                  [isRTL
                    ? rtlIconSettings.collapsedPosition
                    : ltrIconSettings.collapsedPosition]:
                    drawerProps.railWidth === 64 && !menuItemProps.isSettling,
                }"
                :style="{
                  transition: `all ${isRTL ? rtlIconSettings.transitionDuration : ltrIconSettings.transitionDuration}ms
                    ${isRTL ? rtlIconSettings.transitionTimingFunction : ltrIconSettings.transitionTimingFunction}`,
                  transform:
                    drawerProps.railWidth === 64 && !menuItemProps.isSettling
                      ? isRTL
                        ? rtlIconSettings.collapsedTransform
                        : ltrIconSettings.collapsedTransform
                      : 'none',
                }"
              >
                <Icon :icon="item.props.prependIcon" />
              </div>
              <TypewriterEffect
                v-if="
                  drawerProps.railWidth === 256 || drawerProps.railWidth === 64
                "
                :class="[
                  'transition-all duration-300 ease-in-out absolute',
                  { 'opacity-0': drawerProps.railWidth === 64 },
                  isRTL ? 'right-11' : 'left-11',
                ]"
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

    <!-- Language toggle button -->
    <div class="p-4 mt-auto">
      <button
        @click="toggleLanguage"
        class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        {{ isRTL ? "En" : "ع" }}
      </button>
    </div>

    <!-- Drawer toggle button -->
    <button
      @click="handleDrawerWidth"
      class="absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full w-14 h-14 shadow-md hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
      :class="[
        isRTL
          ? drawerProps.railWidth === 256
            ? 'start-full -ms-7' // For Arabic, when sidebar is expanded
            : 'start-full -ms-7' // For Arabic, when sidebar is collapsed
          : '-end-7', // For English, keep the current positioning
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-500"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          :d="
            isRTL
              ? drawerProps.icon === icons.arrowLeft
                ? icons.arrowRight
                : icons.arrowLeft
              : drawerProps.icon
          "
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </button>
  </nav>
</template>
