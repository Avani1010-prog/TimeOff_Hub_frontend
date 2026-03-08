<template>
  <div
    :style="{ width: size + 'px', height: size + 'px' }"
    class="rounded-full overflow-hidden flex-shrink-0 shadow"
  >
    <!-- Female avatar -->
    <svg v-if="gender === 'female'" :viewBox="vb" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <rect :width="d" :height="d" :rx="d/2" fill="#34d399"/>
      <!-- Long hair sides -->
      <rect :x="d*.28" :y="d*.35" :width="d*.08" :height="d*.32" :rx="d*.04" fill="#065f46"/>
      <rect :x="d*.64" :y="d*.35" :width="d*.08" :height="d*.32" :rx="d*.04" fill="#065f46"/>
      <!-- Hair top -->
      <ellipse :cx="d/2" :cy="d*.28" :rx="d*.22" :ry="d*.18" fill="#065f46"/>
      <!-- Face -->
      <circle :cx="d/2" :cy="d*.34" :r="d*.19" fill="#fde68a"/>
      <!-- Eyes -->
      <circle :cx="d*.42" :cy="d*.31" :r="d*.025" fill="#065f46"/>
      <circle :cx="d*.58" :cy="d*.31" :r="d*.025" fill="#065f46"/>
      <!-- Eyelashes -->
      <line :x1="d*.42" :y1="d*.285" :x2="d*.42" :y2="d*.27" stroke="#065f46" :stroke-width="d*.015" stroke-linecap="round"/>
      <line :x1="d*.58" :y1="d*.285" :x2="d*.58" :y2="d*.27" stroke="#065f46" :stroke-width="d*.015" stroke-linecap="round"/>
      <!-- Smile -->
      <path :d="`M${d*.43} ${d*.38} Q${d/2} ${d*.42} ${d*.57} ${d*.38}`" stroke="#065f46" :stroke-width="d*.025" stroke-linecap="round" fill="none"/>
      <!-- Shoulders / body -->
      <path :d="`M${d*.15} ${d} Q${d*.22} ${d*.7} ${d/2} ${d*.65} Q${d*.78} ${d*.7} ${d*.85} ${d}`" fill="#047857"/>
    </svg>

    <!-- Male avatar -->
    <svg v-else-if="gender === 'male'" :viewBox="vb" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <rect :width="d" :height="d" :rx="d/2" fill="#34d399"/>
      <!-- Short hair / cap -->
      <ellipse :cx="d/2" :cy="d*.26" :rx="d*.22" :ry="d*.14" fill="#065f46"/>
      <rect :x="d*.28" :y="d*.24" :width="d*.44" :height="d*.12" fill="#065f46"/>
      <!-- Face -->
      <circle :cx="d/2" :cy="d*.36" :r="d*.19" fill="#fde68a"/>
      <!-- Eyes -->
      <circle :cx="d*.42" :cy="d*.33" :r="d*.028" fill="#065f46"/>
      <circle :cx="d*.58" :cy="d*.33" :r="d*.028" fill="#065f46"/>
      <!-- Eyebrows (straighter for male) -->
      <line :x1="d*.37" :y1="d*.295" :x2="d*.47" :y2="d*.29" stroke="#065f46" :stroke-width="d*.02" stroke-linecap="round"/>
      <line :x1="d*.53" :y1="d*.29" :x2="d*.63" :y2="d*.295" stroke="#065f46" :stroke-width="d*.02" stroke-linecap="round"/>
      <!-- Smile -->
      <path :d="`M${d*.43} ${d*.4} Q${d/2} ${d*.44} ${d*.57} ${d*.4}`" stroke="#065f46" :stroke-width="d*.025" stroke-linecap="round" fill="none"/>
      <!-- Shoulders / body -->
      <path :d="`M${d*.12} ${d} Q${d*.2} ${d*.68} ${d/2} ${d*.63} Q${d*.8} ${d*.68} ${d*.88} ${d}`" fill="#047857"/>
    </svg>

    <!-- 'other' / unset → elegant initials -->
    <div
      v-else
      class="w-full h-full flex items-center justify-center font-bold bg-accent-300 text-primary-800"
      :style="{ fontSize: (size * 0.35) + 'px' }"
    >{{ initials }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  gender:  { type: String, default: '' },   // 'male' | 'female' | 'other' | ''
  name:    { type: String, default: '' },
  size:    { type: Number, default: 36 },   // px – drives SVG dimensions
})

// SVG viewBox + drawing dimension are always 100 so ratios work regardless of size
const d  = 100
const vb = computed(() => `0 0 ${d} ${d}`)

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() ?? '').join('')
})
</script>
