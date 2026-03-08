<template>
  <Transition name="loader-fade">
    <div v-if="visible" class="page-loader-overlay" :class="{ dark: isDark }">
      <div class="loader-inner">

        <!-- Crystal grid with inner zoom squares -->
        <div class="crystal-grid">
          <div class="crystal" v-for="i in 6" :key="i" :class="`crystal-${i}`">
            <div class="inner-square"></div>
          </div>
        </div>

        <!-- Pulsing glow orb -->
        <div class="glow-orb"></div>

        <!-- Text -->
        <p class="loader-text">
          Loading<span class="dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'

defineProps({ visible: { type: Boolean, default: false }})

const themeStore = useThemeStore()
const isDark     = computed(() => themeStore.isDark)
</script>

<style scoped>
/* ── Overlay ─────────────────────────────────────────────── */
.page-loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(236, 253, 245, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.page-loader-overlay.dark {
  background: rgba(6, 78, 59, 0.92);
}

/* ── Inner container ─────────────────────────────────────── */
.loader-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* ── Crystal grid (2×3) ──────────────────────────────────── */
.crystal-grid {
  display: grid;
  grid-template-columns: repeat(3, 72px);
  grid-template-rows:    repeat(2, 72px);
  gap: 10px;
}

/* ── Each crystal square ─────────────────────────────────── */
.crystal {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  animation: crystal-zoom 1.8s ease-in-out infinite;
}

/* Staggered delays per crystal */
.crystal-1 { animation-delay: 0s;    background: linear-gradient(135deg, #064e3b, #065f46); }
.crystal-2 { animation-delay: 0.18s; background: linear-gradient(135deg, #065f46, #047857); }
.crystal-3 { animation-delay: 0.36s; background: linear-gradient(135deg, #047857, #059669); }
.crystal-4 { animation-delay: 0.54s; background: linear-gradient(135deg, #059669, #10b981); }
.crystal-5 { animation-delay: 0.72s; background: linear-gradient(135deg, #10b981, #34d399); }
.crystal-6 { animation-delay: 0.90s; background: linear-gradient(135deg, #34d399, #a7f3d0); }

/* Crystal zoom-pulse animation */
@keyframes crystal-zoom {
  0%   { transform: scale(0.55); opacity: 0.4; border-radius: 14px; }
  30%  { transform: scale(1.08); opacity: 1;   border-radius: 18px; }
  55%  { transform: scale(0.92); opacity: 1;   border-radius: 12px; }
  75%  { transform: scale(1.03); opacity: 0.9; border-radius: 14px; }
  100% { transform: scale(0.55); opacity: 0.4; border-radius: 14px; }
}

/* ── Inner square: zooms IN inside each crystal ──────────── */
.inner-square {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 0 12px rgba(255,255,255,0.7);
  transform: translate(-50%, -50%) scale(0);
  animation: inner-zoom 1.8s ease-in-out infinite;
}

/* Inner zoom animation — small square grows inside the crystal */
@keyframes inner-zoom {
  0%   { transform: translate(-50%, -50%) scale(0);    opacity: 0; }
  25%  { transform: translate(-50%, -50%) scale(0.3);  opacity: 0.6; }
  50%  { transform: translate(-50%, -50%) scale(0.85); opacity: 1; }
  75%  { transform: translate(-50%, -50%) scale(0.45); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) scale(0);    opacity: 0; }
}

/* Stagger inner squares matching outer crystals */
.crystal-1 .inner-square { animation-delay: 0s; }
.crystal-2 .inner-square { animation-delay: 0.18s; }
.crystal-3 .inner-square { animation-delay: 0.36s; }
.crystal-4 .inner-square { animation-delay: 0.54s; }
.crystal-5 .inner-square { animation-delay: 0.72s; }
.crystal-6 .inner-square { animation-delay: 0.90s; }

/* ── Glow orb behind the grid ────────────────────────────── */
.glow-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160px;
  height: 160px;
  transform: translate(-50%, -56%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, transparent 70%);
  animation: orb-pulse 2.4s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}
@keyframes orb-pulse {
  0%, 100% { transform: translate(-50%, -56%) scale(0.8); opacity: 0.5; }
  50%       { transform: translate(-50%, -56%) scale(1.15); opacity: 1; }
}

/* ── Loading text ────────────────────────────────────────── */
.loader-text {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #047857;
}
.page-loader-overlay.dark .loader-text {
  color: #6ee7b7;
}

/* Animated dots */
.dots span {
  animation: dot-blink 1.2s infinite step-start;
}
.dots span:nth-child(1) { animation-delay: 0s; }
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes dot-blink {
  0%, 100% { opacity: 0; }
  50%       { opacity: 1; }
}

/* ── Overlay fade transition ─────────────────────────────── */
.loader-fade-enter-active { transition: opacity 0.2s ease; }
.loader-fade-leave-active { transition: opacity 0.4s ease; }
.loader-fade-enter-from,
.loader-fade-leave-to     { opacity: 0; }
</style>
