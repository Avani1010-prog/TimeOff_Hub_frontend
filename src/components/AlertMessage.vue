<template>
  <div
    v-if="message"
    :class="[
      'flex items-start gap-2 rounded-md px-4 py-3 text-sm border',
      type === 'error'
        ? 'bg-red-50 text-red-700 border-red-200'
        : 'bg-green-50 text-green-700 border-green-200',
    ]"
    role="alert"
  >
    <span class="font-semibold">{{ type === 'error' ? '✗' : '✓' }}</span>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'error' }, // 'error' | 'success'
})
</script>
