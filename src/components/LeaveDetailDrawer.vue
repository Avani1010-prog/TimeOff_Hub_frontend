<template>
  <!-- Overlay -->
  <Transition name="overlay-fade">
    <div
      v-if="leave"
      class="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>
  </Transition>

  <!-- Drawer panel -->
  <Transition name="drawer-slide">
    <div
      v-if="leave"
      class="fixed top-0 right-0 h-full z-50 w-full lg:max-w-xl shadow-2xl flex flex-col"
      :class="isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'"
    >
      <!-- ── Header ──────────────────────────────────── -->
      <div
        class="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
        :class="isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-primary-700'"
      >
        <div class="flex items-center gap-3">
          <!-- Gendered avatar -->
          <GenderedAvatar
            :gender="leave.employee?.gender || ''"
            :name="leave.employee?.name || ''"
            :size="44"
          />
          <div>
            <p class="font-bold text-white text-[15px]">{{ leave.employee?.name }}</p>
            <p class="text-xs text-primary-200">{{ leave.employee?.email }}</p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="text-white text-2xl w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary-600 transition"
          aria-label="Close"
        >×</button>
      </div>

      <!-- ── Tabs ───────────────────────────────────── -->
      <div
        class="flex border-b flex-shrink-0"
        :class="isDark ? 'border-gray-700' : 'border-gray-200'"
      >
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'flex-1 py-3 text-sm font-semibold transition-colors relative',
            activeTab === tab.key
              ? isDark
                ? 'text-accent-400 border-b-2 border-accent-400'
                : 'text-primary-700 border-b-2 border-primary-600'
              : isDark
                ? 'text-gray-500 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- ── Scrollable content ─────────────────────── -->
      <div class="flex-1 overflow-y-auto px-6 py-5">

        <!-- ═══ TAB: Details ════════════════════════ -->
        <div v-if="activeTab === 'details'" class="space-y-5">

          <!-- Status + badge -->
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">{{ leave.leaveType }} Leave</h2>
            <StatusBadge :status="leave.status" />
          </div>

          <div
            class="grid grid-cols-2 gap-3 rounded-xl p-4 text-sm"
            :class="isDark ? 'bg-gray-800' : 'bg-primary-50'"
          >
            <InfoRow icon="📅" label="Start Date"   :value="fmt(leave.startDate)" />
            <InfoRow icon="📅" label="End Date"     :value="fmt(leave.endDate)" />
            <InfoRow icon="🗓️" label="Duration"     :value="`${leave.totalDays} day${leave.totalDays !== 1 ? 's' : ''}`" />
            <InfoRow icon="📋" label="Applied"      :value="fmt(leave.createdAt)" />
            <InfoRow icon="🏢" label="Dept"         :value="leave.employee?.department || 'N/A'" />
            <InfoRow
              icon="👤"
              label="Reviewer"
              :value="leave.reviewedBy ? leave.reviewedBy.name : 'Not yet'"
            />
          </div>

          <!-- Reason -->
          <div class="space-y-1.5">
            <p
              class="text-xs font-extra-bold uppercase tracking-wider text-gray-400 dark:text-gray-500"
            >Reason</p>
            <p
              class="text-sm rounded-xl px-4 py-3 italic leading-relaxed"
              :class="isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'"
            >"{{ leave.reason }}"</p>
          </div>

          <!-- Reviewer note -->
          <div v-if="leave.reviewNote">
            <p
              class="text-xs font-semibold uppercase tracking-wide mb-1"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >Reviewer Note</p>
            <p
              class="text-sm rounded-xl px-4 py-3 border-l-4 border-primary-400"
              :class="isDark ? 'bg-gray-800 text-gray-300' : 'bg-primary-50 text-gray-700'"
            >{{ leave.reviewNote }}</p>
          </div>

          <!-- ── Approve / Reject actions ─────────── -->
          <template v-if="leave.status === 'Pending'">
            <div
              class="rounded-xl p-4 border"
              :class="isDark ? 'border-gray-700 bg-gray-800' : 'border-primary-100 bg-primary-50'"
            >
              <p
                class="text-xs font-semibold uppercase tracking-wide mb-3"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >Action</p>
              <textarea
                v-model="reviewNote"
                rows="2"
                placeholder="Add a note (optional)..."
                class="w-full text-sm border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                :class="isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                  : 'bg-white border-gray-200 text-gray-800'"
              ></textarea>
              <div class="flex gap-2">
                <button
                  @click="$emit('review', { id: leave._id, status: 'Approved', note: reviewNote })"
                  :disabled="leaveStore.loading"
                  class="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-semibold transition disabled:opacity-60"
                >✓ Approve</button>
                <button
                  @click="$emit('review', { id: leave._id, status: 'Rejected', note: reviewNote })"
                  :disabled="leaveStore.loading"
                  class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition disabled:opacity-60"
                >✕ Reject</button>
              </div>
            </div>
          </template>
        </div>

        <!-- ═══ TAB: History ════════════════════════ -->
        <div v-else-if="activeTab === 'history'">

          <!-- Clickable stat filter cards -->
          <div v-if="leaveStore.historyStats" class="grid grid-cols-4 gap-2 mb-4">
            <button
              v-for="card in historyCards"
              :key="card.key"
              @click="setHistoryFilter(card.key)"
              :class="[
                'rounded-xl p-2 text-center transition-all duration-200 focus:outline-none',
                activeHistoryFilter === card.key
                  ? `${card.activeBg} shadow-md scale-[1.06] ring-1 ${card.activeRing}`
                  : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200',
              ]"
            >
              <p :class="[
                'text-xl font-extrabold',
                activeHistoryFilter === card.key ? card.activeText : card.idleText,
              ]">{{ card.count }}</p>
              <p :class="[
                'text-[9px] font-bold uppercase tracking-wide mt-0.5',
                activeHistoryFilter === card.key ? card.activeLabelText : (isDark ? 'text-gray-400' : 'text-gray-500'),
              ]">{{ card.label }}</p>
            </button>
          </div>

          <!-- Active filter pill -->
          <div v-if="activeHistoryFilter !== 'All'" class="flex items-center gap-1.5 mb-3">
            <span :class="['text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1',
              activeHistoryFilter === 'Pending'  ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' :
              activeHistoryFilter === 'Approved' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' :
                                                   'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
            ]">
              {{ activeHistoryFilter }} ({{ filteredHistory.length }})
              <button @click="setHistoryFilter('All')" class="ml-0.5 opacity-60 hover:opacity-100">×</button>
            </span>
          </div>

          <!-- Total approved days -->          
          <div v-if="leaveStore.historyStats" class="mb-3 text-xs text-center font-semibold" :class="isDark ? 'text-accent-400' : 'text-primary-600'">
            📊 {{ leaveStore.historyStats.totalDaysApproved }} approved days in total
          </div>

          <!-- Loading -->
          <div v-if="leaveStore.historyLoading" class="text-center py-12">
            <div class="text-3xl mb-3">⏳</div>
            <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">Loading history...</p>
          </div>

          <!-- Empty -->
          <div
            v-else-if="!leaveStore.historyLoading && filteredHistory.length === 0"
            class="text-center py-10"
          >
            <div class="text-4xl mb-2">📭</div>
            <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              {{ activeHistoryFilter === 'All' ? 'No leave history found.' : `No ${activeHistoryFilter.toLowerCase()} leaves.` }}
            </p>
            <button v-if="activeHistoryFilter !== 'All'" @click="setHistoryFilter('All')" class="text-xs mt-2 text-primary-500 hover:underline">
              ← Show all
            </button>
          </div>

          <!-- History list (filtered) -->
          <div v-else class="space-y-3">
            <div
              v-for="h in filteredHistory"
              :key="h._id"
              :class="[
                'rounded-xl border p-4 text-sm transition',
                h._id === leave._id
                  ? isDark ? 'border-primary-600 bg-primary-900/50' : 'border-primary-400 bg-primary-50'
                  : isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50',
              ]"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-semibold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                  {{ h.leaveType }} Leave
                  <span v-if="h._id === leave._id" class="ml-2 text-[10px] bg-primary-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Current</span>
                </span>
                <StatusBadge :status="h.status" />
              </div>
              <p :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                {{ fmt(h.startDate) }} → {{ fmt(h.endDate) }}
                <span class="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  :class="isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'"
                >{{ h.totalDays }} day{{ h.totalDays !== 1 ? 's' : '' }}</span>
              </p>
              <p class="italic mt-1" :class="isDark ? 'text-gray-500' : 'text-gray-400'">&ldquo;{{ h.reason }}&rdquo;</p>
              <p class="text-xs mt-1.5" :class="isDark ? 'text-gray-600' : 'text-gray-400'">Applied {{ fmt(h.createdAt) }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useThemeStore }  from '../stores/theme'
import { useLeaveStore }  from '../stores/leaves'
import StatusBadge        from './StatusBadge.vue'
import GenderedAvatar     from './GenderedAvatar.vue'

// ── Small helper sub-components defined inline ──────────
import { defineComponent, h } from 'vue'

const InfoRow = defineComponent({
  props: { icon: String, label: String, value: String },
  setup(props) {
    return () => h('div', { class: 'flex flex-col gap-0.5' }, [
      h('span', { class: 'text-[10px] uppercase tracking-wide font-bold text-gray-400' }, `${props.icon} ${props.label}`),
      h('span', { class: 'font-medium' }, props.value),
    ])
  },
})

const StatPill = defineComponent({
  props: { label: String, value: Number, color: String },
  setup(props) {
    const colorMap = {
      gray:   'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      green:  'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400',
      red:    'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
    }
    return () => h('div', { class: `rounded-xl p-2 text-center ${colorMap[props.color] || colorMap.gray}` }, [
      h('p', { class: 'text-xl font-bold' }, props.value),
      h('p', { class: 'text-[10px] font-semibold uppercase tracking-wide' }, props.label),
    ])
  },
})
// ─────────────────────────────────────────────────────────

const props = defineProps({
  leave: { type: Object, default: null },
})

defineEmits(['close', 'review'])

const themeStore = useThemeStore()
const leaveStore = useLeaveStore()
const isDark     = computed(() => themeStore.isDark)

const activeTab        = ref('details')
const reviewNote       = ref('')
const activeHistoryFilter = ref('All')

const setHistoryFilter = (key) => {
  activeHistoryFilter.value = activeHistoryFilter.value === key ? 'All' : key
}

const filteredHistory = computed(() => {
  if (activeHistoryFilter.value === 'All') return leaveStore.historyLeaves
  return leaveStore.historyLeaves.filter(l => l.status === activeHistoryFilter.value)
})

const historyCards = computed(() => [
  {
    key: 'All', label: 'Total',
    count: leaveStore.historyStats?.total ?? 0,
    idleText: isDark.value ? 'text-gray-200' : 'text-gray-700',
    activeText: 'text-white',
    activeBg: 'bg-primary-700',
    activeRing: 'ring-primary-400',
    activeLabelText: 'text-primary-100',
  },
  {
    key: 'Approved', label: 'Approved',
    count: leaveStore.historyStats?.approved ?? 0,
    idleText: isDark.value ? 'text-primary-400' : 'text-primary-600',
    activeText: 'text-white',
    activeBg: 'bg-primary-600',
    activeRing: 'ring-primary-300',
    activeLabelText: 'text-primary-100',
  },
  {
    key: 'Pending', label: 'Pending',
    count: leaveStore.historyStats?.pending ?? 0,
    idleText: 'text-yellow-500',
    activeText: 'text-white',
    activeBg: 'bg-yellow-500',
    activeRing: 'ring-yellow-300',
    activeLabelText: 'text-yellow-100',
  },
  {
    key: 'Rejected', label: 'Rejected',
    count: leaveStore.historyStats?.rejected ?? 0,
    idleText: 'text-red-500',
    activeText: 'text-white',
    activeBg: 'bg-red-500',
    activeRing: 'ring-red-300',
    activeLabelText: 'text-red-100',
  },
])

const tabs = [
  { key: 'details', label: '📄 Leave Details' },
  { key: 'history', label: '🕓 Employee History' },
]

const initials = computed(() => {
  const n = props.leave?.employee?.name || '?'
  return n.split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('')
})

const fmt = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

// When a leave is opened, reset to details tab + load history
watch(() => props.leave, (newLeave) => {
  if (newLeave) {
    activeTab.value  = 'details'
    reviewNote.value = ''
    activeHistoryFilter.value = 'All'
    leaveStore.fetchEmployeeHistory(newLeave.employee._id)
  } else {
    leaveStore.clearHistory()
  }
})
</script>

<style scoped>
/* Overlay transition */
.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.25s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to     { opacity: 0; }

/* Drawer slide from right */
.drawer-slide-enter-active,
.drawer-slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-slide-enter-from,
.drawer-slide-leave-to     { transform: translateX(100%); }
</style>
