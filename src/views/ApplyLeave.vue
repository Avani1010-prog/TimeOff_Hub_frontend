<template>
  <div class="max-w-2xl">
    <WelcomeMessage
      title="Apply for Leave"
      subtitle="Fill in the details below to submit a new leave request."
    />
    <div class="mb-4">
      <router-link to="/employee/dashboard" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
        ← Back to Dashboard
      </router-link>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">Apply for Leave</h1>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm p-6">
      <AlertMessage :message="leaveStore.error" type="error" class="mb-4" />
      <AlertMessage :message="leaveStore.successMessage" type="success" class="mb-4" />

      <form @submit.prevent="handleSubmit" novalidate>
        <!-- Leave Type -->
        <div class="mb-4">
          <label for="leaveType" class="block text-sm font-medium text-gray-700 mb-1">
            Leave Type <span class="text-red-500">*</span>
          </label>
          <select
            id="leaveType"
            v-model="form.leaveType"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option disabled value="">Select leave type</option>
            <option v-for="t in leaveTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
              Start Date <span class="text-red-500">*</span>
            </label>
            <input
              id="startDate"
              v-model="form.startDate"
              type="date"
              :min="today"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">
              End Date <span class="text-red-500">*</span>
            </label>
            <input
              id="endDate"
              v-model="form.endDate"
              type="date"
              :min="form.startDate || today"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <!-- Duration preview -->
        <div v-if="durationDays !== null" class="mb-4 text-sm text-primary-600 font-medium">
          Duration: {{ durationDays }} day{{ durationDays !== 1 ? 's' : '' }}
        </div>

        <!-- Reason -->
        <div class="mb-6">
          <label for="reason" class="block text-sm font-medium text-gray-700 mb-1">
            Reason <span class="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            v-model="form.reason"
            rows="4"
            placeholder="Briefly describe the reason for your leave..."
            maxlength="500"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          ></textarea>
          <p class="text-xs text-gray-400 text-right mt-1">{{ form.reason.length }}/500</p>
        </div>

        <AlertMessage :message="localError" type="error" class="mb-3" />

        <div class="flex gap-3">
          <button
            type="submit"
            :disabled="leaveStore.loading"
            class="flex-1 bg-primary-700 text-white py-2 rounded-md text-sm font-medium hover:bg-primary-800 disabled:opacity-60 transition"
          >
            {{ leaveStore.loading ? 'Submitting...' : 'Submit Request' }}
          </button>
          <router-link
            to="/employee/dashboard"
            class="flex-1 text-center border border-gray-300 dark:border-gray-600 py-2 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLeaveStore } from '../stores/leaves'
import AlertMessage   from '../components/AlertMessage.vue'
import WelcomeMessage from '../components/WelcomeMessage.vue'

const leaveStore = useLeaveStore()
const router = useRouter()
const localError = ref('')

const leaveTypes = ['Annual', 'Sick', 'Casual', 'Maternity', 'Paternity', 'Unpaid', 'Other']

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',
})

const durationDays = computed(() => {
  if (!form.startDate || !form.endDate) return null
  const start = new Date(form.startDate)
  const end = new Date(form.endDate)
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
  return diff > 0 ? diff : null
})

onMounted(() => {
  leaveStore.clearMessages()
})

const handleSubmit = async () => {
  localError.value = ''

  if (!form.leaveType) {
    localError.value = 'Please select a leave type.'
    return
  }
  if (!form.startDate || !form.endDate) {
    localError.value = 'Start date and end date are required.'
    return
  }
  if (new Date(form.endDate) < new Date(form.startDate)) {
    localError.value = 'End date cannot be before start date.'
    return
  }
  if (!form.reason.trim()) {
    localError.value = 'Please provide a reason for your leave.'
    return
  }

  const result = await leaveStore.applyLeave({
    leaveType: form.leaveType,
    startDate: form.startDate,
    endDate: form.endDate,
    reason: form.reason.trim(),
  })

  if (result.success) {
    setTimeout(() => router.push('/employee/dashboard'), 1200)
  }
}
</script>
