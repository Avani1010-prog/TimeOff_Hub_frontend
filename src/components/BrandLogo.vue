<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="40" height="40" rx="9" fill="#ecfdf5"/>
    <!-- Sun -->
    <circle cx="32" cy="9" r="3.5" fill="#fbbf24"/>
    <line x1="32" y1="3.5" x2="32" y2="2" stroke="#fbbf24" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="32" y1="16.5" x2="32" y2="15" stroke="#fbbf24" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="25.5" y1="9" x2="24" y2="9" stroke="#fbbf24" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="40" y1="9" x2="38.5" y2="9" stroke="#fbbf24" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="27.5" y1="4.5" x2="26.5" y2="3.5" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="36.5" y1="13.5" x2="37.5" y2="14.5" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
    <!-- Clock body -->
    <circle cx="26" cy="22" r="7.5" fill="white" stroke="#047857" stroke-width="1.8"/>
    <!-- Clock tick marks -->
    <line x1="26" y1="15.5" x2="26" y2="17" stroke="#047857" stroke-width="1" stroke-linecap="round"/>
    <line x1="26" y1="27" x2="26" y2="28.5" stroke="#047857" stroke-width="1" stroke-linecap="round"/>
    <line x1="19.5" y1="22" x2="21" y2="22" stroke="#047857" stroke-width="1" stroke-linecap="round"/>
    <line x1="31" y1="22" x2="32.5" y2="22" stroke="#047857" stroke-width="1" stroke-linecap="round"/>
    <!-- Clock hands -->
    <line x1="26" y1="22" x2="26" y2="17.8" stroke="#065f46" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="26" y1="22" x2="29.8" y2="24.2" stroke="#10b981" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="26" cy="22" r="1.1" fill="#065f46"/>
    <!-- Ground / grass -->
    <rect x="0" y="33.5" width="40" height="6.5" fill="#059669"/>
    <ellipse cx="8"  cy="33.5" rx="9"  ry="1.8" fill="#10b981"/>
    <ellipse cx="32" cy="33.5" rx="9"  ry="1.8" fill="#10b981"/>
    <!-- Person lounging (stick figure reclining, looking at clock) -->
    <!-- Body -->
    <line x1="5" y1="30.5" x2="17" y2="28.5" stroke="#064e3b" stroke-width="2" stroke-linecap="round"/>
    <!-- Head -->
    <circle cx="18.5" cy="26.5" r="2.5" fill="#064e3b"/>
    <!-- Arm raised toward clock -->
    <line x1="12" y1="29.5" x2="17" y2="24" stroke="#064e3b" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Legs (stretched out relaxing) -->
    <line x1="5" y1="30.5" x2="3" y2="34" stroke="#064e3b" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="7.5" y1="30.2" x2="5.5" y2="34" stroke="#064e3b" stroke-width="1.8" stroke-linecap="round"/>
  </svg>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 40 },
})
</script>
