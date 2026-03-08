<template>
  <div>
    <!-- ── Animated welcome banner ─────────────────────── -->
    <WelcomeMessage
      title="My Leave Dashboard"
      subtitle="Click a stat card to filter your leave requests."
    />

    <AlertMessage :message="leaveStore.error"          type="error"   class="mb-4" />
    <AlertMessage :message="leaveStore.successMessage" type="success" class="mb-4" />

    <!-- ── Clickable Stat Cards ────────────────────────── -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <button
        v-for="card in statCards"
        :key="card.key"
        @click="setFilter(card.key)"
        :class="[
          'rounded-xl border p-4 text-center transition-all duration-200 focus:outline-none group',
          activeFilter === card.key
            ? `${card.activeBg} ${card.activeBorder} shadow-lg scale-[1.03] ring-2 ${card.activeRing}`
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.01] shadow-sm',
        ]"
      >
        <p
          :class="[
            'text-3xl font-extrabold transition-colors',
            activeFilter === card.key ? card.activeText : card.idleText,
          ]"
        >{{ card.count }}</p>
        <p
          :class="[
            'text-xs font-bold uppercase tracking-wider mt-1 transition-colors',
            activeFilter === card.key ? card.activeLabelText : 'text-gray-500 dark:text-gray-400',
          ]"
        >{{ card.label }}</p>
        <!-- Active indicator dot -->
        <div
          v-if="activeFilter === card.key"
          :class="['w-1.5 h-1.5 rounded-full mx-auto mt-2', card.dotColor]"
        ></div>
      </button>
    </div>

    <!-- Active filter pill -->
    <div v-if="activeFilter !== 'All'" class="flex items-center gap-2 mb-4">
      <span class="text-sm text-gray-500 dark:text-gray-400">Showing:</span>
      <span
        :class="[
          'inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full',
          activeFilter === 'Pending'  ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' :
          activeFilter === 'Approved' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-400' :
                                        'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
        ]"
      >
        {{ activeFilter }} ({{ filteredLeaves.length }})
        <button @click="setFilter('All')" class="ml-1 opacity-60 hover:opacity-100 text-base leading-none">×</button>
      </span>
    </div>

    <!-- ── Header row ──────────────────────────────────── -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
      <h1 class="text-xl font-bold dark:text-white text-gray-800">
        {{ activeFilter === 'All' ? 'All Requests' : `${activeFilter} Requests` }}
        <span class="text-sm font-normal text-gray-400 ml-1">({{ filteredLeaves.length }})</span>
      </h1>
      <router-link
        to="/employee/apply"
        class="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-600 text-white text-sm px-5 py-2.5 rounded-xl transition font-semibold shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Apply for Leave
      </router-link>
    </div>

    <!-- ── Loading ─────────────────────────────────────── -->
    <div v-if="leaveStore.loading" class="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
      Loading your leave requests...
    </div>

    <!-- ── Empty state ─────────────────────────────────── -->
    <div
      v-else-if="filteredLeaves.length === 0"
      class="text-center py-16 text-gray-400 dark:text-gray-500 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <p class="text-5xl mb-3">{{ activeFilter === 'All' ? '📋' : emptyEmoji[activeFilter] }}</p>
      <p class="font-semibold text-base">
        {{ activeFilter === 'All' ? 'No leave requests yet.' : `No ${activeFilter.toLowerCase()} requests.` }}
      </p>
      <p class="text-sm mt-1">
        {{ activeFilter === 'All'
          ? 'Apply for your first leave using the button above.'
          : `You have no ${activeFilter.toLowerCase()} leave requests.` }}
      </p>
      <button
        v-if="activeFilter !== 'All'"
        @click="setFilter('All')"
        class="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >← Show all requests</button>
    </div>

    <!-- ── Leave cards ─────────────────────────────────── -->
    <TransitionGroup
      v-else
      name="list"
      tag="div"
      class="space-y-3"
    >
      <div
        v-for="leave in filteredLeaves"
        :key="leave._id"
        class="animate-fade-in bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow p-5"
      >
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div class="flex-1">
            <!-- Title + badge -->
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="font-bold text-gray-800 dark:text-white text-[15px]">{{ leave.leaveType }} Leave</span>
              <StatusBadge :status="leave.status" />
            </div>

            <!-- Dates -->
            <p class="text-sm text-gray-500 dark:text-gray-400">
              📅 {{ formatDate(leave.startDate) }} → {{ formatDate(leave.endDate) }}
              <span class="ml-1.5 px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
                {{ leave.totalDays }} day{{ leave.totalDays !== 1 ? 's' : '' }}
              </span>
            </p>

            <!-- Reason -->
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{{ leave.reason }}"</p>

            <!-- Reviewer note -->
            <div
              v-if="leave.reviewNote"
              class="mt-2 text-xs bg-primary-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg px-3 py-2 border-l-2 border-primary-400"
            >
              <span class="font-semibold">Reviewer note:</span> {{ leave.reviewNote }}
            </div>

            <!-- Meta -->
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Applied {{ formatDate(leave.createdAt) }}
              <template v-if="leave.reviewedBy">
                · Reviewed by <span class="font-medium">{{ leave.reviewedBy.name }}</span>
                on {{ formatDate(leave.reviewedAt) }}
              </template>
            </p>
          </div>

          <!-- Withdraw button -->
          <div v-if="leave.status === 'Pending'" class="flex-shrink-0">
            <button
              @click="handleDelete(leave._id)"
              :disabled="leaveStore.loading"
              class="text-xs text-red-500 border border-red-300 dark:border-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition disabled:opacity-50"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLeaveStore } from '../stores/leaves'
import StatusBadge    from '../components/StatusBadge.vue'
import AlertMessage   from '../components/AlertMessage.vue'
import WelcomeMessage from '../components/WelcomeMessage.vue'

const leaveStore = useLeaveStore()
onMounted(() => { leaveStore.fetchMyLeaves() })

// ── Active filter state ─────────────────────────────────
const activeFilter = ref('All')

const setFilter = (key) => {
  activeFilter.value = activeFilter.value === key ? 'All' : key
}

// ── Filtered leave list (computed) ─────────────────────
const filteredLeaves = computed(() => {
  if (activeFilter.value === 'All') return leaveStore.leaves
  return leaveStore.leaves.filter(l => l.status === activeFilter.value)
})

// ── Stat cards config ───────────────────────────────────
const statCards = computed(() => [
  {
    key:             'All',
    label:           'Total',
    count:           leaveStore.leaves.length,
    idleText:        'text-gray-700 dark:text-gray-200',
    activeText:      'text-white',
    activeBg:        'bg-primary-700 dark:bg-primary-800',
    activeBorder:    'border-primary-600',
    activeRing:      'ring-primary-400',
    activeLabelText: 'text-primary-100',
    dotColor:        'bg-primary-200',
  },
  {
    key:             'Pending',
    label:           'Pending',
    count:           leaveStore.leaves.filter(l => l.status === 'Pending').length,
    idleText:        'text-yellow-500',
    activeText:      'text-white',
    activeBg:        'bg-yellow-500 dark:bg-yellow-600',
    activeBorder:    'border-yellow-400',
    activeRing:      'ring-yellow-300',
    activeLabelText: 'text-yellow-100',
    dotColor:        'bg-yellow-200',
  },
  {
    key:             'Approved',
    label:           'Approved',
    count:           leaveStore.leaves.filter(l => l.status === 'Approved').length,
    idleText:        'text-primary-600 dark:text-primary-400',
    activeText:      'text-white',
    activeBg:        'bg-primary-600 dark:bg-primary-700',
    activeBorder:    'border-primary-500',
    activeRing:      'ring-primary-300',
    activeLabelText: 'text-primary-100',
    dotColor:        'bg-primary-200',
  },
  {
    key:             'Rejected',
    label:           'Rejected',
    count:           leaveStore.leaves.filter(l => l.status === 'Rejected').length,
    idleText:        'text-red-500',
    activeText:      'text-white',
    activeBg:        'bg-red-500 dark:bg-red-700',
    activeBorder:    'border-red-400',
    activeRing:      'ring-red-300',
    activeLabelText: 'text-red-100',
    dotColor:        'bg-red-200',
  },
])

const emptyEmoji = { Pending: '⏳', Approved: '✅', Rejected: '❌' }

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to withdraw this leave request?')) return
  await leaveStore.deleteLeave(id)
}
</script>

<style scoped>
/* Smooth list filter animation */
.list-enter-active { transition: all 0.25s ease; }
.list-leave-active { transition: all 0.2s ease; }
.list-enter-from   { opacity: 0; transform: translateY(-8px); }
.list-leave-to     { opacity: 0; transform: translateY(8px); }
.list-move         { transition: transform 0.25s ease; }
</style>
