import { defineStore } from 'pinia'
import api from '../api/axios'

export const useLeaveStore = defineStore('leaves', {
    state: () => ({
        leaves: [],
        loading: false,
        error: null,
        successMessage: null,

        // Employee history (employer view — selected employee's all leaves)
        historyLeaves: [],
        historyStats: null,
        historyLoading: false,
    }),

    actions: {
        // Employee: fetch own leaves
        async fetchMyLeaves() {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.get('/leaves/my')
                this.leaves = data.leaves
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to fetch leave requests.'
            } finally {
                this.loading = false
            }
        },

        // Employer: fetch all leaves
        async fetchAllLeaves(filters = {}) {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.get('/leaves', { params: filters })
                this.leaves = data.leaves
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to fetch leave requests.'
            } finally {
                this.loading = false
            }
        },

        // Employee: apply for leave
        async applyLeave(payload) {
            this.loading = true
            this.error = null
            this.successMessage = null
            try {
                const { data } = await api.post('/leaves', payload)
                this.leaves.unshift(data.leave)
                this.successMessage = data.message
                return { success: true }
            } catch (err) {
                const errData = err.response?.data
                if (errData?.errors) {
                    this.error = errData.errors.map((e) => e.msg).join(', ')
                } else {
                    this.error = errData?.message || 'Failed to apply for leave.'
                }
                return { success: false, message: this.error }
            } finally {
                this.loading = false
            }
        },

        // Employer: approve or reject leave
        async reviewLeave(id, payload) {
            this.loading = true
            this.error = null
            this.successMessage = null
            try {
                const { data } = await api.patch(`/leaves/${id}/review`, payload)
                const idx = this.leaves.findIndex((l) => l._id === id)
                if (idx !== -1) this.leaves[idx] = data.leave
                this.successMessage = data.message
                return { success: true }
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to review leave request.'
                return { success: false, message: this.error }
            } finally {
                this.loading = false
            }
        },

        // Employee: delete pending leave
        async deleteLeave(id) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/leaves/${id}`)
                this.leaves = this.leaves.filter((l) => l._id !== id)
                return { success: true }
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to delete leave request.'
                return { success: false }
            } finally {
                this.loading = false
            }
        },

        clearMessages() {
            this.error = null
            this.successMessage = null
        },

        // Employer: fetch all leaves for a specific employee (history)
        async fetchEmployeeHistory(employeeId) {
            this.historyLoading = true
            this.historyLeaves = []
            this.historyStats = null
            try {
                const { data } = await api.get(`/leaves/employee/${employeeId}`)
                this.historyLeaves = data.leaves
                this.historyStats = data.stats
            } catch (err) {
                console.error('fetchEmployeeHistory:', err)
            } finally {
                this.historyLoading = false
            }
        },

        clearHistory() {
            this.historyLeaves = []
            this.historyStats = null
            this.historyLoading = false
        },
    },
})
