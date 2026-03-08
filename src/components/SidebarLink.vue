<template>
  <router-link
    :to="to"
    :title="collapsed ? tooltip : ''"
    :class="[
      'group flex items-center gap-3 rounded-xl transition-all duration-150 relative',
      collapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3',
      'text-primary-100 dark:text-gray-400',
      'hover:bg-primary-600 dark:hover:bg-gray-700 hover:text-white hover:shadow-md',
    ]"
    active-class="!bg-accent-500 !text-primary-900 font-bold shadow-lg"
    @click="$emit('click')"
  >
    <!-- Icon -- always visible -->
    <span class="flex-shrink-0 transition-transform group-hover:scale-110">
      <slot name="icon" />
    </span>

    <!-- Label — hidden when collapsed -->
    <transition name="fade-text">
      <span
        v-if="!collapsed"
        class="text-sm font-medium whitespace-nowrap overflow-hidden"
      >{{ label }}</span>
    </transition>

    <!-- Active pill dot -->
    <span
      v-if="isActive && collapsed"
      class="absolute right-2 top-2 w-2 h-2 rounded-full bg-accent-400"
    ></span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to:        { type: String, required: true },
  label:     { type: String, required: true },
  tooltip:   { type: String, default: '' },
  collapsed: { type: Boolean, default: false },
})

defineEmits(['click'])

const route    = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<style scoped>
.fade-text-enter-active,
.fade-text-leave-active {
  transition: opacity 0.15s ease, max-width 0.3s ease;
  max-width: 200px;
  overflow: hidden;
}
.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
  max-width: 0;
}
</style>
