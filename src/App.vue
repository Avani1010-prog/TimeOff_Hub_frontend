<template>
  <div class="min-h-screen flex">
    <!-- Crystal page-transition loader -->
    <PageLoader :visible="isLoading" />

    <!-- Sidebar -->
    <SideBar />

    <!-- Main content — offset matches sidebar width, transitions with it -->
    <div
      :class="[
        'flex-1 flex flex-col min-h-screen sidebar-transition',
        themeStore.sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72',
      ]"
    >
      <!-- Mobile spacer for hamburger button -->
      <div class="h-14 lg:hidden flex-shrink-0"></div>

      <main class="flex-1 p-5 lg:p-8">
        <router-view />
      </main>

      <!-- Proper footer component -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SideBar   from './components/NavBar.vue'
import PageLoader from './components/PageLoader.vue'
import AppFooter  from './components/AppFooter.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
const isDark     = computed(() => themeStore.isDark)
const year       = new Date().getFullYear()

// ── Page-transition loader ─────────────────────────────
const isLoading = ref(false)
const router    = useRouter()

// Minimum display time so the loader doesn't flash too quickly
const MIN_LOADER_MS = 600

router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, MIN_LOADER_MS)
})

// ── Initialise persisted theme on startup ──────────────
onMounted(() => {
  themeStore.initTheme()
})
</script>
