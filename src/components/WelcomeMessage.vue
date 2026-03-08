<template>
  <div
    v-if="visible"
    class="animate-fade-slide-in mb-6 rounded-xl overflow-hidden shadow-md"
  >
    <div
      class="px-6 py-5 flex items-center justify-between gap-4"
      :class="isDark
        ? 'bg-gradient-to-r from-primary-800 to-primary-700'
        : 'bg-gradient-to-r from-primary-700 to-primary-500'"
    >
      <!-- Left: text -->
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium uppercase tracking-widest text-accent-300 mb-1">
          {{ greeting }}, {{ authStore.user?.name?.split(' ')[0] }} 👋
        </p>
        <h2 class="text-xl font-bold text-white truncate">{{ title }}</h2>
        <p class="text-sm text-primary-100 mt-1">{{ subtitle }}</p>
      </div>

      <!-- Right: date badge + dismiss -->
      <div class="flex flex-col items-end gap-2 flex-shrink-0">
        <div class="bg-white bg-opacity-15 rounded-lg px-3 py-1.5 text-center">
          <p class="text-white text-xs font-semibold">{{ dateFormatted }}</p>
          <p class="text-accent-200 text-xs">{{ timeFormatted }}</p>
        </div>
        <button
          @click="visible = false"
          class="text-primary-200 hover:text-white transition text-xs"
          aria-label="Dismiss"
        >✕ dismiss</button>
      </div>
    </div>

    <!-- Subtle accent bar -->
    <div class="h-1 bg-gradient-to-r from-accent-400 via-accent-300 to-primary-300"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const props = defineProps({
  title:    { type: String, default: "Welcome to TimeOff Hub" },
  subtitle: { type: String, default: "Here's an overview of your leave requests." },
})

const authStore  = useAuthStore()
const themeStore = useThemeStore()
const isDark     = computed(() => themeStore.isDark)

const visible = ref(false)

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
})

const dateFormatted = computed(() =>
  new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
)

const timeFormatted = computed(() =>
  new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
)

// Animate in after a tiny delay so the transition is visible
onMounted(() => {
  setTimeout(() => { visible.value = true }, 80)
})
</script>
