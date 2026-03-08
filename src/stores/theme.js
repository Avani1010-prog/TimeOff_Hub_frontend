import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: localStorage.getItem('theme') === 'dark',
        sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
    }),

    actions: {
        /**
         * Called once on app startup to apply persisted theme preference.
         */
        initTheme() {
            document.documentElement.classList.toggle('dark', this.isDark)
        },

        toggleTheme() {
            this.isDark = !this.isDark
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
            document.documentElement.classList.toggle('dark', this.isDark)
        },

        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed
            localStorage.setItem('sidebarCollapsed', String(this.sidebarCollapsed))
        },
    },
})
