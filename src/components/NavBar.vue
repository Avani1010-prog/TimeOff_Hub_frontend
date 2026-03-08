<template>
  <!-- ── Mobile backdrop ───────────────────────── -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
    @click="mobileOpen = false"
  ></div>

  <!-- ── Mobile hamburger ──────────────────────── -->
  <button
    class="fixed top-3 left-3 z-30 lg:hidden bg-primary-700 dark:bg-primary-800 text-white p-2.5 rounded-xl shadow-lg hover:bg-primary-600 transition"
    @click="mobileOpen = !mobileOpen"
    aria-label="Toggle menu"
  >
    <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    <svg v-else              xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
  </button>

  <!-- ── Sidebar ───────────────────────────────── -->
  <aside
    :class="[
      'fixed top-0 left-0 h-full flex flex-col z-20 shadow-2xl sidebar-transition',
      'bg-primary-800 dark:bg-gray-900',
      themeStore.sidebarCollapsed ? 'lg:w-20' : 'lg:w-72',
      mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72',
      'lg:translate-x-0',
    ]"
  >

    <!-- ══ BRAND ══════════════════════════════════ -->
    <div class="flex items-center gap-3 px-4 py-4 border-b border-primary-700 dark:border-gray-700 flex-shrink-0">
      <!-- Brand logo component -->
      <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow overflow-hidden">
        <BrandLogo :size="38" />
      </div>
      <transition name="fade-text">
        <div v-if="!themeStore.sidebarCollapsed" class="overflow-hidden">
          <p class="font-bold text-white text-[15px] leading-tight whitespace-nowrap">TimeOff Hub</p>
          <p class="text-accent-300 text-xs whitespace-nowrap">Leave Management</p>
        </div>
      </transition>
    </div>

    <!-- ══ NAV LINKS ═══════════════════════════════ -->
    <nav class="flex-1 overflow-y-auto py-4 px-2.5 space-y-1">
      <template v-if="authStore.isAuthenticated">
        <template v-if="authStore.isEmployee">
          <p v-if="!themeStore.sidebarCollapsed" class="text-accent-400 text-[10px] font-bold uppercase tracking-[0.15em] px-3 pt-1 pb-2">Employee</p>
          <SidebarLink to="/employee/dashboard" :collapsed="themeStore.sidebarCollapsed" label="My Leaves" tooltip="My Leaves" @click="mobileOpen = false">
            <template #icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg></template>
          </SidebarLink>
          <SidebarLink to="/employee/apply" :collapsed="themeStore.sidebarCollapsed" label="Apply for Leave" tooltip="Apply for Leave" @click="mobileOpen = false">
            <template #icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg></template>
          </SidebarLink>
        </template>

        <template v-if="authStore.isEmployer">
          <p v-if="!themeStore.sidebarCollapsed" class="text-accent-400 text-[10px] font-bold uppercase tracking-[0.15em] px-3 pt-1 pb-2">Employer</p>
          <SidebarLink to="/employer/dashboard" :collapsed="themeStore.sidebarCollapsed" label="All Leave Requests" tooltip="All Leave Requests" @click="mobileOpen = false">
            <template #icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></template>
          </SidebarLink>
        </template>
      </template>

      <template v-else>
        <SidebarLink to="/login"    :collapsed="themeStore.sidebarCollapsed" label="Login"    tooltip="Login"    @click="mobileOpen = false">
          <template #icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg></template>
        </SidebarLink>
        <SidebarLink to="/register" :collapsed="themeStore.sidebarCollapsed" label="Register"  tooltip="Register"  @click="mobileOpen = false">
          <template #icon><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg></template>
        </SidebarLink>
      </template>
    </nav>

    <!-- ══ BOTTOM SECTION ═════════════════════════ -->
    <div class="flex-shrink-0 border-t border-primary-700 dark:border-gray-700 px-2.5 py-3 space-y-1">

      <!-- Theme toggle -->
      <button
        @click="themeStore.toggleTheme()"
        :title="themeStore.isDark ? 'Switch to Light' : 'Switch to Dark'"
        :class="['w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group hover:bg-primary-700 dark:hover:bg-gray-700', themeStore.sidebarCollapsed ? 'justify-center' : '']"
      >
        <svg v-if="themeStore.isDark"  xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        <span v-if="!themeStore.sidebarCollapsed" class="text-sm text-primary-100 dark:text-gray-300 group-hover:text-white">
          {{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </button>

      <!-- User info + Logout -->
      <template v-if="authStore.isAuthenticated">
        <div :class="['flex items-center gap-3 px-3 py-2 rounded-xl', themeStore.sidebarCollapsed ? 'justify-center' : '']">
          <!-- Gendered avatar via component -->
          <GenderedAvatar
            :gender="authStore.user.gender || ''"
            :name="authStore.user.name || ''"
            :size="36"
          />

          <div v-if="!themeStore.sidebarCollapsed" class="overflow-hidden flex-1">
            <p class="text-sm font-semibold text-white truncate">{{ authStore.user.name }}</p>
            <p class="text-xs text-accent-300 capitalize">{{ authStore.user.role }}</p>
          </div>
        </div>

        <!-- Logout -->
        <button
          @click="logout"
          :class="['w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-primary-100 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-all group', themeStore.sidebarCollapsed ? 'justify-center' : '']"
          :title="themeStore.sidebarCollapsed ? 'Logout' : ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span v-if="!themeStore.sidebarCollapsed">Logout</span>
        </button>
      </template>

      <!-- Collapse toggle (desktop) -->
      <button
        class="hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-primary-300 dark:text-gray-500 hover:bg-primary-700 dark:hover:bg-gray-700 hover:text-white transition-all"
        :class="themeStore.sidebarCollapsed ? 'justify-center' : ''"
        @click="themeStore.toggleSidebar()"
        :title="themeStore.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <svg v-if="!themeStore.sidebarCollapsed" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
        <span v-if="!themeStore.sidebarCollapsed" class="text-sm">Collapse</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore }  from '../stores/auth'
import { useThemeStore } from '../stores/theme'
import { useRouter }     from 'vue-router'
import SidebarLink     from './SidebarLink.vue'
import BrandLogo       from './BrandLogo.vue'
import GenderedAvatar  from './GenderedAvatar.vue'

const authStore  = useAuthStore()
const themeStore = useThemeStore()
const router     = useRouter()
const mobileOpen = ref(false)

const initials = computed(() => {
  if (!authStore.user?.name) return '?'
  return authStore.user.name.split(' ').slice(0, 2).map(n => n[0].toUpperCase()).join('')
})

const logout = () => {
  authStore.logout()
  mobileOpen.value = false
  router.push('/login')
}
</script>

<style scoped>
.fade-text-enter-active,
.fade-text-leave-active {
  transition: opacity 0.2s, width 0.3s;
}
.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
  width: 0;
}
</style>
