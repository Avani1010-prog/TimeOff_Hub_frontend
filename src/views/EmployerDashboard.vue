<template>
  <div>
    <!-- ── Animated welcome banner ─────────────────────── -->
    <WelcomeMessage
      title="Leave Requests — Employer View"
      subtitle="Click any row to view full details, approve or reject."
    />

    <AlertMessage :message="leaveStore.error"          type="error"   class="mb-4" />
    <AlertMessage :message="leaveStore.successMessage" type="success" class="mb-4" />

    <!-- ── Clickable Stat Cards ────────────────────────── -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <button
        v-for="card in statCards"
        :key="card.key"
        @click="setCardFilter(card.key)"
        :class="[
          'rounded-xl border p-4 text-center transition-all duration-200 focus:outline-none group',
          activeCardFilter === card.key
            ? `${card.activeBg} ${card.activeBorder} shadow-lg scale-[1.03] ring-2 ${card.activeRing}`
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.01] shadow-sm',
        ]"
      >
        <p :class="[
          'text-3xl font-extrabold transition-colors',
          activeCardFilter === card.key ? card.activeText : card.idleText,
        ]">{{ card.count }}</p>
        <p :class="[
          'text-xs font-bold uppercase tracking-wider mt-1',
          activeCardFilter === card.key ? card.activeLabelText : 'text-gray-500 dark:text-gray-400',
        ]">{{ card.label }}</p>
        <div v-if="activeCardFilter === card.key" :class="['w-1.5 h-1.5 rounded-full mx-auto mt-2', card.dotColor]"></div>
      </button>
    </div>

    <!-- Active filter pill -->
    <div v-if="activeCardFilter !== 'All'" class="flex items-center gap-2 mb-4">
      <span class="text-sm text-gray-500 dark:text-gray-400">Showing:</span>
      <span :class="[
        'inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full',
        activeCardFilter === 'Pending'  ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' :
        activeCardFilter === 'Approved' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-400' :
        activeCardFilter === 'Total'    ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                                          'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
      ]">
        {{ activeCardFilter }} ({{ filteredLeaves.length }})
        <button @click="setCardFilter('All')" class="ml-1 opacity-60 hover:opacity-100 text-base leading-none">×</button>
      </span>
    </div>

    <!-- ── Filters ─────────────────────────────────────── -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-4 mb-6 flex flex-col sm:flex-row gap-3">
      <div class="flex-1">
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Status</label>
        <select
          v-model="filters.status"
          class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div class="flex-1">
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Leave Type</label>
        <select
          v-model="filters.leaveType"
          class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Types</option>
          <option v-for="t in leaveTypes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
      <div class="flex items-end gap-2">
        <button
          @click="applyFilters"
          class="bg-primary-700 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >Apply</button>
        <button
          @click="resetFilters"
          class="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >Reset</button>
      </div>
    </div>

    <!-- ── Loading ─────────────────────────────────────── -->
    <div v-if="leaveStore.loading" class="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
      Loading leave requests...
    </div>

    <!-- ── Empty ───────────────────────────────────────── -->
    <div v-else-if="filteredLeaves.length === 0" class="text-center py-16 text-gray-400 dark:text-gray-500">
      <p class="text-5xl mb-3">📭</p>
      <p class="font-semibold text-base">No {{ activeCardFilter === 'All' ? '' : activeCardFilter.toLowerCase() + ' ' }}leave requests found.</p>
      <button v-if="activeCardFilter !== 'All'" @click="setCardFilter('All')" class="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline">← Show all</button>
    </div>

    <!-- ── Content (Combined Desktop/Mobile) ───────────── -->
    <div v-else>
      <!-- Desktop Table -->
      <div class="hidden lg:block bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm overflow-hidden">
        <p class="px-4 pt-3 pb-1 text-xs text-gray-400 dark:text-gray-500 italic">
          💡 Click any row to view full details and employee leave history
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-primary-50 dark:bg-gray-900 border-b dark:border-gray-700">
              <tr>
                <th class="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">Employee</th>
                <th class="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">Type</th>
                <th class="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">From</th>
                <th class="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">To</th>
                <th class="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">Days</th>
                <th class="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">Status</th>
                <th class="text-left px-4 py-3.5 font-semibold text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr
                v-for="leave in filteredLeaves"
                :key="leave._id"
                @click="openDrawer(leave)"
                :class="[
                  'cursor-pointer transition-colors group',
                  selectedLeave?._id === leave._id
                    ? 'bg-primary-50 dark:bg-primary-900/30 ring-1 ring-inset ring-primary-300 dark:ring-primary-700'
                    : 'hover:bg-primary-50/70 dark:hover:bg-gray-700/50',
                ]"
                title="Click to view full details"
              >
                <!-- Employee -->
                <td class="px-4 py-3.5">
                  <div class="flex items-center gap-2">
                    <GenderedAvatar :gender="leave.employee?.gender || ''" :name="leave.employee?.name" :size="32" />
                    <div>
                      <p class="font-semibold text-gray-800 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                        {{ leave.employee?.name }}
                      </p>
                      <p class="text-xs text-gray-400 dark:text-gray-500">{{ leave.employee?.department || 'N/A' }}</p>
                    </div>
                  </div>
                </td>
                <!-- Type -->
                <td class="px-4 py-3.5">
                  <span class="px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
                    {{ leave.leaveType }}
                  </span>
                </td>
                <!-- Dates -->
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300 text-xs">{{ formatDate(leave.startDate) }}</td>
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300 text-xs">{{ formatDate(leave.endDate) }}</td>
                <!-- Days -->
                <td class="px-4 py-3.5 text-center">
                  <span class="font-bold text-primary-600 dark:text-primary-400">{{ leave.totalDays }}</span>
                </td>
                <!-- Status -->
                <td class="px-4 py-3.5">
                  <StatusBadge :status="leave.status" />
                </td>
                <!-- Quick action -->
                <td class="px-4 py-3.5 text-right" @click.stop>
                  <template v-if="leave.status === 'Pending'">
                    <div class="flex justify-end gap-1.5">
                      <button
                        @click="quickReview(leave._id, 'Approved')"
                        :disabled="leaveStore.loading"
                        class="text-xs bg-primary-600 hover:bg-primary-700 text-white px-2.5 py-1.5 rounded-lg transition font-medium disabled:opacity-50"
                        title="Quick approve"
                      >✓</button>
                      <button
                        @click="quickReview(leave._id, 'Rejected')"
                        :disabled="leaveStore.loading"
                        class="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-lg transition font-medium disabled:opacity-50"
                        title="Quick reject"
                      >✕</button>
                    </div>
                  </template>
                  <div v-else class="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-end gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    Details
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile Card List -->
      <div class="lg:hidden space-y-3">
        <div
          v-for="leave in filteredLeaves"
          :key="leave._id"
          @click="openDrawer(leave)"
          class="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-4 shadow-sm active:scale-[0.98] transition-transform"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <GenderedAvatar :gender="leave.employee?.gender || ''" :name="leave.employee?.name" :size="38" />
              <div>
                <p class="font-bold text-gray-800 dark:text-white">{{ leave.employee?.name }}</p>
                <p class="text-[10px] text-gray-400 uppercase tracking-wide">{{ leave.employee?.department || 'Staff' }}</p>
              </div>
            </div>
            <StatusBadge :status="leave.status" />
          </div>
          
          <div class="grid grid-cols-2 gap-y-2 text-xs border-y dark:border-gray-700 py-3 my-3">
            <div>
              <span class="text-gray-400 block mb-0.5 uppercase tracking-tighter font-bold">Type</span>
              <span class="font-semibold text-primary-600 dark:text-primary-400">{{ leave.leaveType }} Leave</span>
            </div>
            <div class="text-right">
              <span class="text-gray-400 block mb-0.5 uppercase tracking-tighter font-bold">Duration</span>
              <span class="font-bold">{{ leave.totalDays }} day{{ leave.totalDays !== 1 ? 's' : '' }}</span>
            </div>
            <div>
              <span class="text-gray-400 block mb-0.5 uppercase tracking-tighter font-bold">From</span>
              <span class="text-gray-600 dark:text-gray-300">{{ formatDate(leave.startDate) }}</span>
            </div>
            <div class="text-right">
              <span class="text-gray-400 block mb-0.5 uppercase tracking-tighter font-bold">To</span>
              <span class="text-gray-600 dark:text-gray-300">{{ formatDate(leave.endDate) }}</span>
            </div>
          </div>

          <div v-if="leave.status === 'Pending'" class="flex gap-2" @click.stop>
            <button
              @click="quickReview(leave._id, 'Approved')"
              class="flex-1 bg-primary-600 text-white py-2 rounded-lg text-xs font-bold shadow-sm active:bg-primary-700"
            >Approve</button>
            <button
              @click="quickReview(leave._id, 'Rejected')"
              class="flex-1 bg-red-500 text-white py-2 rounded-lg text-xs font-bold shadow-sm active:bg-red-600"
            >Reject</button>
          </div>
          <div v-else class="text-center">
              <button class="text-[10px] font-bold text-primary-500 uppercase tracking-widest">View Details →</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Leave Detail Drawer ─────────────────────────── -->
    <LeaveDetailDrawer
      :leave="selectedLeave"
      @close="selectedLeave = null"
      @review="handleDrawerReview"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore }    from '../stores/auth'
import { useLeaveStore }   from '../stores/leaves'
import StatusBadge         from '../components/StatusBadge.vue'
import AlertMessage        from '../components/AlertMessage.vue'
import WelcomeMessage      from '../components/WelcomeMessage.vue'
import LeaveDetailDrawer   from '../components/LeaveDetailDrawer.vue'
import GenderedAvatar      from '../components/GenderedAvatar.vue'

const authStore  = useAuthStore()
const leaveStore = useLeaveStore()

const leaveTypes    = ['Annual', 'Sick', 'Casual', 'Maternity', 'Paternity', 'Unpaid', 'Other']
const filters       = reactive({ status: '', leaveType: '' })
const selectedLeave = ref(null)

// ── Card filter (client-side, instant) ─────────────────
const activeCardFilter = ref('All')

const setCardFilter = (key) => {
  activeCardFilter.value = activeCardFilter.value === key ? 'All' : key
}

const filteredLeaves = computed(() => {
  if (activeCardFilter.value === 'All') return leaveStore.leaves
  return leaveStore.leaves.filter(l => l.status === activeCardFilter.value)
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

onMounted(() => leaveStore.fetchAllLeaves())

const countByStatus = (status) =>
  leaveStore.leaves.filter((l) => l.status === status).length

const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('')
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

const applyFilters = () => {
  const params = {}
  if (filters.status)    params.status    = filters.status
  if (filters.leaveType) params.leaveType = filters.leaveType
  leaveStore.fetchAllLeaves(params)
  // Reset card filter when server filter is applied
  activeCardFilter.value = 'All'
}

const resetFilters = () => {
  filters.status    = ''
  filters.leaveType = ''
  activeCardFilter.value = 'All'
  leaveStore.fetchAllLeaves()
}

// Open drawer for a leave row
const openDrawer = (leave) => {
  leaveStore.clearMessages()
  selectedLeave.value = leave
}

// Handle review from within the drawer (with note)
const handleDrawerReview = async ({ id, status, note }) => {
  const result = await leaveStore.reviewLeave(id, { status, reviewNote: note })
  if (result.success) {
    const updated = leaveStore.leaves.find(l => l._id === id)
    if (updated) selectedLeave.value = updated
  }
}

// Quick approve/reject from table row (no note, no drawer)
const quickReview = async (id, status) => {
  await leaveStore.reviewLeave(id, { status, reviewNote: '' })
}
</script>
